import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ExamsService } from '../exams/exams.service';
import { QuestionsService } from '../questions/questions.service';

@Injectable()
export class ExamSessionService {
  constructor(
    private prisma: PrismaService,
    private examsService: ExamsService,
    private questionsService: QuestionsService,
  ) {}

  /**
   * Initializes a session and sets the hard deadline
   */
  async createSession(examId: string, studentId: string, deviceId?: string) {
    // 1. Check if session already exists (Idempotency)
    const existing = await this.prisma.examSession.findUnique({
      where: { examId_studentId: { examId, studentId } },
    });
    if (existing) return existing;

    // 2. Fetch exam to get duration
    const exam = await this.examsService.findOne(examId);
    
    const startedAt = new Date();
    const deadlineAt = new Date(startedAt.getTime() + exam.durationMinutes * 60000);

    return this.prisma.examSession.create({
      data: {
        examId,
        studentId,
        startedAt,
        deadlineAt,
        deviceId,
        status: 'IN_PROGRESS',
      },
    });
  }

  /**
   * Saves partial answers during the exam
   */
  async updateAnswers(id: string, answers: any) {
    const session = await this.prisma.examSession.findUnique({ where: { id } });
    if (!session) throw new NotFoundException('Session not found');

    // Server-authoritative check: Is time up?
    if (new Date() > session.deadlineAt || session.status !== 'IN_PROGRESS') {
      await this.prisma.examSession.update({
        where: { id },
        data: { status: 'EXPIRED' },
      });
      throw new BadRequestException('Time has expired. Answers locked.');
    }

    return this.prisma.examSession.update({
      where: { id },
      data: { currentAnswers: answers },
    });
  }

  /**
   * Finalizes the exam and performs auto-grading
   */
  async submit(id: string) {
    const session = await this.prisma.examSession.findUnique({
      where: { id },
      include: { exam: { include: { questions: true } } },
    });

    if (!session) {
        throw new Error('Session not found');
    }
    if (session.status !== 'IN_PROGRESS') {
        // throw new ForbiddenException('Exam session is not in progress');
        return { message: 'Session already submitted or expired' };
      } 
    // AUTO-GRADING LOGIC
    let score = 0;
    const questions = session.exam.questions;
    const studentAnswers = session.currentAnswers as Record<string, string>;

    questions.forEach((q) => {
      // Only auto-grade Objective types (MCQ, True/False)
      if (q.type === 'MULTIPLE_CHOICE' || q.type === 'TRUE_FALSE') {
        if (studentAnswers[q.id] === q.correctAnswer) {
          score += q.points;
        }
      }
    });

    return this.prisma.examSession.update({
      where: { id },
      data: {
        status: 'SUBMITTED',
        submittedAt: new Date(),
        score: score,
      },
    });
  }

  async findActiveSession(studentId: string) {
    return this.prisma.examSession.findFirst({
      where: { studentId, status: 'IN_PROGRESS' },
      include: { exam: true },
    });
  }
}