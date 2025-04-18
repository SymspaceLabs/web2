import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Company } from 'src/companies/entities/company.entity';
import { ProductSize } from 'src/product-sizes/entities/product-size.entity';
import { ProductImage } from '../product-images/entities/product-image.entity';
import { ProductColor } from 'src/product-colors/entities/product-color.entity';
import { Product3DModel } from 'src/product-3d-models/entities/product-3d-model.entity';
import { SubcategoryItem } from 'src/subcategory-items/entities/subcategory-item.entity';
import { ProductVariant } from 'src/product-variant/entities/product-variant.entity';
import { CreateProductVariantDto } from 'src/product-variant/dto/create-product-variant.dto';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Company) private companiesRepository: Repository<Company>,
    @InjectRepository(SubcategoryItem) private subcategoryItemRepository: Repository<SubcategoryItem>,
    @InjectRepository(ProductVariant) private productVariantRepository: Repository<ProductVariant>,

  ) {}

    async upsert(id: string | undefined, dto: CreateProductDto): Promise<Product> {
      const {
        images,
        company,
        name,
        colors,
        model,
        sizes,
        subcategoryItem: subcategoryItemId,
        ...productData
      } = dto;
      
        let product: Product;
      
        // === UPDATE MODE ===
        if (id) {
          product = await this.productRepository.findOne({
            where: { id },
            relations: ['company', 'images', 'colors', 'model', 'sizes', 'subcategoryItem', 'variants'],
          });
      
          if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
          }

          // ✅ Delete all existing product variants
          if (product.variants?.length) {
            await this.productVariantRepository.remove(product.variants);
            product.variants = [];
          }
      
          if (company) {
            const companyEntity = await this.companiesRepository.findOne({ where: { id: company } });
            if (!companyEntity) {
              throw new NotFoundException(`Company with ID ${company} not found`);
            }
            product.company = companyEntity;
          }
      
          if (subcategoryItemId) {
            const subcategoryItem = await this.subcategoryItemRepository.findOne({
              where: { id: subcategoryItemId },
              relations: ['subcategory', 'subcategory.category'],
            });
      
            if (!subcategoryItem) {
              throw new NotFoundException(`Subcategory item with ID ${subcategoryItemId} not found`);
            }
            product.subcategoryItem = subcategoryItem;
          }
      
          if (name || company) {
            const updatedCompany = product.company || (await this.companiesRepository.findOne({ where: { id: company } }));
            product.slug = `${updatedCompany.entityName.toLowerCase().replace(/\s+/g, '-')}-${(name || product.name).toLowerCase().replace(/\s+/g, '-')}`;
          }
      
          if (name) product.name = name;
          Object.assign(product, productData);
        }
      
        // === CREATE MODE ===
        else {
          if (!company) {
            throw new NotFoundException('Company not provided');
          }
      
          const companyEntity = await this.companiesRepository.findOne({ where: { id: company } });
          if (!companyEntity) {
            throw new NotFoundException(`Company with ID ${company} not found`);
          }
      
          const subcategoryItem = await this.subcategoryItemRepository.findOne({
            where: { id: subcategoryItemId },
            relations: ['subcategory', 'subcategory.category'],
          });
      
          if (!subcategoryItem) {
            throw new NotFoundException(`Subcategory item with ID ${subcategoryItemId} not found`);
          }
      
          const slug = `${companyEntity.entityName.toLowerCase().replace(/\s+/g, '-')}-${name.toLowerCase().replace(/\s+/g, '-')}`;
      
          // const productVariants = dto.variants?.map((v) => {
          //   const variant = new ProductVariant();
          //   variant.stock = v.stock;
          //   variant.sku = v.sku;
          //   variant.price = v.price;
          
          //   // If you need to assign relations later (like color/size), do it here
          //   if (v.colorCode && product.colors?.length) {
          //     const matchedColor = product.colors.find((c) => c.code === v.colorCode);
          //     if (matchedColor) variant.color = matchedColor;
          //   }
          
          //   if (v.size && product.sizes?.length) {
          //     const matchedSize = product.sizes.find((s) => s.size === v.size);
          //     if (matchedSize) variant.size = matchedSize;
          //   }
          
          //   return variant;
          // });
          
          product = this.productRepository.create({
            ...productData,
            name,
            company: companyEntity,
            slug,
            subcategoryItem,
            variants: [], // ✅ assign actual entity instances
          });
        }
      
        // === Shared logic for both Create & Update ===
      
        // Images
        if (images?.length) {
          product.images = images.map((url, i) => {
            const img = new ProductImage();
            img.url = url;
            img.sortOrder = i;
            return img;
          });
        }
      
        // Colors
        if (colors) {
          product.colors = colors.map((color) => {
            const c = new ProductColor();
            c.name = color.name;
            c.code = color.code;
            return c;
          });
        }
      
        // Sizes
        if (sizes?.length) {
          product.sizes = sizes.map((size, i) => {
            const s = new ProductSize();
            s.size = size;
            s.sortOrder = i;
            return s;
          });
        }

        // Step 1: Save product first to ensure colors/sizes are persisted
        const savedProduct = await this.productRepository.save(product);
        
        // === Generate new variants using updated colors and sizes ===
        if (savedProduct.colors?.length && savedProduct.sizes?.length) {
          const variantsToSave: ProductVariant[] = [];
        
          // If no dto.variants, generate cartesian product
          if (!dto.variants?.length) {
            for (const color of savedProduct.colors) {
              for (const size of savedProduct.sizes) {
                const variant = new ProductVariant();
                variant.color = color;
                variant.size = size;
                variant.sku = `${savedProduct.slug}-${color.code}-${size.size}`;
                variant.price = savedProduct.price || 0;
                variant.stock = 0;
                variant.product = savedProduct;
                variantsToSave.push(variant);
              }
            }
          } else {
            for (const v of dto.variants) {
              const variant = new ProductVariant();
              variant.stock = v.stock;
              variant.sku = v.sku;
              variant.price = v.price;
              variant.product = savedProduct;
        
              const matchedColor = savedProduct.colors.find((c) => c.code === v.colorCode);
              if (matchedColor) variant.color = matchedColor;
        
              const matchedSize = savedProduct.sizes.find((s) => s.size === v.size);
              if (matchedSize) variant.size = matchedSize;
        
              variantsToSave.push(variant);
            }
          }
        
          const savedVariants = await this.productVariantRepository.save(variantsToSave);
          savedProduct.variants = savedVariants;
        }

        if (savedProduct.variants?.length) {
          savedProduct.variants.forEach((variant) => {
            delete variant.product;
          });
        }
        
        return savedProduct;
    }

    async findAll(): Promise<Product[]> {
      return await this.productRepository.find({
        relations: ['company', 'images', 'colors', 'sizes'],
      });
    }

    async findBySlug(slug: string): Promise<Product> {
      const product = await this.productRepository.findOne({
        where: { slug },
        relations: [
          'company',
          'images',
          'colors',
          'sizes',
          'subcategoryItem',
          'subcategoryItem.subcategory',
          'subcategoryItem.subcategory.category',
        ],
      });
    
      if (!product) {
        throw new NotFoundException(`Product with slug ${slug} not found`);
      }
    
      // Sort sizes by sortOrder before returning
      if (product.sizes) {
        product.sizes.sort((a, b) => a.sortOrder - b.sortOrder);
      }

      // Sort sizes by sortOrder before returning
      if (product.images) {
        product.images.sort((a, b) => a.sortOrder - b.sortOrder);

      }
    
      return product;
    }
    
    async findOne(productId: string): Promise<Product> {
      const product = await this.productRepository.findOne({
        where: { id: productId },
        relations: ['subcategoryItem', 'subcategoryItem.subcategory', 'subcategoryItem.subcategory.category'],
      });
    
      if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
      }
    
      return product;
    }

    // async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    //   const {
    //     images,
    //     company,
    //     name,
    //     colors,
    //     model,
    //     sizes,
    //     subcategoryItem: subcategoryItemId,
    //     ...productData
    //   } = updateProductDto;
    
    //   // Find the existing product by ID
    //   const product = await this.productRepository.findOne({
    //     where: { id },
    //     relations: ['company', 'images', 'colors', 'model', 'sizes', 'subcategoryItem'],
    //   });
    
    //   if (!product) {
    //     throw new NotFoundException(`Product with ID ${id} not found`);
    //   }
    
    //   // Update company if provided
    //   if (company) {
    //     const companyEntity = await this.companiesRepository.findOne({ where: { id: company } });
    //     if (!companyEntity) {
    //       throw new NotFoundException(`Company with ID ${company} not found`);
    //     }
    //     product.company = companyEntity;
    //   }
    
    //   // Update subcategory item if provided
    //   if (subcategoryItemId) {
    //     const subcategoryItem = await this.subcategoryItemRepository.findOne({
    //       where: { id: subcategoryItemId },
    //       relations: ['subcategory', 'subcategory.category'],
    //     });
    
    //     if (!subcategoryItem) {
    //       throw new NotFoundException(`Subcategory item with ID ${subcategoryItemId} not found`);
    //     }
    //     product.subcategoryItem = subcategoryItem;
    //   }
    
    //   // Update slug if name or company changes
    //   if (name || company) {
    //     const updatedCompany = product.company || (await this.companiesRepository.findOne({ where: { id: company } }));
    //     product.slug = `${updatedCompany.entityName.toLowerCase().replace(/\s+/g, '-')}-${(name || product.name).toLowerCase().replace(/\s+/g, '-')}`;
    //   }
    
    //   // Update name
    //   if (name) {
    //     product.name = name;
    //   }
    
    //   // Update product data
    //   Object.assign(product, productData);
    
    //   // Update images
    //   if (images && images.length) {
    //     product.images = images.map((imageUrl, index) => {
    //       const productImage = new ProductImage();
    //       productImage.url = imageUrl;
    //       productImage.sortOrder = index; // 👈 store the order
    //       return productImage;
    //     });
    //   }
    
    //   // Update colors
    //   if (colors) {
    //     product.colors = colors.map((color) => {
    //       const productColor = new ProductColor();
    //       productColor.name = color.name;
    //       productColor.code = color.code;
    //       return productColor;
    //     });
    //   }
    
    //   // Update 3D model
    //   if (model) {
    //     const productModel = new Product3DModel();
    //     productModel.name = model.name;
    //     productModel.filePath = model.filePath;
    //     productModel.format = model.format;
    //     product.model = productModel;
    //   }
    
    //   // Update sizes
    //   if (sizes && sizes.length) {
    //     product.sizes = sizes.map((size, index) => {
    //       const productSize = new ProductSize();
    //       productSize.size = size;
    //       productSize.sortOrder = index; // 👈 this defines the sort order from the body
    //       return productSize;
    //     });
    //   }
    
    //   // Save the updated product
    //   return await this.productRepository.save(product);
    // }
    
    async remove(id: string): Promise<{ message: string; product: Product }> {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) {
        throw new NotFoundException(`Product not found`);
      }

      await this.productRepository.remove(product);
      return {
        message: 'Product has been deleted successfully',
        product,
      };
    }
}
