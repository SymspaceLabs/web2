import { PartialType } from '@nestjs/mapped-types';
import { CreatePotentialUserDto } from './create-potential-user.dto';

export class UpdatePotentialUserDto extends PartialType(CreatePotentialUserDto) {}
