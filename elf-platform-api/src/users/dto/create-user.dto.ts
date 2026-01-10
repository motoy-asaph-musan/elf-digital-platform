import { Role } from '@prisma/client';

export class CreateUserDto {
  email: string;
  password?: string; // Optional for students if school registers them
  name: string;
  role: Role;        // ADMIN, SCHOOL, TEACHER, STUDENT
  schoolId?: string; // Foreign key if the user is a student or teacher
  grade?: string;    // e.g., "P7", "S4", "S6"
}