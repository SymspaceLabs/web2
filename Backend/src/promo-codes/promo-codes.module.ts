import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromoCodeService } from './promo-codes.service';
import { PromoCodeController } from './promo-codes.controller';
import { PromoCode } from './entities/promo-code.entity';
import { UserPromoCode } from 'src/user-promo-codes/entities/user-promo-code.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PromoCode,
      UserPromoCode,
    ]),
  ],
  controllers: [PromoCodeController],
  providers: [PromoCodeService],
  exports: [PromoCodeService],
})
export class PromoCodesModule {}