import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import User from '../../src/users/entities/user.entity';

@Entity()
export class Survey {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.survey)
  user: User;

  @Column()   //SINGLE-SELECT
  industry: string;

  @Column()  //SINGLE-SELECT
  role: string;

  @Column()  //SINGLE-SELECT
  employees: string;

  @Column() //RADIO
  avgReturn: string;

  @Column() //RADIO
  highReturn: string;

  @Column('json', { nullable: true })  //MULTI-SELECT
  challenges: string[];

  @Column('json', { nullable: true })  //MULTI-SELECT
  painPoints: string[];

  @Column() //RADIO
  arAd: string;

  @Column() //RADIO
  gain: string;

  @Column() //RADIO
  threeDProduct: string;

  @Column() //RADIO
  integrate3d: string;

  @Column()  //SINGLE-SELECT
  prevAr: string;

  @Column('json', { nullable: true })   //MULTI-SELECT
  arOutcome: string[];

  @Column()  //SINGLE-SELECT
  current3d: string;

  @Column()  //SINGLE-SELECT
  generate3d: string;

  @Column('json', { nullable: true })   //MULTI-SELECT
  envision: string[];

  @Column('json', { nullable: true })   //MULTI-SELECT
  seekFunction: string[];


  @Column()  //RADIO
  moreInformed: string;

  @Column()  //RADIO
  conversionRate: string;

  @Column('json', { nullable: true })   //MULTI-SELECT
  criteria: string[];

  @Column()  //SINGLE-SELECT
  concerns: string;

  @Column()  //SINGLE-SELECT
  upcoming: string;

  @Column({ nullable: true })
  question: string;
}
