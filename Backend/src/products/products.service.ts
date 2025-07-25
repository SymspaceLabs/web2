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
import { Subcategory } from 'src/subcategories/entities/subcategory.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Company) private companiesRepository: Repository<Company>,
    @InjectRepository(SubcategoryItem) private subcategoryItemRepository: Repository<SubcategoryItem>,
    @InjectRepository(ProductVariant) private productVariantRepository: Repository<ProductVariant>,
    @InjectRepository(ProductModel) private productModelRepository: Repository<ProductModel>, // NEW: Inject ProductModel Repository
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Subcategory) private readonly subcategoryRepository: Repository<Subcategory>, // Injected

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

/**
   * Finds all products based on a search term and/or category/subcategory slugs.
   * Filters products belonging to the specified category, subcategory, or subcategory item,
   * including their direct and indirect descendants.
   *
   * @param searchTerm Optional: A string to search for in product names and descriptions.
   * @param categorySlug Optional: The slug of a main category (e.g., 'clothing-shoes-accessories') to filter products by.
   * @param subcategorySlug Optional: The slug of a subcategory (e.g., 'tops') or subcategory item (e.g., 't-shirts') to filter products by.
   * If categorySlug is also provided, this acts as a refinement within that category.
   * If only subcategorySlug is provided, it acts as the primary category filter.
   * @returns An object containing filtered products, brands, price range, categories, genders, availabilities, and colors.
   */
  async findAll(searchTerm?: string, categorySlug?: string, subcategorySlug?: string) {
    let relevantEntityIds: string[] = [];
    let filterAppliedButNoMatch = false; // New flag to specifically track if a slug was provided but no entity found

    // --- Step 1: Identify all relevant Category, Subcategory, and SubcategoryItem IDs ---

    // Prioritize categorySlug if provided
    if (categorySlug) {
      const foundCategory = await this.categoryRepository.findOne({
        where: { name: categorySlug },
        relations: ['subcategories', 'subcategories.subcategoryItems']
      });

      if (foundCategory) {
        relevantEntityIds.push(foundCategory.id);
        foundCategory.subcategories?.forEach(subcat => {
          relevantEntityIds.push(subcat.id);
          subcat.subcategoryItems?.forEach(item => relevantEntityIds.push(item.id));
        });
      } else {
        // If categorySlug was provided but no matching category, set flag and short-circuit further slug checks
        filterAppliedButNoMatch = true;
      }
    }

    // If subcategorySlug is provided, and either no categorySlug was given OR
    // a categorySlug was given but didn't result in any matches (meaning subcategorySlug might be the primary filter or a deeper search)
    if (subcategorySlug && !filterAppliedButNoMatch) {
      let tempSubCategoryIds: string[] = []; // Collect IDs found by subcategorySlug
      let foundSpecificSubcategory = false; // Track if we found the subcategory by name

      // Try to find as a Subcategory
      const foundSubcategory = await this.subcategoryRepository.findOne({
        where: { name: subcategorySlug },
        relations: ['category', 'subcategoryItems']
      });

      if (foundSubcategory) {
        tempSubCategoryIds.push(foundSubcategory.id);
        foundSpecificSubcategory = true;
        // Do NOT push foundSubcategory.category.id here if the intent is to strictly filter by the subcategory itself.
        // Also, do NOT add all subcategoryItems to the relevantEntityIds if the user specifically asked for a subcategory (e.g., 'Tops')
        // and not a subcategory item (e.g., 'T-Shirts').
        // Instead, only add direct matches or relevant descendants if the intent is to include items *within* 'Tops'.
        foundSubcategory.subcategoryItems?.forEach(item => tempSubCategoryIds.push(item.id));

      } else {
        // If not a Subcategory, try to find as a SubcategoryItem
        const foundSubcategoryItem = await this.subcategoryItemRepository.findOne({
          where: { name: subcategorySlug },
          relations: ['subcategory', 'subcategory.category']
        });

        if (foundSubcategoryItem) {
          tempSubCategoryIds.push(foundSubcategoryItem.id);
          foundSpecificSubcategory = true;
          // Again, only add direct relevant IDs.
          // If a subcategoryItem is found, you might want to include its parent subcategory and category for context,
          // but not necessarily for filtering if the query is strictly for the item.
          // For now, let's keep it simple: if 'subcategory' means the subcategory itself OR its items.
          if (foundSubcategoryItem.subcategory) {
            tempSubCategoryIds.push(foundSubcategoryItem.subcategory.id);
            if (foundSubcategoryItem.subcategory.category) {
                // If you strictly want only products whose subcategory is 'tops', do NOT add category ID here.
                // If 'tops' implies "anything under the 'Tops' subcategory", then it's fine.
                // Based on your problem, you want *only* products with subcategory 'tops'.
                // So, we should be very precise with what gets added to relevantEntityIds.
            }
          }
        }
      }

      // Now, combine based on whether categorySlug was already successful or not
      if (tempSubCategoryIds.length > 0) {
        if (categorySlug && relevantEntityIds.length > 0) {
            // If categorySlug already found relevant IDs, then subcategorySlug acts as a refinement.
            // We need to ensure that the tempSubCategoryIds are actually descendants of the categorySlug.
            // This means we should filter the products where *both* category and subcategory match.
            // The current approach of adding all category, subcategory, and subcategory item IDs
            // into a single `relevantEntityIds` array and then using `IN` for any of them is the root cause.
            // You need to enforce a stricter hierarchy in the query itself.

            // For now, let's just make relevantEntityIds specific to the subcategory and its items
            // IF NO broader category filter was already established or is intended.
            relevantEntityIds = tempSubCategoryIds; // Overwrite if subcategorySlug is the primary filter
        } else if (!categorySlug) {
            // If no categorySlug, subcategorySlug is the primary filter.
            relevantEntityIds = tempSubCategoryIds;
        }
        // If categorySlug was present and *did* find entities, but subcategorySlug didn't lead to more specific filtering
        // (i.e., it's not a direct descendant or refinement), then `relevantEntityIds` should remain as it was from categorySlug.
        // This part of the logic needs careful consideration based on exact filtering requirements.
        // For your problem, if you filter by `subcategory=tops`, you only want products with that direct subcategory.
      } else {
        // If subcategorySlug was provided but no match found for it (and categorySlug also failed or wasn't provided)
        if (!categorySlug || relevantEntityIds.length === 0) {
          filterAppliedButNoMatch = true;
        }
      }
    }

    relevantEntityIds = Array.from(new Set(relevantEntityIds)); // Ensure unique IDs

    // If a slug filter (categorySlug or subcategorySlug) was applied,
    // AND we explicitly determined no entities matched, return empty.
    // This check is good.
    if ((categorySlug || subcategorySlug) && filterAppliedButNoMatch && relevantEntityIds.length === 0) {
      return {
        products: [],
        brands: [],
        priceRange: { min: 0, max: 0 },
        category: [],
        genders: [],
        availabilities: [],
        colors: []
      };
    }

    // --- Step 2: Build the main product query ---
    const query = this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.company', 'company')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.colors', 'colors')
      .leftJoinAndSelect('product.sizes', 'sizes')
      .leftJoinAndSelect('product.subcategoryItem', 'subcategoryItem')
      .leftJoinAndSelect('subcategoryItem.subcategory', 'subcategory')
      .leftJoinAndSelect('subcategory.category', 'category')
      .orderBy('images.sortOrder', 'ASC'); // Ensure images are sorted

    // Add filtering conditions based on the determined slugs
    if (categorySlug) {
        // If categorySlug is present, we filter by its ID or its descendants
        const category = await this.categoryRepository.findOne({ where: { name: categorySlug } });
        if (category) {
            query.andWhere('category.id = :categoryId', { categoryId: category.id });
        }
    }

    if (subcategorySlug) {
        // If subcategorySlug is present, we filter by its ID or its item's ID
        const subcategory = await this.subcategoryRepository.findOne({ where: { name: subcategorySlug } });
        const subcategoryItem = await this.subcategoryItemRepository.findOne({ where: { name: subcategorySlug } });

        if (subcategory) {
            // Filter by the subcategory ID
            query.andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory.id });
        } else if (subcategoryItem) {
            // Or filter by the subcategory item ID
            query.andWhere('subcategoryItem.id = :subcategoryItemId', { subcategoryItemId: subcategoryItem.id });
        } else {
            // If subcategorySlug was provided but neither a subcategory nor subcategory item matched its name,
            // then no products should be returned for this filter.
            query.andWhere('1 = 0'); // Ensures no results are returned
        }
    }

    // Add search condition if searchTerm is provided
    if (searchTerm) {
      query.andWhere(
        '(LOWER(product.name) LIKE LOWER(:searchTerm) OR LOWER(product.description) LIKE LOWER(:searchTerm))',
        { searchTerm: `%${searchTerm}%` }
      );
    }

    // Step 3: Execute the main query to get products
    const products = await query.getMany();

    // Step 4: Post-processing for products (sorting images)
    for (const product of products) {
      if (product.images) {
        product.images.sort((a, b) => a.sortOrder - b.sortOrder);
      }
    }

    // Step 5: Compute price range from the filtered products
    const prices = products.map(p => p.price);
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

    // Step 6: Get distinct brands relevant to the filtered products
    let formattedBrands: any[] = [];
    if (products.length > 0 || (!searchTerm && !categorySlug && !subcategorySlug)) {
      const brandsQuery = this.productRepository.createQueryBuilder('product')
        .leftJoin('product.company', 'company')
        .leftJoin('product.subcategoryItem', 'subcategoryItem')
        .leftJoin('subcategoryItem.subcategory', 'subcategory')
        .leftJoin('subcategory.category', 'category')
        .select(['company.id AS id', 'company.entityName AS name'])
        .groupBy('company.id')
        .addGroupBy('company.entityName');

      if (relevantEntityIds.length > 0) {
        brandsQuery.andWhere(
          '(category.id IN (:...relevantEntityIds) OR subcategory.id IN (:...relevantEntityIds) OR subcategoryItem.id IN (:...relevantEntityIds))',
          { relevantEntityIds }
        );
      }
      if (searchTerm) {
        brandsQuery.andWhere(
          '(LOWER(product.name) LIKE LOWER(:searchTerm) OR LOWER(product.description) LIKE LOWER(:searchTerm))',
          { searchTerm: `%${searchTerm}%` }
        );
      }
      const usedBrands = await brandsQuery.getRawMany();
      formattedBrands = usedBrands.map(b => ({
        id: b.id,
        entityName: b.name,
      }));
    }

    // Step 7: Get ALL categories, then enrich them with subcategories/items from products
    const allCategories = await this.categoryRepository.find({
      relations: ['subcategories', 'subcategories.subcategoryItems'],
      order: { name: 'ASC' }
    });

    const categoriesForFacets = allCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      subCategory: cat.subcategories ? cat.subcategories.map(subcat => ({
        id: subcat.id,
        name: subcat.name,
        subcategoryItems: subcat.subcategoryItems ? subcat.subcategoryItems.map(item => ({
          id: item.id,
          name: item.name
        })) : []
      })) : []
    }));

    const productCategoryHierarchy = new Map<string, { id: string; name: string; subCategory: Map<string, { id: string; name: string; subcategoryItems: Map<string, { id: string; name: string }> }> }>();

    for (const product of products) {
      const mainCategory = product.subcategoryItem?.subcategory?.category;
      const subcategory = product.subcategoryItem?.subcategory;
      const subcategoryItem = product.subcategoryItem;

      if (mainCategory) {
        if (!productCategoryHierarchy.has(mainCategory.id)) {
          productCategoryHierarchy.set(mainCategory.id, {
            id: mainCategory.id,
            name: mainCategory.name,
            subCategory: new Map()
          });
        }
        const currentCategory = productCategoryHierarchy.get(mainCategory.id)!;

        if (subcategory) {
          if (!currentCategory.subCategory.has(subcategory.id)) {
            currentCategory.subCategory.set(subcategory.id, {
              id: subcategory.id,
              name: subcategory.name,
              subcategoryItems: new Map()
            });
          }
          const currentSubcategory = currentCategory.subCategory.get(subcategory.id)!;

          if (subcategoryItem) {
            if (!currentSubcategory.subcategoryItems.has(subcategoryItem.id)) {
              currentSubcategory.subcategoryItems.set(subcategoryItem.id, {
                id: subcategoryItem.id,
                name: subcategoryItem.name
              });
            }
          }
        }
      }
    }

    const finalCategoryFacets = categoriesForFacets.map(cat => {
      const enrichedCat = { ...cat };

      if (productCategoryHierarchy.has(cat.id)) {
        const productHierarchyCat = productCategoryHierarchy.get(cat.id)!;
        enrichedCat.subCategory = enrichedCat.subCategory.map(subcat => {
          const enrichedSubcat = { ...subcat };
          if (productHierarchyCat.subCategory.has(subcat.id)) {
            const productHierarchySubcat = productHierarchyCat.subCategory.get(subcat.id)!;
            enrichedSubcat.subcategoryItems = enrichedSubcat.subcategoryItems.filter(item =>
              productHierarchySubcat.subcategoryItems.has(item.id)
            );
          } else {
            enrichedSubcat.subcategoryItems = [];
          }
          return enrichedSubcat;
        });
        enrichedCat.subCategory = enrichedCat.subCategory.filter(subcat => subcat.subcategoryItems.length > 0);
      } else {
        enrichedCat.subCategory = [];
      }
      return enrichedCat;
    });

    // Step 8: Get distinct genders from the filtered products
    const productGendersResult = this.productRepository.createQueryBuilder('product')
      .select('DISTINCT product.gender', 'gender')
      .where('product.gender IS NOT NULL')
      .leftJoin('product.subcategoryItem', 'subcategoryItem')
      .leftJoin('subcategoryItem.subcategory', 'subcategory')
      .leftJoin('subcategory.category', 'category');

    if (relevantEntityIds.length > 0) {
      productGendersResult.andWhere(
        '(category.id IN (:...relevantEntityIds) OR subcategory.id IN (:...relevantEntityIds) OR subcategoryItem.id IN (:...relevantEntityIds))',
        { relevantEntityIds }
      );
    }
    if (searchTerm) {
      productGendersResult.andWhere(
        '(LOWER(product.name) LIKE LOWER(:searchTerm) OR LOWER(product.description) LIKE LOWER(:searchTerm))',
        { searchTerm: `%${searchTerm}%` }
      );
    }
    const distinctProductGenders = (await productGendersResult.getRawMany()).map(g => g.gender);

    const allPossibleGenders = ['women', 'men', 'unisex' ];
    const genders = Array.from(new Set([...allPossibleGenders, ...distinctProductGenders]));

    // Step 9: Compute availability per product & collect distinct statuses
    const availabilitySet = new Set<string>();
    for (const product of products as any[]) {
      const inStock = product.variants?.some(v => v.stock > 0);
      const status = inStock ? 'In stock' : 'Out of stock';
      (product as any).availability = status;
      availabilitySet.add(status);
    }
    const availabilities = Array.from(availabilitySet);

    // Step 10: Extract all distinct colors used from the filtered products
    const allColorsMap = new Map<string, { name: string; code: string }>();
    for (const product of products) {
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
    const colors = Array.from(allColorsMap.values());

    // Step 11: Return all computed data
    return {
      products,
      brands: formattedBrands,
      priceRange: { min: minPrice, max: maxPrice },
      category: finalCategoryFacets,
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
