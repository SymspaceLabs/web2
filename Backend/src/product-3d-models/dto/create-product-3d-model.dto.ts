// src/product-models/dto/create-product-3d-model.dto.ts 

import { IsString, IsArray, ArrayMinSize, ValidateNested, IsOptional, IsNotEmpty, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

// Helper DTO for the BoundingBox structure
export class BoundingBoxDto {
  // We assume 3D coordinates (x, y, z), requiring an array of 3 numbers.
  
  @IsArray()
  @ArrayMinSize(3) // Ensure it's at least a 3-element array
  min: number[]; 

  @IsArray()
  @ArrayMinSize(3)
  max: number[];
}

export class CreateProduct3dModelDto {

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  colorCode: string | null;
  
  // Pivot (e.g., [0, 0, 0])
  @IsOptional()
  @IsArray()
  @ArrayMinSize(3)
  pivot: number[];

  // Format (e.g., 'glb')
  @IsOptional()
  @IsString()
  format: string; // The service handles the 'glb' default if omitted

  // The DTO for the bounding box object
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => BoundingBoxDto) // IMPORTANT: Ensures nested validation and type casting
  boundingBox: BoundingBoxDto;

  // ✅ NEW: Optional texture field
  @IsOptional()
  @IsString()
  texture?: string;

}