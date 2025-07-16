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
import { ProductModel } from 'src/product-models/entities/product-model.entity';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Company) private companiesRepository: Repository<Company>,
    @InjectRepository(SubcategoryItem) private subcategoryItemRepository: Repository<SubcategoryItem>,
    @InjectRepository(ProductVariant) private productVariantRepository: Repository<ProductVariant>,
    @InjectRepository(ProductModel) private productModelRepository: Repository<ProductModel>, // NEW: Inject ProductModel Repository
    // @InjectRepository(Category) private readonly categoryRepository: Repository<Product>,

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
      models, // Destructure models from DTO
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
        relations: ['company', 'images', 'colors', 'sizes', 'subcategoryItem', 'variants', 'models'], // IMPORTANT: Load models relation here
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      // ✅ Only delete variants if user is explicitly changing variants or their dependencies (colors/sizes)
      if (
        ('variants' in dto && dto.variants !== undefined) || // Check if variants key is present in DTO
        ('colors' in dto && dto.colors !== undefined) ||     // Check if colors key is present in DTO
        ('sizes' in dto && dto.sizes !== undefined)          // Check if sizes key is present in DTO
      ) {
        if (product.variants && product.variants.length > 0) {
            await this.productVariantRepository.remove(product.variants); // Clear old variants
        }
        product.variants = []; // Reset the array on the entity
      }

      // --- NEW: MODEL UPDATE LOGIC ---
      // If the 'models' key is present in the DTO, it means we should update them.
      // This allows sending an empty 'models' array to clear existing models.
      if (models !== undefined) {
        // If there are existing models, remove them first
        if (product.models && product.models.length > 0) {
          await this.productModelRepository.remove(product.models);
        }
        // Map the new models from DTO to ProductModel entities
        product.models = models.map((modelDto) => {
          const newModel = new ProductModel();
          newModel.url = modelDto.url;
          newModel.colorCode = modelDto.colorCode || null; // Ensure colorCode is passed or set to null
          newModel.product = product; // Link to the current product entity
          return newModel;
        });
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

      // Re-generate slug if name or company changes
      if (name !== undefined || company !== undefined) { // Check if name or company are explicitly provided in DTO
        const updatedCompanyName = company ? (await this.companiesRepository.findOne({ where: { id: company } }))?.entityName : product.company?.entityName;
        const updatedProductName = name !== undefined ? name : product.name;
        
        if (updatedCompanyName && updatedProductName) {
          product.slug = `${this.slugify(updatedCompanyName)}-${this.slugify(updatedProductName)}`;
        }
      }
      
      // Assign other product data
      Object.assign(product, productData);
      // If name is explicitly provided, update it
      if (name !== undefined) product.name = name;

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
        variants: [], // Initialize variants as empty
        images: [],  // Initialize images as empty
        colors: [],  // Initialize colors as empty
        sizes: [],   // Initialize sizes as empty
        models: [],  // Initialize models as empty for creation
      });

      // --- NEW: MODEL CREATION LOGIC ---
      if (models?.length) { // If models are provided during creation
        product.models = models.map((modelDto) => {
          const newModel = new ProductModel();
          newModel.url = modelDto.url;
          newModel.colorCode = modelDto.colorCode || null;
          newModel.product = product; // Link to the product
          return newModel;
        });
      }
    }

    // === Shared logic for both Create & Update ===

    // Images: Replace images if provided in DTO
    if (images !== undefined) { // Check if 'images' key is present
        // If Product.images relationship uses cascade:true, simply assigning a new array will handle removal/addition
        product.images = images.map((url, i) => {
            const img = new ProductImage();
            img.url = url;
            img.sortOrder = i;
            img.product = product; // Link to the product
            return img;
        });
    }

    // Colors: Replace colors if provided in DTO
    if (colors !== undefined) { // Check if 'colors' key is present
        product.colors = colors.map((color) => {
            const c = new ProductColor();
            c.name = color.name;
            c.code = color.code;
            c.product = product; // Link to the product
            return c;
        });
    }

    // Sizes: Replace sizes if provided in DTO
    if (sizes !== undefined) { // Check if 'sizes' key is present
        product.sizes = sizes.map((size, i) => {
            const s = new ProductSize();
            s.size = size;
            s.sortOrder = i;
            s.product = product; // Link to the product
            return s;
        });
    }

    // Step 1: Save product (this will cascade save/update models, images, colors, sizes)
    const savedProduct = await this.productRepository.save(product);

    // === Generate new variants using updated colors and sizes ===
    // This part should run after main product and its related entities (colors, sizes) are saved.
    // Ensure that savedProduct has the latest colors and sizes for variant generation.
    // Reload savedProduct with relations to ensure fresh data if needed, or pass the `product` object directly
    // which should now have its `colors` and `sizes` relations updated by the previous save.
    if (
      !id || // Always generate variants for new products
      (colors !== undefined && colors.length > 0) || // If colors were explicitly provided/updated
      (sizes !== undefined && sizes.length > 0)      // If sizes were explicitly provided/updated
    ) {
        // Fetch product again with updated colors and sizes to ensure accurate variant generation
        const productWithFreshRelations = await this.productRepository.findOne({
            where: { id: savedProduct.id },
            relations: ['colors', 'sizes'], // Only load relations needed for generateVariants
        });

        if (productWithFreshRelations) {
            const savedVariants = await this.generateVariants(productWithFreshRelations, dto);
            savedProduct.variants = savedVariants;
        }
    }

    // Remove circular references before returning to prevent JSON serialization issues
    if (savedProduct.variants?.length) {
      savedProduct.variants.forEach((variant) => {
        delete variant.product;
      });
    }
    
    if (savedProduct.models?.length) { 
      savedProduct.models.forEach((model) => {
        delete model.product;
      });
    }

    // You might also need to clear circular references for colors, sizes, images if they have 'product' properties
    if (savedProduct.colors?.length) {
      savedProduct.colors.forEach(color => delete color.product);
    }
    if (savedProduct.sizes?.length) {
      savedProduct.sizes.forEach(size => delete size.product);
    }
    if (savedProduct.images?.length) {
      savedProduct.images.forEach(image => delete image.product);
    }

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

    // 6) Extract unique subcategory items and format (nested structure)
  const nestedCategories = nestCategoriesFromProducts(products);

  // 6a) Get all categories (flat structure)
  const allCategoriesResult = await this.productRepository.manager
    .createQueryBuilder(Category, 'category')
    .select(['category.id', 'category.name'])
    .distinct(true)
    .getRawMany();

  // Create a Map for quick lookup of nested categories by ID
  const combinedCategoriesMap = new Map();

  // Add nested categories first
  nestedCategories.forEach(cat => {
    combinedCategoriesMap.set(cat.id, {
      id: cat.id,
      name: cat.title, // Assuming 'title' in nestedCategories maps to 'name'
      subCategory: cat.subCategory // Keep the nested subCategory structure
    });
  });

  // Add all categories, only if not already present from nestedCategories
  allCategoriesResult.forEach(cat => {
    if (!combinedCategoriesMap.has(cat.category_id)) {
      combinedCategoriesMap.set(cat.category_id, {
        id: cat.category_id,
        name: cat.category_name,
      });
    }
  });

  // Convert the map values back to an array
  const category = Array.from(combinedCategoriesMap.values());

    // 7) Get distinct genders from products
    const productGendersResult = await this.productRepository.createQueryBuilder('product')
      .select('DISTINCT product.gender', 'gender')
      .where('product.gender IS NOT NULL')
      .andWhere(
        searchTerm ? '(LOWER(product.name) LIKE LOWER(:searchTerm) OR LOWER(product.description) LIKE LOWER(:searchTerm))' : '1=1',
        { searchTerm: `%${searchTerm}%` }
      ) // Apply search term to genders as well
      .getRawMany();

    const distinctProductGenders = productGendersResult.map(g => g.gender);

    // Define all possible genders
    const allPossibleGenders = ['women', 'men', 'unisex'];

    // Combine and ensure uniqueness, prioritizing predefined order
    const genders = Array.from(new Set([...allPossibleGenders, ...distinctProductGenders]));

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
