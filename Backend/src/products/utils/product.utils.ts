// src/utils/product.utils.ts

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

    if (subcategoryItemIdFromDto && subcategoryItemChildIdFromDto) {
        throw new BadRequestException('Cannot provide both subcategoryItemId and subcategoryItemChildId. Please provide only one.');
    }

    let finalSubcategoryItem: SubcategoryItem | undefined;
    let finalSubcategoryItemChild: SubcategoryItemChild | undefined;
    let tagDefaults: any = {};

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

    } else if (subcategoryItemIdFromDto) {
        const subcategoryItem = await subcategoryItemRepository.findOne({
            where: { id: subcategoryItemIdFromDto },
            relations: ['subcategory', 'subcategory.category'],
        });

        if (!subcategoryItem) {
            throw new NotFoundException(`Subcategory item with ID ${subcategoryItemIdFromDto} not found.`);
        }
        finalSubcategoryItem = subcategoryItem;
        tagDefaults = subcategoryItem.tag_defaults || {};
    }

    if (!finalSubcategoryItem) {
         // Should be caught in the main upsert function for new products, but good practice to throw here.
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

export function mapProductSizes(sizesDto: CreateProductSizeDto[], product: Product): ProductSize[] {
    if (!sizesDto || sizesDto.length === 0) return [];
    
    return sizesDto.map((size, i) => {
        const s = new ProductSize();
        s.size = size.size; // Assign the correct property from CreateProductSizeDto
        s.sortOrder = i;
        s.product = product;
        return s;
    });
}

