import { PartialType } from '@nestjs/mapped-types';
import { CreateUserPromoCodeDto } from './create-user-promo-code.dto';

export class UpdateUserPromoCodeDto extends PartialType(CreateUserPromoCodeDto) {}
