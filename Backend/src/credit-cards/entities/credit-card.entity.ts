import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import User from 'src/users/entities/user.entity';

@Entity('credit_cards')
export class CreditCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16, nullable: true  })
  cardNo: string;

  @Column({ type: 'int', nullable: true  })
  expiryMonth: number;

  @Column({ type: 'int', nullable: true  })
  expiryYear: number;

  @Column({ length: 4, nullable: true  }) 
  cvv: string;

  @Column({ nullable: true })
  cardHolderName: string;

  @ManyToOne(() => User, (user) => user.creditCards, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
