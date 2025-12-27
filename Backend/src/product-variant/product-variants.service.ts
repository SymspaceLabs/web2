// src/product-variants/product-variants.service.ts
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductVariant } from './entities/product-variant.entity';
import { UpdateVariantStockDto } from './dto/update-variant-stock.dto';
import { UpdateVariantDimensionsRequestDto } from './dto/update-variant-dimensions.dto';

// ========================================
// NEW: Response DTO for cart enrichment
// ========================================
export interface VariantDetailsForCartDto {
  variantId: string;
  productId: string;
  productName: string;
  productSlug: string;
  imageUrl: string;
  price: number;
  salePrice: number | null;
  cost: number;
  sku: string;
  stock: number;
  color: {
    id: string;
    code: string;
    name: string;
  } | null;
  size: {
    id: string;
    label: string;
  } | null;
  sizes: Array<{
    label: string;
    value: string;
  }>;
}

@Injectable()
export class ProductVariantsService {
  constructor(
    @InjectRepository(ProductVariant)
    private readonly variantRepo: Repository<ProductVariant>,
  ) {}

  // ========================================
  // EXISTING METHODS (unchanged)
  // ========================================

  async getVariantById(variantId: string): Promise<ProductVariant> {
    const variant = await this.variantRepo.findOne({
      where: { id: variantId }
    });

    if (!variant) {
      throw new NotFoundException(`Product Variant with ID "${variantId}" not found`);
    }

    return variant;
  }

  async getVariantStocksByProduct(productId: string) {
    const variants = await this.variantRepo.find({
      where: { product: { id: productId } },
      relations: ['product', 'color', 'size'],
    });
  
    return variants.map(variant => ({
      id: variant.id,
      stock: variant.stock,
      price: variant.price,
      color: variant.color?.name ?? null,
      size: variant.size?.size ?? null,
      sku: variant.sku ?? null,
      salePrice: variant.salePrice,
      productWeight: variant.productWeight,
      dimensions: variant.dimensions,
      sizeChart: variant.sizeChart,
      sizeFit: variant.sizeFit,
    }));
  }
  
  async updateStockForVariants(
    productId: string,
    updateList: UpdateVariantStockDto[],
  ): Promise<{ message: string; updated: { id: string; stock: number; sku: string }[] }> {
    
    const results: { id: string; stock: number; sku: string }[] = [];

    for (const { 
      id, 
      stock,
      price,
      salePrice,
      cost,
      material,
      dimensions, 
      productWeight, 
      sizeChart,
      sizeFit
    } of updateList) {
      
      const variant = await this.variantRepo.findOne({
        where: { id },
        relations: ['product'],
      });

      if (!variant || variant.product.id !== productId) {
        throw new NotFoundException(
          `Variant with id ${id} for product ${productId} not found`,
        );
      }
      
      variant.stock = stock; 
      
      if (price !== undefined) {
        variant.price = price;
      }

      if (salePrice !== undefined) {
        variant.salePrice = salePrice;
      }

      if (cost !== undefined) {
        variant.cost = cost; 
      }
    
      if (material !== undefined) {
        variant.material = material;
      }
    
      if (dimensions !== undefined) {
        variant.dimensions = { 
          ...variant.dimensions, 
          ...dimensions 
        };
      }
      
      if (productWeight !== undefined) {
        variant.productWeight = { 
          ...variant.productWeight, 
          ...productWeight 
        };
      }
      
      if (sizeChart !== undefined) {
        variant.sizeChart = sizeChart;
      }
      
      if (sizeFit !== undefined) {
        variant.sizeFit = sizeFit;
      }

      await this.variantRepo.save(variant);

      results.push({
        id: variant.id,
        stock: variant.stock,
        sku: variant.sku,
      });
    }

    return {
      message: 'Stock updated successfully',
      updated: results,
    };
  }
    
