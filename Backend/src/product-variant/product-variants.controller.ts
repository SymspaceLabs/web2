// src/product-variants/product-variants.controller.ts
import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ProductVariantsService } from './product-variants.service';
import { UpdateVariantStockDto } from './dto/update-variant-stock.dto';

@Controller('product-variants')
export class ProductVariantsController {
  constructor(private readonly variantsService: ProductVariantsService) {}

    @Get('stocks/:productId')
    async getVariantStocksByProduct(@Param('productId') productId: string) {
        return this.variantsService.getVariantStocksByProduct(productId);
    }

    @Patch('stocks/:productId')
    async updateStockForVariants(
      @Param('productId') productId: string,
      @Body() updateList: UpdateVariantStockDto[],
    ) {
      return this.variantsService.updateStockForVariants(productId, updateList);
    }
    

    @Get(':productId/availability')
    async checkVariantAvailability(
      @Param('productId') productId: string,
      @Query('colorId') color: string,
      @Query('sizeId') size: string,
    ) {
      return this.variantsService.checkAvailability(productId, color, size);
    }
    

}
