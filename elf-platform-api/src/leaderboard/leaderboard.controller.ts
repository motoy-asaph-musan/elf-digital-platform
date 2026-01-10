import { Controller, Get, Query, Param } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  /**
   * GET /leaderboard/:examId?region=Central
   * Fetches the ranked list of students for a specific contest
   */
  @Get(':examId')
  async getContestLeaderboard(
    @Param('examId') examId: string,
    @Query('region') region?: string, // Optional regional filter
    @Query('limit') limit?: string,
  ) {
    const numericLimit = limit ? parseInt(limit, 10) : 50;
    
    return this.leaderboardService.getLeaderboard(
      examId, 
      region, 
      numericLimit
    );
  }
}