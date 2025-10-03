// src/product-models/entities/product-model.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Entity('product_3d_model')
export class Product3DModel {
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

  // -------------------------
  // New Attributes
  // -------------------------
  @Column('json')
  pivot: number[];

  @Column({ default: 'glb' }) // Defaults to 'glb' if not provided
  format: string;

  @Column('json')
  boundingBox: { min: number | null; max: number | null };

  /**
   * TypeORM Hook: Ensures default values are set before the entity is inserted
   * into the database, bypassing the MySQL JSON default restriction.
   */
  @BeforeInsert()
  setDefaults() {
    if (this.boundingBox === undefined) {
      this.boundingBox = { min: null, max: null };
    }
    // Set the required default for 'pivot'
    if (this.pivot === undefined) {
      this.pivot = [0, 0, 0];
    }
  }


}