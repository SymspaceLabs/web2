// src/orders/entities/order.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Address } from 'src/addresses/entities/address.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // For authenticated users: Link to the User entity. Nullable for guest orders.
  @ManyToOne(() => User, (user) => user.orders, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // For authenticated users: Link to a saved Address. Nullable for guest orders.
  @ManyToOne(() => Address, { nullable: true })
  @JoinColumn({ name: 'shipping_address_id' })
  shippingAddress: Address;

  // For authenticated users: Link to a saved Billing Address. Nullable if same as shipping or for guest orders.
  @ManyToOne(() => Address, { nullable: true })
  @JoinColumn({ name: 'billing_address_id' })
  billingAddress: Address;

  // --- Guest User Fields ---
  // Flag to easily identify if this is a guest order.
  // When 'isGuestOrder' is true, the following direct fields for contact and addresses are used.
  @Column({ default: false, name: 'is_guest_order' })
  isGuestOrder: boolean;

  // Guest user's personal details (if isGuestOrder is true)
  @Column({ nullable: true, name: 'customer_first_name' })
  firstName: string;

  @Column({ nullable: true, name: 'customer_last_name' })
  lastName: string;

  @Column({ nullable: true, name: 'customer_email' })
  email: string;

  // Guest user's shipping address details (raw data)
  @Column({ nullable: true, name: 'shipping_address1' })
  shippingAddress1: string;

  @Column({ nullable: true, name: 'shipping_address2' })
  shippingAddress2: string;

  @Column({ nullable: true, name: 'shipping_city' })
  shippingCity: string;

  @Column({ nullable: true, name: 'shipping_state' })
  shippingState: string;

  @Column({ nullable: true, name: 'shipping_country' })
  shippingCountry: string;

  @Column({ nullable: true, name: 'shipping_zip' })
  shippingZip: string;

  // Guest user's billing address details (raw data, if different from shipping)
  @Column({ nullable: true, name: 'billing_address1' })
  billingAddress1: string;

  @Column({ nullable: true, name: 'billing_address2' })
  billingAddress2: string;

  @Column({ nullable: true, name: 'billing_city' })
  billingCity: string;

  @Column({ nullable: true, name: 'billing_state' })
  billingState: string;

  @Column({ nullable: true, name: 'billing_country' })
  billingCountry: string;

  @Column({ nullable: true, name: 'billing_zip' })
  billingZip: string;
  // --- End Guest User Fields ---


  @Column({ name: 'payment_method' })
  paymentMethod: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ default: 'pending' })
  status: string;

  @Column('decimal', { precision: 10, scale: 2, name: 'total_amount' })
  totalAmount: number;

  @Column({ nullable: true, name: 'paypal_order_id' }) // This is the paypalOrderId column
  paypalOrderId: string;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
