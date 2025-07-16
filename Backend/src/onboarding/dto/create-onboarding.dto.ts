// src/onboarding/dto/create-onboarding.dto.ts
import { Type } from 'class-transformer';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreatePreferencesDto } from 'src/preferences/dto/create-preference.dto';
import { CreateMeasurementDto } from 'src/measurements/dto/create-measurement.dto';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

export class CreateOnboardingDto {
  @IsString()
  userId: string;

  @IsNumber()
  height: number;

  @IsNumber()
  weight: number;

  @ValidateNested()
  @Type(() => CreateMeasurementDto)
  measurement: CreateMeasurementDto;

  @ValidateNested()
  @Type(() => CreatePreferencesDto)
  preference: CreatePreferencesDto;

  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;

}
