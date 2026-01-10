import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Injectable()
export class ExamsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a new exam in the database
   */
  async create(createExamDto: CreateExamDto) {
    return this.prisma.exam.create({
      data: createExamDto,
    });
  }

  /**
   * Returns all exams, potentially filtered by category (O-Level, etc.)
   */
  async findAll() {
    return this.prisma.exam.findMany({
      orderBy: { startTime: 'asc' },
    });
  }

  /**
   * Finds a single exam by ID
   */
  async findOne(id: string) {
    const exam = await this.prisma.exam.findUnique({
      where: { id },
      include: { questions: true }, // Include questions for the admin/engine
    });

    if (!exam) throw new NotFoundException(`Exam with ID ${id} not found`);
    return exam;
  }

  /**
   * THE EXAM ENGINE CORE: Start an exam for a student
   * This logic locks the "Deadline" on the server.
   */
  async startExam(examId: string, studentId: string) {
    const exam = await this.findOne(examId);

    // 1. Check if the exam window is actually open
    const now = new Date();
    if (now < exam.startTime || now > exam.endTime) {
      throw new BadRequestException('This exam is not currently available.');
    }

    // 2. Check if the student has already started/finished
    const existingSubmission = await this.prisma.submission.findFirst({
      where: { examId, studentId },
    });

    if (existingSubmission) {
      return existingSubmission; // Return existing progress if they refreshed the page
    }

    // 3. Calculate the hard deadline
    const deadlineAt = new Date(now.getTime() + exam.durationMinutes * 60000);

    // 4. Create the submission record (The "Point of No Return")
    return this.prisma.submission.create({
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