import { IsBoolean, IsEnum } from 'class-validator';
import User from '../../src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Measurement {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'float', nullable: false })
  weight: number;

  @Column({ type: 'float', nullable: false })
  height: number;

  @Column({ type: 'float', nullable: true })
  chest?: number;

  @Column({ type: 'float', nullable: true })
  waist?: number;

  @Column({ type: 'boolean', nullable: false, default: true })
  @IsBoolean({ message: 'isMetric must be a boolean value (true or false)' })
  isMetric: boolean;

  @OneToOne(() => User, (user) => user.measurement, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
