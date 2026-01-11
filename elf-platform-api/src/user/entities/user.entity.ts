import { Role } from '@prisma/client';

export class User {
  id: string;
  email: string;
  name?: string;
  password?: string;
  role: Role; // Using the Prisma Enum type
  schoolId?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}