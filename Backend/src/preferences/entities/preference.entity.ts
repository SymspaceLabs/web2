import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity'

export enum GenderPreference {
  MALE = 'male',
  FEMALE = 'female',
  BOTH = 'both',
}

@Entity()
export class Preference {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array', { nullable: true })
  styles: string[]; // Array of styles, e.g., ["Y2K", "All leather"]

  @Column('simple-array', { nullable: true })
  fits: string[]; // Array of fits, e.g., ["Slim", "Loose"]

  @Column('simple-array', { nullable: true })
  colors: string[]; // Array of colors, e.g., ["Black", "Red"]

  @Column('simple-array', { nullable: true })
  tops: string[]; // Array of tops, e.g., ["T-shirts", "Blouses"]

  @Column('simple-array', { nullable: true })
  bottoms: string[]; // Array of bottoms, e.g., ["Jeans", "Chinos"]

  @Column('simple-array', { nullable: true })
  outerwears: string[]; // Array of outerwear items, e.g., ["Jackets", "Coats"]

  @Column('simple-array', { nullable: true })
  accessories: string[]; // Array of outerwear items, e.g., ["Jackets", "Coats"]

  @Column('simple-array', { nullable: true })
  brands: string[]; // Array of outerwear items, e.g., ["Jackets", "Coats"]

  @ManyToOne(() => User, (user) => user.preference, { onDelete: 'CASCADE' })
  user: User; // Relationship to User entity

  @Column()
  gender: string; // Gender preference, can be 'male', 'female', or 'both'

}
