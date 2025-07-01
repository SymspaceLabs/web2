// src/promo-code/entities/user-promo-code.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm';
import { PromoCode } from 'src/promo-codes/entities/promo-code.entity';

@Entity('user_promo_codes')
@Index(['userId', 'promoCodeId'], { unique: true })
export class UserPromoCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  promoCodeId: string;

  @Column({ type: 'int', default: 1 })
  usageCount: number;

  @Column({ type: 'datetime', nullable: true }) // <-- Changed from 'timestamp with time zone' to 'datetime'
  lastUsedAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }) // <-- Changed to 'datetime'
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }) // <-- Changed to 'datetime'
  updatedAt: Date;

  @ManyToOne(() => PromoCode, (promoCode) => promoCode.userUsages, { onDelete: 'CASCADE' })
  promoCode: PromoCode;
}