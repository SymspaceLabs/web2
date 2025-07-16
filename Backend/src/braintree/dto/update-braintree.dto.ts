import { PartialType } from '@nestjs/mapped-types';
import { CreateBraintreeDto } from './create-braintree.dto';

export class UpdateBraintreeDto extends PartialType(CreateBraintreeDto) {}
