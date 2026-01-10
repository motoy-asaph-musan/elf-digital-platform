import { Module } from '@nestjs/common';
import { ExamSessionsService } from './exam-sessions.service';
import { ExamSessionsController } from './exam-sessions.controller';
import { ExamsModule } from '../exams/exams.module'; // To access exam duration and rules
import { QuestionsModule } from '../questions/questions.module'; // To access correct answers for grading

@Module({
  imports: [
    ExamsModule, 
    QuestionsModule
  ],
  controllers: [ExamSessionsController],
  providers: [ExamSessionsService],
  exports: [ExamSessionsService],
})
export class ExamSessionsModule {}