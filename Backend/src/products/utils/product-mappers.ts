// utils/product-mappers.ts

// ============================================================================
// Centralized mapping logic following DDD principles
// ============================================================================

import { CompanyDto, ProductColorDto, ProductDetailDto, ProductImageDto, ProductListItemDto, ProductSizeDto, ProductVariantDto, ProductModelDto } from "../dto/product-response.dto";
import { extractGranularCategory } from "./category-helpers";

export class ProductMapper {
  /**
   * Maps internal Product entity to clean API response DTO
   * Follows the Single Responsibility Principle
   */
  static toListItemDto(product: any, variants?:boolean): ProductListItemDto {

    const payload :any = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      material: product.material,
      gender: product.gender,
      ageGroup: product.ageGroup,
      ar_type : product.ar_type,
      
      company: this.mapCompanyList(product.company),
      category: extractGranularCategory(product),
      
      images: this.mapImages(product.images),
      thumbnail: product.images?.find(img => img.isThumbnail)?.url || product.images?.[0]?.url,
      threeDModels: this.mapThreeDModels(product.threeDModels),
      colors: this.mapColors(product.colors),
      sizes: this.mapSizes(product.sizes),
      stock: this.calculateTotalStock(product.variants),
      
      displayPrice: product.displayPrice,
      availability: product.availability,
      status: product.status,
      
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }

    if(variants){
      payload.variants = this.mapVariants(product.variants)
    }

    return payload;
  }

  static toDetailDto(product: any): ProductDetailDto {
      return {
        ...this.toListItemDto(product),
        company: this.mapCompanyDetail(product.company),
        variants: this.mapVariants(product.variants),
      };
    }

  private static mapCompanyList(company: any): CompanyDto {
    if (!company) return null;

    return {
      id: company.id,
      entityName: company.entityName,
      slug: company.slug,
    };
  }

  private static mapCompanyDetail(company: any): CompanyDto {
    if (!company) return null;

    return {
      id: company.id,
      entityName: company.entityName,
      slug: company.slug,
      description: company.description,
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

  private static mapThreeDModels(models: any[]) : ProductModelDto[] {
    return (models || []).map(m => ({
      id: m.id,
      url: m.url,
      colorCode: m.colorCode,
      pivot: m.pivot,
      format: m.format,
      boundingBox: m.boundingBox,
      texture: m.texture,
    }));
  }

  private static calculateTotalStock(variants: any[]): number {
    if (!variants || variants.length === 0) {
      return 0;
    }
    
    return variants.reduce((total, variant) => {
      const stock = variant.stock || 0;
      return total + stock;
    }, 0);
  }
}

  