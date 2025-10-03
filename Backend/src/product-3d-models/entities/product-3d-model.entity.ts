// src/product-models/entities/product-model.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Entity('product_3d_model')
export class Product3DModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  colorCode: string;

  @ManyToOne(() => Product, (product) => product.threeDModels, {
    onDelete: 'CASCADE',
  })
  product: Product;

  // -------------------------
  // New Attributes
  // -------------------------
  
  // Pivot is NOT NULL, so we use the @BeforeInsert hook to provide a default.
  @Column('json')
  pivot: number[];

  // Format has a default set in the database, but we include it here for consistency.
  @Column({ default: 'glb' }) // ✅ Added default decorator to match migration
  format: string;

  // BoundingBox is NOT NULL. The JSON structure must match the non-null default 
  // used in the migration (where min/max are arrays of numbers, not nulls).
  @Column('json')
  boundingBox: { min: number[]; max: number[] }; // ✅ Corrected type to number[]

  /**
   * TypeORM Hook: Ensures default values are set before the entity is inserted
   * into the database to satisfy the NOT NULL constraint for the JSON columns.
   */
  @BeforeInsert()
  setDefaults() {
    // 🎯 FIX: Match the structure and types of the migration's DEFAULT value.
    if (this.boundingBox === undefined) {
      this.boundingBox = { min: [0, 0, 0], max: [0, 0, 0] }; 
    }
    
    // Set the required default for 'pivot'
    if (this.pivot === undefined) {
      this.pivot = [0, 0, 0];
    }

    // Optional: Explicitly set format default if it wasn't provided in the DTO,
    // although the database default is more reliable here.
    if (this.format === undefined) {
        this.format = 'glb';
    }
  }
}