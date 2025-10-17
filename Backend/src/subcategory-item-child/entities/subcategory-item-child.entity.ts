// src/subcategory-item-child/entities/subcategory-item-child.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { SubcategoryItem } from 'src/subcategory-items/entities/subcategory-item.entity';

@Entity()
export class SubcategoryItemChild {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // Add the missing properties as columns
  @Column({ nullable: true })
  slug: string;

  @Column('simple-array', { nullable: true })
  tags_required: string[];

  @Column('simple-array', { nullable: true })
  optional_tags: string[];

  @Column('json', { nullable: true }) // Use 'json' for objects like tag_defaults
  tag_defaults: { [key: string]: string };

  // This column holds the foreign key to the parent SubcategoryItem
  @Column()
  subCategoryItemId: string;

  // FIX 2: Add @JoinColumn to explicitly define the foreign key for the ManyToOne relationship.
  @ManyToOne(() => SubcategoryItem, (subcategoryItem) => subcategoryItem.subcategoryItemChildren)
  @JoinColumn({ name: 'subCategoryItemId' }) // The name of the foreign key column in this entity's table
  subcategoryItem: SubcategoryItem;

  @OneToMany(() => Product, (product) => product.subcategoryItemChild)
  products: Product[];

  //NEW ATTRIBUTE
  @Column({ nullable: true })
  mobileLevel3: string;
}