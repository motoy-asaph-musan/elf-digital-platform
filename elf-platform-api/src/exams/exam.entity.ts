import { ExamCategory } from '@prisma/client';

export class Exam {
  id: string;
  title: string;
  description?: string;
  
  /** Total time allowed in minutes */
  durationMinutes: number;

  /** The level of the student taking this exam */
  category: ExamCategory;

  /** When the exam becomes available for students to start */
  startTime: Date;

  /** The hard deadline after which no one can start/submit */
  endTime: Date;

  /** * Calculated Field: Check if the exam is currently "live"
   * logic: now >= startTime && now <= endTime
   */
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Exam>) {
    Object.assign(this, partial);
  }
}