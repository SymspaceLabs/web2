import { Product } from 'src/products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, BeforeInsert } from 'typeorm';
import { ProductSize } from 'src/product-sizes/entities/product-size.entity';
import { ProductColor } from 'src/product-colors/entities/product-color.entity';

export interface ProductDimensions {
  unit: string;
  length: number | null;
  width: number | null;
  height: number | null;
}

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
  @ManyToOne(() => ProductSize, { eager: true, nullable: true, onDelete: 'CASCADE' })
  size?: ProductSize;  

  @Column({ type: 'float', nullable: true })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  sku?: string;

  @Column({ type: 'float', nullable: true })
  salePrice: number;

  @Column({ type: 'float', nullable: true }) 
  cost: number;

  @Column({ nullable: true })
  material: string;

  @Column('json', { nullable: true }) 
  productWeight: { unit: string; value: number | null };

  @Column('json', { nullable: true }) 
  dimensions: ProductDimensions;

  @Column({ nullable: true })
  sizeChart: string;

  @Column({ type: 'text', nullable: true })
  sizeFit: string;

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
