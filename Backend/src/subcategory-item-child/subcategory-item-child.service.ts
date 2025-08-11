// src/subcategory-item-child/subcategory-item-child.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubcategoryItemChild } from './entities/subcategory-item-child.entity'; // Import your entity

@Injectable()
export class SubcategoryItemChildService {
  constructor(
    @InjectRepository(SubcategoryItemChild)
    private readonly subcategoryItemChildRepository: Repository<SubcategoryItemChild>,
  ) {}

  /**
   * Retrieves all subcategory item children.
   * @returns An array of all subcategory item children.
   */
  async findAll(): Promise<SubcategoryItemChild[]> {
    return this.subcategoryItemChildRepository.find();
  }

  /**
   * Retrieves a single subcategory item child by its ID.
   * @param id The ID of the subcategory item child to find.
   * @returns The found subcategory item child.
   * @throws NotFoundException if the subcategory item child with the given ID is not found.
   */
  async findOne(id: string): Promise<SubcategoryItemChild> {
    const subcategoryItemChild = await this.subcategoryItemChildRepository.findOneBy({ id });
    if (!subcategoryItemChild) {
      throw new NotFoundException(`SubcategoryItemChild with ID "${id}" not found.`);
    }
    return subcategoryItemChild;
  }
}
