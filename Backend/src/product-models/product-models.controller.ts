import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductModelsService } from './product-models.service';
import { CreateProductModelDto } from './dto/create-product-model.dto';
import { UpdateProductModelDto } from './dto/update-product-model.dto';

@Controller('product-models')
export class ProductModelsController {
  constructor(private readonly productModelsService: ProductModelsService) {}

  @Post()
  create(@Body() createProductModelDto: CreateProductModelDto) {
    return this.productModelsService.create(createProductModelDto);
  }

  @Get()
  findAll() {
    return this.productModelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productModelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductModelDto: UpdateProductModelDto) {
    return this.productModelsService.update(+id, updateProductModelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productModelsService.remove(+id);
  }
}
