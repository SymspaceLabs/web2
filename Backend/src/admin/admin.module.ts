import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module'; // Import modules needed by admin features
import { AdminUsersController } from './admin-users.controller';
import { AdminUsersService } from './admin-users.service';
import { AuthModule } from 'src/auth/auth.module';
import { AdminProductsController } from './admin-products.controller';
import { AdminProductsService } from './admin-products.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [UsersModule, AuthModule, ProductsModule], // Admin features often manage users
  controllers: [AdminUsersController, AdminProductsController],
  providers: [AdminUsersService, AdminProductsService],
  exports: [UsersModule],
})

export class AdminModule {}