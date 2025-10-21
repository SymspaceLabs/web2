// src/subcategory-item-child/entities/subcategory-item-child.entity.ts

import { Product } from '../../products/entities/product.entity';
import { SubcategoryItem } from 'src/subcategory-items/entities/subcategory-item.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class SubcategoryItemChild {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  slug: string;

  @Column('simple-array', { nullable: true })
  tags_required: string[];

  @Column('simple-array', { nullable: true })
  optional_tags: string[];

  @Column('json', { nullable: true })
  tag_defaults: { [key: string]: string };

  @Column()
  subCategoryItemId: string;

  @ManyToOne(() => SubcategoryItem, (subcategoryItem) => subcategoryItem.subcategoryItemChildren)
  @JoinColumn({ name: 'subCategoryItemId' })
  subcategoryItem: SubcategoryItem;

  @OneToMany(() => Product, (product) => product.subcategoryItemChild)
  products: Product[];

  @Column({ nullable: true })
  mobileLevel3: string;

  //NEW ATTRIBUTE
  @Column({ nullable: true })
  mobileLevel3Name: string;

}