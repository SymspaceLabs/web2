import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Company } from 'src/companies/entities/company.entity';
import { nestCategoriesFromProducts } from 'src/utils/nest-categories';
import { ProductSize } from 'src/product-sizes/entities/product-size.entity';
import { ProductImage } from '../product-images/entities/product-image.entity';
import { ProductColor } from 'src/product-colors/entities/product-color.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductVariant } from 'src/product-variant/entities/product-variant.entity';
import { SubcategoryItem } from 'src/subcategory-items/entities/subcategory-item.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Company) private companiesRepository: Repository<Company>,
    @InjectRepository(SubcategoryItem) private subcategoryItemRepository: Repository<SubcategoryItem>,
    @InjectRepository(ProductVariant) private productVariantRepository: Repository<ProductVariant>,
  ) {}

  // Convert text to slug
  slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/'/g, '')               // remove apostrophes
      .replace(/\s+/g, '-')            // replace spaces with -
      .replace(/[^a-z0-9-]/g, '')      // remove anything not alphanumeric or dash
      .replace(/--+/g, '-')            // collapse multiple dashes
      .replace(/^-+|-+$/g, '');        // trim leading/trailing dashes
  }

  // Reusable method to generate and save variants
  private async generateVariants(product: Product, dto: CreateProductDto): Promise<ProductVariant[]> {
    const variantsToSave: ProductVariant[] = [];

    // If no dto.variants, generate cartesian product of colors and sizes
    if (!dto.variants?.length) {
      for (const color of product.colors) {
        for (const size of product.sizes) {
          const variant = new ProductVariant();
          variant.color = color;
          variant.size = size;
          variant.sku = `${product.slug}-${color.code}-${size.size}`;
          variant.price = product.price || 0;
          variant.stock = 0;
          variant.product = product;
          variantsToSave.push(variant);
        }
      }
    } else {
      // Use provided variants in DTO
      for (const v of dto.variants) {
        const variant = new ProductVariant();
        variant.stock = v.stock;
        variant.sku = v.sku;
        variant.price = v.price;
        variant.product = product;

        const matchedColor = product.colors.find((c) => c.code === v.colorCode);
        if (!matchedColor) {
          throw new BadRequestException(`No matching color for code ${v.colorCode}`);
        }
        variant.color = matchedColor;

        const matchedSize = product.sizes.find((s) => s.size === v.size);
        if (!matchedSize) {
          throw new BadRequestException(`No matching size for ${v.size}`);
        }
        variant.size = matchedSize;

        variantsToSave.push(variant);
      }
    }

    return this.productVariantRepository.save(variantsToSave);
  }
  
  // CREATE & UPDATE PRODUCT
  async upsert(id: string | undefined, dto: CreateProductDto): Promise<Product> {
    const {
      images,
      company,
      name,
      colors,
      sizes,
      subcategoryItem: subcategoryItemId,
      ...productData
    } = dto;
    
      let product: Product;
    
      // === UPDATE MODE ===
      if (id) {
        product = await this.productRepository.findOne({
          where: { id },
          relations: ['company', 'images', 'colors', 'sizes', 'subcategoryItem', 'variants'],
        });
    
        if (!product) {
          throw new NotFoundException(`Product with ID ${id} not found`);
        }

        // ✅  Only delete if user is explicitly changing variants or their dependencies
        if (
          ('variants' in dto && dto.variants?.length) ||
          ('colors' in dto && dto.colors?.length) ||
          ('sizes' in dto && dto.sizes?.length)
        ) {
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
          product.slug = `${this.slugify(updatedCompany.entityName)}-${this.slugify(name || product.name)}`;
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
    
        const slug = `${this.slugify(companyEntity.entityName)}-${this.slugify(name)}`;

              
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

      // Generate variants only if CREATE or if dto has colors or sizes
      if (
        !id ||
        ('colors' in dto && dto.colors?.length) ||
        ('sizes' in dto && dto.sizes?.length)
      ) {
        const savedVariants = await this.generateVariants(savedProduct, dto);
        savedProduct.variants = savedVariants;
      }

      // Remove circular reference before returning
      if (savedProduct.variants?.length) {
        savedProduct.variants.forEach((variant) => {
          delete variant.product;
        });
      }
      
      // if (savedProduct.colors?.length && savedProduct.sizes?.length) {
      //   const variantsToSave: ProductVariant[] = [];
      //   // If no dto.variants, generate cartesian product
      //   if (!dto.variants?.length) {
      //     for (const color of savedProduct.colors) {
      //       for (const size of savedProduct.sizes) {
      //         const variant = new ProductVariant();
      //         variant.color = color;
      //         variant.size = size;
      //         variant.sku = `${savedProduct.slug}-${color.code}-${size.size}`;
      //         variant.price = savedProduct.price || 0;
      //         variant.stock = 0;
      //         variant.product = savedProduct;
      //         variantsToSave.push(variant);
      //       }
      //     }
      //   } else {
      //     for (const v of dto.variants) {
      //       const variant = new ProductVariant();
      //       variant.stock = v.stock;
      //       variant.sku = v.sku;
      //       variant.price = v.price;
      //       variant.product = savedProduct;
      
      //       const matchedColor = savedProduct.colors.find((c) => c.code === v.colorCode);
      //       if (!matchedColor) {
      //         throw new BadRequestException(`No matching color for code ${v.colorCode}`);
      //       }

      //       if (matchedColor) variant.color = matchedColor;
      
      //       const matchedSize = savedProduct.sizes.find((s) => s.size === v.size);
      //       if (!matchedSize) {
      //         throw new BadRequestException(`No matching size for ${v.size}`);
      //       }

      //       if (matchedSize) variant.size = matchedSize;
      
      //       variantsToSave.push(variant);
      //     }
      //   }
      
      //   const savedVariants = await this.productVariantRepository.save(variantsToSave);
      //   savedProduct.variants = savedVariants;
      // }

      // if (savedProduct.variants?.length) {
      //   savedProduct.variants.forEach((variant) => {
      //     delete variant.product;
      //   });
      // }
      
      return savedProduct;
  }

  // FIND ALL WITH FILTER
  async findAll(searchTerm?: string) {

    // 1) Build the query, now selecting subcategoryItem
    const query = this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.company', 'company')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.colors', 'colors')
      .leftJoinAndSelect('product.sizes', 'sizes')
      .leftJoinAndSelect('product.subcategoryItem', 'subcategoryItem')
      .leftJoinAndSelect('subcategoryItem.subcategory', 'subcategory')
      .leftJoinAndSelect('subcategory.category', 'category')
      .leftJoinAndSelect('product.variants', 'variants');

    // Add search condition if searchTerm is provided
    if (searchTerm) {
      query.andWhere(
        '(LOWER(product.name) LIKE LOWER(:searchTerm) OR LOWER(product.description) LIKE LOWER(:searchTerm))',
        { searchTerm: `%${searchTerm}%` }
      );
    }

    // 2) Execute
    const products = await query.getMany();

    // 3) Sort images
    for (const product of products) {
      product.images.sort((a, b) => a.sortOrder - b.sortOrder);
    }

    // 4) Compute price range
    const prices = products.map(p => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // 5) Get distinct brands that have at least one product
    const usedBrands = await this.productRepository.createQueryBuilder('product')
      .leftJoin('product.company', 'company')
      .select(['company.id AS id', 'company.entityName AS name'])
      .where(
        searchTerm ? '(LOWER(product.name) LIKE LOWER(:searchTerm) OR LOWER(product.description) LIKE LOWER(:searchTerm))' : '1=1',
        { searchTerm: `%${searchTerm}%` }
      ) // Apply search term to brands as well
      .groupBy('company.id')
      .addGroupBy('company.entityName')
      .getRawMany();

    const formattedBrands = usedBrands.map(b => ({
      id: b.id,
      entityName: b.name,
    }));

    // 6) Extract unique subcategory items and format
    const category = nestCategoriesFromProducts(products);

    // 7) Get distinct genders from products
    const genderResult = await this.productRepository.createQueryBuilder('product')
      .select('DISTINCT product.gender', 'gender')
      .where('product.gender IS NOT NULL')
      .andWhere(
        searchTerm ? '(LOWER(product.name) LIKE LOWER(:searchTerm) OR LOWER(product.description) LIKE LOWER(:searchTerm))' : '1=1',
        { searchTerm: `%${searchTerm}%` }
      ) // Apply search term to genders as well
      .getRawMany();

    const genders = genderResult.map(g => g.gender); // ['men', 'women', ...]

    // 8) Compute availability per product & collect distinct statuses
    const availabilitySet = new Set<string>();
    for (const product of products) {
      const inStock = product.variants.some(v => v.stock > 0);
      const status = inStock ? 'In stock' : 'Out of stock';
      // attach to each product for frontend filtering
      (product as any).availability = status;
      availabilitySet.add(status);
    }
    const availabilities = Array.from(availabilitySet);

    // ✅ Extract all distinct colors used
    const allColorsMap = new Map<string, { name: string; code: string }>();
    for (const product of products) {
      for (const color of product.colors) {
        if (!allColorsMap.has(color.code)) {
          allColorsMap.set(color.code, {
            name: color.name,
            code: color.code,
          });
        }
      }
    }
    const colors = Array.from(allColorsMap.values());
    
    // 9) Return everything
    return {
      products,
      brands: formattedBrands,
      priceRange: { min: minPrice, max: maxPrice },
      category,
      genders,
      availabilities,
      colors
    };    
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
        'variants'
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
