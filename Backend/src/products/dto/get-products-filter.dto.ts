import { Transform } from 'class-transformer';
import { IsOptional, IsUUID, IsArray } from 'class-validator';

export class GetProductsFilterDto {
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  @Transform(({ value }) => {
    // Handle the case when 'brands' is a string (e.g., brands=uuid)
    if (typeof value === 'string') {
      return [value.trim()]; // Convert the single string to an array
    }

    // If it's already an array (e.g., brands[]=uuid1&brands[]=uuid2), leave it as is
    if (Array.isArray(value)) {
      return value.map((v) => v.trim()); // Handle array values
    }

    return []; // Return an empty array if no valid value
  })
  brands?: string[];
}
