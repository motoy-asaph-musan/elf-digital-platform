import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(data: {
    email: string;
    name?: string;
    password: string;
    role: string;
  }) {
    return this.prisma.users.create({ data });
  }

  findAll() {
    return this.prisma.users.findMany();
  }
}
