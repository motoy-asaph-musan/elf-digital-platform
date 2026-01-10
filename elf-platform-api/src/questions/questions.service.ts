import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async createQuestion(examId: string, data: any, mediaFile?: Express.Multer.File) {
    let mediaUrl = null;
    
    // If an image/video was uploaded via the MediaController, 
    // we would have the URL here to save to the DB.
    if (data.mediaUrl) {
      mediaUrl = data.mediaUrl;
    }

    return this.prisma.question.create({
      data: {
        ...data,
        examId,
        mediaUrl,
      },
    });
  }
}