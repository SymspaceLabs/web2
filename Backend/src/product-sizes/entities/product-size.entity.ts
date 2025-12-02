import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

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

  @ManyToOne(() => Product, (product) => product.sizes, {
    onDelete: 'CASCADE',
  })
  product: Product;
}