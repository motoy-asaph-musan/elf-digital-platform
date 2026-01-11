import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  /**
   * ADMIN ONLY: Create a new national contest exam
   */
  @Post()
  create(@Body() createExamDto: CreateExamDto) {
    return this.examsService.create(createExamDto);
  }

  /**
   * ALL USER: Get list of available exams
   * Filtered by status (Active/Upcoming) on the service layer
   */
  @Get()
  findAll() {
    return this.examsService.findAll();
  }

  /**
   * STUDENT: Get specific exam details before starting
   * This won't include the questions yet—only metadata
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examsService.findOne(id);
  }

  /**
   * STUDENT: The specialized "Start Exam" endpoint
   * This triggers the server-side timer we discussed
   */
  @Post(':id/start')
  startExam(@Param('id') id: string, @Body('studentId') studentId: string) {
    return this.examsService.startExam(id, studentId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto) {
    return this.examsService.update(id, updateExamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examsService.remove(id);
  }
}