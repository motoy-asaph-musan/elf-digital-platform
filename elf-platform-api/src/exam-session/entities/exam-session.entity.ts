import { SessionStatus } from '@prisma/client';

export class ExamSession {
  id: string;
  examId: string;
  studentId: string;

  /** The exact timestamp the server recorded the "Start" action */
  startedAt: Date;

  /** * The hard deadline calculated at start. 
   * startedAt + exam.durationMinutes 
   */
  deadlineAt: Date;

  /** The moment the student successfully clicked "Submit" */
  submittedAt?: Date;

  /** * Current status: IN_PROGRESS, SUBMITTED, or EXPIRED.
   * EXPIRED is set by the server if now > deadlineAt.
   */
  status: SessionStatus;

  /** * JSON field containing the student's current answers.
   * Format: { "questionId": "answerValue" }
   */
  currentAnswers: any;

  /** Total score calculated after submission (for auto-graded questions) */
  score?: number;

  /** Metadata like IP address or Device ID for basic proctoring/cheating detection */
  deviceId?: string;

  constructor(partial: Partial<ExamSession>) {
    Object.assign(this, partial);
  }
}