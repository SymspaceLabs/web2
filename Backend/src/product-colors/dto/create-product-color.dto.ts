import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateProductColorDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    code: string;

    @IsInt()
    @IsOptional()
    sortOrder?: number;
}
