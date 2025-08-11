// src/seed/seeder.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Subcategory } from 'src/subcategories/entities/subcategory.entity';
import { SubcategoryItem } from 'src/subcategory-items/entities/subcategory-item.entity';
// Corrected import path: removed extra '.ts'; ensure this path matches your file structure
import { SubcategoryItemChild } from 'src/subcategory-item-child/entities/subcategory-item-child.entity'; 
import { categoriesSeedData } from './category/data';
import { blogSeedData } from './blog/data';
import { Blog } from 'src/blogs/entities/blog.entity';
import { CategorySeedData, SubcategorySeedData, SubcategoryItemSeedData, SubcategoryItemChildSeedData } from './category/interfaces';

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
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async seed() {
    await this.dataSource.transaction(async (manager) => {
      const categoryRepo = manager.getRepository(Category);
      const subcategoryRepo = manager.getRepository(Subcategory);
      const subcategoryItemRepo = manager.getRepository(SubcategoryItem);
      const subcategoryItemChildRepo = manager.getRepository(SubcategoryItemChild);

      // SEED CATEGORIES
      for (const categoryData of categoriesSeedData as CategorySeedData[]) {
        let category = await categoryRepo.findOne({ where: { id: categoryData.id } });
        if (!category) {
          category = categoryRepo.create({
            id: categoryData.id,
            name: categoryData.name,
          });
          await categoryRepo.save(category);
        } else {
          category.name = categoryData.name;
          await categoryRepo.save(category);
        }

        for (const subcategoryData of categoryData.subcategories as SubcategorySeedData[]) {
          let subcategory = await subcategoryRepo.findOne({ where: { id: subcategoryData.id } });
          if (!subcategory) {
            subcategory = subcategoryRepo.create({
              id: subcategoryData.id,
              name: subcategoryData.name,
              category,
              // gender: subcategoryData.gender,
            });
            await subcategoryRepo.save(subcategory);
          } else {
            subcategory.name = subcategoryData.name;
            subcategory.category = category;
            // subcategory.gender = subcategoryData.gender;
            await subcategoryRepo.save(subcategory);
          }

          for (const subcategoryItemData of subcategoryData.subcategoryItems as SubcategoryItemSeedData[]) {
            let subcategoryItem = await subcategoryItemRepo.findOne({ where: { id: subcategoryItemData.id } });
            if (!subcategoryItem) {
              subcategoryItem = subcategoryItemRepo.create({
                id: subcategoryItemData.id,
                name: subcategoryItemData.name,
                subcategory,
                // slug: subcategoryItemData.slug,
                // tags_required: subcategoryItemData.tags_required,
                // optional_tags: subcategoryItemData.optional_tags,
                // tag_defaults: subcategoryItemData.tag_defaults,
              });
            } else {
              subcategoryItem.name = subcategoryItemData.name;
              subcategoryItem.subcategory = subcategory;
              // subcategoryItem.slug = subcategoryItemData.slug;
              // subcategoryItem.tags_required = subcategoryItemData.tags_required;
              // subcategoryItem.optional_tags = subcategoryItemData.optional_tags;
              // subcategoryItem.tag_defaults = subcategoryItemData.tag_defaults;
            }
            await subcategoryItemRepo.save(subcategoryItem);

            // Conditional check for subcategoryItemChildren
            if (subcategoryItemData.subcategoryItemChildren && subcategoryItemData.subcategoryItemChildren.length > 0) {
              for (const subcategoryItemChildData of subcategoryItemData.subcategoryItemChildren as SubcategoryItemChildSeedData[]) {
                let subcategoryItemChild = await subcategoryItemChildRepo.findOne({ where: { id: subcategoryItemChildData.id } });
                if (!subcategoryItemChild) {
                  subcategoryItemChild = subcategoryItemChildRepo.create({
                    id: subcategoryItemChildData.id,
                    name: subcategoryItemChildData.name,
                    // slug: subcategoryItemChildData.slug,
                    // tags_required: subcategoryItemChildData.tags_required,
                    // optional_tags: subcategoryItemChildData.optional_tags,
                    // tag_defaults: subcategoryItemChildData.tag_defaults,
                    // 🐛 FIX: Explicitly cast 'subcategoryItem' to SubcategoryItem
                    subcategoryItem: subcategoryItem as SubcategoryItem, 
                  });
                  await subcategoryItemChildRepo.save(subcategoryItemChild);
                } else {
                  subcategoryItemChild.name = subcategoryItemChildData.name;
                  // subcategoryItemChild.slug = subcategoryItemChildData.slug;
                  // subcategoryItemChild.tags_required = subcategoryItemChildData.tags_required;
                  // subcategoryItemChild.optional_tags = subcategoryItemChildData.optional_tags;
                  // subcategoryItemChild.tag_defaults = subcategoryItemChildData.tag_defaults;
                  // 🐛 FIX: Explicitly cast 'subcategoryItem' to SubcategoryItem
                  subcategoryItemChild.subcategoryItem = subcategoryItem as SubcategoryItem; 
                  await subcategoryItemChildRepo.save(subcategoryItemChild);
                }
              }
            }
          }
        }
      }

      // SEED BLOGS (uncomment and use if needed)
      // const blogRepo = manager.getRepository(Blog);
      // for (const blog of blogSeedData) {
      //   let existingBlog = await blogRepo.findOne({ where: { slug: blog.slug } });
      //   if (!existingBlog) {
      //     const newBlog = blogRepo.create(blog);
      //     await blogRepo.save(newBlog);
      //   } else {
      //     existingBlog.title = blog.title;
      //     existingBlog.content = blog.content;
      //     await blogRepo.save(existingBlog);
      //   }
      // }
    });
  }
}