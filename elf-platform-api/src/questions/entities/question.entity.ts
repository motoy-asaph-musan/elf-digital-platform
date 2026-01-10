import { QuestionType } from '@prisma/client';

export class Question {
  id: string;
  examId: string;
  
  /** The actual text of the question */
  text: string;

  /** * The type determines how the frontend renders the UI 
   * (e.g., Radio buttons for MULTIPLE_CHOICE, Textarea for ESSAY)
   */
  type: QuestionType;

  /** * For MULTIPLE_CHOICE: stored as a JSON array of strings 
   * Example: ["Noun", "Verb", "Adjective", "Adverb"]
   */
  options?: string[];

  /** The correct answer string used for auto-grading */
  correctAnswer: string;

  /** Points awarded for a correct answer */
  points: number;

  /** Optional link to images/videos for visual English questions */
  mediaUrl?: string;
  mediaType?: 'IMAGE' | 'VIDEO';

  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Question>) {
    Object.assign(this, partial);
  }
}