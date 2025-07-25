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

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: any) {
    try {
      const filename = `${Date.now()}-${file.originalname}`;
      const fileUrl = await this.minioService.uploadFile(filename, file);

      return { message: 'File uploaded successfully', url: fileUrl };
    } catch (error) {
      return { message: 'File upload failed', error };
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const convertedFile = await this.uploadService.convertToGltf(file.filename);
    return { message: 'File uploaded and converted successfully', url: convertedFile };
  }

}
