import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { MinioModule } from '../minio/minio.module'; // Ensure correct import path
import { MinioService } from '../minio/minio.service'; // Explicitly import MinioService

@Module({
  imports: [MinioModule],
  controllers: [UploadController],
  providers: [UploadService, MinioService], // Explicitly add MinioService
  exports: [UploadService],
})
export class UploadModule {}
