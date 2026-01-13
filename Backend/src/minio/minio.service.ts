// src/minio/minio.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'minio';
import { Readable } from 'stream';
import * as mime from 'mime-types';

@Injectable()
export class MinioService {
  private readonly minioClient: Client;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.bucketName = this.configService.get<string>('MINIO_BUCKET');

    this.minioClient = new Client({
      endPoint: this.configService.get<string>('MINIO_INTERNAL_ENDPOINT'),
      port: Number(this.configService.get<number>('MINIO_INTERNAL_PORT')),
      useSSL: false,
      accessKey: this.configService.get<string>('MINIO_ACCESS_KEY'),
      secretKey: this.configService.get<string>('MINIO_SECRET_KEY'),
    });
  }

  private async ensureBucketExists() {
    const exists = await this.minioClient.bucketExists(this.bucketName);
    if (!exists) {
      await this.minioClient.makeBucket(this.bucketName, 'us-east-1');
    }
  }

  async uploadFile(file: Express.Multer.File) {
    await this.ensureBucketExists();
    await this.setBucketPolicy();

    const extension = mime.extension(file.mimetype);
    if (!extension) {
      throw new Error(`Unsupported mime type: ${file.mimetype}`);
    }

    const safeName = file.originalname
      .replace(/\.[^/.]+$/, '')
      .trim()
      .replace(/\s+/g, '-');

    const objectName = `${Date.now()}-${safeName}.${extension}`;
    const stream = Readable.from(file.buffer);

    await this.minioClient.putObject(
      this.bucketName,
      objectName,
      stream,
      file.size,
      {
        'Content-Type': file.mimetype,
      },
    );

    const publicBaseUrl = this.configService.get<string>('MINIO_PUBLIC_BASE_URL');
    return `${publicBaseUrl}/${this.bucketName}/${objectName}`;
  }

  async getSignedUrl(objectName: string, expirySeconds = 3600) {
    const internalUrl = await this.minioClient.presignedGetObject(
      this.bucketName,
      objectName,
      expirySeconds,
    );

    const publicBaseUrl = this.configService.get<string>(
      'MINIO_PUBLIC_BASE_URL',
    );

    return internalUrl.replace(
      `http://${this.configService.get<string>('MINIO_INTERNAL_ENDPOINT')}:${this.configService.get<number>('MINIO_INTERNAL_PORT')}`,
      publicBaseUrl,
    );
  }

  async setBucketPolicy() {
    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: '*',
          Action: ['s3:GetObject'],
          Resource: [`arn:aws:s3:::${this.bucketName}/*`],
        },
      ],
    };

    await this.minioClient.setBucketPolicy(this.bucketName, JSON.stringify(policy));
  }
}