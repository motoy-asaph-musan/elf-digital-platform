import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Injectable()
export class ExamsService {
  constructor(private prisma: PrismaService) {}

  async create(createExamDto: CreateExamDto) {
    return this.prisma.exam.create({
      data: createExamDto,
    });
  }

  async findAll() {
    return this.prisma.exam.findMany({
      orderBy: { startTime: 'asc' },
    });
  }

  async findOne(id: string) {
    const exam = await this.prisma.exam.findUnique({
      where: { id },
      include: { questions: true },
    });

    if (!exam) throw new NotFoundException(`Exam with ID ${id} not found`);
    return exam;
  }

  /**
   * THE EXAM ENGINE CORE: Start an exam for a student
   * UPDATED: Using 'examSession' instead of 'submission'
   */
  async startExam(examId: string, studentId: string) {
    const exam = await this.findOne(examId);

    const now = new Date();
    if (now < exam.startTime || now > exam.endTime) {
      throw new BadRequestException('This exam is not currently available.');
    }

    // Fix: Using examSession instead of submission
    const existingSession = await this.prisma.examSession.findFirst({
      where: { examId, studentId },
    });

    if (existingSession) {
      return existingSession; 
    }

    const deadlineAt = new Date(now.getTime() + exam.durationMinutes * 60000);

    // Fix: Using examSession instead of submission
    return this.prisma.examSession.create({
      data: {
        examId,
        studentId,
        startedAt: now,
        deadlineAt: deadlineAt,
        status: 'IN_PROGRESS',
      },
    });
  }

  async update(id: string, updateExamDto: UpdateExamDto) {
    return this.prisma.exam.update({
      where: { id },
      data: updateExamDto,
    });
  }

  async remove(id: string) {
    return this.prisma.exam.delete({
      where: { id },
    });
  }
}