// src/onboarding/dto/create-onboarding.dto.ts
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsDate, ValidateNested } from 'class-validator';
import { CreatePreferencesDto } from 'src/preferences/dto/create-preference.dto';
import { CreateMeasurementDto } from 'src/measurements/dto/create-measurement.dto';

export class CreateOnboardingDto {
  @IsString()
  userId: string;

  @IsNumber()
  height: number;

  @IsNumber()
  weight: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dob?: Date;

  @ValidateNested()
  @Type(() => CreateMeasurementDto)
  measurement: CreateMeasurementDto;

  @ValidateNested()
  @Type(() => CreatePreferencesDto)
  preference: CreatePreferencesDto;

}
