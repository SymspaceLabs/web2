// src/seed/seeder.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Subcategory } from 'src/subcategories/entities/subcategory.entity';
import { SubcategoryItem } from 'src/subcategory-items/entities/subcategory-item.entity';
import { SubcategoryItemChild } from 'src/subcategory-item-child/entities/subcategory-item-child.entity';
import { CATEGORIES_DATA } from './category/data';
import {
  CategorySeedData,
  SubcategorySeedData,
  SubcategoryItemSeedData,
  SubcategoryItemChildSeedData,
} from './category/interfaces';

@Injectable()
export class SeederService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(SubcategoryItem)
    private readonly subcategoryItemRepository: Repository<SubcategoryItem>,
    @InjectRepository(SubcategoryItemChild)
    private readonly subcategoryItemChildRepository: Repository<SubcategoryItemChild>,
  ) {}

  /** ✅ Safely wipes all relevant tables in child → parent order */
  private async clearDatabase() {
    await this.dataSource.query('SET FOREIGN_KEY_CHECKS = 0');

    // await this.blogRepository.clear();
    await this.subcategoryItemChildRepository.clear();
    await this.subcategoryItemRepository.clear();
    await this.subcategoryRepository.clear();
    await this.categoryRepository.clear();

    await this.dataSource.query('SET FOREIGN_KEY_CHECKS = 1');
  }

  async seed() {
    // 🔥 Step 1: Clear before transaction
    await this.clearDatabase();

    // 🔥 Step 2: Insert fresh data in a transaction
    await this.dataSource.transaction(async (manager) => {
      const categoryRepo = manager.getRepository(Category);
      const subcategoryRepo = manager.getRepository(Subcategory);
      const subcategoryItemRepo = manager.getRepository(SubcategoryItem);
      const subcategoryItemChildRepo = manager.getRepository(SubcategoryItemChild);

      // Insert Categories → Subcategories → Items → Children
      for (const categoryData of CATEGORIES_DATA as CategorySeedData[]) {
        const category = categoryRepo.create({
          id: categoryData.id,
          name: categoryData.name,
          slug: categoryData.slug,
        });
        await categoryRepo.save(category);

        for (const subcategoryData of categoryData.subcategories as SubcategorySeedData[]) {
          const subcategory = subcategoryRepo.create({
            id: subcategoryData.id,
            name: subcategoryData.name,
            slug: subcategoryData.slug,
            category,
          });
          await subcategoryRepo.save(subcategory);

          for (const subcategoryItemData of subcategoryData.subcategoryItems as SubcategoryItemSeedData[]) {
            const subcategoryItem = subcategoryItemRepo.create({
              id: subcategoryItemData.id,
              name: subcategoryItemData.name,
              slug: subcategoryItemData.slug,
              subcategory,
            });
            await subcategoryItemRepo.save(subcategoryItem);

            if (
              subcategoryItemData.subcategoryItemChildren &&
              subcategoryItemData.subcategoryItemChildren.length > 0
            ) {
              for (const subcategoryItemChildData of subcategoryItemData.subcategoryItemChildren as SubcategoryItemChildSeedData[]) {
                const subcategoryItemChild = subcategoryItemChildRepo.create({
                  id: subcategoryItemChildData.id,
                  name: subcategoryItemChildData.name,
                  slug: subcategoryItemChildData.slug,
                  subcategoryItem: subcategoryItem,
                });
                await subcategoryItemChildRepo.save(subcategoryItemChild);
              }
            }
          }
        }
      }
    });
  }
}
