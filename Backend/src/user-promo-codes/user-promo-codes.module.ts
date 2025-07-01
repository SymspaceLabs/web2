// src/user-promo-codes/user-promo-codes.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { UserPromoCodesService } from './user-promo-codes.service';
import { UserPromoCodesController } from './user-promo-codes.controller'; // Assuming you have a controller
import { UserPromoCode } from './entities/user-promo-code.entity'; // Import your UserPromoCode entity

@Module({
  imports: [
    // --- THIS IS THE MISSING PART ---
    TypeOrmModule.forFeature([UserPromoCode]), 
    // This makes the UserPromoCodeRepository available for injection
  ],
  controllers: [UserPromoCodesController], // Your controller(s)
  providers: [UserPromoCodesService],     // Your service(s)
  exports: [UserPromoCodesService]        // Export the service if other modules need to use it
})
export class UserPromoCodesModule {}