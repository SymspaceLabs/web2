import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, ProductGender } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Company } from 'src/companies/entities/company.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Subcategory } from 'src/subcategories/entities/subcategory.entity';
import { ProductSize } from 'src/product-sizes/entities/product-size.entity';
import { ProductImage } from '../product-images/entities/product-image.entity';
import { ProductColor } from 'src/product-colors/entities/product-color.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductVariant } from 'src/product-variant/entities/product-variant.entity';
import { Product3DModel } from 'src/product-3d-models/entities/product-3d-model.entity';
import { CreateProductImageDto } from 'src/product-images/dto/create-product-image.dto';
import { SubcategoryItem } from 'src/subcategory-items/entities/subcategory-item.entity';
import { SubcategoryItemChild } from 'src/subcategory-item-child/entities/subcategory-item-child.entity';
import { slugify, normalizeSearchText, determineProductAvailability } from './utils/utils';


// Define a type for a single search suggestion result
export interface SearchSuggestion {
  id: string;
  label: string;
  type: 'company' | 'product' | 'category' | 'subcategory-child';
  slug?: string;
  link?: string;
}

// Define the new, required structure for the API response
export interface SearchResultResponse {
    shops: SearchSuggestion[];      // Contains results of type 'company'
    searchResults: SearchSuggestion[]; // Contains results of type 'product', 'category', etc.
}

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Company) private companiesRepository: Repository<Company>,
    @InjectRepository(SubcategoryItem) private subcategoryItemRepository: Repository<SubcategoryItem>,
    @InjectRepository(SubcategoryItemChild) private subcategoryItemChildRepository: Repository<SubcategoryItemChild>, // Inject SubcategoryItemChildRepository
    @InjectRepository(ProductVariant) private productVariantRepository: Repository<ProductVariant>,
    @InjectRepository(Product3DModel) private product3DModelRepository: Repository<Product3DModel>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Subcategory) private readonly subcategoryRepository: Repository<Subcategory>,
  ) {}
  
  // CREATE & UPDATE PRODUCT
  async upsert(id: string | undefined, dto: CreateProductDto): Promise<Product> {
    const {
      images,
      threeDModels,
      company,
      name,
      colors,
      sizes,
      subcategoryItem: subcategoryItemIdFromDto, // Renamed to avoid conflict
      subcategoryItemChild: subcategoryItemChildIdFromDto, // New: Get child ID from DTO
      ...productData
    } = dto;

    let product: Product;
    let finalSubcategoryItem: SubcategoryItem | undefined; // To store the resolved SubcategoryItem
    let finalSubcategoryItemChild: SubcategoryItemChild | undefined; // NEW: To store the resolved SubcategoryItemChild

    // --- Resolve Category Hierarchy ---
    // Ensure only one of subcategoryItemId or subcategoryItemChildId is provided
    if (subcategoryItemIdFromDto && subcategoryItemChildIdFromDto) {
      throw new BadRequestException('Cannot provide both subcategoryItemId and subcategoryItemChildId. Please provide only one.');
    }

    if (subcategoryItemChildIdFromDto) {
      // If subcategoryItemChildId is provided, backtrack to find the subcategoryItem
      const subcategoryItemChild = await this.subcategoryItemChildRepository.findOne({
        where: { id: subcategoryItemChildIdFromDto },
        relations: ['subcategoryItem', 'subcategoryItem.subcategory', 'subcategoryItem.subcategory.category'],
      });

      if (!subcategoryItemChild) {
        throw new NotFoundException(`Subcategory item child with ID ${subcategoryItemChildIdFromDto} not found.`);
      }
      finalSubcategoryItemChild = subcategoryItemChild; // Store the resolved child entity
      finalSubcategoryItem = subcategoryItemChild.subcategoryItem;
    } else if (subcategoryItemIdFromDto) {
      // If only subcategoryItemId is provided, fetch it directly
      const subcategoryItem = await this.subcategoryItemRepository.findOne({
        where: { id: subcategoryItemIdFromDto },
        relations: ['subcategory', 'subcategory.category'],
      });

      if (!subcategoryItem) {
        throw new NotFoundException(`Subcategory item with ID ${subcategoryItemIdFromDto} not found.`);
      }
      finalSubcategoryItem = subcategoryItem;
      finalSubcategoryItemChild = undefined; // Ensure it's explicitly undefined if subcategoryItem is directly provided
    } else {
      // If neither is provided, and it's a creation, throw an error
      if (!id) {
         throw new BadRequestException('Either subcategoryItemId or subcategoryItemChildId must be provided for new products.');
      }
      // For updates, it's fine if no category info is provided (means no change)
    }

    // === UPDATE MODE ===
    if (id) {
      product = await this.productRepository.findOne({
        where: { id },
        // IMPORTANT: Load subcategoryItemChild relation here so it can be updated
        relations: ['company', 'images', 'colors', 'sizes', 'subcategoryItem', 'subcategoryItemChild', 'variants', 'threeDModels'],
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      // Update subcategoryItem and subcategoryItemChild if new ones were resolved
      if (finalSubcategoryItem) {
        product.subcategoryItem = finalSubcategoryItem;
        product.subcategoryItemId = finalSubcategoryItem.id; // Explicitly set FK
      } else if (subcategoryItemIdFromDto === null) { // Allow explicit clearing
        product.subcategoryItem = null;
        product.subcategoryItemId = null;
      }

      // NEW: Assign the resolved subcategoryItemChild and its ID
      if (finalSubcategoryItemChild) {
        product.subcategoryItemChild = finalSubcategoryItemChild;
        product.subcategoryItemChildId = finalSubcategoryItemChild.id; // Explicitly set FK
      } else if (subcategoryItemChildIdFromDto === null) { // Allow explicit clearing
        product.subcategoryItemChild = null;
        product.subcategoryItemChildId = null;
      }


      // ✅ Only delete variants if user is explicitly changing variants or their dependencies (colors/sizes)
      if (
        ('variants' in dto && dto.variants !== undefined) ||
        ('colors' in dto && dto.colors !== undefined) ||
        ('sizes' in dto && dto.sizes !== undefined)
      ) {
        if (product.variants && product.variants.length > 0) {
          await this.productVariantRepository.remove(product.variants); // Clear old variants
        }
        product.variants = []; // Reset the array on the entity
      }

      // --- NEW: MODEL UPDATE LOGIC ---
      
      if (threeDModels !== undefined) {
        // If there are existing threeDModels, remove them first
        if (product.threeDModels && product.threeDModels.length > 0) {
          await this.product3DModelRepository.remove(product.threeDModels);
        }
        // Map the new threeDModels from DTO to ProductModel entities
        product.threeDModels = threeDModels.map((modelDto) => {
          const newModel = new Product3DModel();
          newModel.url = modelDto.url;
          newModel.colorCode = modelDto.colorCode || null; 

          // ✅ FIX 1: Map the new 'pivot' value from the DTO
          // Note: If modelDto.pivot is undefined, the @BeforeInsert hook will set [0,0,0]
          // If it is provided (e.g., [0,10,0]), it will use that value.
          if (modelDto.pivot !== undefined) {
            newModel.pivot = modelDto.pivot;
          }
          
          // ✅ FIX 2: Map the new 'boundingBox' value from the DTO
          if (modelDto.boundingBox !== undefined) {
            newModel.boundingBox = modelDto.boundingBox;
          }

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

      // Re-generate slug if name or company changes
      if (name !== undefined || company !== undefined) { // Check if name or company are explicitly provided in DTO
        const updatedCompanyName = company ? (await this.companiesRepository.findOne({ where: { id: company } }))?.entityName : product.company?.entityName;
        const updatedProductName = name !== undefined ? name : product.name;

        if (updatedCompanyName && updatedProductName) {
          product.slug = `${slugify(updatedCompanyName)}-${slugify(updatedProductName)}`;
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

      if (!finalSubcategoryItem) { // finalSubcategoryItem *must* be resolved for new products
          throw new BadRequestException('Subcategory item could not be determined. Please provide valid subcategoryItemId or subcategoryItemChildId.');
      }

      const slug = `${slugify(companyEntity.entityName)}-${slugify(name)}`;

      product = this.productRepository.create({
        ...productData,
        name,
        company: companyEntity,
        slug,
        subcategoryItem: finalSubcategoryItem, // Use the resolved subcategory item
        subcategoryItemId: finalSubcategoryItem.id, // Explicitly set FK
        subcategoryItemChild: finalSubcategoryItemChild, // NEW: Assign the resolved child entity here
        subcategoryItemChildId: finalSubcategoryItemChild?.id || null, // NEW: Explicitly set FK, null if not present
        variants: [], // Initialize variants as empty
        images: [],   // Initialize images as empty
        colors: [],   // Initialize colors as empty
        sizes: [],    // Initialize sizes as empty
        threeDModels: [], // Initialize threeDModels as empty for creation
      });

      // --- NEW: MODEL CREATION LOGIC ---
      if (threeDModels?.length) { // If threeDModels are provided during creation
        product.threeDModels = threeDModels.map((modelDto) => {
          const newModel = new Product3DModel();
          newModel.url = modelDto.url;
          newModel.colorCode = modelDto.colorCode || null;

          // ✅ FIX 3: Map 'pivot' in CREATE MODE
          if (modelDto.pivot !== undefined) {
              newModel.pivot = modelDto.pivot;
          }
          // ✅ FIX 4: Map 'boundingBox' in CREATE MODE
          if (modelDto.boundingBox !== undefined) {
              newModel.boundingBox = modelDto.boundingBox;
          }

          newModel.product = product; // Link to the product
          return newModel;
        });
      }
    }

    // === Shared logic for both Create & Update ===

    // Images: Replace images if provided in DTO
    if (images !== undefined) { // Check if 'images' key is present
        // If Product.images relationship uses cascade:true, simply assigning a new array will handle removal/addition
        // Use the new helper function to handle image creation and assignment
        await this.saveProductImages(product, images);
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

    // Step 1: Save product (this will cascade save/update threeDModels, images, colors, sizes)
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

    if (savedProduct.threeDModels?.length) {
      savedProduct.threeDModels.forEach((model) => {
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

  /**
   * Finds all products based on various filters, including gender, and calculates availability.
   *
   * @param searchTerm Optional: A string to search for.
   * @param categorySlug Optional: Category slug to filter by.
   * @param subcategorySlug Optional: Subcategory slug to filter by.
   * @param subcategoryItemSlugs Optional: Subcategory item slugs to filter by.
   * @param subcategoryItemChildSlug Optional: Subcategory item child slug to filter by.
   * @param genders Optional: An array of genders to filter by (e.g., ['men', 'women']).
   * @returns An object containing filtered products and facets.
   */
  async findAll(
    searchTerm?: string,
    categorySlug?: string,
    subcategorySlug?: string,
    subcategoryItemSlugs?: string[],
    subcategoryItemChildSlug?: string,
    genders?: string[], 
  ) {
    // 1. Build the base query for products
    const productsQuery = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.company', 'company')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.colors', 'colors')
      .leftJoinAndSelect('product.sizes', 'sizes')
      .leftJoinAndSelect('product.subcategoryItem', 'subcategoryItem')
      .leftJoinAndSelect('subcategoryItem.subcategory', 'subcategory')
      .leftJoinAndSelect('subcategory.category', 'category')
      .leftJoinAndSelect('product.subcategoryItemChild', 'subcategoryItemChild')
      .leftJoinAndSelect('product.variants', 'variants')
      .leftJoinAndSelect('variants.color', 'variantColor') 
      .leftJoinAndSelect('variants.size', 'variantSize') 
      .leftJoinAndSelect('product.threeDModels', 'threeDModels')
      .orderBy('images.sortOrder', 'ASC');

    // 2. Apply the category, search term, and GENDER filters
    
    const filterParams = {
      categorySlug,
      subcategorySlug,
      subcategoryItemSlugs,
      subcategoryItemChildSlug,
      searchTerm,
      genders,
    };
    
    const filterAppliedButNoMatch = await this.applyCategoryFilters(
      productsQuery,
      categorySlug,
      subcategorySlug,
      subcategoryItemSlugs,
      subcategoryItemChildSlug
    );
    
    this.applySearchTermFilter(productsQuery, searchTerm);

    // Apply Gender Filter
    if (genders && genders.length > 0) {
      // Assuming you have an implementation for this helper function
      this.applyGenderFilter(productsQuery, genders); 
    }

    // 3. Handle the "no match" scenario immediately
    if (filterAppliedButNoMatch) {
      return {
        products: [],
        brands: [],
        priceRange: { min: 0, max: 0 },
        category: [],
        genders: [],
        availabilities: [],
        colors: [],
      };
    }

    // 4. Execute the main product query
    // NOTE: Products must be cast to 'any' or an extended interface to include 'availability'
    const products: any[] = await productsQuery.getMany();

    // 5. Post-process products (sorting images, and ADDING AVAILABILITY)
    for (const product of products) {
      if (product.images) {
        product.images.sort((a, b) => a.sortOrder - b.sortOrder);
      }

      // ⭐ NEW LOGIC: Calculate and add the 'availability' attribute
      product.availability = determineProductAvailability(product);
    }

    // 6. Generate facets using the shared logic
    // Assuming calculatePriceRange, getBrandsFacet, and getGendersFacet exist
    const { min: minPrice, max: maxPrice } = await this.calculatePriceRange(products);
    const formattedBrands = await this.getBrandsFacet(filterParams); 
    const formattedGenders = await this.getGendersFacet(filterParams);
    const finalCategoryFacets = this.getCategoryFacets(products);
    
    // ⭐ UPDATED: Generates the list of available facets (e.g., ['In Stock', 'Out of Stock'])
    const { availabilities, colors } = this.getOtherFacets(products); 

    // 7. Return the final result
    return {
      products,
      brands: formattedBrands,
      priceRange: { min: minPrice, max: maxPrice },
      category: finalCategoryFacets,
      genders: formattedGenders,
      availabilities,
      colors,
    };
  }

  // FIND PRODUCT BY SLUG
  async findBySlug(slug: string): Promise<Product> {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.company', 'company')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.colors', 'colors')
      .leftJoinAndSelect('product.sizes', 'sizes')
      .leftJoinAndSelect('product.variants', 'variants')
      // Conditional joins based on the existence of subcategoryItemChild
      .leftJoinAndSelect('product.subcategoryItemChild', 'subcategoryItemChild')
      .leftJoinAndSelect('subcategoryItemChild.subcategoryItem', 'subcategoryItem')
      .leftJoinAndSelect('subcategoryItem.subcategory', 'subcategory')
      .leftJoinAndSelect('subcategory.category', 'category')
      .where('product.slug = :slug', { slug })
      .getOne();

    if (!product) {
      throw new NotFoundException(`Product with slug ${slug} not found`);
    }

    // Sort sizes by sortOrder before returning
    if (product.sizes) {
      product.sizes.sort((a, b) => a.sortOrder - b.sortOrder);
    }

    // Sort images by sortOrder before returning
    if (product.images) {
      product.images.sort((a, b) => a.sortOrder - b.sortOrder);
    }

    return product;
  }
    
  async findOne(productId: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      // Updated relations to load the full hierarchy including subcategoryItemChild
      relations: [
        'subcategoryItem',
        'subcategoryItem.subcategory',
        'subcategoryItem.subcategory.category',
        'subcategoryItemChild'
      ],
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

  async performFreeFormSearch(searchTerm?: string): Promise<SearchResultResponse> {
      const normalizedSearchTerm = searchTerm ? normalizeSearchText(searchTerm) : null;
      
      // Initialize the structured response object
      const response: SearchResultResponse = { shops: [], searchResults: [] };

      if (!normalizedSearchTerm || normalizedSearchTerm.length < 2) {
          return response; // Return empty structure on invalid/short query
      }

      // ⭐️ CRITICAL PERFORMANCE FIX: Use prefix search for index utilization
      const searchPrefix = `${normalizedSearchTerm}%`;

      // ============================================
      // 1. Search for Company/Shop Matches (Populates 'shops' array)
      // ============================================
      
      const companySuggestions = await this.companiesRepository.createQueryBuilder('company')
          .select(['company.id', 'company.entityName', 'company.slug'])
          .where('LOWER(company.entityName) LIKE :term', { term: searchPrefix })
          .limit(3)
          .getMany();

      for (const company of companySuggestions) {
          response.shops.push({
              id: `company-${company.id}`,
              label: company.entityName,
              type: 'company',
              slug: company.slug
          });
      }


      // ============================================
      // 2. Search for General Results (Populates 'searchResults' array)
      // ============================================
          
      const generalSuggestions: SearchSuggestion[] = [];
      
      // Search for matching product names (Prefix Search)
      const productSuggestions = await this.productRepository.createQueryBuilder('product')
          // 💡 ADDED 'product.slug'
          .select(['product.name', 'product.id', 'product.slug']) 
          .where('LOWER(product.name) LIKE :term', { term: searchPrefix })
          .limit(5)
          .getMany();

      // Search for products belonging to matching companies
      const companyProducts = await this.productRepository.createQueryBuilder('product')
          .innerJoin('product.company', 'company') // Assuming 'company' is the relation name in Product entity
          // 💡 ADDED 'product.slug'
          .select(['product.name', 'product.id', 'product.slug', 'company.entityName']) // Select company name for better labelling
          .where('LOWER(company.entityName) LIKE :term', { term: searchPrefix })
          .limit(5) // Limit the number of products from companies
          .getMany();

      // Search for matching category names (Prefix Search)
      const categorySuggestions = await this.categoryRepository.createQueryBuilder('category')
          // 💡 ADDED 'category.slug'
          .select(['category.name', 'category.id', 'category.slug'])
          .where('LOWER(category.name) LIKE :term', { term: searchPrefix })
          .limit(5)
          .getMany();

      // Search for subcategory item children (Prefix Search)
      const subcategoryItemChildSuggestions = await this.subcategoryItemChildRepository.createQueryBuilder('subcategoryItemChild')
          // 💡 ADDED 'subcategoryItemChild.slug'
          .select(['subcategoryItemChild.name', 'subcategoryItemChild.id', 'subcategoryItemChild.slug'])
          .where('LOWER(subcategoryItemChild.name) LIKE :term', { term: searchPrefix })
          .limit(5)
          .getMany();

      // 3. Combine and Map all General Suggestions
      
      // Map products (by name match)
      for (const item of productSuggestions) {
          generalSuggestions.push({
              id: `product-${item.id}`,
              label: item.name,
              type: 'product',
              slug: item.slug // ✅ Now correctly available
          });
      }

      // Map products (by company name match)
      for (const item of companyProducts) {
          generalSuggestions.push({
              id: `product-${item.id}`,
              label: `${item.name} (from ${item.company.entityName})`, // Clarify the source
              type: 'product',
              slug: item.slug              // ✅ Now correctly available
          });
      }
      
      // Map categories
      for (const item of categorySuggestions) {
          generalSuggestions.push({
              id: `category-${item.id}`,
              label: item.name,
              type: 'category',
              slug: item.slug              // ✅ Now correctly available
          });
      }
      
      // Map subcategory children
      for (const item of subcategoryItemChildSuggestions) {
          generalSuggestions.push({
              id: `subcategory-child-${item.id}`,
              label: item.name,
              type: 'subcategory-child',
              slug: item.slug              // ✅ Now correctly available
          });
      }

      // Remove duplicates and assign to the response object
      response.searchResults = Array.from(new Map(generalSuggestions.map(item => [item.label, item])).values());

      return response;
  }

  // ==================================================================================
  // Reusable Functions
  // ==================================================================================

  /**
 * Applies a gender filter to the products query, including 'unisex' products 
 * whenever 'men' or 'women' is specifically requested.
 *
 * @param query The TypeORM SelectQueryBuilder instance.
 * @param genders An array of gender slugs (e.g., ['men'], ['women', 'unisex']).
 */
  private applyGenderFilter(
    query: SelectQueryBuilder<Product>,
    genders: string[],
  ) {
    if (!genders || genders.length === 0) {
        return;
    }

    const requestedGenders = genders.map(g => g.toLowerCase());
    
    // We create a base list of genders to include in the simple IN clause.
    let gendersToInclude = [...requestedGenders];
    
    // Check if the requested genders include 'men' or 'women'.
    const includesMenOrWomen = requestedGenders.includes('men') || requestedGenders.includes('women');

    if (includesMenOrWomen) {
        // If 'men' or 'women' is requested, we need a custom WHERE clause 
        // to handle the inclusion of 'unisex'.

        // 1. Identify all products whose gender is in the requested list (e.g., 'women' IN ('women'))
        const inClause = 'LOWER(product.gender) IN (:...gendersToInclude)';

        // 2. Identify products that are 'unisex'
        const unisexClause = "LOWER(product.gender) = 'unisex'";

        // 3. Combine them with OR, ensuring the condition is grouped (if other WHERE clauses exist).
        query.andWhere(`(${inClause} OR ${unisexClause})`, { gendersToInclude });
        
    } else {
        // If the only requested gender is 'unisex' (or another specific value), use the simple IN clause.
        query.andWhere('LOWER(product.gender) IN (:...gendersToInclude)', { gendersToInclude });
    }
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

  /**
   * @function calculatePriceRange
   * @description Helper function to calculate the minimum and maximum effective prices
   * from an array of products, prioritizing `salePrice` if available.
   * @param {Array<Product>} products - An array of product objects.
   * @returns {{min: number, max: number}} An object containing the minimum and maximum effective prices.
   */
  private async calculatePriceRange(products: any[]): Promise<{ min: number; max: number; }> {
    // Extract prices from products, prioritizing salePrice if it exists and is a number,
    // otherwise use the regular price.
    const prices = products.map(p =>
      (typeof p.salePrice === 'number' && p.salePrice !== null) ? p.salePrice : p.price
    ).filter(price => typeof price === 'number' && price !== null); // Ensure valid numbers for min/max

    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;


    return { min: minPrice, max: maxPrice };
  }

  // Add this new private helper function to your ProductsService class
  private async saveProductImages(product: Product, imageDtos: CreateProductImageDto[]): Promise<ProductImage[]> {
    // If no image DTOs are provided, return an empty array
    if (!imageDtos || imageDtos.length === 0) {
      product.images = [];
      return [];
    }

    // Create new ProductImage entities from the provided DTOs
    const newImages = imageDtos.map((imgDto, i) => {
      const img = new ProductImage();
      img.url = imgDto.url;
      img.colorCode = imgDto.colorCode; // CORRECT: Set the colorCode from the DTO
      img.sortOrder = i;
      img.product = product; // Link the image to the product
      return img;
    });

    // Assign the new array of images to the product entity.
    // Assuming a cascade relationship (`cascade: true`), TypeORM will handle
    // removing old images and creating new ones on save.
    product.images = newImages;

    // The caller (upsert function) will handle the final product save.
    return newImages;
  }

  getCategoryFacets(products: any[]): any[] {
    const categoryMap = new Map();

    for (const product of products) {
      const category = product.subcategoryItem?.subcategory?.category;

      if (category) {
        if (!categoryMap.has(category.id)) {
          categoryMap.set(category.id, {
            title: category.name,
            slug: category.slug,
            child: new Map()
          });
        }

        const currentCategory = categoryMap.get(category.id);
        const granularChildMap = currentCategory.child;

        const granularItem = product.subcategoryItemChild || product.subcategoryItem;

        if (granularItem) {
          if (!granularChildMap.has(granularItem.id)) {
            granularChildMap.set(granularItem.id, {
              id: granularItem.id,
              name: granularItem.name,
              slug: granularItem.slug,
            });
          }
        }
      }
    }
    
    return Array.from(categoryMap.values()).map(cat => ({
      title: cat.title,
      slug: cat.slug,
      child: Array.from(cat.child.values())
    }));
  }

  /**
   * Applies hierarchical category and subcategory filters to the provided TypeORM query builder.
   * It uses a cascading, most-to-least-specific approach, and includes an extension to 
   * fetch parent products when a child is explicitly filtered.
   *
   * @param query - The TypeORM SelectQueryBuilder instance.
   * @param categorySlug - Optional, filters by top-level category slug.
   * @param subcategorySlug - Optional, filters by subcategory slug.
   * @param subcategoryItemSlugs - Optional, filters by one or more subcategory item slugs (multi-select).
   * @param subcategoryItemChildSlug - Optional, filters by a child item slug.
   * @returns A promise that resolves to true if filters were applied but no products were found (empty result), false otherwise.
   */
  async applyCategoryFilters(
    query: SelectQueryBuilder<any>,
    categorySlug?: string,
    subcategorySlug?: string,
    subcategoryItemSlugs?: string[],
    subcategoryItemChildSlug?: string,
  ): Promise<boolean> {
    let hasFilter = false;

    // 1. Apply the MOST granular filter first: subcategoryItemChildSlug
    //    This path is taken when the URL explicitly uses `subcategoryItemChild=handbags`.
    if (subcategoryItemChildSlug) {
      // Standard filtering for the child slug
      query.andWhere('subcategoryItemChild.slug = :childSlug', { 
          childSlug: subcategoryItemChildSlug 
      });
      hasFilter = true;
    } 
    
    // 2. Apply the subcategory item filter (handles multi-select/array)
    //    This path is taken for your failing request: `subcategoryItem=handbags`.
    else if (subcategoryItemSlugs && subcategoryItemSlugs.length > 0) {
      // 💥 THE FIX: Use an OR condition to check the provided slugs against 
      // BOTH the subcategoryItem.slug (parent) AND the subcategoryItemChild.slug (child).
      // This allows a single URL parameter to filter products at two hierarchy levels.
      
      query.andWhere(
          '(subcategoryItem.slug IN (:...itemSlugs) OR subcategoryItemChild.slug IN (:...itemSlugs))', 
          { itemSlugs: subcategoryItemSlugs }
      );
      hasFilter = true;
    } 
    
    // 3. Apply the subcategory filter
    else if (subcategorySlug) {
      query.andWhere('subcategory.slug = :subcategorySlug', { 
          subcategorySlug: subcategorySlug 
      });
      hasFilter = true;
    } 
    
    // 4. Apply the top-level category filter
    else if (categorySlug) {
      query.andWhere('category.slug = :categorySlug', { 
          categorySlug: categorySlug 
      });
      hasFilter = true;
    }

    // Check if any filter was successfully applied and if it resulted in zero matches
    if (hasFilter) {
      const count = await query.getCount();
      return count === 0; // Returns TRUE if no match is found
    }

    return false; // Returns FALSE if no category filters were applied
  }

  // Example of the extracted function
  applySearchTermFilter(query: SelectQueryBuilder<any>, searchTerm?: string) {
    if (searchTerm) {
      query.andWhere(
        `(LOWER(product.name) LIKE LOWER(:searchTerm) OR 
        LOWER(product.description) LIKE LOWER(:searchTerm) OR 
        // ... rest of the search conditions
        )`,
        { searchTerm: `%${searchTerm}%` },
      );
    }
  }

  // src/product/products.service.ts

  async getBrandsFacet(filterParams: {
      searchTerm?: string;
      categorySlug?: string;
      subcategorySlug?: string;
      subcategoryItemSlugs?: string[]; 
      subcategoryItemChildSlug?: string;
      // --- NEW: Accept the active gender filter ---
      genders?: string[]; 
      // --- Note: Brands filter is often excluded here to show all available brands ---
  }) {
      const brandsQuery = this.productRepository
          .createQueryBuilder('product')
          .leftJoin('product.company', 'company')
          .leftJoin('product.subcategoryItem', 'subcategoryItem')
          .leftJoin('subcategoryItem.subcategory', 'subcategory')
          .leftJoin('subcategory.category', 'category')
          .leftJoin('product.subcategoryItemChild', 'subcategoryItemChild')
          // Select the brand ID, name, and the count of products associated with it
          .select(['company.id AS id', 'company.entityName AS name'])
          .addSelect('COUNT(product.id)', 'count') // <-- Added count
          .groupBy('company.id')
          .addGroupBy('company.entityName')
          .orderBy('company.entityName', 'ASC'); // Optional: sort brands alphabetically

      // Apply category filters
      await this.applyCategoryFilters(
          brandsQuery,
          filterParams.categorySlug,
          filterParams.subcategorySlug,
          filterParams.subcategoryItemSlugs,
          filterParams.subcategoryItemChildSlug
      );
      
      // Apply search filter
      this.applySearchTermFilter(brandsQuery, filterParams.searchTerm);
      
      // --- CRITICAL FIX: Apply the gender filter ---
      if (filterParams.genders && filterParams.genders.length > 0) {
          // You must reuse the same gender filter logic to ensure only relevant brands are counted.
          // Assuming applyGenderFilter is accessible and handles the 'unisex' rule.
          this.applyGenderFilter(brandsQuery, filterParams.genders);
      }
      
      // Execute the query
      const usedBrands = await brandsQuery.getRawMany();
      
      // Only return brands that have matching products (count > 0)
      return usedBrands
          .filter(b => parseInt(b.count, 10) > 0)
          .map(b => ({
              id: b.id,
              entityName: b.name,
              count: parseInt(b.count, 10), // <-- Added count to the output
          }));
  }

  // NOTE: Ensure your applyGenderFilter method is available and correctly implemented 
  async getGendersFacet(filterParams: {
      searchTerm?: string;
      categorySlug?: string;
      subcategorySlug?: string;
      subcategoryItemSlugs?: string[]; 
      subcategoryItemChildSlug?: string;
      genders?: string[]; // Includes the currently selected genders
  }) {
      // --- 1. Check for Active Gender Filters (Simplification) ---
      // If a gender filter is active in the URL, the facet output should simply confirm
      // which genders are selected. The full list of available options is only needed when no filter is active.
      if (filterParams.genders && filterParams.genders.length > 0) {
          // Return only the currently selected genders (e.g., ["women"]).
          return filterParams.genders.map(g => g.toLowerCase());
      }


      // --- 2. Calculate Available Genders (Only runs when NO gender filter is active) ---
      
      // Build the base query to find ALL distinct genders available under the current category/search filters.
      const baseGendersQuery = this.productRepository
          .createQueryBuilder('product')
          .select('DISTINCT product.gender', 'gender')
          .where('product.gender IS NOT NULL') 
          .leftJoin('product.subcategoryItem', 'subcategoryItem')
          .leftJoin('subcategoryItem.subcategory', 'subcategory')
          .leftJoin('subcategory.category', 'category')
          .leftJoin('product.subcategoryItemChild', 'subcategoryItemChild');

      // Apply CATEGORY and SEARCH filters (to determine available options based on context)
      await this.applyCategoryFilters(
          baseGendersQuery,
          filterParams.categorySlug,
          filterParams.subcategorySlug,
          filterParams.subcategoryItemSlugs,
          filterParams.subcategoryItemChildSlug
      );
      this.applySearchTermFilter(baseGendersQuery, filterParams.searchTerm);

      // Execute the query and extract the distinct genders
      const distinctProductGenders = (await baseGendersQuery.getRawMany())
          .map(g => g.gender)
          .filter(gender => Object.values(ProductGender).includes(gender));

      
      // --- 3. Implement the 'unisex' exception logic ---
      let availableGenders = new Set(distinctProductGenders);

      // If 'unisex' is present, also show 'Men' and 'Women' as filter options.
      if (availableGenders.has(ProductGender.UNISEX)) {
          availableGenders.add(ProductGender.MEN);
          availableGenders.add(ProductGender.WOMEN);
      }
      
      // 4. Convert the Set to a sorted array of gender names (strings)
      let finalGendersArray = Array.from(availableGenders);

      // Sort for consistent display order
      finalGendersArray.sort((a, b) => {
          // Use a simple ordering scheme based on your enum values
          const order = { [ProductGender.WOMEN]: 1, [ProductGender.MEN]: 2, [ProductGender.UNISEX]: 3 };
          return (order[a] || 99) - (order[b] || 99);
      });
      
      // 5. Return the simple array of lowercase strings (e.g., ["women", "men", "unisex"])
      return finalGendersArray.map(g => g.toLowerCase());
  }

  getOtherFacets(products: any[]) {
    const availabilitySet = new Set<string>();
    const allColorsMap = new Map<string, { name: string; code: string }>();

    for (const product of products) {
      // Determine availability based on variants' stock
      const inStock = product.variants?.some(v => v.stock > 0);
      const status = inStock ? 'In stock' : 'Out of stock';
      availabilitySet.add(status);

      // Collect all unique colors from the products
      if (product.colors) {
        for (const color of product.colors) {
          if (!allColorsMap.has(color.code)) {
            allColorsMap.set(color.code, {
              name: color.name,
              code: color.code,
            });
          }
        }
      }
    }

    return {
      availabilities: Array.from(availabilitySet),
      colors: Array.from(allColorsMap.values()),
    };
  }



}
