import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductImage } from '../product-images/entities/product-image.entity';
import { Company } from 'src/companies/entities/company.entity';
import { ProductColor } from 'src/product-colors/entities/product-color.entity';
import { Product3DModel } from 'src/product-3d-models/entities/product-3d-model.entity';
import { ProductSize } from 'src/product-sizes/entities/product-size.entity';
import { SubcategoryItem } from 'src/subcategory-items/entities/subcategory-item.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Company) private companiesRepository: Repository<Company>,
    @InjectRepository(SubcategoryItem) private subcategoryItemRepository: Repository<SubcategoryItem>,

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
    
      const slug = `${companyEntity.entityName.toLowerCase().replace(/\s+/g, '-')}-${name.toLowerCase().replace(/\s+/g, '-')}`;
    
      const product = this.productRepository.create({
        ...productData,
        name,
        company: companyEntity,
        slug,
        subcategoryItem,
      });
    
      // Process images
      if (images && images.length) {
        product.images = images.map((imageUrl, index) => {
          const productImage = new ProductImage();
          productImage.url = imageUrl;
          productImage.sortOrder = index; // 👈 store the order
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
        product.sizes = sizes.map((size, index) => {
          const productSize = new ProductSize();
          productSize.size = size;
          productSize.sortOrder = index; // 👈 this defines the sort order from the body
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
      product.slug = `${updatedCompany.entityName.toLowerCase().replace(/\s+/g, '-')}-${(name || product.name).toLowerCase().replace(/\s+/g, '-')}`;
    }
  
    // Update name
    if (name) {
      product.name = name;
    }
  
    // Update product data
    Object.assign(product, productData);
  
    // Update images
    if (images && images.length) {
      product.images = images.map((imageUrl, index) => {
        const productImage = new ProductImage();
        productImage.url = imageUrl;
        productImage.sortOrder = index; // 👈 store the order
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
    if (sizes && sizes.length) {
      product.sizes = sizes.map((size, index) => {
        const productSize = new ProductSize();
        productSize.size = size;
        productSize.sortOrder = index; // 👈 this defines the sort order from the body
        return productSize;
      });
    }
  
    // Save the updated product
    return await this.productRepository.save(product);
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
