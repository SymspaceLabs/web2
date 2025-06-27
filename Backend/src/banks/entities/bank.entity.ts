import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import User from '../../src/users/entities/user.entity';

@Entity('banks')
export class Bank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true  })
  accountNo: string;

  @Column({ type: 'varchar', length: 50, nullable: true  })
  routingNo: string;

  @Column({ type: 'varchar', length: 50, nullable: true  })
  wireRoutingNo?: string;

  @Column({ type: 'varchar', length: 100, nullable: true  })
  bankName: string;

  @Column({ type: 'varchar', length: 100, nullable: true  })
  accHolderName: string;

  @ManyToOne(() => User, (user) => user.banks, { onDelete: 'CASCADE' })
  user: User;
}
