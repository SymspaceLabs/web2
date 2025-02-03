import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  jobType: string;

  @IsNotEmpty()
  @IsString()
  experience: string;

  @IsNotEmpty()
  @IsString()
  remoteWorkPolicy: string;

  @IsNotEmpty()
  @IsString()
  visaSponsorship: string;

  @IsNotEmpty()
  @IsString()
  preferredTimezone: string;

  @IsNotEmpty()
  @IsString()
  summary: string;

  @IsNotEmpty()
  @IsString()
  scope: string;

  @IsNotEmpty()
  @IsString()
  qualifications: string;

  @IsNotEmpty()
  @IsString()
  benefits: string;
}
