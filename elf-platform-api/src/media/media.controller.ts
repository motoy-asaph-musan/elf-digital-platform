import { 
  Controller, 
  Post, 
  UseInterceptors, 
  UploadedFile, 
  ParseFilePipe, 
  MaxFileSizeValidator, 
  FileTypeValidator,
  Body
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  /**
   * Upload an Image or Video for Exams/Seminars
   * Constraints: 
   * - Max size: 50MB (for videos)
   * - Types: jpg, png, mp4
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 }), // 50MB
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|mp4)' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body('folder') folder: string = 'general'
  ) {
    // This calls the service to upload to Cloudinary/S3
    return this.mediaService.uploadToCloud(file, folder);
  }
}