// src/product-variants/product-variants.controller.ts
import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProductVariantsService } from './product-variants.service';
import { UpdateVariantStockDto } from './dto/update-variant-stock.dto';
import { UpdateVariantDimensionsRequestDto } from './dto/update-variant-dimensions.dto';
import { BulkVariantRequestDto } from './dto/bulk-variant-request.dto';

@Controller('product-variants')
export class ProductVariantsController {
  constructor(private readonly variantsService: ProductVariantsService) {}

  // ========================================
  // EXISTING ENDPOINTS
  // ========================================

  @Get('product/:productId')
  async getVariantStocksByProduct(@Param('productId') productId: string) {
    return this.variantsService.getVariantStocksByProduct(productId);
  }

  @Get(':id')
  async getVariantById(@Param('id') id: string) {
    return this.variantsService.getVariantById(id);
  }

  @Patch('product/:productId')
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

  @Patch(':variantId/dimensions')
  async updateVariantDimensions(
    @Param('variantId') variantId: string,
    @Body() updateData: UpdateVariantDimensionsRequestDto,
  ) {
    return this.variantsService.updateVariantDimensions(variantId, updateData);
  }

  // ========================================
  // NEW ENDPOINTS FOR CART ENRICHMENT
  // ========================================

  /**
   * Fetch detailed information for a single variant
   * Used by frontend to enrich cart items
   * 
   * GET /api/variants/:variantId
   * 
   * Response format:
   * {
   *   variantId: "abc123",
   *   productId: "prod456",
   *   productName: "Cool T-Shirt",
   *   productSlug: "cool-t-shirt",
   *   imageUrl: "/images/shirt.jpg",
   *   price: 29.99,
   *   salePrice: 24.99,
   *   cost: 15.00,
   *   sku: "SKU-123",
   *   stock: 10,
   *   color: { id: "red", code: "#FF0000", name: "Red" },
   *   size: { id: "size-m", label: "M" },
   *   sizes: [{ label: "S", value: "size-s" }, { label: "M", value: "size-m" }]
   * }
   */
  @Get('details/:variantId')
  async getVariantDetails(@Param('variantId') variantId: string) {
    return this.variantsService.getVariantDetailsForCart(variantId);
  }

  /**
   * Fetch detailed information for multiple variants in bulk
   * More efficient than multiple single requests
   * 
   * POST /api/product-variants/bulk
   * Body: { variantIds: ["abc123", "def456", "ghi789"] }
   * 
   * Response: Array of variant details in same order as request
   */
  @Post('bulk')
  async getVariantDetailsBulk(@Body() dto: BulkVariantRequestDto) {
    return this.variantsService.getVariantDetailsForCartBulk(dto.variantIds);
  }
}