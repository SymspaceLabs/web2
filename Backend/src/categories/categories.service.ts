import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

// Define a type interface for the objects in the mixed array for type safety
interface MobileMenuItem {
    name: string;
    items: (string | MobileMenuItem)[]; // Can hold strings (leaf nodes) OR other menu objects
}

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoriesRepository.create(createCategoryDto);
    return await this.categoriesRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoriesRepository.find({
      relations: ['subcategories', 'subcategories.subcategoryItems', 'subcategories.subcategoryItems.subcategoryItemChildren', ], 
    });
  }

  async findAllMobile(): Promise<any[]> {
    // 1. Fetch the data with all three levels
    const categoriesData = await this.categoriesRepository.createQueryBuilder('category')
      .leftJoinAndSelect('category.subcategories', 'subcategory')
      .leftJoinAndSelect('subcategory.subcategoryItems', 'subcategoryItem')
      .leftJoinAndSelect('subcategoryItem.subcategoryItemChildren', 'subcategoryItemChild')
      
      // Filter: Only include Categories that have at least one Subcategory with mobileLevel1 set.
      .where((qb) => {
        const subQuery = qb.subQuery()
          .select('1')
          .from('subcategory', 'sub')
          .where('sub.categoryId = category.id')
          .andWhere('sub.mobileLevel1 IS NOT NULL')
          .getQuery();
        return 'EXISTS ' + subQuery;
      })
      
      // Select all necessary fields
      .select([
        'category.name', 
        'subcategory.mobileLevel1', 
        'subcategoryItem.name', 
        'subcategoryItem.mobileLevel2',
        'subcategoryItemChild.name',
        'subcategoryItemChild.mobileLevel3',
      ])
      .getMany(); 

  // ------------------------------------------------------------------------------------

    // 2. Initial grouping by mobileLevel1 (L1)
    const finalGroupedResults = new Map();

    for (const category of categoriesData) {
      if (category.subcategories) {
        for (const subcategory of category.subcategories) {
          const L1Key = subcategory.mobileLevel1;
          
          if (!L1Key) continue;

          if (!finalGroupedResults.has(L1Key)) {
            finalGroupedResults.set(L1Key, { name: L1Key, mergedSubcategoryItems: [] });
          }
          
          if (subcategory.subcategoryItems) {
            finalGroupedResults.get(L1Key).mergedSubcategoryItems.push(...subcategory.subcategoryItems);
          }
        }
      }
    }

  // ------------------------------------------------------------------------------------

    // 3. Final structure processing: Group L2 items and handle hierarchy
    return Array.from(finalGroupedResults.values()).map(group => {
      
      const L2GroupMap = new Map<string, MobileMenuItem>();
      const flatItems: string[] = []; 
      const uniqueL2ItemNames = new Set(); 

      for (const item of group.mergedSubcategoryItems) {
        const L3Children = item.subcategoryItemChildren;
        const L2Name = item.name;
        
        // Skip items that have no grouping defined and no children
        if (item.mobileLevel2 === null && (!L3Children || L3Children.length === 0)) {
            continue;
        }

        // Deduplication
        if (uniqueL2ItemNames.has(L2Name)) {
          continue;
        }
        uniqueL2ItemNames.add(L2Name);
        
        // CRITICAL: If an item HAS children, it MUST be treated as a nested object (Scenario 2 priority)
        const mustBeNestedObject = L3Children && L3Children.length > 0;
        
        // Grouping Key: Use mobileLevel2 IF it's not a must-be-nested-object. Otherwise, use L2Name.
        const groupingKey = (!mustBeNestedObject && item.mobileLevel2) ? item.mobileLevel2 : L2Name;
        
        // This flag is now ONLY true if the item uses mobileLevel2 AND has NO children (e.g., "Blouses" under "Tops")
        const isFlatMobileLevel2Group = !!item.mobileLevel2 && !mustBeNestedObject; 
        
        
        // Initialize the L2 group based on the determined groupingKey
        if (!L2GroupMap.has(groupingKey)) {
            L2GroupMap.set(groupingKey, { name: groupingKey, items: [] });
        }
        const L2Group = L2GroupMap.get(groupingKey)!;

        
        // --- Determine the Final Structure ---
        
        if (mustBeNestedObject) {
            // SCENARIO 2 (Priority): Has children (e.g., 'Bags' -> 'Handbags').
            const childNames = L3Children.map((child: { name: string }) => child.name);
            
            // Check for and handle the redundant L2->L3 naming (e.g., "Bags" contains "Bags")
            if (groupingKey === L2Name) {
                // If the grouping key (L2/outer group) is the same as the item name,
                // we skip creating the inner object and just promote the children directly to L2Group.
                // e.g., instead of {name: Bags, items: [{name: Bags, items: Handbags}]}, we get {name: Bags, items: [Handbags]}
                L2Group.items.push(...childNames);
            } else {
                // If the grouping key is different (e.g., L2 group is 'Accessories', item name is 'Bags'),
                // we create the nested object as required by the structure.
                const nestedItem: MobileMenuItem = {
                    name: L2Name,
                    items: childNames,
                };
                L2Group.items.push(nestedItem);
            }
            
        } else if (isFlatMobileLevel2Group) {
            // SCENARIO 1 (Flat L3 item): Grouped by mobileLevel2 but has NO children.
            L2Group.items.push(L2Name);
        } else {
            // SCENARIO 3: Simple flat L2 item 
            flatItems.push(L2Name);
        }
      }
      
      // Combine the grouped objects and flat strings
      let finalItems: (string | MobileMenuItem)[] = Array.from(L2GroupMap.values());
      finalItems.push(...flatItems);

// ------------------------------------------------------------------------------------

      // Handle Redundant L1/L2 Layer (FLATTENING)
      const redundantIndex = finalItems.findIndex(item => typeof item !== 'string' && item.name === group.name);

      if (redundantIndex !== -1) {
          const redundantGroup = finalItems[redundantIndex] as MobileMenuItem;
          finalItems.splice(redundantIndex, 1); 
          
          // Promote L3 children 
          finalItems.push(...redundantGroup.items);
      }
      
      // Sort L2/L3 items
      finalItems.sort((a, b) => {
          let nameA: string;
          let nameB: string;
          
          nameA = typeof a === 'string' ? a : (a as MobileMenuItem).name;
          nameB = typeof b === 'string' ? b : (b as MobileMenuItem).name;
          
          return nameA.localeCompare(nameB);
      });
      
      // Ensure nested children (L3/L4 items) are also sorted (using the robust filter fix)
      finalItems.forEach(item => {
          if (typeof item !== 'string' && item && 'items' in item && Array.isArray(item.items)) {
              
              // Filter to ensure only strings remain, resolving TypeScript 'localeCompare' issue
              const stringItems = item.items.filter((i): i is string => typeof i === 'string');
              
              // Deduplicate and sort the array of strings
              (item as MobileMenuItem).items = [...new Set(stringItems)].sort((a, b) => a.localeCompare(b));
          }
      });

      return {
        name: group.name,
        items: finalItems,
      };
    });
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    await this.categoriesRepository.update(id, updateCategoryDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleteResult = await this.categoriesRepository.delete(id);
    if (!deleteResult.affected) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return { message: `Category with ID ${id} successfully deleted` };
  }
}
