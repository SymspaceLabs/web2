import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BraintreeService } from './braintree.service';
import { BraintreeController } from './braintree.controller';

@Module({
  imports: [ConfigModule],
  providers: [BraintreeService],
  controllers: [BraintreeController],
  exports: [BraintreeService]
})
export class BraintreeModule {}