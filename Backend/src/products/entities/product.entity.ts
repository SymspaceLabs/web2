import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm'; // Added JoinColumn
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

@Entity('product') // Explicitly naming the table 'product' is good practice
export class Product {
  // FIX 1: Changed to @PrimaryColumn('uuid')
  // Use PrimaryColumn if IDs are pre-generated (e.g., from seed data, or manually assigned UUIDs).
  // Use PrimaryGeneratedColumn if the database should generate the ID automatically on insert.
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'float', nullable: true })
  price: number;

  // FIX 2: Added explicit foreign key column 'subcategoryItemId' and @JoinColumn
  @Column({ nullable: true }) // Allow null if a product might not always have a subcategory item
  subcategoryItemId: string;

  @ManyToOne(() => SubcategoryItem, (subcategoryItem) => subcategoryItem.products, {
    nullable: true, // This allows a product to not be linked to a subcategory item
    onDelete: 'SET NULL', // Or 'CASCADE' if deleting subcategoryItem should delete products
  })
  @JoinColumn({ name: 'subcategoryItemId' }) // Links to the subcategoryItemId column
  subcategoryItem: SubcategoryItem;

  // FIX 3: Added explicit foreign key column 'subcategoryItemChildId' and @JoinColumn
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
    nullable: true, // Optional
  })
  gender?: ProductGender;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];
}
