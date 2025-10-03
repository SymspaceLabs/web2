import { 
  IsString, 
  IsOptional, 
  IsArray, 
  IsObject, 
  ValidateNested, 
  IsNumber, 
  ArrayMinSize 
} from 'class-validator';
import { Type } from 'class-transformer';

// Helper DTO for the min/max structure within boundingBox
class BoundingBoxValueDto {
    @IsNumber()
    @IsOptional()
    min: number | null;

    @IsNumber()
    @IsOptional()
    max: number | null;
}

/**
 * DTO for representing a single 3D product model.
 */
export class CreateProductModelDto {
  @IsString()
  url: string; // The URL path to the .glb file or other 3D model asset

  @IsString()
  @IsOptional() // colorCode is optional if the model is generic or for a default
  colorCode?: string; // The hex color code (e.g., "#RRGGBB") this model corresponds to

  // --- NEW ATTRIBUTES ---

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => BoundingBoxValueDto)
  boundingBox?: BoundingBoxValueDto;
  // Expected structure: { "min": null | number, "max": null | number }

  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(3) // Ensure it has at least 3 elements (x, y, z)
  @IsOptional()
  pivot?: number[];
  // Expected structure: [x, y, z] (e.g., [0, 0, 0])
}