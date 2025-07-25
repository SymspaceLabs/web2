// src/product-models/entities/product-model.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class ProductModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string; // The URL for the 3D model or image

  @Column({ nullable: true }) // Optional column for storing color code directly if needed
  colorCode: string;

  // ManyToOne relationship with Product, as one product can have many models
  @ManyToOne(() => Product, (product) => product.threeDModels, {
    onDelete: 'CASCADE', // If product is deleted, delete its models
  })
  product: Product;

}