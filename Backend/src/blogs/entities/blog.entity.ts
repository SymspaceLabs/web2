import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { IsNotEmpty, IsString, IsNumber, IsUrl, Length, IsOptional } from 'class-validator';

@Entity('blogs')
// @Unique(['slug'])
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column('text')
  @IsNotEmpty()
  @IsString()
  content: string;

  @Column()
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  newsType: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  author: string;

  @Column({ length: 255, unique: true }) // Ensuring uniqueness and length constraint
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  slug: string;

  @Column()
  @IsNotEmpty()
  @IsUrl()
  handle_url: string;

  @Column()
  @IsNotEmpty()
  @IsUrl()
  handle_url_title: string;

  @Column()
  @IsNotEmpty()
  @IsUrl()
  article_source_url: string;

  @Column({ nullable: true, length: 1000 })
  @IsOptional()
  @IsUrl()
  author_url?: string;  

  @Column()
  @IsNotEmpty()
  @IsString()
  tag: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
