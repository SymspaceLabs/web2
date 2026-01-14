// src/products/utils/product.utils.ts

import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { SubcategoryItem }  from 'src/subcategory-items/entities/subcategory-item.entity';
import { SubcategoryItemChild } from 'src/subcategory-item-child/entities/subcategory-item-child.entity';
import { CreateProduct3dModelDto } from 'src/product-3d-models/dto/create-product-3d-model.dto';
import { Product } from '../entities/product.entity';
import { Product3DModel } from 'src/product-3d-models/entities/product-3d-model.entity';
import { CreateProductColorDto } from 'src/product-colors/dto/create-product-color.dto';
import { CreateProductSizeDto } from 'src/product-sizes/dto/create-product-size.dto';
import { ProductColor } from 'src/product-colors/entities/product-color.entity';
import { ProductSize } from 'src/product-sizes/entities/product-size.entity';

// ============================================================================
// Helper function to convert weight units
// ============================================================================
function convertWeightToKg(value: number | null, unit: 'kg' | 'lbs'): number | null {
  if (value === null || value === undefined) return null;
  if (unit === 'kg') return value;
  // Convert lbs to kg (1 lb = 0.453592 kg)
  return value * 0.453592;
}

// --------------------------------------------------------------------------
// Helper 1: Resolves Category Hierarchy
// --------------------------------------------------------------------------
/**
 * Helper function to resolve category hierarchy and get tag defaults
 * This is used in the upsert method to determine the correct category relationships
 * 
 * ⭐ FLEXIBLE LOOKUP: Checks both SubcategoryItem (Level 2) and SubcategoryItemChild (Level 3)
 * when a single ID is provided, following the same pattern as findOneBySlug.
 */
export async function resolveCategoryHierarchy(
  dto: any,
  subcategoryItemRepository: any,
  subcategoryItemChildRepository: any,
): Promise<{
  finalSubcategoryItem: any;
  finalSubcategoryItemChild: any;
  tagDefaults: any;
}> {
  let finalSubcategoryItem: any = undefined;
  let finalSubcategoryItemChild: any = undefined;
  let tagDefaults: any = {};

  const subcategoryItemIdFromDto = dto.subcategoryItem;
  const subcategoryItemChildIdFromDto = dto.subcategoryItemChild;
  // Prioritize child if provided
  if (subcategoryItemChildIdFromDto) {
    
    finalSubcategoryItemChild = await subcategoryItemChildRepository.findOne({
      where: { id: subcategoryItemChildIdFromDto },
      relations: ['subcategoryItem'],
    });

    if (!finalSubcategoryItemChild) {
      throw new Error(`SubcategoryItemChild with ID ${subcategoryItemChildIdFromDto} not found`);
    }

    finalSubcategoryItem = finalSubcategoryItemChild.subcategoryItem;
    
    // Get tag defaults from child (highest priority)
    tagDefaults = finalSubcategoryItemChild.tag_defaults || {};
    
  } 
  // ⭐ FLEXIBLE LOOKUP: Check both levels when subcategoryItem is provided
  else if (subcategoryItemIdFromDto) {
    
    // 🐛 BUG FIX: Load tagDefaults relation
    // The issue was here - we weren't selecting the tagDefaults column
    finalSubcategoryItem = await subcategoryItemRepository.findOne({
      where: { id: subcategoryItemIdFromDto },
      // Note: tagDefaults should be a JSON column, not a relation
      // If it's stored as JSON in the database, it should load automatically
    });

    if (finalSubcategoryItem) {
      // Found at Level 2 - use its tag defaults
      tagDefaults = finalSubcategoryItem.tag_defaults || {};
      
    } else {
      
      // 2. 🔍 If not found at Level 2, try SubcategoryItemChild (Level 3)
      finalSubcategoryItemChild = await subcategoryItemChildRepository.findOne({
        where: { id: subcategoryItemIdFromDto },
        relations: ['subcategoryItem'],
      });

      if (finalSubcategoryItemChild) {
        // Found at Level 3 - extract parent and use child's tag defaults
        finalSubcategoryItem = finalSubcategoryItemChild.subcategoryItem;
        tagDefaults = finalSubcategoryItemChild.tag_defaults  || {};
        
      } else {
        // 3. 🛑 Not found in either level
        console.error('❌ [resolveCategoryHierarchy] Not found in either level!');
        throw new Error(
          `Subcategory record with ID ${subcategoryItemIdFromDto} not found in SubcategoryItem or SubcategoryItemChild`
        );
      }
    }
  }

  return {
    finalSubcategoryItem,
    finalSubcategoryItemChild,
    tagDefaults,
  };
}

