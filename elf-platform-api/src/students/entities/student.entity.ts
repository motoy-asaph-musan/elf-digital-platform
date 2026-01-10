import { User } from '../../users/entities/user.entity';

export class Student {
  id: string;
  
  /** Reference to the base User account */
  userId: string;
  user?: User;

  /** Reference to the School they belong to */
  schoolId: string;

  /** Academic Level: e.g., "P7", "S4", "S6" */
  grade: string;

  /** Unique Index/Reg Number for the ELF Contest */
  indexNumber: string;

  /** Total points accumulated across all ELF contests */
  totalPoints: number;

  /** Whether the student is currently eligible for the next contest round */
  isEligible: boolean;

  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Student>) {
    Object.assign(this, partial);
  }
}