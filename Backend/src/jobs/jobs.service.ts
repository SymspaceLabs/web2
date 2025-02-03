import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';

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

  async findAll(search?: string, location?: string): Promise<Job[]> {
      const query = this.jobRepository.createQueryBuilder('job');

      if (search) {
          query.andWhere('LOWER(job.title) LIKE LOWER(:search)', { search: `%${search}%` });
      }

      if (location) {
          // Ensure locations are separated by a custom delimiter (e.g., "|")
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

  async remove(id: string): Promise<void> {
    const job = await this.findOne(id);
    await this.jobRepository.remove(job);
  }
}
