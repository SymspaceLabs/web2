import { Review } from 'src/reviews/entities/review.entity';
import { Company } from 'src/companies/entities/company.entity';
import { ProductSize } from 'src/product-sizes/entities/product-size.entity';
import { ProductImage } from 'src/product-images/entities/product-image.entity';
import { ProductColor } from 'src/product-colors/entities/product-color.entity';
import { ProductVariant } from 'src/product-variant/entities/product-variant.entity';
import { Product3DModel } from 'src/product-3d-models/entities/product-3d-model.entity';
import { SubcategoryItem } from 'src/subcategory-items/entities/subcategory-item.entity';
import { Entity, Column, OneToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
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

export interface ProductDimensions {
    unit: string;
    length: number | null;
    width: number | null;
    height: number | null;
}

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'float', nullable: true })
  price: number;

  @Column({ nullable: true }) // Allow null if a product might not always have a subcategory item
  subcategoryItemId: string;

  @ManyToOne(() => SubcategoryItem, (subcategoryItem) => subcategoryItem.products, {
    nullable: true, // This allows a product to not be linked to a subcategory item
    onDelete: 'SET NULL', // Or 'CASCADE' if deleting subcategoryItem should delete products
  })
  @JoinColumn({ name: 'subcategoryItemId' }) // Links to the subcategoryItemId column
  subcategoryItem: SubcategoryItem;

  @Column({ nullable: true }) // Allow null if a product might not always have a subcategory item child
  subcategoryItemChildId: string;

  @ManyToOne(() => SubcategoryItemChild, (subcategoryItemChild) => subcategoryItemChild.products, {
    nullable: true, // This allows a product to not be linked to a subcategory item child
    onDelete: 'SET NULL', // Or 'CASCADE' if deleting subcategoryItemChild should delete products
  })
  @JoinColumn({ name: 'subcategoryItemChildId' }) // Links to the subcategoryItemChildId column
  subcategoryItemChild?: SubcategoryItemChild; // Marked as optional in TypeScript

  @ManyToOne(() => Company, (company) => company.products, {
    onDelete: 'CASCADE', // Keep CASCADE as it was
  })
  @JoinColumn({ name: 'companyId' }) // Assuming 'companyId' foreign key column exists in Product table
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

  @OneToMany(() => Product3DModel, (model) => model.product, { cascade: true, eager: true })
  threeDModels: Product3DModel[];

  @Column({ nullable: true })
  composition: string;

  @Column({ type: 'text', nullable: true })
  sizeFit: string;

  @OneToMany(() => ProductSize, (productSize) => productSize.product, {
    cascade: true,
  })
  sizes: ProductSize[];

  @Column({ nullable: true })
  sizeChart: string;

  @OneToMany(() => ProductVariant, (variant) => variant.product, { cascade: true })
  variants: ProductVariant[];

  @Column({
    type: 'enum',
    enum: ProductGender,
    nullable: true, // Optional
  })
  gender?: ProductGender;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  // NEW ATTRIBUTES BELOW
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

  @Column({ default: false })
  accessible: boolean;

  @Column({ default: false })
  safety_certified: boolean;

  @Column({ length: 10, default: 'USD' }) // Use length for VARCHAR in TypeORM
  currency: string;

  @Column('json') 
  productWeight: { unit: string; value: number | null };

  @Column('json') 
  dimensions: ProductDimensions;

  // NEW HOOK: Ensures default values are set before insertion
  @BeforeInsert()
  setDefaults() {
    if (this.productWeight === undefined) {
      this.productWeight = { unit: 'lbs', value: null }; 
    }

    if (this.dimensions === undefined) {
      this.dimensions = { unit: 'cm', length: null, width: null, height: null };
    }
  }

}
