import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobApplication } from './entities/job-application.entity';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { Resume } from 'src/resumes/entities/resume.entity';

@Injectable()
export class JobApplicationsService {
  constructor(
    @InjectRepository(JobApplication)
    private readonly jobApplicationRepository: Repository<JobApplication>,
    @InjectRepository(Resume)
    private readonly resumeRepository: Repository<Resume>,
  ) {}

  async create(createJobApplicationDto: CreateJobApplicationDto) {
    const { resumeUrls, ...jobApplicationData } = createJobApplicationDto;

    const jobApplication = this.jobApplicationRepository.create(jobApplicationData);
    await this.jobApplicationRepository.save(jobApplication);

    if (resumeUrls && resumeUrls.length > 0) {
      const resumes = resumeUrls.map((fileUrl) =>
        this.resumeRepository.create({ fileUrl, jobApplication }),
      );
      await this.resumeRepository.save(resumes);
    }

    return {
      message: 'Job application submitted successfully',
      jobApplication,
    };
  }

  async findAll(): Promise<JobApplication[]> {
    return this.jobApplicationRepository.find({ relations: ['resumes'] });
  }

  async findOne(id: string): Promise<JobApplication> {
    const jobApplication = await this.jobApplicationRepository.findOne({
      where: { id },
      relations: ['resumes'],
    });

    if (!jobApplication) {
      throw new NotFoundException(`Job Application with ID ${id} not found`);
    }

    return jobApplication;
  }

  async update(id: string, updateJobApplicationDto: UpdateJobApplicationDto): Promise<JobApplication> {
    const jobApplication = await this.findOne(id);

    if (updateJobApplicationDto.resumeUrls) {
      await this.resumeRepository.delete({ jobApplication });

      const newResumes = updateJobApplicationDto.resumeUrls.map((fileUrl) =>
        this.resumeRepository.create({ fileUrl, jobApplication }),
      );
      await this.resumeRepository.save(newResumes);
    }

    Object.assign(jobApplication, updateJobApplicationDto);
    return this.jobApplicationRepository.save(jobApplication);
  }

  async remove(id: string): Promise<void> {
    const jobApplication = await this.findOne(id);
    await this.jobApplicationRepository.remove(jobApplication);
  }
}
