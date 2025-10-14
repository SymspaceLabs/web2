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

  /**
   * Cleans up a filename to be URL-safe (lowercase, replace spaces, remove special chars).
   * @param filename The original filename (e.g., "My Sofa Model.fbx").
   * @returns A sanitized filename (e.g., "my-sofa-model.fbx").
   */
  private sanitizeFilename(filename: string): string {
    // 1. Convert to lowercase
    let sanitized = filename.toLowerCase();

    // 2. Replace spaces, underscores, and dots (before the extension) with a hyphen
    // and remove multiple hyphens that may result
    sanitized = sanitized.replace(/[\s\_\-]+/g, '-');
    
    // 3. Remove most special characters except letters, numbers, hyphens, and the final dot/extension
    // This is a more robust approach to general URL-safe naming.
    sanitized = sanitized.replace(/[^a-z0-9\.\-]+/g, ''); 
    
    // 4. Ensure there's only one dot separating the name and extension
    // This splits the extension, sanitizes the name, and rejoins.
    const parts = sanitized.split('.');
    if (parts.length > 1) {
        const extension = parts.pop();
        const name = parts.join('-'); // Rejoin name parts with hyphens
        sanitized = name + '.' + extension;
    }
    
    return sanitized;
  }

  async uploadFile(originalFilename: string, file: Express.Multer.File) {
    
    const s3Key = this.sanitizeFilename(originalFilename);

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: s3Key,
      Body: file.buffer, // Use the file's buffer
      ContentType: file.mimetype,
    });

    try {
      await this.s3.send(command);
      const fileUrl = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;
      return { url: fileUrl, key: s3Key };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
}