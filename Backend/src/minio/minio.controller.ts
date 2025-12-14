// src/minio/minio.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from './minio.service';

@Controller('media')
export class MinioController {
  constructor(private readonly minioService: MinioService) {}

  /**
   * Upload a file to MinIO
   * Returns objectName (NOT a public URL)
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const result = await this.minioService.uploadFile(file);

    return {
      success: true,
      objectName: result.objectName,
    };
  }

  /**
   * Get a signed URL for a file
   * URL is time-limited and secure
   */
  @Get(':objectName')
  async getSignedFileUrl(@Param('objectName') objectName: string) {
    if (!objectName) {
      throw new BadRequestException('Object name is required');
    }

    const url = await this.minioService.getSignedUrl(objectName);

    return {
      success: true,
      url,
    };
  }
}
