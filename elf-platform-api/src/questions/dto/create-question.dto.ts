import { QuestionType } from '@prisma/client';

export class CreateQuestionDto {
  examId: string;
  text: string;
  type: QuestionType;
  points: number;
  options?: string[]; // Only for MULTIPLE_CHOICE
  correctAnswer: string;
  mediaUrl?: string;  // Optional Cloudinary link
}