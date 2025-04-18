import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { ProductColor } from 'src/product-colors/entities/product-color.entity';
import { ProductSize } from 'src/product-sizes/entities/product-size.entity';

@Entity()
export class ProductVariant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'CASCADE',
  })
  product: Product;

  // Optional color
  @ManyToOne(() => ProductColor, { eager: true, nullable: true })
  color?: ProductColor;

  // Optional size
  @ManyToOne(() => ProductSize, { eager: true, nullable: true })
  size?: ProductSize;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  sku?: string;
}
