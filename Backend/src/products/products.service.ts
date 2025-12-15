import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Company } from 'src/companies/entities/company.entity';
import { Category } from 'src/categories/entities/category.entity';
import { QueryFailedError, Repository, SelectQueryBuilder } from 'typeorm';
import { Subcategory } from 'src/subcategories/entities/subcategory.entity';
import { ProductImage } from '../product-images/entities/product-image.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductVariant } from 'src/product-variant/entities/product-variant.entity';
import { Product3DModel } from 'src/product-3d-models/entities/product-3d-model.entity';
import { CreateProductImageDto } from 'src/product-images/dto/create-product-image.dto';
import { SubcategoryItem } from 'src/subcategory-items/entities/subcategory-item.entity';
import { slugify, normalizeSearchText, determineProductAvailability } from './utils/utils';
import { SubcategoryItemChild } from 'src/subcategory-item-child/entities/subcategory-item-child.entity';
import { resolveCategoryHierarchy, applyTagDefaults, mapProduct3DModels, mapProductColors, mapProductSizes } from './utils/product.utils';
import { ProductColor } from 'src/product-colors/entities/product-color.entity';
import { ProductSize } from 'src/product-sizes/entities/product-size.entity';

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
    @InjectRepository(ProductColor) private productColorRepository: Repository<ProductColor>,
    @InjectRepository(ProductSize) private productSizeRepository: Repository<ProductSize>,
  ) {}
  
  // CREATE & UPDATE PRODUCT
  async upsert(id: string | undefined, dto: CreateProductDto): Promise<Product> {
    // 1. Destructure DTO  
    const {
          images,
          threeDModels,
          company,
          name,
          colors,
          sizes,
          dimensions,
          subcategoryItem: subcategoryItemIdFromDto,
          subcategoryItemChild: subcategoryItemChildIdFromDto,
          gender,
          ...productData
      } = dto;

      let product: Product;
      let finalSubcategoryItem: SubcategoryItem | undefined;
      let finalSubcategoryItemChild: SubcategoryItemChild | undefined;
      let tagDefaults: any = {}; 

      // 2. Resolve Category Hierarchy and Get Defaults (using utility function)
      if (subcategoryItemIdFromDto || subcategoryItemChildIdFromDto) {
          ({ finalSubcategoryItem, finalSubcategoryItemChild, tagDefaults } = await resolveCategoryHierarchy(
              dto,
              this.subcategoryItemRepository,
              this.subcategoryItemChildRepository,
          ));
      } else if (!id) {
          // New products must have a category ID
          throw new BadRequestException('Either subcategoryItemId or subcategoryItemChildId must be provided for new products.');
      }

      // 3. Apply Tag Defaults (using utility function)
      applyTagDefaults(productData, tagDefaults);


    // --------------------------------------------------------------------------
    // === UPDATE MODE ===
    // --------------------------------------------------------------------------
      if (id) {
        product = await this.productRepository.findOne({
            where: { id },
            relations: [
              'company', 'images', 'colors', 'sizes', 'subcategoryItem',
              'subcategoryItemChild', 'variants', 'threeDModels'
            ],
        });

        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        // 4. Update Category Links (Refined Logic for Safety and Completeness)
        // Check if a new parent was resolved OR if the DTO explicitly sent null
        if (finalSubcategoryItem || subcategoryItemIdFromDto === null) {
            product.subcategoryItem = finalSubcategoryItem || null;
            product.subcategoryItemId = finalSubcategoryItem?.id || null;
            product.subcategoryItemChild = finalSubcategoryItemChild || null;
            product.subcategoryItemChildId = finalSubcategoryItemChild?.id || null;
        }
        
        // Else (Parent category ID was not touched), check if only the child was explicitly cleared
        else if (subcategoryItemChildIdFromDto === null) {
            product.subcategoryItemChild = null;
            product.subcategoryItemChildId = null;
        }

        // 5. Cleanup Variants and 3D Models (Using new private method)
        await this.handlePreUpdateCleanup(product, dto); 

        // 6. Handle 3D Model Mapping and Attachment (Using external mapper)
        if (threeDModels !== undefined) {
            product.threeDModels = mapProduct3DModels(threeDModels, product); 
        }

        // Company update logic
        if (company) {
            const companyEntity = await this.companiesRepository.findOne({ where: { id: company } });
            if (!companyEntity) {
                throw new NotFoundException(`Company with ID ${company} not found`);
            }
            product.company = companyEntity;
        }

          // Slug update logic
          if (name !== undefined || company !== undefined) {
              const updatedCompanyName = company ? (await this.companiesRepository.findOne({ where: { id: company } }))?.entityName : product.company?.entityName;
              const updatedProductName = name !== undefined ? name : product.name;

              if (updatedCompanyName && updatedProductName) {
                  product.slug = `${slugify(updatedCompanyName)}-${slugify(updatedProductName)}`;
              }
          }

          // Assign all other product data (including dimensions and defaulted tags)
          Object.assign(product, productData);
          if (name !== undefined) product.name = name; // Update name explicitly
          
          if (productData.productWeight === undefined) {
              product.productWeight = { unit: 'lbs', value: null }; // ✅ Use object, not null
          }

          if (dimensions !== undefined) {
            product.dimensions = dimensions;
          }
          
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

          if (!finalSubcategoryItem) {
              throw new BadRequestException('Subcategory item could not be determined. Please provide valid subcategoryItemId or subcategoryItemChildId.');
          }

          const slug = `${slugify(companyEntity.entityName)}-${slugify(name)}`;

          // 2. Ensure gender is an array of the correct enum type
          const finalGender = gender && typeof gender === 'string' ? gender : null;


          // productData now includes all defaults merged above
          product = this.productRepository.create({
            ...productData,
            name,
            company: companyEntity,
            slug,
            subcategoryItem: finalSubcategoryItem,
            subcategoryItemId: finalSubcategoryItem.id,
            subcategoryItemChild: finalSubcategoryItemChild,
            subcategoryItemChildId: finalSubcategoryItemChild?.id || null,
            variants: [],
            images: [],
            colors: [],
            sizes: [],
            threeDModels: [],
            gender: finalGender,
            productWeight: productData.productWeight ?? { unit: 'lbs', value: null }, // ✅ Add this
            dimensions: dimensions ?? { unit: 'cm', length: null, width: null, height: null }, // ✅ Add this

          });

          // --- 3D Model Creation Logic ---
          if (threeDModels?.length) {
              product.threeDModels = mapProduct3DModels(threeDModels, product);
          }

      }

    // --------------------------------------------------------------------------
    // === Shared logic for both Create & Update ===
    // --------------------------------------------------------------------------

      // Images: Replace images if provided in DTO
      if (images !== undefined) {
          await this.saveProductImages(product, images);
      }

      // ✅ UPDATED: Colors Mapping - Use merge instead of replace
      if (colors !== undefined) {
          if (id) {
              // UPDATE MODE: Merge to preserve existing IDs
              product.colors = await this.mergeProductColors(product, colors);
          } else {
              // CREATE MODE: Use the simple mapper since there are no existing colors
              product.colors = mapProductColors(colors, product);
          }
      }

      // ✅ UPDATED: Sizes Mapping - Use merge instead of replace
      if (sizes !== undefined) {
          const mappedSizeDtos = sizes.map((s, index) => ({
              size: s.size,
              sortOrder: s.sortOrder !== undefined ? s.sortOrder : index,
              sizeChartUrl: s.sizeChartUrl || null,
          }));
          
          if (id) {
              // UPDATE MODE: Merge to preserve existing IDs
              product.sizes = await this.mergeProductSizes(product, mappedSizeDtos);
          } else {
              // CREATE MODE: Use the simple mapper since there are no existing sizes
              product.sizes = mapProductSizes(mappedSizeDtos, product);
          }
      }

      let savedProduct: Product;
      
      try {
        // Step 1: Save product (This saves all non-variant relations due to cascade)
        savedProduct = await this.productRepository.save(product);
      } catch (error) {
        // 1. Check if it's the specific TypeORM QueryFailedError
        if (error instanceof QueryFailedError) {
            console.error('Full error:', error); // Add this
            const errorMessage = error.message;
           
            // For other QueryFailedErrors, you might throw a generic 500 or another BadRequest
            // Depending on how specific you want to be.
            if (errorMessage.includes('Duplicate entry')) {
                 throw new BadRequestException('A product with this unique field already exists.');
            }
            
            // Re-throw other TypeORM errors as a generic error or log it
            throw new BadRequestException('Database error: Invalid data provided.');
        }
      }

      // === Generate Variants ===
      // Run if creating a new product OR if colors/sizes were explicitly provided/updated
      if (
          !id ||
          (colors !== undefined) || // Check presence regardless of length for explicit update
          (sizes !== undefined)
      ) {
          // Fetch product again with updated colors and sizes to ensure accurate variant generation
          const productWithFreshRelations = await this.productRepository.findOne({
              where: { id: savedProduct.id },
              relations: ['colors', 'sizes'],
          });

          // if (productWithFreshRelations) {
          //     const savedVariants = await this.generateVariants(productWithFreshRelations, dto);
          //     savedProduct.variants = savedVariants;
          // }

          if (productWithFreshRelations) {
            // ⭐ FIX: If the product has neither colors nor sizes, we must create a single default variant.
            // This handles the case where a product has no dimensions (e.g., a single item).
            const hasDimensions = productWithFreshRelations.colors?.length > 0 || productWithFreshRelations.sizes?.length > 0;
            
            if (!hasDimensions) {
                // If no dimensions, create a single default variant
                const defaultVariant = {
                    color: null,
                    size: null,
                    // Copy other properties from the product or use defaults
                    stock: 0,
                    price: savedProduct.salePrice || 0,
                    salePrice: savedProduct.salePrice || 0,
                    cost: savedProduct.cost || 0,
                    material: savedProduct.material || '',
                    product: productWithFreshRelations,
                };
                
                // Assuming a method to save a single variant exists
                // NOTE: You will need to replace `this.productVariantRepository.save` 
                // with the actual method you use to save variants.
                const savedVariants = await this.productVariantRepository.save([defaultVariant]);
                savedProduct.variants = savedVariants;
            } else {
                // If dimensions exist, run the standard generation logic
                const savedVariants = await this.generateVariants(productWithFreshRelations, dto);
                savedProduct.variants = savedVariants;
            }
          }
      }

      // Remove circular references before returning
      if (savedProduct.variants?.length) {
          savedProduct.variants.forEach((variant) => { delete variant.product; });
      }
      if (savedProduct.threeDModels?.length) {
          savedProduct.threeDModels.forEach((model) => { delete model.product; });
      }
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
   * @param ageGroups Optional: An array of age groups to filter by (e.g., ['kids', 'adult']). // <-- UPDATED DOCS
   * @returns An object containing filtered products and facets.
   */
  async findAll(
    searchTerm?: string,
    categorySlug?: string,
    subcategorySlug?: string,
    subcategoryItemSlugs?: string[],
    subcategoryItemChildSlug?: string,
    genders?: string[],
    ageGroups?: string[],
    companyId?: string,
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

    // ⭐ NEW LOGIC: Apply Company ID Filter
    if (companyId) {
      // Since we left-joined product.company as 'company', we filter on company.id
      productsQuery.andWhere('company.id = :companyId', { companyId });
    }

    // 2. Apply the category, search term, and GENDER filters
        
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

    // ⭐ Apply Age Group Filter (UPDATED LOGIC)
    if (ageGroups && ageGroups.length > 0) {
        this.applyAgeGroupFilter(productsQuery, ageGroups); 
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
    const formattedBrands = await this.getBrandsFacet(products); 
    const formattedGenders = await this.getGendersFacet(products);
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
      .leftJoinAndSelect('product.threeDModels', 'threeDModels')
      
      // ====================================================================
      // 1. JOINS FOR PRODUCTS WITH subcategoryItemChild (Current logic)
      // ====================================================================
      .leftJoinAndSelect('product.subcategoryItemChild', 'subcategoryItemChild')
      .leftJoinAndSelect('subcategoryItemChild.subcategoryItem', 'parentSubcategoryItem') // Rename alias to avoid conflict
      .leftJoinAndSelect('parentSubcategoryItem.subcategory', 'parentSubcategory')
      .leftJoinAndSelect('parentSubcategory.category', 'parentCategory')

      // ====================================================================
      // 2. JOINS FOR PRODUCTS WITH ONLY subcategoryItem (MISSING/CRITICAL FIX)
      // This is a direct join to fetch the category path when no child exists.
      // ====================================================================
      .leftJoinAndSelect('product.subcategoryItem', 'directSubcategoryItem')
      .leftJoinAndSelect('directSubcategoryItem.subcategory', 'directSubcategory')
      .leftJoinAndSelect('directSubcategory.category', 'directCategory')
      
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
    
  // FIND ONE BY ID
  async findOne(productId: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      // Updated relations to load the full hierarchy including subcategoryItemChild
      relations: [
        'company', 
        'images', 
        'colors', 
        'sizes', 
        'subcategoryItem', 
        'subcategoryItemChild', 
        'variants', 
        'threeDModels',
        'subcategoryItem.subcategory',
        'subcategoryItem.subcategory.category',
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

  /**
 * Merges incoming colors with existing colors, preserving IDs when possible.
 * Only creates new entities for truly new colors.
 * Deletes colors that were removed.
 */
private async mergeProductColors(
    product: Product, 
    incomingColors: Array<{ name: string; code: string }>
): Promise<ProductColor[]> {
    const existingColors = product.colors || [];
    const mergedColors: ProductColor[] = [];

    // Process each incoming color
    for (const incomingColor of incomingColors) {
        // Try to find existing color by BOTH name AND code (ensures exact match)
        const existingColor = existingColors.find(
            c => c.name.toLowerCase() === incomingColor.name.toLowerCase() && 
                 c.code.toLowerCase() === incomingColor.code.toLowerCase()
        );

        if (existingColor) {
            // ✅ PRESERVE: Color already exists, keep the same entity (and ID)
            // Update properties in case of minor changes
            existingColor.name = incomingColor.name;
            existingColor.code = incomingColor.code;
            mergedColors.push(existingColor);
            
            console.log(`[MergeColors] Preserved existing color: ${existingColor.name} (ID: ${existingColor.id})`);
        } else {
            // ✅ CREATE: This is a new color, create a new entity
            const newColor = new ProductColor();
            newColor.name = incomingColor.name;
            newColor.code = incomingColor.code;
            newColor.product = product;
            mergedColors.push(newColor);
            
            console.log(`[MergeColors] Creating new color: ${newColor.name}`);
        }
    }

    // ✅ DELETE: Find colors that exist in DB but not in incoming data (user removed them)
    const colorsToDelete = existingColors.filter(
        existing => !incomingColors.some(
            incoming => incoming.name.toLowerCase() === existing.name.toLowerCase() && 
                       incoming.code.toLowerCase() === existing.code.toLowerCase()
        )
    );
    
    if (colorsToDelete.length > 0) {
        console.log(`[MergeColors] Deleting ${colorsToDelete.length} removed colors`);
        // TypeORM will handle cascade deletion of related entities (variants, etc.)
        await this.productColorRepository.remove(colorsToDelete);
    }

    return mergedColors;
}

  /**
   * Merges incoming sizes with existing sizes, preserving IDs when possible.
   * Only creates new entities for truly new sizes.
   * Deletes sizes that were removed.
   */
  private async mergeProductSizes(
      product: Product,
      incomingSizes: Array<{ size: string; sizeChartUrl?: string; sortOrder?: number }>
  ): Promise<ProductSize[]> {
    const existingSizes = product.sizes || [];
    const mergedSizes: ProductSize[] = [];

    // Process each incoming size
    for (const incomingSize of incomingSizes) {
        // Find existing size by the 'size' value (e.g., "S", "M", "L")
        const existingSize = existingSizes.find(
            s => s.size.toLowerCase() === incomingSize.size.toLowerCase()
        );

        if (existingSize) {
            // ✅ PRESERVE: Size already exists, keep the same entity (and ID)
            // Update mutable properties
            existingSize.size = incomingSize.size; // In case of capitalization changes
            existingSize.sizeChartUrl = incomingSize.sizeChartUrl || existingSize.sizeChartUrl;
            existingSize.sortOrder = incomingSize.sortOrder ?? existingSize.sortOrder;
            mergedSizes.push(existingSize);
            
            console.log(`[MergeSizes] Preserved existing size: ${existingSize.size} (ID: ${existingSize.id})`);
        } else {
            // ✅ CREATE: This is a new size, create a new entity
            const newSize = new ProductSize();
            newSize.size = incomingSize.size;
            newSize.sizeChartUrl = incomingSize.sizeChartUrl || null;
            newSize.sortOrder = incomingSize.sortOrder ?? mergedSizes.length;
            newSize.product = product;
            mergedSizes.push(newSize);
            
            console.log(`[MergeSizes] Creating new size: ${newSize.size}`);
        }
    }

    // ✅ DELETE: Find sizes that exist in DB but not in incoming data (user removed them)
    const sizesToDelete = existingSizes.filter(
        existing => !incomingSizes.some(
            incoming => incoming.size.toLowerCase() === existing.size.toLowerCase()
        )
    );

    if (sizesToDelete.length > 0) {
        console.log(`[MergeSizes] Deleting ${sizesToDelete.length} removed sizes`);
        await this.productSizeRepository.remove(sizesToDelete);
    }

    return mergedSizes;
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
              slug: item.slug              // ✅ Now correctly available
          });
      }
      
      // Map categories
      for (const item of categorySuggestions) {
          generalSuggestions.push({
              id: `category-${item.id}`,
              label: item.name,
              type: 'category',
              slug: item.slug              // ✅ Now correctly available
          });
      }
      
      // Map subcategory children
      for (const item of subcategoryItemChildSuggestions) {
          generalSuggestions.push({
              id: `subcategory-child-${item.id}`,
              label: item.name,
              type: 'subcategory-child',
              slug: item.slug              // ✅ Now correctly available
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

  private applyAgeGroupFilter(query: SelectQueryBuilder<Product>, ageGroups: string[]): void {
      // IMPORTANT: Use the 'IN' operator to check for multiple values in the array.
      // This allows filtering for products where product.age_group is one of the provided ageGroups.
      
      if (ageGroups.length === 1) {
          // Optimization for a single value, though 'IN' also works fine
          query.andWhere('product.age_group = :ageGroup', { ageGroup: ageGroups[0] });
      } else {
          query.andWhere('product.age_group IN (:...ageGroups)', { ageGroups });
      }
  }

  // Reusable method to generate and save variants
  private async generateVariants(product: Product, dto: CreateProductDto): Promise<ProductVariant[]> {
    
    // 1. Get existing variants for lookup and cleanup
    // CRITICAL: Ensure 'product' passed into this function is loaded with the 'variants' relation.
    const existingVariants = product.variants || []; 
    
    // Map existing variants for quick lookup (Key: "COLOR_NAME-SIZE_NAME")
    const existingVariantMap = new Map<string, ProductVariant>();
    for (const variant of existingVariants) {
        // Create the key using the actual color name and size name (or 'null' string if null)
        const colorKey = variant.color?.name || 'null';
        const sizeKey = variant.size?.size || 'null'; 
        const key = `${colorKey}-${sizeKey}`;
        existingVariantMap.set(key, variant);
    }

    const variantsToSave: ProductVariant[] = [];

    // --- 2. Determine Dimension Iteration ---
    // Use the product's colors and sizes, which were updated right before this call in upsert.
    const colorsToIterate = product.colors?.length > 0 ? product.colors : [null];
    const sizesToIterate = product.sizes?.length > 0 ? product.sizes : [null];
    
    // --- 3. Cartesian Product Iteration (Preserve or Create) ---
    for (const color of colorsToIterate) {
        for (const size of sizesToIterate) {
            
            // Generate the lookup key for the combination
            const colorName = color ? color.name : null;
            const sizeName = size ? size.size : null;
            const key = `${colorName || 'null'}-${sizeName || 'null'}`;
            
            // Skip the explicit "no dimensions" case if both are null, as it was handled
            // in the upsert method's custom default logic.
            if (!color && !size) { 
                 continue; 
            }

            // Check if this combination already exists
            if (existingVariantMap.has(key)) {
                // ⭐ GOAL 1: PRESERVE - Use the existing variant entity
                const existingVariant = existingVariantMap.get(key);
                
                // CRITICAL: Remove from the map so that anything remaining must be deleted
                existingVariantMap.delete(key); 
                
                // Update non-structural fields from the main product entity defaults (if needed)
                existingVariant.price = product.price || existingVariant.price || 0;
                existingVariant.salePrice = product.salePrice || existingVariant.salePrice || 0;
                existingVariant.cost = product.cost || existingVariant.cost || 0;
                existingVariant.material = product.material || existingVariant.material || '';
                
                variantsToSave.push(existingVariant);
            } else {
                // ⭐ GOAL 2: CREATE - New combination, create a new variant (ID will be generated)
                const newVariant = new ProductVariant();
                
                // Assign relation entities and dimensions
                newVariant.product = product;
                newVariant.color = color;
                newVariant.size = size;

                // Assign default pricing/stock (these will be updated later by the frontend's dedicated variant update if modified)
                newVariant.price = product.price || 0;
                newVariant.salePrice = product.salePrice || 0; // Use product's sale price as default
                newVariant.cost = product.cost || 0;
                newVariant.stock = 0;
                newVariant.material = product.material || '';
                
                // Build a dynamic SKU.
                const colorCodePart = color?.code || 'DEFAULT_C';
                const sizePart = size?.size || 'DEFAULT_S';
                newVariant.sku = `${product.slug}-${colorCodePart}-${sizePart}`;

                variantsToSave.push(newVariant);
            }
        }
    }

    // --- 4. Cleanup (Delete) ---
    // ⭐ GOAL 3: DELETE - Any variant remaining in the map is for a color/size combination 
    // that was deleted by the user.
    const variantsToDelete = Array.from(existingVariantMap.values());
    
    if (variantsToDelete.length > 0) {
        console.log(`[Variants] Deleting ${variantsToDelete.length} obsolete variants.`);
        // Use remove to ensure correct cascading deletion if needed
        await this.productVariantRepository.remove(variantsToDelete); 
    }

    // --- 5. Save All ---
    console.log(`[Variants] Saving/Updating ${variantsToSave.length} total variants.`);
    // Batch save the preserved (updated) and newly created variants
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
      img.colorId = imgDto.colorId || null; 
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
    else if (subcategoryItemSlugs && subcategoryItemSlugs.length > 0) {
      // 💥 CRITICAL FIX: Use an OR condition to check the provided slugs/names against 
      // 1. subcategoryItem.slug (standard slug)
      // 2. subcategoryItem.mobileLevel2Name (new mobile alias/name)
      // 3. subcategoryItemChild.slug (existing cross-hierarchy filter)

      // (Optional) Add this to your controller or near the filter application:
      const lowerCaseSlugs = subcategoryItemSlugs.map(s => s.toLowerCase());
      
      // Then modify the query (if necessary for your database):
      query.andWhere(
          '(LOWER(subcategoryItem.slug) IN (:...itemSlugs) OR LOWER(subcategoryItem.mobileLevel2Name) IN (:...itemSlugs) OR LOWER(subcategoryItemChild.slug) IN (:...itemSlugs))', 
          { itemSlugs: lowerCaseSlugs }
      );
      hasFilter = true;
    }
    
    // 3. ⭐ Apply the subcategory filter (THIS FIXES YOUR 'subcategory=tops' ISSUE)
    //    This filters all products linked to *any* subcategory item whose 
    //    parent is the target subcategory.
    else if (subcategorySlug) {
      // This is the CRITICAL line. It filters based on the 'subcategory' alias 
      // established in your findAll query (.leftJoinAndSelect('subcategoryItem.subcategory', 'subcategory')).
      query.andWhere('subcategory.slug = :subcategorySlug', {
        subcategorySlug: subcategorySlug,
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
    // NOTE: This .getCount() check requires careful consideration in a service method 
    // as it executes the query prematurely.
    if (hasFilter) {
      // Temporarily clone the query to safely check for a match count
      const countQuery = query.clone(); 
      const count = await countQuery.getCount();
      
      // Return TRUE if a filter was applied but yielded no results
      return count === 0; 
    }

    // Returns FALSE if no category filters were applied, or if the initial count was non-zero.
    return false; // Returns FALSE if no category filters were applied
  }

  // Example of the extracted function
  applySearchTermFilter(query: SelectQueryBuilder<any>, searchTerm?: string) {
    if (searchTerm) {
      // Apply the WHERE clause, combining all search conditions with OR
      query.andWhere(
        `(
          LOWER(product.name) LIKE LOWER(:searchTerm) OR 
          LOWER(product.description) LIKE LOWER(:searchTerm) OR
          LOWER(company.entityName) LIKE LOWER(:searchTerm) OR 
          
          -- New Category/Subcategory Search Fields:
          LOWER(category.name) LIKE LOWER(:searchTerm) OR 
          LOWER(subcategory.name) LIKE LOWER(:searchTerm) OR 
          LOWER(subcategoryItem.name) LIKE LOWER(:searchTerm) OR 
          LOWER(subcategoryItemChild.name) LIKE LOWER(:searchTerm)
        )`,
        { searchTerm: `%${searchTerm}%` },
      );
    }
  }

  async getBrandsFacet(products: any[]) {
    if (!products || products.length === 0) return [];

    const uniqueBrands = new Map<string, { id: string; entityName: string }>();

    for (const product of products) {
      const company = product.company;
      if (company?.id && company?.entityName) {
        // Add only once per unique company ID
        if (!uniqueBrands.has(company.id)) {
          uniqueBrands.set(company.id, {
            id: company.id,
            entityName: company.entityName,
          });
        }
      }
    }

    // Convert to array and sort alphabetically by entityName (optional)
    return Array.from(uniqueBrands.values()).sort((a, b) =>
      a.entityName.localeCompare(b.entityName),
    );
  }

  async getGendersFacet(products: any[]) {
    if (!products || products.length === 0) return [];

    // Collect unique genders
    const foundGenders = new Set<string>();

    for (const product of products) {
        // Ensure product.gender is treated as an array of strings.
        // If it's undefined, null, or not an array, default to an empty array.
        const productGenders = Array.isArray(product.gender) ? product.gender : [];
        
        // Loop through each gender string in the product's gender array
        for (const genderString of productGenders) {
            // Safely convert to lowercase, only if the element is actually a string
            const gender = typeof genderString === 'string' ? genderString.toLowerCase() : null;

            if (!gender) continue;

            if (gender === 'unisex') {
                // If any product is explicitly unisex, we assume all three main facets are relevant
                return ['Men', 'Women', 'Unisex'];
            }

            if (gender === 'men' || gender === 'male') {
                foundGenders.add('Men');
            } else if (gender === 'women' || gender === 'female') {
                foundGenders.add('Women');
            }
        }
    }

    // Always include 'Unisex' if both men & women are present
    const gendersArray = Array.from(foundGenders);
    if (foundGenders.has('Men') && foundGenders.has('Women')) {
        // Only add 'Unisex' facet if it wasn't already determined by an item being explicitly unisex
        if (!gendersArray.includes('Unisex')) {
            gendersArray.push('Unisex');
        }
    }

    return gendersArray;
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

  private async handlePreUpdateCleanup(product: Product, dto: CreateProductDto): Promise<void> {
    const { threeDModels, variants, colors, sizes } = dto;
    
    // 1. Variant Cleanup (Required if any variant-defining data is provided)
    if (variants !== undefined || colors !== undefined || sizes !== undefined) {
        if (product.variants && product.variants.length > 0) {
            // Note: This relies on this.productVariantRepository
            await this.productVariantRepository.remove(product.variants); 
        }
        product.variants = [];
    }

    // 2. 3D Model Cleanup (Required if threeDModels array is provided)
    if (threeDModels !== undefined) {
        if (product.threeDModels && product.threeDModels.length > 0) {
            // Note: This relies on this.product3DModelRepository
            await this.product3DModelRepository.remove(product.threeDModels);
        }
        product.threeDModels = [];
    }
  }

  async findByCompany(companyId: string): Promise<Product[]> {
    // Example logic using your repository (assuming TypeORM or similar)
    return this.productRepository.find({
        where: { company: { id: companyId } }, // Assuming 'company' is a relation
        relations: ['variants', 'images', 'colors', 'sizes'], 
    });
  }

}
