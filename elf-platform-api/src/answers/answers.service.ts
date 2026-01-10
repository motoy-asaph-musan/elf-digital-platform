import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnswersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Manual Grading: Used by Teachers to grade Essay/Short Answer questions.
   */
  async gradeAnswer(answerId: string, points: number, comment?: string) {
    const answer = await this.prisma.answer.findUnique({
      where: { id: answerId },
      include: { question: true, session: true },
    });

    if (!answer) throw new NotFoundException('Answer not found');

    // Validation: Points cannot exceed the question's maximum points
    if (points > answer.question.points) {
      throw new BadRequestException(`Maximum points for this question is ${answer.question.points}`);
    }

    // 1. Update the specific answer
    const updatedAnswer = await this.prisma.answer.update({
      where: { id: answerId },
      data: {
        pointsEarned: points,
        isGraded: true,
        teacherComment: comment,
      },
    });

    // 2. Recalculate the total session score
    await this.recalculateSessionScore(answer.sessionId);

    return updatedAnswer;
  }

  /**
   * Sums up all graded answers and updates the ExamSession total
   */
  private async recalculateSessionScore(sessionId: string) {
    const totalScore = await this.prisma.answer.aggregate({
      where: { sessionId },
      _sum: { pointsEarned: true },
    });

    await this.prisma.examSession.update({
      where: { id: sessionId },
      data: { score: totalScore._sum.pointsEarned || 0 },
    });
  }

  /**
   * Get all ungraded answers for a specific exam (Teacher Dashboard)
   */
  async getPendingAnswers(examId: string) {
    return this.prisma.answer.findMany({
      where: {
        isGraded: false,
        session: { examId },
        question: { type: 'ESSAY' } // Usually, only essays need manual grading
      },
      include: {
        question: true,
        session: { include: { student: true } }
      }
    });
  }
}