import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import User from '../../users/entities/user.entity';

@Entity('billing_addresses')
export class BillingAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  address1: string;

  @Column({ nullable: true })
  address2?: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  zip: string;

  @OneToOne(() => User, (user) => user.billingAddresses, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
