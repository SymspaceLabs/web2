import { Type } from 'class-transformer';
import { CreateSurveyDto } from 'src/surveys/dto/create-survey.dto';
import { CreateCreditCardDto } from 'src/credit-cards/dto/create-credit-card.dto';
import { IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateFileDto } from 'src/files/dto/create-file.dto';

class BasicInfoDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  dob?: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}

class CompanyDto {
  @IsString()
  @IsNotEmpty()
  entityName: string;

  @IsString()
  @IsOptional()
  legalName?: string;

  @IsString()
  @IsNotEmpty()
  ein: string;

  @IsString()
  @IsNotEmpty()
  website: string;

  @IsString()
  @IsNotEmpty()
  address1: string;

  @IsString()
  @IsOptional()
  address2?: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  zip: string;

  @IsString()
  @IsOptional()
  gmv?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  businessPhone?: string;
}

class BankInfoDto {
  @IsString()
  @IsNotEmpty()
  accountNo: string;

  @IsString()
  @IsNotEmpty()
  routingNo: string;

  @IsString()
  @IsOptional()
  wireRoutingNo?: string;

  @IsString()
  @IsNotEmpty()
  bankName: string;

  @IsString()
  @IsNotEmpty()
  accHolderName: string;
}

class BillingAddressDto {
  @IsString()
  @IsNotEmpty()
  address1: string;

  @IsString()
  @IsOptional()
  address2?: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  zip: string;
}

export class CreateSellerOnboardingDto {
  @ValidateNested()
  @Type(() => BasicInfoDto)
  @IsOptional()
  basicInfo: BasicInfoDto;

  @ValidateNested()
  @Type(() => CompanyDto)
  @IsOptional()
  company: CompanyDto;

  @ValidateNested()
  @Type(() => BankInfoDto)
  @IsOptional()
  bankInfo?: BankInfoDto;

  @ValidateNested()
  @Type(() => CreateCreditCardDto)
  @IsOptional()
  creditCard?: CreateCreditCardDto;

  @ValidateNested()
  @Type(() => BillingAddressDto)
  @IsOptional()
  billingAddress?: BillingAddressDto;

  @ValidateNested()
  @Type(() => CreateSurveyDto)
  @IsOptional()
  survey?: CreateSurveyDto;

  @ValidateNested()
  @Type(() => CreateFileDto)
  @IsOptional()
  file?: CreateFileDto;

}
