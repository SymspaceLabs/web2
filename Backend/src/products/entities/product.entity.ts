import { Review } from 'src/reviews/entities/review.entity';
import { Company } from 'src/companies/entities/company.entity';
import { ProductSize } from 'src/product-sizes/entities/product-size.entity';
import { ProductImage } from 'src/product-images/entities/product-image.entity';
import { ProductColor } from 'src/product-colors/entities/product-color.entity';
import { ProductVariant } from 'src/product-variant/entities/product-variant.entity';
import { Product3DModel } from 'src/product-3d-models/entities/product-3d-model.entity';
import { SubcategoryItem } from 'src/subcategory-items/entities/subcategory-item.entity';
import { Entity, Column, OneToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { SubcategoryItemChild } from 'src/subcategory-item-child/entities/subcategory-item-child.entity';

export enum ProductStatus {
  ACTIVE = 'active',
  DRAFT = 'draft',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived',
}

export enum ProductGender {
  MEN = 'men',
  WOMEN = 'women',
  BOYS = 'boys',
  GIRLS = 'girls',
  UNISEX = 'unisex',
}

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Company, (company) => company.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column({ nullable: true })
  subcategoryItemId: string;

  @ManyToOne(() => SubcategoryItem, (subcategoryItem) => subcategoryItem.products, {
    nullable: true, 
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'subcategoryItemId' })
  subcategoryItem: SubcategoryItem;

  @Column({ nullable: true })
  subcategoryItemChildId: string;

  @ManyToOne(() => SubcategoryItemChild, (subcategoryItemChild) => subcategoryItemChild.products, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'subcategoryItemChildId' })
  subcategoryItemChild?: SubcategoryItemChild;

  @Column()
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.DRAFT,
  })
  status: ProductStatus;

  @OneToMany(() => ProductColor, (color) => color.product, {
    cascade: true,
  })
  colors: ProductColor[];

  @Column({ type: 'text', nullable: true })
  sizeFit: string;

  @OneToMany(() => ProductSize, (productSize) => productSize.product, {
    cascade: true,
  })
  sizes: ProductSize[];

  @OneToMany(() => ProductVariant, (variant) => variant.product, { cascade: true })
  variants: ProductVariant[];

  @OneToMany(() => Product3DModel, (model) => model.product, { cascade: true, eager: true })
  threeDModels: Product3DModel[];

  @OneToMany(() => ProductImage, (image) => image.product, { cascade: true, eager: true })
  images: ProductImage[];

  @Column({ 
    type: 'enum',
    enum: ProductGender,
    nullable: true,
  })
  gender: ProductGender | null;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @Column({ default: false })
  accessible: boolean;

  @Column({ default: false })
  safety_certified: boolean;

  @Column({ length: 10, default: 'USD' })
  currency: string;

  @Column({ nullable: true })
  productUrl?: string;

  @Column({ nullable: true })
  occasion: string;

  @Column({ nullable: true })
  season: string;

  @Column({ nullable: true })
  age_group: string;

  @Column({ nullable: true })
  ar_type: string;

  @Column({ nullable: true })
  indoor_outdoor: string;

  @Column({ nullable: true })
  material: string;

  @Column({ nullable: true })
  style: string;

  @Column({ nullable: true })
  shape: string;

  @Column({ nullable: true })
  pattern: string;

  @Column({ nullable: true })
  pile_height: string;

  @Column({ nullable: true })
  room_type: string;

  @Column({ default: false })
  washable: boolean;

  // Removed this column
  // @Column({ nullable: true })
  // backing_type: string;

  //Added this new column
  @Column({ default: false })
  non_slip: boolean;
  

}
