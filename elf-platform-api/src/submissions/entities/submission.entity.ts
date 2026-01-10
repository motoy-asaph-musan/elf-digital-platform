export enum SubmissionStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  SUBMITTED = 'SUBMITTED',
  EXPIRED = 'EXPIRED', // Triggered by the Server-Authoritative Engine
}

export class Submission {
  id: string;
  examId: string;
  studentId: string;
  
  /** The exact moment the student clicked "Start" */
  startedAt: Date;

  /** * The timestamp the server enforces for submission 
   * Formula: startedAt + Exam.durationMinutes
   */
  deadlineAt: Date;

  /** When the student actually clicked "Finish" (if they beat the clock) */
  submittedAt?: Date;

  status: SubmissionStatus;

  /** JSON object containing the student's answers */
  answers: any; 
}