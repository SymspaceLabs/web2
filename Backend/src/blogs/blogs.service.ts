// src/blogs/blogs.service.ts
import {
  Injectable,
  ConflictException,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { BulkUploadResult } from './dto/bulk-create-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Create a single blog
   */
  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const existingBlog = await this.blogRepository.findOne({
      where: { slug: createBlogDto.slug },
    });
    if (existingBlog) {
      throw new ConflictException('Slug must be unique');
    }

    const blog = this.blogRepository.create(createBlogDto);
    return this.blogRepository.save(blog);
  }

  /**
   * Get all blogs
   */
  findAll(): Promise<Blog[]> {
    return this.blogRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  /**
   * Get a single blog by ID
   */
  async findOne(id: string): Promise<Blog> {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }

  /**
   * Get a single blog by slug
   */
  async findOneBySlug(slug: string): Promise<Blog> {
    const blog = await this.blogRepository.findOne({ where: { slug } });
    if (!blog) {
      throw new NotFoundException(`Blog with slug ${slug} not found`);
    }
    return blog;
  }

  /**
   * Update a blog
   */
  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    // Check if slug is being updated and if it's unique
    if (updateBlogDto.slug) {
      const existingBlog = await this.blogRepository.findOne({
        where: { slug: updateBlogDto.slug },
      });
      if (existingBlog && existingBlog.id !== id) {
        throw new ConflictException('Slug must be unique');
      }
    }

    const blog = await this.findOne(id);
    Object.assign(blog, updateBlogDto);
    return this.blogRepository.save(blog);
  }

  /**
   * Delete a blog
   */
  async remove(id: string) {
    const result = await this.blogRepository.delete(id);

    if (result.affected === 0) {
      throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
    }
    
    return { 
      status: 'success', 
      message: `Blog with id ${id} deleted.` 
    };
  }

  /**
   * Bulk create blogs with detailed error handling
   * Uses individual processing - continues on error
   * Returns detailed results for each blog
   * 
   * @param createBlogDtos - Array of blog DTOs to create
   * @returns BulkUploadResult with detailed results
   */
  async bulkCreate(createBlogDtos: CreateBlogDto[]): Promise<BulkUploadResult> {
    const startTime = Date.now();
    const results: BulkUploadResult['results'] = [];
    let successCount = 0;
    let failureCount = 0;

    console.log(`📦 Starting bulk upload of ${createBlogDtos.length} blogs...`);

    // Process each blog individually with error handling
    for (let i = 0; i < createBlogDtos.length; i++) {
      const blogDto = createBlogDtos[i];
      const index = i + 1;

      try {
        // Check for duplicate slug
        const existingBlog = await this.blogRepository.findOne({
          where: { slug: blogDto.slug },
        });

        if (existingBlog) {
          console.log(`⚠️  [${index}] Skipped: ${blogDto.title} (slug already exists)`);
          results.push({
            index,
            title: blogDto.title,
            slug: blogDto.slug,
            status: 'skipped',
            error: 'Blog with this slug already exists',
          });
          failureCount++;
          continue;
        }

        // Create and save the blog
        const blog = this.blogRepository.create(blogDto);
        const savedBlog = await this.blogRepository.save(blog);

        console.log(`✅ [${index}] Success: ${savedBlog.title}`);
        results.push({
          index,
          title: savedBlog.title,
          slug: savedBlog.slug,
          status: 'success',
          blogId: savedBlog.id,
        });
        successCount++;
      } catch (error) {
        console.error(`❌ [${index}] Failed: ${blogDto.title}`, error.message);
        results.push({
          index,
          title: blogDto.title,
          slug: blogDto.slug,
          status: 'failed',
          error: error.message || 'Unknown error occurred',
        });
        failureCount++;
      }
    }

    const duration = Date.now() - startTime;
    console.log(`\n📊 Bulk upload completed in ${duration}ms`);
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Failed: ${failureCount}`);

    return {
      totalProcessed: createBlogDtos.length,
      successCount,
      failureCount,
      results,
      summary: {
        processedAt: new Date(),
        duration,
      },
    };
  }

  /**
   * Bulk create with transaction support (all-or-nothing approach)
   * Use this if you want to ensure either all blogs are created or none
   * 
   * @param createBlogDtos - Array of blog DTOs to create
   * @returns BulkUploadResult with detailed results
   */
  async bulkCreateWithTransaction(
    createBlogDtos: CreateBlogDto[],
  ): Promise<BulkUploadResult> {
    const startTime = Date.now();
    const results: BulkUploadResult['results'] = [];
    let successCount = 0;
    let failureCount = 0;

    console.log(`📦 Starting transactional bulk upload of ${createBlogDtos.length} blogs...`);

    // Start a transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Validate all slugs first
      const slugs = createBlogDtos.map((dto) => dto.slug);
      const existingBlogs = await queryRunner.manager.find(Blog, {
        where: slugs.map((slug) => ({ slug })),
      });

      const existingSlugs = new Set(existingBlogs.map((blog) => blog.slug));

      // Process each blog
      for (let i = 0; i < createBlogDtos.length; i++) {
        const blogDto = createBlogDtos[i];
        const index = i + 1;

        if (existingSlugs.has(blogDto.slug)) {
          console.log(`⚠️  [${index}] Skipped: ${blogDto.title} (slug already exists)`);
          results.push({
            index,
            title: blogDto.title,
            slug: blogDto.slug,
            status: 'skipped',
            error: 'Blog with this slug already exists',
          });
          failureCount++;
          continue;
        }

        const blog = queryRunner.manager.create(Blog, blogDto);
        const savedBlog = await queryRunner.manager.save(blog);

        console.log(`✅ [${index}] Success: ${savedBlog.title}`);
        results.push({
          index,
          title: savedBlog.title,
          slug: savedBlog.slug,
          status: 'success',
          blogId: savedBlog.id,
        });
        successCount++;
      }

      // Commit transaction
      await queryRunner.commitTransaction();
      console.log('✅ Transaction committed successfully');
    } catch (error) {
      // Rollback on error
      await queryRunner.rollbackTransaction();
      console.error('❌ Transaction rolled back:', error.message);
      
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Bulk upload failed: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      // Release query runner
      await queryRunner.release();
    }

    const duration = Date.now() - startTime;
    console.log(`\n📊 Transactional bulk upload completed in ${duration}ms`);
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Failed: ${failureCount}`);

    return {
      totalProcessed: createBlogDtos.length,
      successCount,
      failureCount,
      results,
      summary: {
        processedAt: new Date(),
        duration,
      },
    };
  }

  /**
   * Bulk create with upsert support (insert or update)
   * Updates existing blogs with matching slugs
   * 
   * @param createBlogDtos - Array of blog DTOs to create/update
   * @returns BulkUploadResult with detailed results
   */
  async bulkUpsert(createBlogDtos: CreateBlogDto[]): Promise<BulkUploadResult> {
    const startTime = Date.now();
    const results: BulkUploadResult['results'] = [];
    let successCount = 0;
    let failureCount = 0;

    console.log(`📦 Starting bulk upsert of ${createBlogDtos.length} blogs...`);

    for (let i = 0; i < createBlogDtos.length; i++) {
      const blogDto = createBlogDtos[i];
      const index = i + 1;

      try {
        const existingBlog = await this.blogRepository.findOne({
          where: { slug: blogDto.slug },
        });

        let savedBlog: Blog;
        let action: string;

        if (existingBlog) {
          // Update existing blog
          Object.assign(existingBlog, blogDto);
          savedBlog = await this.blogRepository.save(existingBlog);
          action = 'Updated';
          
          console.log(`🔄 [${index}] Updated: ${savedBlog.title}`);
        } else {
          // Create new blog
          const blog = this.blogRepository.create(blogDto);
          savedBlog = await this.blogRepository.save(blog);
          action = 'Created';
          
          console.log(`✅ [${index}] Created: ${savedBlog.title}`);
        }

        results.push({
          index,
          title: savedBlog.title,
          slug: savedBlog.slug,
          status: 'success',
          blogId: savedBlog.id,
          error: action === 'Updated' ? 'Updated existing blog' : undefined,
        });
        successCount++;
      } catch (error) {
        console.error(`❌ [${index}] Failed: ${blogDto.title}`, error.message);
        results.push({
          index,
          title: blogDto.title,
          slug: blogDto.slug,
          status: 'failed',
          error: error.message || 'Unknown error occurred',
        });
        failureCount++;
      }
    }

    const duration = Date.now() - startTime;
    console.log(`\n📊 Bulk upsert completed in ${duration}ms`);
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Failed: ${failureCount}`);

    return {
      totalProcessed: createBlogDtos.length,
      successCount,
      failureCount,
      results,
      summary: {
        processedAt: new Date(),
        duration,
      },
    };
  }
}