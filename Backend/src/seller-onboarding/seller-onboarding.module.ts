import { Module } from '@nestjs/common';
import { SellerOnboardingService } from './seller-onboarding.service';
import { SellerOnboardingController } from './seller-onboarding.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/companies/entities/company.entity';
import { User } from '../users/entities/user.entity';
import { Bank } from 'src/banks/entities/bank.entity';
import { CreditCard } from 'src/credit-cards/entities/credit-card.entity';
import { BillingAddress } from 'src/billing-addresses/entities/billing-address.entity';
import { Survey } from 'src/surveys/entities/survey.entity';
import { File } from 'src/files/entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Company, Bank, CreditCard, BillingAddress, Survey, File])],
  controllers: [SellerOnboardingController],
  providers: [SellerOnboardingService],
  exports: [SellerOnboardingService],
})
export class SellerOnboardingModule {}
