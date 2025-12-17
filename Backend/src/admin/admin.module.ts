import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module'; // Import modules needed by admin features
import { AdminUsersController } from './admin-users.controller';
import { AdminUsersService } from './admin-users.service';
import { AuthModule } from 'src/auth/auth.module';
import { AdminProductsController } from './admin-products.controller';
import { AdminProductsService } from './admin-products.service';
import { ProductsModule } from 'src/products/products.module';
import { CompaniesModule } from 'src/companies/companies.module';
import { AdminCompaniesController } from './admin-companies.controller';
import { AdminCompaniesService } from './admin-companies.services';

@Module({
  imports: [UsersModule, AuthModule, ProductsModule, CompaniesModule], // Admin features often manage users
  controllers: [AdminUsersController, AdminProductsController, AdminCompaniesController],
  providers: [AdminUsersService, AdminProductsService, AdminCompaniesService],
  exports: [UsersModule],
})

export class AdminModule {}