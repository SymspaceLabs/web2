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
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { SearchResultResponse } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductVariantsDto } from './dto/update-product-variants.dto';

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

  // This is for updating variants data
  @Patch(':id/variants')
  async updateVariants(
    @Param('id') productId: string,
    @Body() dto: UpdateProductVariantsDto
  ) {
    return this.productsService.updateProductVariants(productId, dto);
  }

  @Get()
  async getAllProducts(
    @Query('search') search?: string,
    @Query('category') categorySlug?: string,
    @Query('subcategory') subcategorySlug?: string,
    @Query('subcategoryItem') subcategoryItemSlugs?: string | string[],
    @Query('subcategoryItemChild') subcategoryItemChildSlug?: string,
    @Query('gender') genders?: string | string[],
    @Query('ageGroup') ageGroups?: string | string[],
    @Query('companyId') companyId?: string,
  ) {

    const subcategoryItemSlugsArray = Array.isArray(subcategoryItemSlugs) 
    ? subcategoryItemSlugs 
    : subcategoryItemSlugs ? [subcategoryItemSlugs] : undefined;

    const gendersArray = Array.isArray(genders) 
      ? genders 
      : genders ? [genders] : undefined;

    const ageGroupsArray = Array.isArray(ageGroups) 
        ? ageGroups 
        : ageGroups ? [ageGroups] : undefined; 

    return await this.productsService.findAll(
      search,
      categorySlug,
      subcategorySlug,
      subcategoryItemSlugsArray,
      subcategoryItemChildSlug,
      gendersArray,
      ageGroupsArray,
      companyId
    );
  }

  @Get('search')
    async search(@Query('q') query?: string): Promise<SearchResultResponse> {
      const results = await this.productsService.performFreeFormSearch(query);
      return results;
  }

  @Get('slug/:slug')
  async getProductBySlug(@Param('slug') slug: string): Promise<Product> {
    return this.productsService.findBySlug(slug);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  // Dedicated endpoint to fetch products by Company ID.
  // Route: GET /products/company/:companyId
  @Get('company/:companyId')
  async getProductsByCompany(@Param('companyId') companyId: string): Promise<Product[]> {
    // Assuming ProductsService has a method to find products by company ID
    return this.productsService.findByCompany(companyId); 
  }
}

