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

  /**
   * Assumed Interface definition for clarity:
   * interface MobileMenuItem {
   * name: string;
   * items: (string | MobileMenuItem)[];
   * }
   */
  async findAllMobile(): Promise<any[]> { // Using 'any' for return type to match original signature
      // 1. Fetch the data (No change)
      const categoriesData = await this.categoriesRepository.createQueryBuilder('category')
          .leftJoinAndSelect('category.subcategories', 'subcategory')
          .leftJoinAndSelect('subcategory.subcategoryItems', 'subcategoryItem')
          .leftJoinAndSelect('subcategoryItem.subcategoryItemChildren', 'subcategoryItemChild')
          .where((qb) => {
              const subQuery = qb.subQuery()
                  .select('1')
                  .from('subcategory', 'sub')
                  .where('sub.categoryId = category.id')
                  .andWhere('sub.mobileLevel1 IS NOT NULL')
                  .getQuery();
              return 'EXISTS ' + subQuery;
          })
          .select([
              'category.name',
              'subcategory.mobileLevel1',
              'subcategoryItem.name',
              'subcategoryItem.mobileLevel2',
              'subcategoryItemChild.name',
              'subcategoryItemChild.mobileLevel3',
              'subcategoryItemChild.subCategoryItemId',
          ])
          .getMany();

  // ------------------------------------------------------------------------------------

      // 2. Initial grouping by mobileLevel1 (L1) (MODIFIED to hide parent name)
      const finalGroupedResults = new Map<string, any>();

      for (const category of categoriesData) {
          if (!category.subcategories) continue;
          for (const subcategory of category.subcategories) {
              const L1Key = subcategory.mobileLevel1;
              if (!L1Key) continue;
              if (!finalGroupedResults.has(L1Key)) {
                  finalGroupedResults.set(L1Key, { name: L1Key, mergedSubcategoryItems: [] });
              }

              if (subcategory.subcategoryItems) {
                  for (const item of subcategory.subcategoryItems) {
                      
                      let hasL3Child = false;
                      
                      // Check for L3-tagged children first
                      if (item.subcategoryItemChildren) {
                          for (const child of item.subcategoryItemChildren) {
                              // If a child has mobileLevel3, it will be grouped later
                              if (child.mobileLevel3) {
                                  hasL3Child = true;
                                  // Push L3-tagged children for later processing
                                  finalGroupedResults.get(L1Key).mergedSubcategoryItems.push(child);
                              }
                          }
                      }

                      // CRITICAL CHANGE: Only push the parent item (subcategoryItem) 
                      // if it has NO L3-tagged children. This prevents the parent name 
                      // from appearing when its children are being grouped by L3.
                      if (!hasL3Child) {
                          finalGroupedResults.get(L1Key).mergedSubcategoryItems.push(item);
                      }
                  }
              }
          }
      }

  // ------------------------------------------------------------------------------------

      // 3. Final structure processing: Group L2/L3 items and handle hierarchy (MODIFIED for flat objects and type fixes)
      return Array.from(finalGroupedResults.values()).map(group => {

          const L2L3GroupMap = new Map<string, any>(); // Map<string, MobileMenuItem>
          const groupNames = new Set<string>();
          
          const nestedItemNames = new Set<string>();
          const handledL2Items = new Set<string>();
          const finalFlatStrings = new Set<string>(); // Collects ALL items that will be converted to { name: X, items: [] }

          for (const item of group.mergedSubcategoryItems) {
              const itemL2Name = item.name;
              const mobileLevel2 = item.mobileLevel2;
              const mobileLevel3 = item.mobileLevel3;
              const L4Children = item.subcategoryItemChildren;

              // --- SCENARIO 3: L3 Grouping (mobileLevel3 is the parent name) ---
              if (mobileLevel3) {
                  handledL2Items.add(itemL2Name);
                  
                  // If the L2 item name matches the L3 group name, it's a standalone promotion item
                  if (itemL2Name === mobileLevel3) {
                      finalFlatStrings.add(itemL2Name); // Directly add to the final set
                  } else { // Item is a child under a different L3 group
                      nestedItemNames.add(itemL2Name);
                      groupNames.add(mobileLevel3);
                      const L3Group = L2L3GroupMap.get(mobileLevel3);
                      if (!L3Group) {
                          L2L3GroupMap.set(mobileLevel3, { name: mobileLevel3, items: [itemL2Name] });
                      } else {
                          L3Group.items.push(itemL2Name);
                      }
                  }
                  continue;
              }

              // --- SCENARIO 1 & 2: L2 Grouping ---
              
              const mustBeNestedObject = L4Children && L4Children.length > 0;
              const groupingKey = (!mustBeNestedObject && mobileLevel2) ? mobileLevel2 : itemL2Name;
              const isFlatMobileLevel2Group = !!mobileLevel2 && !mustBeNestedObject;

              if (mustBeNestedObject) {
                  // SCENARIO 2 (L2 -> L4): Creates a nested object.
                  groupNames.add(groupingKey);
                  handledL2Items.add(itemL2Name);

                  const childrenToAdd: string[] = [];

                  for (const child of L4Children) {
                      const childL3 = child.mobileLevel3;
                      const childName = child.name;

                      // RULE: If L3 matches the L2 name, promote the child.
                      if (childL3 && childL3 === mobileLevel2) {
                          finalFlatStrings.add(childName); // Directly add promoted item to final set
                      } else {
                          childrenToAdd.push(childName);
                          nestedItemNames.add(childName);
                      }
                  }

                  if (childrenToAdd.length > 0) {
                      let L2Group = L2L3GroupMap.get(groupingKey);
                      if (!L2Group) {
                          L2Group = { name: groupingKey, items: [] };
                          L2L3GroupMap.set(groupingKey, L2Group);
                      }

                      if (groupingKey === itemL2Name) {
                          L2Group.items.push(...childrenToAdd);
                      } else {
                          const nestedItem: any = { // MobileMenuItem
                              name: itemL2Name,
                              items: childrenToAdd,
                          };
                          L2Group.items.push(nestedItem);
                      }
                  }

              } else if (isFlatMobileLevel2Group) {
                  // SCENARIO 1 (Flat L3 item): Pushes item name into L2 Group
                  groupNames.add(groupingKey);
                  nestedItemNames.add(itemL2Name);
                  handledL2Items.add(itemL2Name);

                  let L2Group = L2L3GroupMap.get(groupingKey);
                  if (!L2Group) {
                      L2Group = L2L3GroupMap.set(groupingKey, { name: groupingKey, items: [itemL2Name] }).get(groupingKey);
                  } else {
                      L2Group.items.push(itemL2Name);
                  }

              } else {
                  // SCENARIO 4: Simple flat L2 item (No grouping/children).
                  if (!handledL2Items.has(itemL2Name)) {
                      finalFlatStrings.add(itemL2Name);
                      handledL2Items.add(itemL2Name);
                  }
              }
          }

          // --- L2 Group Redundancy Suppression ---
          let filteredGroups = Array.from(L2L3GroupMap.values()).filter(group => {
              if (group.name === 'Jewelry & Watches') {
                  if (L2L3GroupMap.has('Jewelry') && L2L3GroupMap.has('Watches')) return false;
              }
              if (group.name === 'Wallets & Belts') {
                  if (L2L3GroupMap.has('Wallets') && L2L3GroupMap.has('Belts')) return false;
              }
              return true;
          });

          // Remove any groups that became empty
          filteredGroups = filteredGroups.filter(group => group.items.length > 0);

          const finalItems: (string | any)[] = []; // (string | MobileMenuItem)[]

          for (const item of filteredGroups) {
              // Flatten Redundant Single-Child Objects
              if (item.items.length === 1 && item.items[0] === item.name) {
                  finalFlatStrings.add(item.name);
                  groupNames.delete(item.name);
              } else {
                  finalItems.push(item);
              }
          }

          // --- FINAL ARRAY ASSEMBLY (Deduplication Guarantee) ---
          
          // MODIFICATION: Convert ALL items in finalFlatStrings into objects with empty items array.
          const flatObjects = Array.from(finalFlatStrings)
              .sort((a, b) => a.localeCompare(b))
              .map(name => ({ name: name, items: [] }));

          // Add these new objects to the final items array
          finalItems.push(...flatObjects);

          // ------------------------------------------------------------------------------------

          // Handle Redundant L1/L2 Layer (FLATTENING)
          const redundantIndex = finalItems.findIndex(item => typeof item !== 'string' && item.name === group.name);

          if (redundantIndex !== -1) {
              const redundantGroup = finalItems[redundantIndex] as any; // MobileMenuItem
              finalItems.splice(redundantIndex, 1);
              // Ensure items are only strings/objects before pushing
              finalItems.push(...redundantGroup.items.filter((i: any) => typeof i === 'string' || typeof i === 'object')); 
          }

          // Final sort of all items (strings and objects) - FIXED TYPE ERROR
          finalItems.sort((a, b) => {
              // Extract the name string safely using 'any' casting for object properties
              const nameA = typeof a === 'string' ? a : (a as any).name;
              const nameB = typeof b === 'string' ? b : (b as any).name;
              
              // Cast to string to satisfy localeCompare
              return (nameA as string).localeCompare(nameB as string);
          });

          // Final deduplication and sort of children within any remaining objects - FIXED TYPE ERROR
          finalItems.forEach(item => {
              if (typeof item !== 'string' && item && 'items' in item && Array.isArray(item.items)) {
                  const stringItems = item.items.filter((i): i is string => typeof i === 'string');
                  const objectItems = item.items.filter((i): i is any => typeof i !== 'string'); // MobileMenuItem
                  
                  // Fix: Explicitly type the sort callback arguments as 'string'
                  (item as any).items = [ // MobileMenuItem
                      ...objectItems, 
                      ...[...new Set(stringItems)].sort((a: string, b: string) => a.localeCompare(b)) 
                  ];
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
