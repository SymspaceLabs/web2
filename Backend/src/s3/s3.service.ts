import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  private s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  async uploadFile(filename: string, file: Express.Multer.File) {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: filename,
      Body: file.buffer, // Use the file's buffer
      ContentType: file.mimetype,
    });

    try {
      await this.s3.send(command);
      const fileUrl = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;
      return { url: fileUrl, key: filename };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
}