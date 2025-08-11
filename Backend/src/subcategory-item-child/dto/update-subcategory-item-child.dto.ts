import { PartialType } from '@nestjs/mapped-types';
import { CreateSubcategoryItemChildDto } from './create-subcategory-item-child.dto';

export class UpdateSubcategoryItemChildDto extends PartialType(CreateSubcategoryItemChildDto) {}
