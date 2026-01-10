import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ExamsModule } from './exams/exams.module';
import { QuestionsModule } from './questions/questions.module';
import { MediaModule } from './media/media.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ExamSessionsModule } from './exam-sessions/exam-sessions.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    PrismaModule, 
    UsersModule, 
    ScheduleModule.forRoot(),
    ExamsModule, 
    QuestionsModule, 
    MediaModule,
    ExamSessionsModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}