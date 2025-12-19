// src/blogs/dto/bulk-create-blog.dto.ts
import { IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateBlogDto } from './create-blog.dto';

export class BulkCreateBlogDto {
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one blog is required' })
  @ValidateNested({ each: true })
  @Type(() => CreateBlogDto)
  blogs: CreateBlogDto[];
}

export interface BulkUploadResult {
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  results: Array<{
    index: number;
    title: string;
    slug: string;
    status: 'success' | 'failed' | 'skipped';
    blogId?: string;
    error?: string;
  }>;
  summary: {
    processedAt: Date;
    duration: number;
  };
}