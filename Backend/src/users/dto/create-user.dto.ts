import { Type } from 'class-transformer';
import { IsNotEmpty, IsEmail, MinLength, IsOptional, IsString, IsDate } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dob?: Date;
  
  @IsOptional()
  @IsString()
  avatar?: string;


}
