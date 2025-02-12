import { Injectable } from '@nestjs/common';
import * as multer from 'multer';
import * as fs from 'fs';
import { exec } from 'child_process';

@Injectable()
export class UploadService {
  private uploadPath = '/var/www/3dmodels/uploads';
  private convertedPath = '/var/www/3dmodels/converted';

  constructor() {
    if (!fs.existsSync(this.uploadPath)) fs.mkdirSync(this.uploadPath, { recursive: true });
    if (!fs.existsSync(this.convertedPath)) fs.mkdirSync(this.convertedPath, { recursive: true });
  }

  getMulterConfig() {
    return multer({ dest: this.uploadPath });
  }

  async convertToGltf(filename: string): Promise<string> {
    const inputPath = `${this.uploadPath}/${filename}`;
    const outputPath = `${this.convertedPath}/${filename}.gltf`;

    return new Promise((resolve, reject) => {
      exec(`assimp export ${inputPath} ${outputPath}`, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(outputPath);
        }
      });
    });
  }
}
