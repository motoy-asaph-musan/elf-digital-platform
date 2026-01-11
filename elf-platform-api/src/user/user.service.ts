import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client'; // Import this!

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.user.create({
      data: {
        ...data,
        role: data.role as Role, // Force the string into the Role enum type
      },
    });
  }
  
  // Add these missing methods to clear controller errors:
  async findOne(id: string) { return this.prisma.user.findUnique({ where: { id } }); }
  async update(id: string, data: any) { return this.prisma.user.update({ where: { id }, data }); }
  async remove(id: string) { return this.prisma.user.delete({ where: { id } }); }
  async findAll(role?: string) {
    return this.prisma.user.findMany({
      where: role ? { role: role as any } : {},
    });
  }
}