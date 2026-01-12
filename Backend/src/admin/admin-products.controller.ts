import { Controller, Get, UseGuards, Param, Query, ParseBoolPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; 
import { Roles } from 'src/common/decorators/roles.decorator'; 
import { RolesGuard } from 'src/common/guards/roles.guard'; 
import { UserRole } from 'src/users/entities/user.entity';
import { AdminProductsService } from './admin-products.service';

@Controller('admin/products') 
@UseGuards(AuthGuard('jwt'), RolesGuard) 
@Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN) 
export class AdminProductsController {
  constructor(private readonly adminProductsService: AdminProductsService) {}

  // Endpoint to retrieve all products with optional variants
  // Route: GET /admin/products?withVariants=true
  @Get()
  findAllProducts(
    @Query('withVariants', new ParseBoolPipe({ optional: true })) withVariants?: boolean
  ) {
    return this.adminProductsService.findAllProducts(
      undefined, // searchTerm
      undefined, // categorySlug
      undefined, // subcategorySlug
      undefined, // subcategoryItemSlugs
      undefined, // subcategoryItemChildSlug
      undefined, // genders
      undefined, // ageGroups
      undefined, // companyId
      withVariants // withVariants
    );
  }
  
  // Endpoint to retrieve a single product by ID
  // Route: GET /admin/products/:id
  @Get(':id')
  findOneProduct(@Param('id') id: string) {
    return this.adminProductsService.findOneProduct(id);
  }
}