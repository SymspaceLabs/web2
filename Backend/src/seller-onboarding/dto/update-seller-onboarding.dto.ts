import { PartialType } from '@nestjs/mapped-types';
import { CreateSellerOnboardingDto } from './create-seller-onboarding.dto';

export class UpdateSellerOnboardingDto extends PartialType(CreateSellerOnboardingDto) {}
