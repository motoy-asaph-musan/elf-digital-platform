import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
const toStream = require('buffer-to-stream');

@Injectable()
export class MediaService {
  constructor() {
    // These should be in your .env file
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  /**
   * Uploads a file buffer to Cloudinary
   * @param file The uploaded file from Multer
   * @param folder The target folder (e.g., 'exams', 'avatars', 'seminars')
   */
  async uploadToCloud(
    file: Express.Multer.File,
    folder: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder: `elf-platform/${folder}`,
          resource_type: 'auto', // Automatically detects if it's an image or video
        },
        (error, result) => {
          if (error) return reject(new BadRequestException(error.message));
          resolve(result);
        },
      );

      // Convert buffer to stream and pipe to Cloudinary
      toStream(file.buffer).pipe(upload);
    });
  }

  /**
   * Delete a file from Cloudinary (useful if an exam question is deleted)
   */
  async deleteFile(publicId: string) {
    return await cloudinary.uploader.destroy(publicId);
  }
}