  async checkAvailability(productId: string, color: string, size: string) {
    const variant = await this.variantRepo.findOne({
      where: {
        product: { id: productId },
        color: { id: color },
        size: { id: size },
      },
      relations: ['product', 'color', 'size'],
    });
  
    if (!variant) {
      throw new NotFoundException(
        `Variant not found for productId="${productId}", color="${color}", size="${size}"`
      );
    }
  
    let status = 'Out of stock';
    let statusColor = '#000';
  
    if (variant.stock >= 10) {
      status = '';
      statusColor = '';
    } else if (variant.stock > 0 && variant.stock < 10) {
      status = 'Low stock';
      statusColor = '#00B934';
    }

    const hasSale = 
      variant.salePrice !== null && 
      variant.salePrice > 0 && 
      variant.salePrice < variant.price;
  
    return {
      variantId: variant.id,
      stock: variant.stock,
      available: variant.stock > 0,
      status,
      statusColor,
      price: variant.price,
      salePrice: variant.salePrice,
      cost: variant.cost,
      hasSale,
      sku: variant.sku,
    };
  }

  async updateVariantDimensions(
    variantId: string, 
    updateData: UpdateVariantDimensionsRequestDto
  ): Promise<ProductVariant> {
    const variant = await this.variantRepo.findOne({
      where: { id: variantId },
    });

    if (!variant) {
      throw new NotFoundException(`Product Variant with ID "${variantId}" not found`);
    }

    const { dimensions, sizeChartFile } = updateData;

    if (dimensions !== undefined) {
      variant.dimensions = {
        ...variant.dimensions,
        ...dimensions,
      };
    }

    if (sizeChartFile !== undefined) {
      variant.sizeChart = sizeChartFile;
    }

    return this.variantRepo.save(variant);
  }

  // ========================================
  // NEW METHODS FOR CART ENRICHMENT
  // ========================================

  /**
   * Fetch complete variant details for cart enrichment (single variant)
   * @param variantId The variant ID to fetch
   * @returns Complete variant details formatted for cart display
   */
  async getVariantDetailsForCart(variantId: string): Promise<VariantDetailsForCartDto> {
    const variant = await this.variantRepo.findOne({
      where: { id: variantId },
      relations: [
        'product',
        'product.images',
        'product.sizes',
        'color',
        'size'
      ],
    });

    if (!variant) {
      throw new NotFoundException(`Variant with ID "${variantId}" not found`);
    }

    return this.mapVariantToCartDto(variant);
  }

  /**
   * Fetch complete variant details for multiple variants (bulk operation)
   * More efficient than multiple single requests
   * @param variantIds Array of variant IDs to fetch
   * @returns Array of variant details in same order as input
   */
  async getVariantDetailsForCartBulk(variantIds: string[]): Promise<VariantDetailsForCartDto[]> {
    if (!variantIds || variantIds.length === 0) {
      return [];
    }

    const variants = await this.variantRepo.find({
      where: { id: In(variantIds) },
      relations: [
        'product',
        'product.images',
        'product.sizes',
        'color',
        'size'
      ],
    });

    // Create a map for quick lookup
    const variantMap = new Map(variants.map(v => [v.id, v]));

    // Return variants in the same order as requested IDs
    return variantIds.map(id => {
      const variant = variantMap.get(id);
      if (!variant) {
        console.warn(`Variant ${id} not found in bulk fetch`);
        return null;
      }
      return this.mapVariantToCartDto(variant);
    }).filter(Boolean) as VariantDetailsForCartDto[];
  }

  /**
   * Helper method to map variant entity to cart DTO format
   */
  private mapVariantToCartDto(variant: ProductVariant): VariantDetailsForCartDto {
    // Find the image that matches the variant's color
    const matchingImage = variant.product.images?.find(
      img => img.colorId === variant.color?.id
    );

    // Fallback to first image if no color match
    const imageUrl = matchingImage?.url || variant.product.images?.[0]?.url || '';

    // Map all available sizes for the product
    const availableSizes = variant.product.sizes?.map(size => ({
      label: size.size,
      value: size.id,
    })) || [];

    return {
      variantId: variant.id,
      productId: variant.product.id,
      productName: variant.product.name,
      productSlug: variant.product.slug,
      imageUrl,
      price: variant.price,
      salePrice: variant.salePrice,
      cost: variant.cost,
      sku: variant.sku,
      stock: variant.stock,
      color: variant.color ? {
        id: variant.color.id,
        code: variant.color.code,
        name: variant.color.name,
      } : null,
      size: variant.size ? {
        id: variant.size.id,
        label: variant.size.size,
      } : null,
      sizes: availableSizes,
    };
  }
}