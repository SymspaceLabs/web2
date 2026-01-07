import { Expose, Exclude } from 'class-transformer';
import { Product } from 'src/products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { ProductColor } from 'src/product-colors/entities/product-color.entity';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @Column()
  url: string;

  @Expose()
  @Column({ nullable: true })
  altText: string;

  @Column({ default: 0 })
  sortOrder: number;

  @Column({ nullable: true })
  colorCode: string;

  // Add the optional colorId relationship
  @Expose()
  @Column({ nullable: true })
  colorId: string;

  @ManyToOne(() => ProductColor, { nullable: true, onDelete: 'SET NULL' })
  color: ProductColor;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  @Exclude()  // Exclude the 'product' relation from the response
  product: Product;

  @Column({ default: false })
  isThumbnail: boolean;
}