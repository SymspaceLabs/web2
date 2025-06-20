import { Module } from '@nestjs/common';
import { ProductModelsService } from './product-models.service';
import { ProductModelsController } from './product-models.controller';

@Module({
  controllers: [ProductModelsController],
  providers: [ProductModelsService],
})
export class ProductModelsModule {}
