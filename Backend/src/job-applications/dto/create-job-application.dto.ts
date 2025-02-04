import { IsString, IsEmail, IsNotEmpty, IsUUID, IsUrl, IsOptional, IsArray, ArrayMinSize } from 'class-validator';

export class CreateJobApplicationDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsUrl()
  @IsNotEmpty()
  linkedInUrl: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsUUID()
  @IsNotEmpty()
  jobId: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsOptional()
  resumeUrls?: string[];
}
