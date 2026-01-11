import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LeaderboardService {
  constructor(private prisma: PrismaService) {}

  /**
   * Alias for the controller call in ExamSessionController
   */
  async getNationalLeaderboard(examId: string) {
    return this.getLeaderboard(examId);
  }

  async getLeaderboard(examId: string, region?: string, limit: number = 50) {
    const sessions = await this.prisma.examSession.findMany({
      where: {
        examId,
        status: 'SUBMITTED',
        student: {
          user: {
            school: region ? { region: region } : {},
          },
        },
      },
      include: {
        student: {
          include: {
            user: {
              select: {
                name: true,
                school: {
                  select: { name: true, region: true },
                },
              },
            },
          },
        },
      },
      orderBy: [
        { score: 'desc' },
        { submittedAt: 'asc' },
      ],
      take: limit,
    });

    return sessions.map((s, index) => {
      // Calculate time taken, defaulting to 0 if timestamps are missing
      let timeTakenStr = '0:00';
      
      if (s.submittedAt && s.startedAt) {
        const timeTakenMs = s.submittedAt.getTime() - s.startedAt.getTime();
        const minutes = Math.floor(timeTakenMs / 60000);
        const seconds = Math.floor((timeTakenMs % 60000) / 1000);
        timeTakenStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      }

      return {
        rank: index + 1,
        studentName: s.student.user.name || 'Anonymous Learner',
        schoolName: s.student.user.school?.name || 'Independent',
        region: s.student.user.school?.region || 'N/A',
        score: s.score,
        timeTaken: timeTakenStr,
      };
    });
  }
}