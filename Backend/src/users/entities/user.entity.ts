import { Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Company } from '../../companies/entities/company.entity';
import { Measurement } from 'src/measurements/entities/measurement.entity';
import { Preference } from 'src/preferences/entities/preference.entity';
import { Bank } from 'src/banks/entities/bank.entity';
import { CreditCard } from 'src/credit-cards/entities/credit-card.entity';
import { BillingAddress } from 'src/billing-addresses/entities/billing-address.entity';
import { Survey } from 'src/surveys/entities/survey.entity';
import { File } from 'src/files/entities/file.entity';
import { Address } from 'src/addresses/entities/address.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Review } from 'src/reviews/entities/review.entity';

export enum AuthMethod {
  EMAIL = 'email',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  APPLE = 'apple',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  resetToken: string;

  @Column({ nullable: true })
  resetTokenExpiry: Date;

  @Column({ nullable: true })
  avatar: string;

  @OneToOne(() => Company, (company) => company.user)
  company: Company;

  @Column({
    type: 'enum',
    enum: AuthMethod,
    default: AuthMethod.EMAIL,
  })
  authMethod: AuthMethod;

  @Column({ type: 'date', nullable: true, default: null })
  dob?: Date;

  @OneToOne(() => Measurement, (measurement) => measurement.user, { cascade: true })
  measurement: Measurement;

  @OneToOne(() => Preference, (preference) => preference.user, { cascade: true })
  preference: Preference;

  @Column({ default: false })
  isOnboardingFormFilled: boolean;
  
  @Column({ default: false })
  isSellerOnboardingFormFilled1: boolean;

  @Column({ nullable: true })
  otp?: string;

  @Column({ type: 'timestamp', nullable: true })
  otpExpiresAt?: Date;

  @Column({ nullable: true })
  phone: string;

  @OneToMany(() => Bank, (bank) => bank.user, { cascade: true })
  banks: Bank[];

  @OneToMany(() => CreditCard, (creditCard) => creditCard.user)
  creditCards: CreditCard[];

  @OneToMany(() => BillingAddress, (billingAddress) => billingAddress.user)
  billingAddresses: BillingAddress[];

  @OneToOne(() => Survey, (survey) => survey.user)
  survey: Survey;

  @OneToMany(() => File, (file) => file.user)
  files: File[];

  @OneToMany(() => Order, (order) => order.user, { cascade: ['remove'] })
  orders: Order[];

  @OneToMany(() => Address, (address) => address.user, {
    cascade: true,
  })
  addresses: Address[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}

export default User;
