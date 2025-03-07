import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Company } from '../../companies/entities/company.entity';
import { Measurement } from 'src/measurements/entities/measurement.entity';
import { Preference } from 'src/preferences/entities/preference.entity';

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

  @Column({ nullable: true })
  otp?: string;

  @Column({ type: 'timestamp', nullable: true })
  otpExpiresAt?: Date;
  
}

export default User;
