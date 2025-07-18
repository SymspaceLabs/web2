import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('contact_us')
export class ContactUs {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 }) // Adjusted length to accommodate a full name
  fullName: string; // Renamed from firstName and lastName

  @Column({ length: 200 })
  email: string;

  @Column({ length: 200 })
  topic: string;

  @Column({ type: 'text' })
  message: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}