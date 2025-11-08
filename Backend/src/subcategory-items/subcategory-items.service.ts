import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { SubcategoryItem } from './entities/subcategory-item.entity';
import { Subcategory } from '../subcategories/entities/subcategory.entity';
import { CreateSubcategoryItemDto } from './dto/create-subcategory-item.dto';
import { UpdateSubcategoryItemDto } from './dto/update-subcategory-item.dto';
import { SubcategoryItemChild } from 'src/subcategory-item-child/entities/subcategory-item-child.entity';

@Injectable()
export class SubcategoryItemsService {
  constructor(
    @InjectRepository(SubcategoryItem)
    private subcategoryItemsRepository: Repository<SubcategoryItem>,
    @InjectRepository(Subcategory)
    private subcategoriesRepository: Repository<Subcategory>,
    // 🌟 Inject the repository for the third level as well
    @InjectRepository(SubcategoryItemChild)
    private subcategoryItemChildRepository: Repository<SubcategoryItemChild>,
  ) {}

  async create(
    createSubcategoryItemDto: CreateSubcategoryItemDto,
  ): Promise<SubcategoryItem> {
    const subcategory = await this.subcategoriesRepository.findOne({
      where: { id: createSubcategoryItemDto.subcategoryId },
    });
    if (!subcategory) {
      throw new NotFoundException(
        `Subcategory with ID ${createSubcategoryItemDto.subcategoryId} not found`,
      );
    }

    const subcategoryItem = this.subcategoryItemsRepository.create({
      ...createSubcategoryItemDto,
      subcategory,
    });

    return await this.subcategoryItemsRepository.save(subcategoryItem);
  }

  async findAll(): Promise<SubcategoryItem[]> {
    return await this.subcategoryItemsRepository.find({
      relations: ['subcategory'],
    });
  }

  async findOne(id: string): Promise<SubcategoryItem> {
    const subcategoryItem = await this.subcategoryItemsRepository.findOne({
      where: { id } 
    });
    if (!subcategoryItem) {
      throw new NotFoundException(`SubcategoryItem with ID ${id} not found`);
    }
    return subcategoryItem;
  }

  async update(
    id: string,
    updateSubcategoryItemDto: UpdateSubcategoryItemDto,
  ): Promise<SubcategoryItem> {
    const subcategoryItem = await this.subcategoryItemsRepository.preload({
      id,
      ...updateSubcategoryItemDto,
    });
    if (!subcategoryItem) {
      throw new NotFoundException(`SubcategoryItem with ID ${id} not found`);
    }
    return await this.subcategoryItemsRepository.save(subcategoryItem);
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.subcategoryItemsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`SubcategoryItem with ID ${id} not found`);
    }
    return {
      message: `SubcategoryItem with ID ${id} has been successfully deleted`,
    };
  }

  /**
   * Finds a subcategory record by slug, checking SubcategoryItem (Level 2)
   * and SubcategoryItemChild (Level 3) entities.
   * @param slug The unique slug string (e.g., 'handbags').
   * @returns The full found entity record.
   */
  async findOneBySlug(slug: string): Promise<SubcategoryItem | SubcategoryItemChild> {
    
    // 1. 🔍 Attempt to find the slug in the second level (SubcategoryItem)
    const item = await this.subcategoryItemsRepository.findOne({ 
      where: { slug },
    });

    if (item) {
      // Found the item at the second level
      return item;
    }

    // 2. 🔍 If not found, attempt to find the slug in the third level (SubcategoryItemChild)
    const childItem = await this.subcategoryItemChildRepository.findOne({
      where: { slug },
    });

    if (childItem) {
      // Found the item at the third level
      return childItem;
    }

    // 3. 🛑 If still not found, throw a 404 error
    throw new NotFoundException(`Subcategory record with slug "${slug}" not found in any level.`);
  }
}
