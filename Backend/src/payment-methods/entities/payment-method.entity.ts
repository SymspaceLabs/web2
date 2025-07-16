// src/payment-methods/entities/payment-method.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import User from '../../users/entities/user.entity'; // Adjust path if necessary

@Entity('payment_methods')
export class PaymentMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column()
  cardBrand: string; // e.g., 'Visa', 'Mastercard', 'Amex'

  @Column()
  last4: string; // Last four digits of the card

  @Column({ type: 'int' })
  expirationMonth: number;

  @Column({ type: 'int' })
  expirationYear: number;

  @Column({ default: false })
  isDefault: boolean;

  @Column({ unique: true, nullable: true }) // Store Stripe Payment Method ID
  stripePaymentMethodId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

//   @ManyToOne(() => User, user => user.paymentMethods, { onDelete: 'CASCADE' })
//   @JoinColumn({ name: 'user_id' })
//   user: User;
}
