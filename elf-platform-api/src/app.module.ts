import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ExamsModule } from './exams/exams.module';
import { QuestionsModule } from './questions/questions.module';
import { MediaModule } from './media/media.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ExamSessionModule } from './exam-session/exam-session.module';
import { PaymentsModule } from './payments/payments.module';
import { AuthModule } from './auth/auth.module'; // 1. Add this import

@Module({
  imports: [
    PrismaModule, 
    AuthModule, // 2. Add this to the imports array
    UserModule, 
    ScheduleModule.forRoot(),
    ExamsModule, 
    QuestionsModule, 
    MediaModule,
    ExamSessionModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}