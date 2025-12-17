import { Controller, Get, UseGuards, Param, Post, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; 
import { Roles } from 'src/common/decorators/roles.decorator'; 
import { RolesGuard } from 'src/common/guards/roles.guard'; 
import { UserRole } from 'src/users/entities/user.entity';
import { AdminCompaniesService } from './admin-companies.services';

@Controller('admin/companies') 
@UseGuards(AuthGuard('jwt'), RolesGuard) 
@Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN) 
export class AdminCompaniesController {
  constructor(private readonly adminCompaniesService: AdminCompaniesService) {}

  // 1. Endpoint to retrieve all companies
  // Route: GET /admin/companies
  @Get()
  findAllCompanies() {
    return this.adminCompaniesService.findAllCompanies();
  }
  
  // 2. Endpoint to retrieve a single product by ID
  // Route: GET /admin/companies/:id
  @Get(':id')
  findOneCompany(@Param('id') id: string) {
    // The string 'id' from the URL is passed as the argument
    return this.adminCompaniesService.findOneCompany(id);
  }
}