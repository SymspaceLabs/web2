// src/product-variants/product-variants.service.ts
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductVariant } from './entities/product-variant.entity';
import { UpdateVariantStockDto } from './dto/update-variant-stock.dto';

@Injectable()
export class ProductVariantsService {
  constructor(
    @InjectRepository(ProductVariant)
    private readonly variantRepo: Repository<ProductVariant>,
  ) {}

    /**
   * Fetches a specific product variant by its ID.
   * Includes relations for product, color, and size.
   * @param variantId The ID of the product variant.
   * @returns The found ProductVariant entity.
   * @throws {NotFoundException} if the variant is not found.
   */
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
      where: { product: { id: productId } }, // might fail if the relation isn't loaded
      relations: ['product', 'color', 'size'], // include 'product' too
    });
  
    return variants.map(variant => ({
      id: variant.id,
      stock: variant.stock,
      price: variant.price,
      color: variant.color?.name ?? null,
      size: variant.size?.size ?? null,
      sku: variant.sku ?? null,

      //NEW ATTRIBUTES
      salePrice : variant.salePrice,
      productWeight : variant.productWeight,
      dimensions : variant.dimensions,
      sizeChart : variant.sizeChart,
      sizeFit : variant.sizeFit,
    }));
  }
  
  // Assuming UpdateVariantStockDto contains: 
  // { id, stock, dimensions?, productWeight?, sizeChart?, sizeFit? }

  async updateStockForVariants(
    productId: string,
    updateList: UpdateVariantStockDto[],
  ): Promise<{ message: string; updated: { id: string; stock: number; sku: string }[] }> {
    const results: { id: string; stock: number; sku: string }[] = [];

    // Destructure all possible update fields from the DTO
    for (const { 
      id, 
      stock, 
      dimensions, 
      productWeight, 
      sizeChart, // New field from DTO
      sizeFit    // New field from DTO
    } of updateList) {
      
      // 1. Load the variant along with its product relation
      const variant = await this.variantRepo.findOne({
        where: { id },
        relations: ['product'],
      });

      // 2. Check existence and ownership
      if (!variant || variant.product.id !== productId) {
        throw new NotFoundException(
          `Variant with id ${id} for product ${productId} not found`,
        );
      }
      
      // 3. Update all fields and save
      
      // Update stock (required in your DTO)
      variant.stock = stock; 
      
      // 3a. Handle Partial JSON Updates (dimensions)
      if (dimensions !== undefined) {
        // Merge existing dimensions with new dimensions, preserving existing fields not provided in the update.
        variant.dimensions = { 
          ...variant.dimensions, 
          ...dimensions 
        };
      }
      
      // 3b. Handle Partial JSON Updates (productWeight)
      if (productWeight !== undefined) {
        // Merge existing weight with new weight.
        variant.productWeight = { 
          ...variant.productWeight, 
          ...productWeight 
        };
      }
      
      // 3c. Handle Optional Scalar Field Updates (sizeChart)
      if (sizeChart !== undefined) {
        variant.sizeChart = sizeChart;
      }
      
      // 3d. Handle Optional Scalar Field Updates (sizeFit)
      if (sizeFit !== undefined) {
        variant.sizeFit = sizeFit;
      }

      await this.variantRepo.save(variant);

      // 4. Include sku in the result
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
  
    // Determine status and color
    let status = 'Out of stock';
    let statusColor = '#000';
  
    if (variant.stock >= 10) {
      // When stock >=10, do not need show any message
      status = '';
      statusColor = '';
    } else if (variant.stock > 0 && variant.stock < 10) {
      status = 'Low stock';
      statusColor = '#00B934';
    }
  
    return {
      variantId: variant.id,
      stock: variant.stock,
      available: variant.stock > 0,
      status,
      statusColor,
    };
  }
  
  
}
