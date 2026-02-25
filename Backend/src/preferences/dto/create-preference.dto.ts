import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreatePreferencesDto {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  styles?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  fits?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  colors?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tops?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  bottoms?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  outerwears?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  accessories?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  brands?: string[];

  @IsOptional()
  @IsString()
  gender?: string;

  userId: number;
}
