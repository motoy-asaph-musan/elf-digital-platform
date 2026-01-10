import { ExamCategory } from '@prisma/client';

export class CreateExamDto {
  title: string;
  description?: string;
  durationMinutes: number;
  category: ExamCategory;
  startTime: Date;
  endTime: Date;
}