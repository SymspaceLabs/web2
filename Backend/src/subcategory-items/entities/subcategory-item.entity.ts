import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Subcategory } from '../../subcategories/entities/subcategory.entity';
import { Product } from '../../products/entities/product.entity';
import { SubcategoryItemChild } from 'src/subcategory-item-child/entities/subcategory-item-child.entity';

@Entity()
export class SubcategoryItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  slug: string;

  @Column()
  subcategoryId: string;
  
  @Column('simple-array', { nullable: true })
  tags_required: string[];

  @Column('simple-array', { nullable: true })
  tags_optional: string[];

  @Column('json', { nullable: true })
  tag_defaults: Record<string, any>; 
  
  @ManyToOne(() => Subcategory, (subcategory) => subcategory.subcategoryItems, {
    onDelete: 'CASCADE',
  })
  subcategory: Subcategory;

  @OneToMany(() => SubcategoryItemChild, (child) => child.subcategoryItem)
  subcategoryItemChildren: SubcategoryItemChild[];

  @OneToMany(() => Product, (product) => product.subcategoryItem)
  products: Product[];

  @Column({ nullable: true })
  mobileLevel2: string;

  @Column({ nullable: true })
  mobileLevel2Name: string;

}