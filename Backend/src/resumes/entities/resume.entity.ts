import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { JobApplication } from 'src/job-applications/entities/job-application.entity';

@Entity()
export class Resume {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fileUrl: string;

  @ManyToOne(() => JobApplication, (jobApplication) => jobApplication.resumes, {
    onDelete: 'CASCADE',
  })
  jobApplication: JobApplication;
}
