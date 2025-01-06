import { PartialType } from '@nestjs/mapped-types';
import { CreatePreferencesDto } from './create-preference.dto';

export class UpdatePreferencesDto extends PartialType(CreatePreferencesDto) {}
