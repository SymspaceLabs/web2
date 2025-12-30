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
export async function resolveCategoryHierarchy(
    dto: CreateProductDto,
    subcategoryItemRepository: Repository<SubcategoryItem>,
    subcategoryItemChildRepository: Repository<SubcategoryItemChild>,
): Promise<{
    finalSubcategoryItem: SubcategoryItem;
    finalSubcategoryItemChild: SubcategoryItemChild | undefined;
    tagDefaults: any;
}> {
    const { subcategoryItem: subcategoryItemIdFromDto, subcategoryItemChild: subcategoryItemChildIdFromDto } = dto;

    // Constraint: Ensure only one field is provided explicitly
    if (subcategoryItemIdFromDto && subcategoryItemChildIdFromDto) {
        throw new BadRequestException('Cannot provide both subcategoryItemId and subcategoryItemChildId. Please provide only one.');
    }

    let finalSubcategoryItem: SubcategoryItem | undefined;
    let finalSubcategoryItemChild: SubcategoryItemChild | undefined;
    let tagDefaults: any = {};

    // ----------------------------------------------------------------------
    // Case 1: subcategoryItemChild is explicitly provided
    // ----------------------------------------------------------------------
    if (subcategoryItemChildIdFromDto) {
        const subcategoryItemChild = await subcategoryItemChildRepository.findOne({
            where: { id: subcategoryItemChildIdFromDto },
            relations: ['subcategoryItem', 'subcategoryItem.subcategory', 'subcategoryItem.subcategory.category'],
        });

        if (!subcategoryItemChild) {
            throw new NotFoundException(`Subcategory item child with ID ${subcategoryItemChildIdFromDto} not found.`);
        }
        finalSubcategoryItemChild = subcategoryItemChild;
        finalSubcategoryItem = subcategoryItemChild.subcategoryItem;
        tagDefaults = subcategoryItemChild.tag_defaults || {};
    } 
    
    // ----------------------------------------------------------------------
    // Case 2: subcategoryItem is provided (Dual Check Logic)
    // ----------------------------------------------------------------------
    else if (subcategoryItemIdFromDto) {
        
        // 1. ATTEMPT A: Check if the ID belongs to a SubcategoryItemChild
        // This is the modification to satisfy the requirement: check child table first.
        const childAsCandidate = await subcategoryItemChildRepository.findOne({
            where: { id: subcategoryItemIdFromDto },
            relations: ['subcategoryItem', 'subcategoryItem.subcategory', 'subcategoryItem.subcategory.category'],
        });

        if (childAsCandidate) {
            // Match found in the child table
            finalSubcategoryItemChild = childAsCandidate;
            finalSubcategoryItem = childAsCandidate.subcategoryItem; // Retrieve the parent via the relation
            tagDefaults = childAsCandidate.tag_defaults || {};

        } else {
            // 2. ATTEMPT B: Check if the ID belongs to a SubcategoryItem (Parent)
            const subcategoryItem = await subcategoryItemRepository.findOne({
                where: { id: subcategoryItemIdFromDto },
                relations: ['subcategory', 'subcategory.category'],
            });

            if (!subcategoryItem) {
                // Not found in either table
                throw new NotFoundException(`Category ID ${subcategoryItemIdFromDto} not found as a Subcategory Item OR Subcategory Item Child.`);
            }

            // Match found in the parent table
            finalSubcategoryItem = subcategoryItem;
            finalSubcategoryItemChild = undefined; // Explicitly set child to undefined
            tagDefaults = subcategoryItem.tag_defaults || {};
        }
    }

    // Final check to ensure a main category was resolved (important for new products)
    if (!finalSubcategoryItem) {
        throw new BadRequestException('Subcategory item could not be determined. Please provide valid IDs.');
    }

    return { finalSubcategoryItem, finalSubcategoryItemChild, tagDefaults };
}

// --------------------------------------------------------------------------
// Helper 2: Applies Tag Defaults
// --------------------------------------------------------------------------
export function applyTagDefaults(productData: any, tagDefaults: any): void {
    const relevantDefaults = {
        ar_type: tagDefaults.ar_type,
        indoor_outdoor: tagDefaults.indoor_outdoor,
        accessible: tagDefaults.accessible,
        gender: tagDefaults.gender,
    };

    // Apply default only if the DTO value (in productData) is missing (undefined)
    Object.keys(relevantDefaults).forEach(key => {
        if (productData[key] === undefined && relevantDefaults[key] !== undefined) {
            productData[key] = relevantDefaults[key];
        }
    });
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