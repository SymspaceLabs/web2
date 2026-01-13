import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as sharp from 'sharp';
import * as path from 'path';
import { diskStorage } from 'multer';

@Injectable()
export class UploadService {
  private readonly uploadPath = '/var/www/images/uploads';

  constructor() {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  // =========================
  // 📦 Multer config (disk)
  // =========================
  getMulterConfig() {
    return {
      storage: diskStorage({
        destination: (_req, _file, cb) => cb(null, this.uploadPath),
        filename: (_req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${path.extname(
              file.originalname,
            )}`,
          );
        },
      }),
    };
  }

  // =========================
  // 🔍 Image format detection
  // =========================
  async detectImageFormat(
    filePath: string,
  ): Promise<'jpeg' | 'webp' | 'png'> {
    const buffer = Buffer.alloc(12);
    const fd = fs.openSync(filePath, 'r');
    fs.readSync(fd, buffer, 0, 12, 0);
    fs.closeSync(fd);

    if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff)
      return 'jpeg';

    if (
      buffer.toString('ascii', 0, 4) === 'RIFF' &&
      buffer.toString('ascii', 8, 12) === 'WEBP'
    )
      return 'webp';

    if (buffer[0] === 0x89 && buffer.toString('ascii', 1, 4) === 'PNG')
      return 'png';

    throw new BadRequestException('Unsupported image format');
  }

  // =========================
  // 🔄 Normalize → Pure JPEG
  // =========================
  async ensureJpegFormat(file: Express.Multer.File): Promise<string> {
    if (!file.path) {
      throw new BadRequestException('File path is missing');
    }

    const actualFormat = await this.detectImageFormat(file.path);

    // Already a valid JPEG
    if (actualFormat === 'jpeg') {
      return file.path;
    }

    // Convert WebP / PNG → JPEG
    const jpegPath = `${file.path}.jpg`;

    await sharp(file.path)
      .jpeg({
        quality: 90,
        mozjpeg: true,
        chromaSubsampling: '4:4:4',
      })
      .toFile(jpegPath);

    return jpegPath;
  }

  // =========================
  // 🧹 Cleanup helper
  // =========================
  safeDelete(filePath?: string) {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}
