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
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

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

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  // One Company has many Products
  @OneToMany(() => Product, (product) => product.company)
  products: Product[];

  @Column({ unique: true })
  slug: string;

  // Generate slug before inserting or updating
  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    if (this.entityName) {
      this.slug = this.entityName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
        .replace(/^-+|-+$/g, ''); // Trim hyphens at start and end
    }
  }

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

  @Column('text')
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
