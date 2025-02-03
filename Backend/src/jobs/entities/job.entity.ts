import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  location: string;

  @Column()
  jobType: string;

  @Column()
  experience: string;

  @Column()
  remoteWorkPolicy: string;

  @Column()
  visaSponsorship: string;

  @Column()
  preferredTimezone: string;

  @Column('text')
  summary: string;

  @Column('text')
  scope: string;

  @Column('text')
  qualifications: string;

  @Column('text')
  benefits: string;
}
