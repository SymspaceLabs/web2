import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { Category } from 'src/categories/entities/category.entity';
import { Subcategory } from 'src/subcategories/entities/subcategory.entity';
import { SubcategoryItem } from 'src/subcategory-items/entities/subcategory-item.entity';
import { Blog } from 'src/blogs/entities/blog.entity';
import { Product } from 'src/products/entities/product.entity';
import { SubcategoryItemChild } from 'src/subcategory-item-child/entities/subcategory-item-child.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog, Category, Subcategory, SubcategoryItem, SubcategoryItemChild, Product]),
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
