import { Injectable, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubmissionsService {
  constructor(private prisma: PrismaService) {}

  async updateProgress(submissionId: string, studentId: string, answers: any) {
    const session = await this.prisma.examSession.findUnique({
      where: { id: submissionId }
    });

    if (!session) throw new BadRequestException("Session not found");
    if (session.studentId !== studentId) {
      throw new ForbiddenException("Unauthorized submission");
    }

    if (session.status !== 'IN_PROGRESS') {
      throw new BadRequestException("Time has expired. Answers locked.");
    }

    return await this.prisma.examSession.update({
      where: { id: submissionId },
      data: { currentAnswers: answers },
    });
  }
}