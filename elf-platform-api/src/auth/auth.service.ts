import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  /**
   * Register a new user
   * This fixes the 'Property register does not exist' error in your controller
   */
  async register(dto: any) {
    // 1. Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('A user with this email already exists.');
    }

    // 2. Hash the password before saving
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 3. Create the user in the database
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
        phone: dto.phone,
        role: dto.role || 'STUDENT',
        // If they provided a schoolId, link it here
        schoolId: dto.schoolId || null,
      },
    });

    return {
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  /**
   * Login logic for Standard and Superuser access
   */
  async login(dto: any) {
    // 1. Find user by email or phone (identifier)
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: dto.identifier },
          { phone: dto.identifier }
        ]
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 2. Compare passwords using bcrypt
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. Return the payload your frontend Login.tsx and App.tsx expect
    return {
      access_token: 'mock_jwt_token_' + user.id, // Using mock token for now
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  /**
   * Validate school codes for registration
   */
  async validateSchoolCode(schoolCode: string) {
    const school = await this.prisma.school.findUnique({
      where: { schoolCode: schoolCode },
    });

    if (!school || !school.isRegistered) {
      throw new UnauthorizedException('Invalid or inactive school code.');
    }
    return school;
  }

  // Social Login Placeholders
  async googleLogin(token: string) { 
    return { access_token: 'google_mock_token', user: { role: 'STUDENT' } }; 
  }
  
  async facebookLogin(token: string) { 
    return { access_token: 'fb_mock_token', user: { role: 'STUDENT' } }; 
  }

  // Password Reset Placeholders
  async forgotPassword(email: string) {
    return { message: "If that email exists, a reset link has been sent." };
  }

  async resetPassword(resetDto: any) {
    return { message: "Password has been successfully updated." };
  }
}