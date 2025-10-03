import { IsString, IsOptional } from 'class-validator';

/**
 * DTO for representing a single 3D product model.
 */
export class CreateProductModelDto {
  @IsString()
  url: string; // The URL path to the .glb file or other 3D model asset

  @IsString()
  @IsOptional() // colorCode is optional if the model is generic or for a default
  colorCode?: string; // The hex color code (e.g., "#RRGGBB") this model corresponds to
}
