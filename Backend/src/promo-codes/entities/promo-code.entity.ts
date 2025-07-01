// src/promo-code/entities/promo-code.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserPromoCode } from 'src/user-promo-codes/entities/user-promo-code.entity';

@Entity('promo_codes')
export class PromoCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column('decimal', { precision: 5, scale: 2 })
  discountPercentage: number; // e.g., 0.20 for 20%

  @Column({ type: 'datetime' }) // <-- Changed from 'timestamp with time zone' to 'datetime'
  startDate: Date;

  @Column({ type: 'datetime' }) // <-- Changed from 'timestamp with time zone' to 'datetime'
  endDate: Date;

  @Column({ default: null, nullable: true })
  maxTotalUsages: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }) // <-- Changed to 'datetime'
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }) // <-- Changed to 'datetime'
  updatedAt: Date;

  @OneToMany(() => UserPromoCode, (userPromoCode) => userPromoCode.promoCode)
  userUsages: UserPromoCode[];
}