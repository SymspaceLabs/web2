// src/product-variants/product-variants.controller.ts
import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ProductVariantsService } from './product-variants.service';
import { UpdateVariantStockDto } from './dto/update-variant-stock.dto';

@Controller('product-variants')
export class ProductVariantsController {
  constructor(private readonly variantsService: ProductVariantsService) {}

    @Get('stocks/:productId')
    async getVariantStocksByProduct(@Param('productId') productId: string) {
        return this.variantsService.getVariantStocksByProduct(productId);
    }

    @Patch('stocks')
    async updateStockForVariants(
        @Body() updateList: UpdateVariantStockDto[],
    ) {
        return this.variantsService.updateStockForVariants(updateList);
    }
}
