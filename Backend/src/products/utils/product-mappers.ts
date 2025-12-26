// ============================================================================
// utils/product-mappers.ts
// Centralized mapping logic following DDD principles
// ============================================================================

import { CompanyDto, CategoryDto, ProductColorDto, ProductDetailDto, ProductImageDto, ProductListItemDto, ProductSizeDto, ProductVariantDto } from "../dto/product-response.dto";
import { extractGranularCategory } from "./category-helpers";

export class ProductMapper {
  /**
   * Maps internal Product entity to clean API response DTO
   * Follows the Single Responsibility Principle
   */
  static toListItemDto(product: any): ProductListItemDto {
    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      material: product.material,
      gender: product.gender,
      ageGroup: product.ageGroup,
      ar_type : product.ar_type,
      
      company: this.mapCompany(product.company),
      category: extractGranularCategory(product),
      
      images: this.mapImages(product.images),
      colors: this.mapColors(product.colors),
      sizes: this.mapSizes(product.sizes),
      
      displayPrice: product.displayPrice,
      availability: product.availability,
      
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  static toDetailDto(product: any): ProductDetailDto {
    return {
      ...this.toListItemDto(product),
      variants: this.mapVariants(product.variants),
      threeDModels: this.mapThreeDModels(product.threeDModels),
    };
  }

  /**
   * CRITICAL METHOD: Resolves the most granular category level
   * This is your key abstraction - eliminates confusion about hierarchy
   */
  private static mapCompany(company: any): CompanyDto {
    return {
      id: company.id,
      entityName: company.entityName,
      slug: company.slug,
    };
  }

  private static mapImages(images: any[]): ProductImageDto[] {
    return (images || []).map(img => ({
      url: img.url,
      colorCode: img.colorCode,
      colorId: img.colorId,
      sortOrder: img.sortOrder,
    }));
  }

  private static mapColors(colors: any[]): ProductColorDto[] {
    return (colors || []).map(c => ({
      id: c.id,
      name: c.name,
      code: c.code,
    }));
  }

  private static mapSizes(sizes: any[]): ProductSizeDto[] {
    return (sizes || []).map(s => ({
      id: s.id,
      size: s.size,
      sortOrder: s.sortOrder,
      sizeChartUrl: s.sizeChartUrl,
      dimensions: s.dimensions,
      productWeight: s.productWeight,
    }));
  }

  private static mapVariants(variants: any[]): ProductVariantDto[] {
    return (variants || []).map(v => ({
      id: v.id,
      sku: v.sku,
      stock: v.stock,
      price: v.price,
      salePrice: v.salePrice,
      cost: v.cost,
      color: v.color ? {
        id: v.color.id,
        name: v.color.name,
        code: v.color.code,
      } : undefined,
      size: v.size ? {
        id: v.size.id,
        size: v.size.size,
        sortOrder: v.size.sortOrder,
        sizeChartUrl: v.size.sizeChartUrl,
        dimensions: v.size.dimensions,
        productWeight: v.size.productWeight,
      } : undefined,
    }));
  }

  private static mapThreeDModels(models: any[]) {
    return (models || []).map(m => ({
      id: m.id,
      modelUrl: m.modelUrl,
      textureUrl: m.textureUrl,
      thumbnailUrl: m.thumbnailUrl,
    }));
  }
}