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

  async getVariantStocksByProduct(productId: string) {
    const variants = await this.variantRepo.find({
      // where: { product: { id: productId } }, // might fail if the relation isn't loaded
      relations: ['product', 'color', 'size'], // include 'product' too
    });
  
    return variants.map(variant => ({
      id: variant.id,
      stock: variant.stock,
      price: variant.price,
      color: variant.color?.name ?? null,
      size: variant.size?.size ?? null,
      sku: variant.sku ?? null,
    }));
  }
  
  async updateStockForVariants(
    productId: string,
    updateList: UpdateVariantStockDto[],
  ): Promise<{ message: string; updated: { id: string; stock: number }[] }> {
    const results: { id: string; stock: number; sku: string }[] = [];

    for (const { id, stock } of updateList) {
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
      
      // 3. Update and save
      variant.stock = stock;
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
    let statusColor = 'red';
  
    if (variant.stock >= 10) {
      status = 'In stock';
      statusColor = 'green';
    } else if (variant.stock > 0) {
      status = 'Low stock';
      statusColor = 'gray';
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
