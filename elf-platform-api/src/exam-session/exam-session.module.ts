import { Module } from '@nestjs/common';
import { ExamSessionService } from './exam-session.service';
import { ExamSessionController } from './exam-session.controller';
import { LeaderboardService } from '../leaderboard/leaderboard.service'; // FIXED PATH
import { ExamsModule } from '../exams/exams.module';
import { QuestionsModule } from '../questions/questions.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    ExamsModule, 
    QuestionsModule,
    PrismaModule
  ],
  controllers: [ExamSessionController],
  providers: [
    ExamSessionService, 
    LeaderboardService 
  ],
  exports: [ExamSessionService],
})
export class ExamSessionModule {}