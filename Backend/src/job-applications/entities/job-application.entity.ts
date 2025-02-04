import { Resume } from 'src/resumes/entities/resume.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class JobApplication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  linkedInUrl: string;

  @Column()
  role: string;

  @Column()
  jobId: string;

  @OneToMany(() => Resume, (resume) => resume.jobApplication, { cascade: true })
  resumes: Resume[];

  @CreateDateColumn()
  createdDate: Date;
}
