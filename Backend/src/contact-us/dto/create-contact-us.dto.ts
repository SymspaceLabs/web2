import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateContactUsDto {
  @IsString()
  @IsNotEmpty()
  fullName: string; // Renamed from firstName and lastName

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000) // Example: Add a max length for the message
  message: string;
}