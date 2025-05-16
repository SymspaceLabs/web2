// src/addresses/entities/address.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
// import { AddressType } from '../enums/address-type.enum';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  addressLine1: string;

  @Column({ nullable: true })
  addressLine2: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zip: string;

  @Column()
  country: string;

//   @Column({
//     type: 'enum',
//     enum: AddressType,
//   })
//   addressType: AddressType;

  // Optional: if you want reverse access
  @OneToOne(() => User, (user) => user.shippingAddress)
  shippingForUser?: User;

  @OneToOne(() => User, (user) => user.billingAddress)
  billingForUser?: User;

  // @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'CASCADE' })
  // user: User;
}
