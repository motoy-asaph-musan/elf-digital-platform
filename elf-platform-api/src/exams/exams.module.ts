import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Assuming you have a global PrismaModule

@Module({
  imports: [PrismaModule], // Inject database access here
  controllers: [ExamsController],
  providers: [ExamsService],
  exports: [ExamsService], // Exported in case the 'Submissions' module needs it later
})
export class ExamsModule {}