import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BulkDeleteDto, BulkDeleteResponseDto } from 'src/products/dto/bulk-delete.dto';
import { ProductsService, QueryContext } from 'src/products/products.service';
import { UserRole } from 'src/users/entities/user.entity';

@Injectable()
export class AdminProductsService {
  constructor(private readonly productsService: ProductsService) {}

    /**
   * Admins can see ALL products (including drafts and archived)
   */
  async findAllProducts(
    searchTerm?: string,
    categorySlug?: string,
    subcategorySlug?: string,
    subcategoryItemSlugs?: string[],
    subcategoryItemChildSlug?: string,
    genders?: string[],
    ageGroups?: string[],
    companyId?: string,
    withVariants: boolean = false
  ) {
    const adminContext: QueryContext = {
      userRole: UserRole.ADMIN,
    };

    return this.productsService.findAll(
      adminContext,
      searchTerm,
      categorySlug,
      subcategorySlug,
      subcategoryItemSlugs,
      subcategoryItemChildSlug,
      genders,
      ageGroups,
      companyId,
      withVariants
    );
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

  /**
   * Bulk delete multiple products by their IDs
   * @param dto - Contains array of product IDs to delete
   * @returns Response with deletion statistics
   */
  async bulkDeleteProducts(dto: BulkDeleteDto): Promise<BulkDeleteResponseDto> {
    return this.productsService.bulkDeleteProducts(dto);
  }


}