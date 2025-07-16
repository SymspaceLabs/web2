import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { CreditCardsService } from './credit-cards.service';
import { CreditCardsController } from './credit-cards.controller';
import { CreditCard } from './entities/credit-card.entity'; // Import your CreditCard entity

@Module({
  imports: [
    TypeOrmModule.forFeature([CreditCard]), // Register the CreditCard entity with this feature module
  ],
  controllers: [CreditCardsController],
  providers: [CreditCardsService],
  // Export the service and entity so other modules (e.g., AppModule) can use them
  exports: [CreditCardsService, TypeOrmModule], // Export TypeOrmModule for the entity
})
export class CreditCardsModule {}
