import { 
  Controller, Get, Post, Body, Param, Patch, 
  ParseUUIDPipe, UseGuards 
} from '@nestjs/common';
import { ExamSessionService } from './exam-session.service';
import { SubscriptionGuard } from '../auth/guards/subscription.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LeaderboardService } from '../leaderboard/leaderboard.service';

@Controller('exam-sessions')
export class ExamSessionController {
  constructor(
    private readonly sessionService: ExamSessionService,
    private readonly leaderboardService: LeaderboardService // Added this
  ) {}

  @Post('start')
  async startSession(
    @Body('examId') examId: string,
    @Body('studentId') studentId: string,
    @Body('deviceId') deviceId?: string,
  ) {
    return this.sessionService.createSession(examId, studentId, deviceId);
  }

  @Patch(':id/sync')
  async syncProgress(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('answers') answers: any,
  ) {
    return this.sessionService.updateAnswers(id, answers);
  }

  @Post(':id/submit')
  async submitExam(@Param('id', ParseUUIDPipe) id: string) {
    return this.sessionService.submit(id);
  }

  @Get('active/:studentId')
  async getActiveSession(@Param('studentId') studentId: string) {
    return this.sessionService.findActiveSession(studentId);
  }

  // Moved the leaderboard INSIDE the class
  @Get(':id/leaderboard')
  async getLeaderboard(@Param('id') id: string) {
    return this.leaderboardService.getNationalLeaderboard(id);
  }
}