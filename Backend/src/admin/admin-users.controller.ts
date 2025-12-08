import { Controller, Get, UseGuards, Param, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // For JWT authentication
import { Roles } from 'src/common/decorators/roles.decorator'; // Custom @Roles decorator
import { RolesGuard } from 'src/common/guards/roles.guard'; // Custom RolesGuard
import { UserRole } from 'src/users/entities/user.entity';
import { AdminUsersService } from './admin-users.service';

@Controller('admin/users') // The route prefix for all endpoints in this controller
@UseGuards(AuthGuard('jwt'), RolesGuard) // Apply Guards to the entire controller
@Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN) // Only Admins and Super Admins can access
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  // 1. Endpoint to retrieve all users
  // Route: GET /admin/users
  @Get()
  // Since guards are set on the class level, this is protected.
  findAllUsers() {
    return this.adminUsersService.findAllUsers();
  }

  // 2. Endpoint to retrieve a single product by ID
  // Route: GET /admin/products/:id
  @Get(':id')
  findOneProduct(@Param('id') id: string) {
    // The string 'id' from the URL is passed as the argument
    return this.adminUsersService.findOneUser(id);
  }

  // 2. Endpoint for a sensitive admin action
  // Route: POST /admin/users/ban/123
  @Post('ban/:id')
  // We can choose to override the roles if needed, but here we use the class roles
  banUser(@Param('id') userId: string) {
    return this.adminUsersService.banUser(parseInt(userId, 10));
  }
}