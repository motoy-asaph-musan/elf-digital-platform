import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(dto: any) {
    const { name, email, phone, password, role, schoolCode } = dto;

    // 1. Check if user already exists
    const existingUser = await this.prisma.user.findFirst({
      where: { OR: [{ email }, { phone }] },
    });
    if (existingUser) {
      throw new BadRequestException('User with this email or phone already exists.');
    }

    // 2. If Teacher, validate the School Registration Code
    let schoolId = null;
    if (role === 'TEACHER') {
      if (!schoolCode) {
        throw new BadRequestException('School Registration Code is required for Teachers.');
      }

      const school = await this.prisma.school.findUnique({
        where: { registrationCode: schoolCode },
      });

      if (!school || !school.isRegistered) {
        throw new BadRequestException('Invalid or inactive School Registration Code. Please contact ELF Admin.');
      }
      schoolId = school.id;
    }

    // 3. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create User
    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role,
        schoolId, // Links the teacher to their school
      },
    });

    return {
      message: 'Registration successful',
      userId: newUser.id,
    };
  }
}