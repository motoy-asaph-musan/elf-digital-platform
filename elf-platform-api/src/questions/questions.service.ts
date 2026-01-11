import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import 'multer'; // Add this to help TS find the types

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  // Standardize these names to match the controller calls
  async create(data: any) {
    return this.prisma.question.create({ data });
  }

  async createMany(examId: string, questions: any[]) {
    const data = questions.map(q => ({ ...q, examId }));
    return this.prisma.question.createMany({ data });
  }

  async findAllByExam(examId: string) {
    return this.prisma.question.findMany({ where: { examId } });
  }

  async update(id: string, data: any) {
    return this.prisma.question.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.question.delete({ where: { id } });
  }
}