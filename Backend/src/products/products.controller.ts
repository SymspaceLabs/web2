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
import { SearchSuggestion } from './products.service'; // Add this line

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
    @Query('category') categoryName?: string, // Changed from categorySlug
    @Query('subcategory') subcategoryName?: string, // Changed from subcategorySlug
    @Query('subcategoryItem') subcategoryItemName?: string, // Changed from subcategoryItemSlug
    @Query('subcategoryItemChild') subcategoryItemChildName?: string // Changed from subcategoryItemChildSlug
  ) {
    return await this.productsService.findAll(
      search,
      categoryName,
      subcategoryName,
      subcategoryItemName,
      subcategoryItemChildName
    );
  }

  @Get('search') // This must be placed before the general ':id' or ':slug' route
  async search(@Query('q') query?: string) {
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

