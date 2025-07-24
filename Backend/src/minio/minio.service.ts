// src/minio/minio.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'minio';
import { Readable } from 'stream';

@Injectable()
export class MinioService {
  private readonly minioClient: Client;
  private readonly bucketName = 'images';

  constructor(private readonly configService: ConfigService) {
    // Configure MinIO client to connect to the internal endpoint (where MinIO server listens)
    this.minioClient = new Client({
      endPoint: this.configService.get<string>('MINIO_INTERNAL_ENDPOINT'), // Use the internal IP
      port: +this.configService.get<number>('MINIO_INTERNAL_PORT'),     // Use the internal port
      useSSL: false, // Nginx is doing SSL termination, so internal connection can be HTTP
      accessKey: this.configService.get<string>('MINIO_ACCESS_KEY'),
      secretKey: this.configService.get<string>('MINIO_SECRET_KEY'),
    });
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

    try {
      await this.minioClient.setBucketPolicy(this.bucketName, JSON.stringify(policy));
      console.log(`Bucket policy set for bucket: ${this.bucketName}`);
    } catch (error) {
      console.error(`Failed to set bucket policy for ${this.bucketName}:`, error);
      // Depending on your error handling strategy, you might re-throw or handle
    }
  }

  async uploadFile(filename: string, file: any): Promise<string> {
    const fileStream = Readable.from(file.buffer);

    // Ensure the bucket exists
    const bucketExists = await this.minioClient.bucketExists(this.bucketName);
    if (!bucketExists) {
      await this.minioClient.makeBucket(this.bucketName, 'us-east-1'); // Or your preferred region
      await this.setBucketPolicy(); // Set policy after bucket creation
    }

    // Define metadata with Content-Type
    const metaData = {
      'Content-Type': file.mimetype, // This will use the MIME type from the uploaded file
    };

    // Upload the file with metadata
    await this.minioClient.putObject(this.bucketName, filename, fileStream, file.size, metaData);

    // Construct the public URL using the public endpoint and SSL setting
    const protocol = this.configService.get<boolean>('MINIO_USE_SSL') ? 'https' : 'http';
    const publicEndpoint = this.configService.get<string>('MINIO_PUBLIC_ENDPOINT');
    
    // The public URL should NOT include the port (Nginx handles that)
    const fileUrl = `${protocol}://${publicEndpoint}/${this.bucketName}/${filename}`;

    return fileUrl;
  }
}