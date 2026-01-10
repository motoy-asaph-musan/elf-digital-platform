export class Answer {
  id: string;

  /** The ID of the session this answer belongs to */
  sessionId: string;

  /** The ID of the question being answered */
  questionId: string;

  /** * The student's input. 
   * For MCQ: This is the selected option string.
   * For Essay: This is the full text of the student's response.
   */
  value: string;

  /** * Calculated score for this specific answer. 
   * Automatically set for MCQ/True-False, manually set by teachers for Essays.
   */
  pointsEarned: number;

  /** * Flag to indicate if a teacher has reviewed this answer 
   * (Crucial for the ELF Essay/Short Answer questions) 
   */
  isGraded: boolean;

  /** Optional feedback from the marker/teacher */
  teacherComment?: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Answer>) {
    Object.assign(this, partial);
  }
}