// src/paypal/paypal.module.ts
import { Module } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { PaypalController } from './paypal.controller';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule

@Module({
  imports: [ConfigModule], // Import ConfigModule to make environment variables available
  providers: [PaypalService],
  controllers: [PaypalController],
  exports: [PaypalService], // Export if other modules need to inject PaypalService
})
export class PaypalModule {}