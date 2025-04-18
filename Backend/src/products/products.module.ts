import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { MinioService } from '../MinioModule/minio.service';
import { ProductImage } from '../product-images/entities/product-image.entity';
import { Company } from 'src/companies/entities/company.entity';
import { SubcategoryItem } from 'src/subcategory-items/entities/subcategory-item.entity';
import { ProductVariant } from 'src/product-variant/entities/product-variant.entity';
// import { ProductVariantPropertyEntity } from '../product-variant-property/entities/product-variant-property.entity';
// import { PriceEntity } from '../price/entities/price.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Company,
      ProductImage,
      SubcategoryItem,
      ProductVariant
      // ProductVariantPropertyEntity,
      // PriceEntity,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, MinioService],
  exports: [ProductsService],
})
export class ProductsModule {}
