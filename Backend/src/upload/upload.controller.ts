import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from '../minio/minio.service';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly minioService: MinioService,
    private readonly uploadService: UploadService,
  ) {}

  // Upload a file to MinIO and return signed URL
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const fileUrl = await this.minioService.uploadFile(file);

    return {
      message: 'File uploaded successfully',
      url: fileUrl,
    };
  }

}
