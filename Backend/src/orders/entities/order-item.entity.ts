import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { ProductVariant } from 'src/product-variant/entities/product-variant.entity'; // Ensure this path is correct for your project

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.items, {
    onDelete: 'CASCADE', // If an order is deleted, its items are deleted
  })
  order: Order;

  @ManyToOne(() => ProductVariant, {
    eager: true, // Eager load the product variant when fetching order items
    onDelete: 'SET NULL', // If a product variant is deleted, set this reference to NULL
    nullable: true, // Allow this to be nullable if the variant might be deleted
  })
  variant: ProductVariant;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 }) // Use decimal for monetary values
  price: number; // Price at the time of order

  @Column({ type: 'decimal', precision: 10, scale: 2 }) // Use decimal for monetary values
  subtotal: number; // price * quantity

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
