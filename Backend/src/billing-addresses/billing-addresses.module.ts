import { Module } from '@nestjs/common';
import { BillingAddressesService } from './billing-addresses.service';
import { BillingAddressesController } from './billing-addresses.controller';

@Module({
  controllers: [BillingAddressesController],
  providers: [BillingAddressesService],
})
export class BillingAddressesModule {}
