// src/subcategory-item-child/subcategory-item-child.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { SubcategoryItemChildService } from './subcategory-item-child.service';
import { SubcategoryItemChildController } from './subcategory-item-child.controller';
import { SubcategoryItemChild } from './entities/subcategory-item-child.entity'; // Import your entity

@Module({
  imports: [
    TypeOrmModule.forFeature([SubcategoryItemChild]), // <-- Add this line
  ],
  controllers: [SubcategoryItemChildController],
  providers: [SubcategoryItemChildService],
  exports: [SubcategoryItemChildService] // It's good practice to export the service if other modules might need it
})
export class SubcategoryItemChildModule {}
