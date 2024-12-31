import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Subcategory } from 'src/subcategories/entities/subcategory.entity';
import { SubcategoryItem } from 'src/subcategory-items/entities/subcategory-item.entity';
import { categoriesSeedData } from './category/data';
import { blogSeedData } from './blog/data';
import { Blog } from 'src/blogs/entities/blog.entity';

@Injectable()
export class SeederService {
  constructor(
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
    await this.clear();

        // SEED CATEGORIES
        for (const categoryData of categoriesSeedData) {
          const existingCategory = await this.categoryRepository.findOne({ where: { id: categoryData.id } });
    
          const category = this.categoryRepository.create({
            id: categoryData.id, // Use hardcoded id
            name: categoryData.name,
          });
    
          // Save or update the category
          await this.categoryRepository.save(category);
    
          for (const subcategoryData of categoryData.subcategories) {
            const existingSubcategory = await this.subcategoryRepository.findOne({ where: { id: subcategoryData.id } });
    
            const subcategory = this.subcategoryRepository.create({
              id: subcategoryData.id, // Use hardcoded id
              name: subcategoryData.name,
              category,
            });
    
            // Save or update the subcategory
            await this.subcategoryRepository.save(subcategory);
    
            for (const subcategoryItemData of subcategoryData.subcategoryItems) {
              const existingSubcategoryItem = await this.subcategoryItemRepository.findOne({
                where: { id: subcategoryItemData.id },
              });
    
              const subcategoryItem = this.subcategoryItemRepository.create({
                id: subcategoryItemData.id, // Use hardcoded id
                name: subcategoryItemData.name,
                subcategory,
              });
    
              // Save or update the subcategory item
              await this.subcategoryItemRepository.save(subcategoryItem);
            }
          }
        }

    //SEED BLOGS
    for (const blog of blogSeedData) {
      const existingBlog = await this.blogRepository.findOne({
        where: { slug: blog.slug },
      });
      if (!existingBlog) {
        const newBlog = this.blogRepository.create(blog);
        await this.blogRepository.save(newBlog);
      }
    }
  }

  async clear() {
    await this.subcategoryItemRepository.delete({});
    await this.subcategoryRepository.delete({});
    await this.categoryRepository.delete({});
    await this.blogRepository.delete({});
  }
}
