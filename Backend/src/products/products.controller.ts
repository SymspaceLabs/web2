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
    @Query('subcategoryItem') subcategoryItemSlug?: string // New parameter for subcategory item
  ) {
    return await this.productsService.findAll(search, categorySlug, subcategorySlug, subcategoryItemSlug);
  }

  @Get('search') // This will be your dedicated search endpoint: /products/search
  async search(
    @Query('q') query?: string, // The free-form search term
    // You might still keep these for more refined filtering,
    // but the main 'q' parameter will drive the free-form search.
    @Query('categorySlug') categorySlug?: string,
    @Query('subcategorySlug') subcategorySlug?: string,
  ) {
    // Delegate the search logic to the service
    const results = await this.productsService.performFreeFormSearch(query, categorySlug, subcategorySlug);
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

