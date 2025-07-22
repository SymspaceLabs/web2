import { IsInt, IsOptional, IsNotEmpty, Min, IsBoolean } from 'class-validator';

export class CreateMeasurementDto {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  weight: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  height: number;

  @IsOptional()
  @IsInt()
  chest?: number; // Chest measurement (optional)

  @IsOptional()
  @IsInt()
  waist?: number; // Waist measurement (optional)

  @IsOptional()
  @IsInt()
  shoulders?: number; // optional

  @IsOptional()
  @IsInt()
  armLength?: number; // optional

  @IsOptional()
  @IsInt()
  shoeSize?: number; // optional

  @IsNotEmpty()
  @IsBoolean()
  isMetric: boolean;

  
}
