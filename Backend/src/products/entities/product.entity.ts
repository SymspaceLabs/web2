import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { ProductImage } from 'src/product-images/entities/product-image.entity';
import { Company } from 'src/companies/entities/company.entity';
import { ProductColor } from 'src/product-colors/entities/product-color.entity';
import { ProductSize } from 'src/product-sizes/entities/product-size.entity';
import { SubcategoryItem } from 'src/subcategory-items/entities/subcategory-item.entity';
import { ProductVariant } from 'src/product-variant/entities/product-variant.entity';


export enum ProductStatus {
  ACTIVE = 'Active',
  DRAFT = 'Draft',
  INACTIVE = 'InActive',
}

export enum ProductType {
  STATIC = 'Static',
  DYNAMIC = 'Dynamic',
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

  @Column({ type: 'text', nullable: true })
  model: string;

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



  // @Column({ nullable: true })
  // threeDModel?: string;

  // @Column({
  //   type: 'enum',
  //   enum: ProductType,
  //   default: ProductType.STATIC,
  // })
  // productType: ProductType;

  // @Column({ type: 'boolean', default: false })
  // modelSize: boolean;

  // @Column()
  // productFitting: 'True to Size' | 'Runs Small' | 'Runs Big';

  // @Column({ nullable: true })
  // productSizes: string;

  // @Column({ nullable: true })
  // productMaterial: string;

  // @Column({ type: 'boolean', default: false, nullable: true })
  // productDimensions: boolean;

  // @Column({ type: 'boolean', default: false, nullable: true })
  // productSizechart: boolean;

  // @Column({ nullable: true })
  // productInsurance?: string;

  // @Column({ type: 'boolean', default: false })
  // chargeTax: boolean;

  // @Column({ type: 'float', default: 0.0 })
  // costPerProduct: number;

  // @Column({ type: 'float', default: 0.0 })
  // profit: number;

  // @Column({ type: 'float', default: 0.0 })
  // margin: number;

  // @OneToMany(() => Stock, (stock) => stock.product, {
  //   cascade: true,
  // })
  // stocks: Stock[];

  // @Column()
  // createdAt: Date;

  // @OneToMany(() => ProductVariantEntity, (variant) => variant.product, {
  //   cascade: true,
  // })
  // variants: ProductVariantEntity[];
}
