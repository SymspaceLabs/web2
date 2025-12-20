import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

// Type for size dimensions
export interface SizeDimensions {
  length?: string | null;
  width?: string | null;
  height?: string | null;
  unit?: 'cm' | 'in';
}

@Entity()
export class ProductSize {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  size: string;
  
  @Column({ type: 'varchar', nullable: true })
  sizeChartUrl: string | null;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @Column({ type: 'json', nullable: true })
  dimensions: SizeDimensions | null;

  @ManyToOne(() => Product, (product) => product.sizes, {
    onDelete: 'CASCADE',
  })
  product: Product;
}