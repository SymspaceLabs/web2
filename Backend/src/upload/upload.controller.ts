import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from '../minio/minio.service';
import * as sharp from 'sharp';

@Controller('upload')
export class UploadController {
  constructor(private readonly minioService: MinioService) {}

  private isPng(buffer: Buffer): boolean {
    return (
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 && // P
      buffer[2] === 0x4e && // N
      buffer[3] === 0x47    // G
    );
  }

  // =========================
  // 🔍 Format detection helpers
  // =========================

  private isWebP(buffer: Buffer): boolean {
    return (
      buffer.slice(0, 4).toString('ascii') === 'RIFF' &&
      buffer.slice(8, 12).toString('ascii') === 'WEBP'
    );
  }

  private isJpeg(buffer: Buffer): boolean {
    return (
      buffer.length > 3 &&
      buffer[0] === 0xff &&
      buffer[1] === 0xd8 &&
      buffer[2] === 0xff
    );
  }

  // =========================
  // 🔄 Conversion helper
  // =========================

  private async convertWebPToJpeg(buffer: Buffer): Promise<Buffer> {
    return (sharp as any)(buffer) // ✅ wrap as any
      .jpeg({
        quality: 90,
        mozjpeg: true,
        chromaSubsampling: '4:4:4',
      })
      .toBuffer();
  }

  // =========================
  // 📤 Upload endpoint
  // =========================

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    let finalBuffer = file.buffer;
    let finalMime = file.mimetype;
    let finalName = file.originalname;
    let detectedFormat = 'unknown';

    // 🔍 1. Check for WebP Header (The "Scrutiny" Phase)
    // If it has a RIFF/WEBP header, we convert it to JPEG even if the user named it .jpg or .png
    if (this.isWebP(file.buffer)) {
      detectedFormat = 'webp';

      // 🔄 Convert WebP → JPEG
      finalBuffer = await this.convertWebPToJpeg(file.buffer);
      finalMime = 'image/jpeg';
      finalName = finalName.replace(/\.(jpg|jpeg|webp|png)$/i, '.jpg');
    } 
    
    // 🔍 2. Check for legitimate JPEG
    else if (this.isJpeg(file.buffer)) {
      detectedFormat = 'jpeg';
      finalMime = 'image/jpeg';
    }

    // 🔍 3. Check for legitimate PNG (Accept and keep as PNG)
    else if (this.isPng(file.buffer)) {
      detectedFormat = 'png';
      finalMime = 'image/png';
      // No conversion needed, keep finalBuffer as is
    }
    
    // ❌ 4. Reject everything else
    else {
      throw new BadRequestException(
        'Unsupported or invalid image format. Only JPEG and WebP are allowed.',
      );
    }

    // 🧱 Rebuild Multer file object
    const normalizedFile: Express.Multer.File = {
      ...file,
      buffer: finalBuffer,
      size: finalBuffer.length,
      mimetype: finalMime,
      originalname: finalName,
    };

    // ☁ Upload to MinIO
    const fileUrl = await this.minioService.uploadFile(normalizedFile);

    return {
      message: 'File processed successfully',
      detectedFormat,
      finalFormat: detectedFormat === 'webp' ? 'jpeg' : detectedFormat,
      url: fileUrl,
    };
  }
}
