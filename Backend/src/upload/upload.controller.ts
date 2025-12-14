import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from '../minio/minio.service';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly minioService: MinioService,
    private readonly uploadService: UploadService,
  ) {}

  /**
   * Upload a file to MinIO and return signed URL
   */
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) return { message: 'No file provided' };

    const publicUrl = await this.minioService.uploadFile(file);

    return {
      message: 'File uploaded successfully',
      url: publicUrl,
    };
  }


  /**
   * Upload file and convert to glTF (existing flow)
   */
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { message: 'No file provided' };
    }

    const convertedFile = await this.uploadService.convertToGltf(file.filename);

    return {
      message: 'File uploaded and converted successfully',
      url: convertedFile,
    };
  }
}
