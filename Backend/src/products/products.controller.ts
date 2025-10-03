import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { SearchResultResponse } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
  ) {}

  @Post()
  async create(@Body() body: CreateProductDto) {
    return this.productsService.upsert(undefined, body);
  }
  
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: CreateProductDto) {
    return this.productsService.upsert(id, body);
  }  

  @Get()
  async getAllProducts(
    @Query('search') search?: string,
    @Query('category') categorySlug?: string,
    @Query('subcategory') subcategorySlug?: string,
    @Query('subcategoryItem') subcategoryItemSlugs?: string | string[],
    @Query('subcategoryItemChild') subcategoryItemChildSlug?: string,
    @Query('gender') genders?: string | string[]
  ) {

    const subcategoryItemSlugsArray = Array.isArray(subcategoryItemSlugs) 
    ? subcategoryItemSlugs 
    : subcategoryItemSlugs ? [subcategoryItemSlugs] : undefined;

    const gendersArray = Array.isArray(genders) 
      ? genders 
      : genders ? [genders] : undefined;

    return await this.productsService.findAll(
      search,
      categorySlug,
      subcategorySlug,
      subcategoryItemSlugsArray,
      subcategoryItemChildSlug,
      gendersArray
    );
  }

  @Get('search') // This must be placed before the general ':id' or ':slug' route
    async search(@Query('q') query?: string): Promise<SearchResultResponse> {
      // The service now returns the structured object { shops: [], searchResults: [] }
      const results = await this.productsService.performFreeFormSearch(query);
      return results;
  }


  @Get(':slug')
  async getProductBySlug(@Param('slug') slug: string): Promise<Product> {
    return this.productsService.findBySlug(slug);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const productDetail = await this.productsService.findOne(id);
    return productDetail;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

}

