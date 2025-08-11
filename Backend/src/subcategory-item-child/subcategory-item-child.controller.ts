import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubcategoryItemChildService } from './subcategory-item-child.service';
import { CreateSubcategoryItemChildDto } from './dto/create-subcategory-item-child.dto';
import { UpdateSubcategoryItemChildDto } from './dto/update-subcategory-item-child.dto';

@Controller('subcategory-item-child')
export class SubcategoryItemChildController {
  constructor(private readonly subcategoryItemChildService: SubcategoryItemChildService) {}

  // @Post()
  // create(@Body() createSubcategoryItemChildDto: CreateSubcategoryItemChildDto) {
  //   return this.subcategoryItemChildService.create(createSubcategoryItemChildDto);
  // }

  @Get()
  findAll() {
    return this.subcategoryItemChildService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subcategoryItemChildService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSubcategoryItemChildDto: UpdateSubcategoryItemChildDto) {
  //   return this.subcategoryItemChildService.update(+id, updateSubcategoryItemChildDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.subcategoryItemChildService.remove(+id);
  // }
}
