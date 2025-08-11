// src/subcategory-items/entities/subcategory-item.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Subcategory } from '../../subcategories/entities/subcategory.entity';
import { Product } from '../../products/entities/product.entity'; // Import the Product entity
import { SubcategoryItemChild } from 'src/subcategory-item-child/entities/subcategory-item-child.entity';

@Entity()
export class SubcategoryItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // @Column({ nullable: true })
  // slug: string;

  // @Column('simple-array', { nullable: true })
  // tags_required: string[];

  // @Column('simple-array', { nullable: true })
  // optional_tags: string[];

  // @Column('json', { nullable: true })
  // tag_defaults: { [key: string]: string };

  @Column()
  subcategoryId: string;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.subcategoryItems, {
    onDelete: 'CASCADE',
  })
  subcategory: Subcategory;

  @OneToMany(() => SubcategoryItemChild, (child) => child.subcategoryItem)
  subcategoryItemChildren: SubcategoryItemChild[];

  // 🐛 FIX: Add the 'products' property to complete the relationship
  @OneToMany(() => Product, (product) => product.subcategoryItem)
  products: Product[];
}