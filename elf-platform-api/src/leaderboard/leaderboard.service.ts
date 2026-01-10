import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LeaderboardService {
  constructor(private prisma: PrismaService) {}

  async getLeaderboard(examId: string, region?: string, limit: number = 50) {
    const sessions = await this.prisma.examSession.findMany({
      where: {
        examId,
        status: 'SUBMITTED',
        // Filter by region through the nested Student -> User -> School relation
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
        { score: 'desc' }, // Top performance
        { submittedAt: 'asc' }, // Tie-breaker: who finished fastest
      ],
      take: limit,
    });

    // Map the data for the ELF Contest frontend requirements
    return sessions.map((s, index) => {
      const timeTakenMs = s.submittedAt.getTime() - s.startedAt.getTime();
      const minutes = Math.floor(timeTakenMs / 60000);
      const seconds = Math.floor((timeTakenMs % 60000) / 1000);

      return {
        rank: index + 1,
        studentName: s.student.user.name || 'Anonymous Learner',
        schoolName: s.student.user.school?.name || 'Independent',
        region: s.student.user.school?.region || 'N/A',
        score: s.score,
        timeTaken: `${minutes}:${seconds.toString().padStart(2, '0')}`, // Format as MM:SS
      };
    });
  }
}