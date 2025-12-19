// src/blogs/blogs.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BulkCreateBlogDto, BulkUploadResult } from './dto/bulk-create-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  /**
   * Create a single blog
   * POST /blogs
   */
  @Post()
  async create(@Body() createBlogDto: CreateBlogDto) {
    try {
      return await this.blogsService.create(createBlogDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Get all blogs
   * GET /blogs
   */
  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  /**
   * Get a single blog by ID
   * GET /blogs/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(id);
  }

  /**
   * Get a single blog by slug
   * GET /blogs/slug/:slug
   */
  @Get('/slug/:slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.blogsService.findOneBySlug(slug);
  }

  /**
   * Update a blog
   * PATCH /blogs/:id
   */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    try {
      return await this.blogsService.update(id, updateBlogDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Delete a blog
   * DELETE /blogs/:id
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.blogsService.remove(id);
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Bulk upload blogs endpoint
   * POST /blogs/bulk
   * 
   * Strategy: Individual processing (continues on error, skips duplicates)
   * Best for: Large datasets where you want partial success
   * 
   * Request body:
   * {
   *   "blogs": [
   *     {
   *       "title": "Blog 1",
   *       "content": "Content...",
   *       "slug": "blog-1",
   *       "author": "Author Name",
   *       "tag": "category",
   *       "newsType": 1,
   *       ...
   *     }
   *   ]
   * }
   * 
   * Response:
   * {
   *   "totalProcessed": 10,
   *   "successCount": 8,
   *   "failureCount": 2,
   *   "results": [...],
   *   "summary": {
   *     "processedAt": "2025-01-10T...",
   *     "duration": 1234
   *   }
   * }
   */
  @Post('bulk')
  async bulkCreate(
    @Body() body: BulkCreateBlogDto | CreateBlogDto[],
  ): Promise<BulkUploadResult> {
    try {
      // Handle both formats: { blogs: [...] } or [...]
      const blogsArray = Array.isArray(body) 
        ? body 
        : (body as BulkCreateBlogDto).blogs;
      
      if (!blogsArray || blogsArray.length === 0) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'No blogs provided. Expected { blogs: [...] } or [...]',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.blogsService.bulkCreate(blogsArray);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Bulk upload with transaction support
   * POST /blogs/bulk-transaction
   * 
   * Strategy: All-or-nothing (rolls back on any error)
   * Best for: Critical data where consistency is paramount
   */
  @Post('bulk-transaction')
  async bulkCreateWithTransaction(
    @Body() body: BulkCreateBlogDto | CreateBlogDto[],
  ): Promise<BulkUploadResult> {
    try {
      const blogsArray = Array.isArray(body) 
        ? body 
        : (body as BulkCreateBlogDto).blogs;
      
      if (!blogsArray || blogsArray.length === 0) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'No blogs provided',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.blogsService.bulkCreateWithTransaction(blogsArray);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Bulk upsert blogs endpoint
   * POST /blogs/bulk-upsert
   * 
   * Strategy: Insert or update (creates new or updates existing based on slug)
   * Best for: Syncing data or updating existing content
   */
  @Post('bulk-upsert')
  async bulkUpsert(
    @Body() body: BulkCreateBlogDto | CreateBlogDto[],
  ): Promise<BulkUploadResult> {
    try {
      const blogsArray = Array.isArray(body) 
        ? body 
        : (body as BulkCreateBlogDto).blogs;
      
      if (!blogsArray || blogsArray.length === 0) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'No blogs provided',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.blogsService.bulkUpsert(blogsArray);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}