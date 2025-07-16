import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, Index, JoinColumn } from 'typeorm'; // Import JoinColumn
import User from '../../users/entities/user.entity'; // Assuming User entity path is correct

@Entity('credit_cards') // Defines the table name in your MySQL database
export class CreditCard {
  @PrimaryGeneratedColumn() // Generates a numeric primary key (e.g., 1, 2, 3...)
  id: number;

  // These fields store non-sensitive display information, provided by the payment gateway
  @Column({ type: 'varchar', length: 50 })
  cardBrand: string; // e.g., 'Visa', 'Mastercard', 'Amex'

  @Column({ type: 'varchar', length: 4 })
  @Index() // Add an index for faster lookups by last4 if needed
  last4: string; // Last four digits of the card number

  @Column({ type: 'int' }) // Changed to non-nullable as per DTO validation
  expiryMonth: number;

  @Column({ type: 'int' }) // Changed to non-nullable as per DTO validation
  expiryYear: number;

  @Column({ type: 'boolean', default: false })
  isDefault: boolean; // To mark a payment method as the user's default

  // This column stores the secure token from the payment gateway (e.g., Stripe Payment Method ID)
  // This is the crucial piece that allows you to charge the card without storing sensitive data.
  @Column({ type: 'varchar', length: 255, unique: true }) // Ensure it's unique and set appropriate length
  @Index({ unique: true }) // Add a unique index for the token
  paymentGatewayToken: string;

  @Column({ type: 'varchar', length: 255, nullable: true }) // Added cardHolderName back, making it nullable
  cardHolderName: string;

  // Explicitly define the foreign key column
  // This column will store the UUID of the User. Its type must match User.id's type.
  @Column({ type: 'varchar', length: 36 }) // UUIDs are typically 36 chars
  userId: string; // Explicit foreign key column to match User.id type (string UUID)

  // Link the Many-to-One relationship to the explicit foreign key column
  // This tells TypeORM that the 'user' property's relationship is managed by the 'userId' column.
  @ManyToOne(() => User, (user) => user.creditCards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' }) // Link to the explicit userId column
  user: User; // Many-to-One relationship with the User entity

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
