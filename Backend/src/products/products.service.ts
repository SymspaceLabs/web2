import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { MinioService } from '../MinioModule/minio.service';
import { ProductImage } from '../product-images/entities/product-image.entity';
import { ProductVariantEntity } from '../product-variant/entities/product-variant.entity';
import { ProductVariantPropertyEntity } from '../product-variant-property/entities/product-variant-property.entity';
import { PriceEntity } from '../price/entities/price.entity';
import { Company } from 'src/companies/entities/company.entity';
import { ProductColor } from 'src/product-colors/entities/product-color.entity';
import { Product3DModel } from 'src/product-3d-models/entities/product-3d-model.entity';
import { ProductSize } from 'src/product-sizes/entities/product-size.entity';
import { SubcategoryItem } from 'src/subcategory-items/entities/subcategory-item.entity';

@Injectable()
export class ProductsService {
  companyRepository: any;
  // private productVariantEntity = [];

  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Company) private companiesRepository: Repository<Company>,
    @InjectRepository(ProductImage) private productImageRepository: Repository<ProductImage>,
    @InjectRepository(SubcategoryItem) private subcategoryItemRepository: Repository<SubcategoryItem>,

    // @InjectRepository(ProductVariantEntity)
    // private productVariantEntityRepository: Repository<ProductVariantEntity>,
    // @InjectRepository(ProductVariantPropertyEntity)
    // private productVariantPropertyEntityRepository: Repository<ProductVariantPropertyEntity>,
    // @InjectRepository(PriceEntity)
    // private priceEntityRepository: Repository<PriceEntity>,
  ) {}

    async create(createProductDto: CreateProductDto): Promise<Product> {
      const { images, company, name, colors, model, sizes, subcategoryItem: subcategoryItemId, ...productData } = createProductDto;
    
      if (!Array.isArray(images)) {
        throw new TypeError('images must be an array');
      }
    
      // Check if company exists by company name or identifier
      if (!company) {
        throw new NotFoundException('Company not provided');
      }
    
      const companyEntity = await this.companiesRepository.findOne({
        where: { id: company },
      });
    
      if (!companyEntity) {
        throw new NotFoundException(`Company with name ${company} not found`);
      }

      // Find the subcategoryItem
      const subcategoryItem = await this.subcategoryItemRepository.findOne({
        where: { id: subcategoryItemId },
        relations: ['subcategory', 'subcategory.category'], // Ensure nested relations are loaded
      });

      if (!subcategoryItem) {
        throw new NotFoundException(`Subcategory item with ID ${subcategoryItemId} not found`);
      }
    
      const slug = `${companyEntity.businessName.toLowerCase().replace(/\s+/g, '-')}-${name.toLowerCase().replace(/\s+/g, '-')}`;
    
      const product = this.productRepository.create({
        ...productData,
        name,
        company: companyEntity,
        slug,
        subcategoryItem,
      });
    
      // Process images
      if (images && images.length) {
        product.images = images.map((imageUrl) => {
          const productImage = new ProductImage();
          productImage.url = imageUrl;
          return productImage;
        });
      }

      // Process colors
      if (colors && colors.length) {
        product.colors = colors.map((color) => {
          const productColor = new ProductColor();
          productColor.name = color.name;
          productColor.code = color.code;
          return productColor;
        });
      }

      // Process 3D model
      if (model) {
        const productModel = new Product3DModel();
        productModel.name = model.name;
        productModel.filePath = model.filePath;
        productModel.format = model.format;
        product.model = productModel;
      }

      // Process sizes
      if (sizes && sizes.length) {
        product.sizes = sizes.map((size) => {
          const productSize = new ProductSize();
          productSize.size = size;
          return productSize;
        });
      }
    
      return await this.productRepository.save(product);
    }

    async findAll(): Promise<Product[]> {
      return await this.productRepository.find({
        relations: ['company', 'images', 'colors', 'sizes'],
      });
    }


    async findBySlug(slug: string): Promise<Product> {
      const product = await this.productRepository.findOne({
        where: { slug },
        relations: ['company', 'images', 'colors', 'sizes', 'subcategoryItem', 'subcategoryItem.subcategory', 'subcategoryItem.subcategory.category'],
      });

      if (!product) {
        throw new NotFoundException(`Product with slug ${slug} not found`);
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

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const {
      images,
      company,
      name,
      colors,
      model,
      sizes,
      subcategoryItem: subcategoryItemId,
      ...productData
    } = updateProductDto;
  
    // Find the existing product by ID
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['company', 'images', 'colors', 'model', 'sizes', 'subcategoryItem'],
    });
  
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  
    // Update company if provided
    if (company) {
      const companyEntity = await this.companiesRepository.findOne({ where: { id: company } });
      if (!companyEntity) {
        throw new NotFoundException(`Company with ID ${company} not found`);
      }
      product.company = companyEntity;
    }
  
    // Update subcategory item if provided
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
  
    // Update slug if name or company changes
    if (name || company) {
      const updatedCompany = product.company || (await this.companiesRepository.findOne({ where: { id: company } }));
      product.slug = `${updatedCompany.businessName.toLowerCase().replace(/\s+/g, '-')}-${(name || product.name).toLowerCase().replace(/\s+/g, '-')}`;
    }
  
    // Update name
    if (name) {
      product.name = name;
    }
  
    // Update product data
    Object.assign(product, productData);
  
    // Update images
    if (images) {
      if (!Array.isArray(images)) {
        throw new TypeError('images must be an array');
      }
      product.images = images.map((imageUrl) => {
        const productImage = new ProductImage();
        productImage.url = imageUrl;
        return productImage;
      });
    }
  
    // Update colors
    if (colors) {
      product.colors = colors.map((color) => {
        const productColor = new ProductColor();
        productColor.name = color.name;
        productColor.code = color.code;
        return productColor;
      });
    }
  
    // Update 3D model
    if (model) {
      const productModel = new Product3DModel();
      productModel.name = model.name;
      productModel.filePath = model.filePath;
      productModel.format = model.format;
      product.model = productModel;
    }
  
    // Update sizes
    if (sizes) {
      product.sizes = sizes.map((size) => {
        const productSize = new ProductSize();
        productSize.size = size;
        return productSize;
      });
    }
  
    // Save the updated product
    return await this.productRepository.save(product);
  }
  
  

  // async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
  //   const product = await this.productRepository.findOne({
  //     where: { id },
  //     relations: ['company', 'subcategoryItem', 'images'],
  //   });
  
  //   if (!product) {
  //     throw new NotFoundException(`Product with ID ${id} not found`);
  //   }
  
  //   const { company: companyId, subcategoryItem: subcategoryItemId, images, ...otherUpdates } = updateProductDto;
  
  //   // Resolve `company` relation
  //   if (companyId) {
  //     const company = await this.companyRepository.findOne({
  //       where: { id: companyId },
  //     });
  
  //     if (!company) {
  //       throw new NotFoundException(`Company with ID ${companyId} not found`);
  //     }
  
  //     product.company = company;
  //   }
  
  //   // Resolve `subcategoryItem` relation
  //   if (subcategoryItemId) {
  //     const subcategoryItem = await this.subcategoryItemRepository.findOne({
  //       where: { id: subcategoryItemId },
  //     });
  
  //     if (!subcategoryItem) {
  //       throw new NotFoundException(`Subcategory item with ID ${subcategoryItemId} not found`);
  //     }
  
  //     product.subcategoryItem = subcategoryItem;
  //   }
  
  //   // Handle images
  //   if (images) {
  //     if (product.images?.length > 0) {
  //       await this.productImageRepository.remove(product.images);
  //     }
  
  //     const newImages = images.map((url) =>
  //       this.productImageRepository.create({
  //         url,
  //         altText: '',
  //         product,
  //       }),
  //     );
  
  //     await this.productImageRepository.save(newImages);
  //     product.images = newImages;
  //   }
  
  //   // Merge scalar fields into the product entity
  //   const updatedProduct = this.productRepository.merge(product, otherUpdates);
  
  //   // Save the updated product
  //   return await this.productRepository.save(updatedProduct);
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
