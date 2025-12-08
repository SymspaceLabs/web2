import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class AdminProductsService {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Retrieves all user accounts in the system.
   * NOTE: The controller ensures only Admins can call this.
   */
  async findAllProducts() {
    // This is where you might call a method from your core UsersService
    // that fetches ALL users, including sensitive data.
    return this.productsService.findAll(); 
  }

  async findOneProduct(id: string) {
    // 1. Fetch the product from the database
    const product = await this.productsService.findOne(id);

    // 2. Handle not found scenario
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }

    return product;
  }


}