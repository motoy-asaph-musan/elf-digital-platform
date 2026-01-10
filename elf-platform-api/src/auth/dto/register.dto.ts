import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional, Length, Matches } from 'class-validator';

export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
}

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsOptional() // Optional because many Ugandan students may prefer Phone only
  email?: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{10}$/, { message: 'Phone number must be exactly 10 digits (e.g., 07XXXXXXXX)' })
  phone: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

  @IsOptional()
  @IsString()
  @Length(6, 6, { message: 'School Registration Code must be exactly 6 characters' })
  schoolCode?: string;
}