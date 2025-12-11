import { Controller, Get, UseGuards, Param, Post, NotFoundException } from '@nestjs/common';
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

  // 1. Endpoint to retrieve all products
  // Route: GET /admin/products
  @Get()
  findAllProducts() {
    return this.adminProductsService.findAllProducts();
  }
  
  // 2. Endpoint to retrieve a single product by ID
  // Route: GET /admin/products/:id
  @Get(':id')
  findOneProduct(@Param('id') id: string) {
    // The string 'id' from the URL is passed as the argument
    return this.adminProductsService.findOneProduct(id);
  }
}