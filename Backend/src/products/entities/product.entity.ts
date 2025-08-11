import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { ProductImage } from 'src/product-images/entities/product-image.entity';
import { Company } from 'src/companies/entities/company.entity';
import { ProductColor } from 'src/product-colors/entities/product-color.entity';
import { ProductSize } from 'src/product-sizes/entities/product-size.entity';
import { SubcategoryItem } from 'src/subcategory-items/entities/subcategory-item.entity';
import { ProductVariant } from 'src/product-variant/entities/product-variant.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Product3DModel } from 'src/product-3d-models/entities/product-3d-model.entity';
import { SubcategoryItemChild } from 'src/subcategory-item-child/entities/subcategory-item-child.entity';

export enum ProductStatus {
  ACTIVE = 'Active',
  DRAFT = 'Draft',
  INACTIVE = 'InActive',
}

export enum ProductType {
  STATIC = 'Static',
  DYNAMIC = 'Dynamic',
}

export enum ProductGender {
  MEN = 'men',
  WOMEN = 'women',
  BOYS = 'boys',
  GIRLS = 'girls',
  UNISEX = 'unisex',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'float', nullable: true })
  price: number;

  @ManyToOne(() => SubcategoryItem, (subcategoryItem) => subcategoryItem.products)
  subcategoryItem: SubcategoryItem;

  // The link to SubcategoryItemChild is now optional as requested.
  // The property is marked with '?' and the relationship decorator includes { nullable: true }.
  @ManyToOne(() => SubcategoryItemChild, (subcategoryItemChild) => subcategoryItemChild.products, { nullable: true })
  subcategoryItemChild?: SubcategoryItemChild;

  @ManyToOne(() => Company, (company) => company.products, {
    onDelete: 'CASCADE',
  })
  company: Company;

  @Column()
  slug: string;

  @OneToMany(() => ProductImage, (image) => image.product, { cascade: true, eager: true })
  images: ProductImage[];
  

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.DRAFT,
  })
  status: ProductStatus;

  @Column({ type: 'float', nullable: true })
  salePrice: number;

  @OneToMany(() => ProductColor, (color) => color.product, {
    cascade: true,
  })
  colors: ProductColor[];

  // @Column({ type: 'text', nullable: true })
  // model: string;

  // Add the new OneToMany relationship to ProductModel
  // @OneToMany(() => ProductModel, (model) => model.product, { cascade: true, eager: true }) // eager: true to load models automatically
  // models: ProductModel[]; // Changed 'model' to 'models' (plural) as it's an array

  // Add the new OneToMany relationship to ProductModel
  @OneToMany(() => Product3DModel, (model) => model.product, { cascade: true, eager: true }) // eager: true to load models automatically
  threeDModels: Product3DModel[]; // Changed 'model' to 'models' (plural) as it's an array

  @Column()
  composition: string;

  @Column({ type: 'text', nullable: true })
  sizeFit: string;

  @OneToMany(() => ProductSize, (productSize) => productSize.product, {
    cascade: true,
  })
  sizes: ProductSize[];

  @Column()
  sizeChart: string;

  @OneToMany(() => ProductVariant, (variant) => variant.product, { cascade: true })
  variants: ProductVariant[];

  @Column({
    type: 'enum',
    enum: ProductGender,
    nullable: true, // ✅ Optional
  })
  gender?: ProductGender;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

}
