import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  Patch,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  /**
   * Add a single question to an exam
   */
  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  /**
   * BULK IMPORT: Upload many questions at once
   * Useful for importing from Excel or JSON
   */
  @Post('bulk/:examId')
  bulkCreate(
    @Param('examId') examId: string, 
    @Body() questions: CreateQuestionDto[]
  ) {
    return this.questionsService.createMany(examId, questions);
  }

  /**
   * Get all questions for a specific exam
   */
  @Get('exam/:examId')
  findAllByExam(@Param('examId') examId: string) {
    return this.questionsService.findAllByExam(examId);
  }

  /**
   * Update question text or correct answer
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.questionsService.update(id, updateData);
  }

  /**
   * Remove a question (and its media reference)
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(id);
  }
}