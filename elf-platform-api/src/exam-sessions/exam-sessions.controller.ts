import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Patch, 
  ParseUUIDPipe,
  BadRequestException 
} from '@nestjs/common';
import { ExamSessionsService } from './exam-sessions.service';
import { SubscriptionGuard } from 'src/auth/guards/subscription.guard';

@Controller('exam-sessions')
export class ExamSessionsController {
  constructor(private readonly sessionsService: ExamSessionsService) {}

  /**
   * START EXAM: Initializes the session and starts the server-side timer.
   */
  @Post('start')
  async startSession(
    @Body('examId') examId: string,
    @Body('studentId') studentId: string,
    @Body('deviceId') deviceId?: string,
  ) {
    return this.sessionsService.createSession(examId, studentId, deviceId);
  }

  /**
   * HEARTBEAT / SYNC: Students send their current answers every 30-60 seconds.
   * This ensures no data is lost if the app crashes or internet drops.
   */
  @Patch(':id/sync')
  async syncProgress(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('answers') answers: any,
  ) {
    return this.sessionsService.updateAnswers(id, answers);
  }

  /**
   * FINAL SUBMIT: Student manually finishes the exam.
   * This triggers the auto-grading for MCQ questions.
   */
  @Post(':id/submit')
  async submitExam(@Param('id', ParseUUIDPipe) id: string) {
    return this.sessionsService.submit(id);
  }

  /**
   * RECOVERY: If a student refreshes their browser, 
   * this fetches their active session and remaining time.
   */
  @Get('active/:studentId')
  async getActiveSession(@Param('studentId') studentId: string) {
    return this.sessionsService.findActiveSession(studentId);
  }


}

@Controller('exams')
export class ExamsController {
  examsService: any;
  
  @Get()
  @UseGuards(JwtAuthGuard, SubscriptionGuard) // Must be logged in AND paid
  findAll() {
    return this.examsService.findAll();
  }
}

@Get(':id/leaderboard')
async getLeaderboard(@Param('id') id: string) {
  return this.leaderboardService.getNationalLeaderboard(id);
}