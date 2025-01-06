import { IsInt, IsOptional, IsEnum, IsNotEmpty, Min, IsBoolean } from 'class-validator';

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

  @IsNotEmpty()
  @IsBoolean()
  isMetric: boolean;

  
}
