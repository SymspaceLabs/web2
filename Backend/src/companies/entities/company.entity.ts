import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { IsString } from 'class-validator';
import { Product } from '../../products/entities/product.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  entityName: string;

  @Column()
  website: string;

  @Column()
  location: string;

  @Column()
  ein: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' }) // <-- ADD THIS OPTION
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  // One Company has many Products
  @OneToMany(() => Product, (product) => product.company)
  products: Product[];

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  legalName: string;

  @Column({ nullable: true })
  address1: string;

  @Column({ nullable: true })
  address2: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  zip: string;

  @Column({ nullable: true })
  gmv: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  businessPhone: string;

  @Column({ nullable: true })
  emailSupport: string;

  @Column({ nullable: true })
  phoneSupport: string;

  @Column('text', { nullable: true })
  @IsString()
  description: string;  

  @Column({ nullable: true })
  tagLine: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  banner: string;

  @Column({ nullable: true })
  web: string;

  @Column({ nullable: true })
  instagram: string;

  @Column({ nullable: true })
  twitter: string;

  @Column({ nullable: true })
  youtube: string;

  @Column({ nullable: true })
  facebook: string;

  @Column({ default: false })
  isOnboardingFormFilled: boolean;

}
