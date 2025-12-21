import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';

export interface BulkCreateResult {
  success: boolean;
  created: number;
  failed: number;
  errors: Array<{
    index: number;
    job: CreateJobDto;
    error: string;
  }>;
  jobs: Job[];
}

export interface DeleteResult {
  success: boolean;
  message: string;
  deletedJob: {
    id: string;
    title: string;
  };
}

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const newJob = this.jobRepository.create(createJobDto);
    return await this.jobRepository.save(newJob);
  }

  async bulkCreate(createJobDtos: CreateJobDto[]): Promise<BulkCreateResult> {
    if (!Array.isArray(createJobDtos) || createJobDtos.length === 0) {
      throw new BadRequestException('Request body must be a non-empty array of job objects');
    }

    const result: BulkCreateResult = {
      success: true,
      created: 0,
      failed: 0,
      errors: [],
      jobs: [],
    };

    // Process each job
    for (let i = 0; i < createJobDtos.length; i++) {
      try {
        const job = await this.create(createJobDtos[i]);
        result.jobs.push(job);
        result.created++;
      } catch (error) {
        result.failed++;
        result.success = false;
        result.errors.push({
          index: i,
          job: createJobDtos[i],
          error: error.message || 'Unknown error occurred',
        });
      }
    }

    return result;
  }

  async findAll(search?: string, location?: string): Promise<Job[]> {
    const query = this.jobRepository.createQueryBuilder('job');

    if (search) {
      query.andWhere('LOWER(job.title) LIKE LOWER(:search)', { search: `%${search}%` });
    }

    if (location) {
      const locationsArray = location.split('|').map(loc => loc.trim().toLowerCase());

      if (locationsArray.length > 0) {
        query.andWhere('LOWER(job.location) IN (:...locationsArray)', { locationsArray });
      }
    }

    return await query.getMany();
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.jobRepository.findOne({ where: { id } });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    const job = await this.findOne(id);
    const updatedJob = Object.assign(job, updateJobDto);
    return await this.jobRepository.save(updatedJob);
  }

  async remove(id: string): Promise<DeleteResult> {
    const job = await this.findOne(id);
    
    // Store job info before deletion
    const deletedJobInfo = {
      id: job.id,
      title: job.title,
    };
    
    await this.jobRepository.remove(job);
    
    return {
      success: true,
      message: `Job "${deletedJobInfo.title}" has been successfully deleted`,
      deletedJob: deletedJobInfo,
    };
  }
}