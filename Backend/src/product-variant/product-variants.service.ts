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
  
  
  async updateStockForVariants(updateList: UpdateVariantStockDto[]) {
    const results = [];

    for (const { id, stock } of updateList) {
      const variant = await this.variantRepo.findOne({ where: { id } });

      if (!variant) {
        throw new NotFoundException(`Variant with id ${id} not found`);
      }

      variant.stock = stock;
      await this.variantRepo.save(variant);
      results.push({ id, stock });
    }

    return { message: 'Stock updated successfully', updated: results };
  }



}
