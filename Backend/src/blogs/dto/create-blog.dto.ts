import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  @IsOptional()
  author: string;

  @IsString()
  @IsOptional()
  slug: string;
}