// --------------------------------------------------------------------------
// Helper 2: Applies Tag Defaults (Called from upsert method)
// --------------------------------------------------------------------------
/**
 * Applies default values from subcategory tag configuration to product data.
 * This ensures that required category tags have defaults if not provided.
 * 
 * @param productData - The product data object to apply defaults to
 * @param tagDefaults - The tag defaults from subcategory configuration
 */
export function applyTagDefaults(productData: any, tagDefaults: any): void {

  if (!tagDefaults || typeof tagDefaults !== 'object') {
    console.warn('⚠️ [applyTagDefaults] No valid tagDefaults provided');
    return;
  }

  // List of all possible tag fields that can have defaults
  const tagFields = [
    // Existing fields
    'age_group',
    'gender',
    'occasion',
    'season',
    'indoor_outdoor',
    'material',
    'style',
    'ar_type',
    
    // NEW: Missing optional fields
    'shape',
    'pattern',
    'pile_height',
    'room_type',
    'washable',
    'non_slip',
  ];

  const appliedDefaults: any = {};
  const skippedFields: any = {};

  // Apply defaults only if the field is undefined in productData
  for (const field of tagFields) {
    if (productData[field] === undefined && tagDefaults[field] !== undefined) {
      productData[field] = tagDefaults[field];
      appliedDefaults[field] = tagDefaults[field];
    } else if (productData[field] !== undefined) {
      skippedFields[field] = `Already set: ${productData[field]}`;
    } else if (tagDefaults[field] === undefined) {
      skippedFields[field] = 'No default available';
    }
  }

}


export function mapProduct3DModels(modelsDto: CreateProduct3dModelDto[], product: Product): Product3DModel[] {
    if (!modelsDto || modelsDto.length === 0) return [];

    return modelsDto.map((modelDto) => {
        const newModel = new Product3DModel();
        newModel.url = modelDto.url;
        newModel.colorCode = modelDto.colorCode || null;
        if (modelDto.pivot !== undefined) { newModel.pivot = modelDto.pivot; }
        if (modelDto.boundingBox !== undefined) { newModel.boundingBox = modelDto.boundingBox; }
        newModel.product = product;
        return newModel;
    });
}

export function mapProductColors(colorsDto: CreateProductColorDto[], product: Product): ProductColor[] {
    if (!colorsDto || colorsDto.length === 0) return [];
    
    return colorsDto.map((color) => {
        const c = new ProductColor();
        c.name = color.name;
        c.code = color.code;
        c.product = product;
        return c;
    });
}

// ✅ UPDATED: Now handles productWeight with unit conversion
export function mapProductSizes(
  sizeDtos: Array<{ 
    size: string; 
    sizeChartUrl?: string | null; 
    sortOrder?: number;
    dimensions?: {
      length?: string | null;
      width?: string | null;
      height?: string | null;
      unit?: 'cm' | 'in';
    } | null;
    productWeight?: {
      value: number | null;
      unit: 'kg' | 'lbs';
    } | null;
  }>,
  product: Product
): ProductSize[] {

  const result = sizeDtos.map((sizeDto, index) => {
    const size = new ProductSize();
    size.size = sizeDto.size;
    size.sizeChartUrl = sizeDto.sizeChartUrl || null;
    size.sortOrder = sizeDto.sortOrder !== undefined ? sizeDto.sortOrder : index;
    
    // Map dimensions
    size.dimensions = sizeDto.dimensions || null;
    
    // ✅ Map productWeight and convert to kg (SI unit)
    if (sizeDto.productWeight) {
      const convertedValue = convertWeightToKg(
        sizeDto.productWeight.value,
        sizeDto.productWeight.unit
      );
      size.productWeight = {
        value: convertedValue,
        unit: 'kg'
      };
      
    } else {
      size.productWeight = null;
    }
    
    size.product = product;
    return size;
  });

  return result;
}

/**
 * Formats a price range as a string
 * @param minPrice - Minimum price
 * @param maxPrice - Maximum price
 * @param currency - Currency code (default: 'USD')
 * @returns Formatted price range string (e.g., "$10-$100" or "$50" if min equals max)
 */
export function formatPriceRange(minPrice: number, maxPrice: number, currency: string = 'USD'): string {
  const symbols = { USD: '$', EUR: '€', GBP: '£' };
  const symbol = symbols[currency] || '$';
  
  // Handle null/undefined/invalid values
  if (minPrice == null || maxPrice == null || isNaN(minPrice) || isNaN(maxPrice)) {
    return `${symbol}0`;
  }
  
  // Ensure non-negative values
  const safeMin = Math.max(0, minPrice);
  const safeMax = Math.max(0, maxPrice);
  
  // If min and max are the same, return a single price
  if (safeMin === safeMax) {
    return `${symbol}${safeMin.toFixed(2)}`;
  }
  
  // Return the range
  return `${symbol}${safeMin.toFixed(2)}-${symbol}${safeMax.toFixed(2)}`;
}