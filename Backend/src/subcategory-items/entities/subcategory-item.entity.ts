// subcategory-item.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Subcategory } from '../../subcategories/entities/subcategory.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class SubcategoryItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  subcategoryId: string;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.subcategoryItems)
  subcategory: Subcategory;

  @OneToMany(() => Product, (product) => product.subcategoryItem)
  products: Product[];
}
