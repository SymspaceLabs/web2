import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Subcategory } from 'src/subcategories/entities/subcategory.entity';
import { SubcategoryItem } from 'src/subcategory-items/entities/subcategory-item.entity';
import { categoriesSeedData } from './category/data';
import { blogSeedData } from './blog/data';
import { Blog } from 'src/blogs/entities/blog.entity';

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
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async seed() {
    await this.dataSource.transaction(async (manager) => {
      // SEED CATEGORIES
      const categoryRepository = manager.getRepository(Category);
      const subcategoryRepository = manager.getRepository(Subcategory);
      const subcategoryItemRepository = manager.getRepository(SubcategoryItem);
  
      for (const categoryData of categoriesSeedData) {
        let category = await categoryRepository.findOne({ where: { id: categoryData.id } });
        if (!category) {
          category = categoryRepository.create({
            id: categoryData.id,
            name: categoryData.name,
          });
          await categoryRepository.save(category);
        } else {
          category.name = categoryData.name; // Update if necessary
          await categoryRepository.save(category);
        }
  
        for (const subcategoryData of categoryData.subcategories) {
          let subcategory = await subcategoryRepository.findOne({ where: { id: subcategoryData.id } });
          if (!subcategory) {
            subcategory = subcategoryRepository.create({
              id: subcategoryData.id,
              name: subcategoryData.name,
              category,
            });
            await subcategoryRepository.save(subcategory);
          } else {
            subcategory.name = subcategoryData.name; // Update if necessary
            subcategory.category = category;
            await subcategoryRepository.save(subcategory);
          }
  
          for (const subcategoryItemData of subcategoryData.subcategoryItems) {
            let subcategoryItem = await subcategoryItemRepository.findOne({ where: { id: subcategoryItemData.id } });
            if (!subcategoryItem) {
              subcategoryItem = subcategoryItemRepository.create({
                id: subcategoryItemData.id,
                name: subcategoryItemData.name,
                subcategory,
              });
            } else {
              subcategoryItem.name = subcategoryItemData.name; // Update if necessary
              subcategoryItem.subcategory = subcategory;
            }
            await subcategoryItemRepository.save(subcategoryItem);
          }
        }
      }
  
      // SEED BLOGS
      const blogRepository = manager.getRepository(Blog);
      for (const blog of blogSeedData) {
        let existingBlog = await blogRepository.findOne({
          where: { slug: blog.slug },
        });
        if (!existingBlog) {
          const newBlog = blogRepository.create(blog);
          await blogRepository.save(newBlog);
        } else {
          existingBlog.title = blog.title; // Update fields as necessary
          existingBlog.content = blog.content;
          await blogRepository.save(existingBlog);
        }
      }
    });
  }
}
