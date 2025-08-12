import { Brackets, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Company } from 'src/companies/entities/company.entity';
import { ProductSize } from 'src/product-sizes/entities/product-size.entity';
import { ProductImage } from '../product-images/entities/product-image.entity';
import { ProductColor } from 'src/product-colors/entities/product-color.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductVariant } from 'src/product-variant/entities/product-variant.entity';
import { SubcategoryItem } from 'src/subcategory-items/entities/subcategory-item.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Subcategory } from 'src/subcategories/entities/subcategory.entity';
import { Product3DModel } from 'src/product-3d-models/entities/product-3d-model.entity';
import { SubcategoryItemChild } from 'src/subcategory-item-child/entities/subcategory-item-child.entity';

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

  /**
   * Helper function to normalize text for search: lowercase and remove hyphens.
   * @param text The input string.
   * @returns The normalized string.
   */
  private normalizeSearchText(text: string): string {
    return text.toLowerCase().replace(/-/g, '');
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

      if (!finalSubcategoryItem) { // finalSubcategoryItem *must* be resolved for new products
          throw new BadRequestException('Subcategory item could not be determined. Please provide valid subcategoryItemId or subcategoryItemChildId.');
      }

      const slug = `${this.slugify(companyEntity.entityName)}-${this.slugify(name)}`;

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
   * Finds all products based on a search term and/or category/subcategory names.
   * Filters products belonging to the specified category, subcategory, subcategory item,
   * or subcategory item child, including their direct and indirect descendants.
   *
   * @param searchTerm Optional: A string to search for in product names and descriptions.
   * @param categoryName Optional: The name of a main category (e.g., 'Clothing, Shoes & Accessories') to filter products by.
   * @param subcategoryName Optional: The name of a subcategory (e.g., 'Accessories') to filter products by.
   * @param subcategoryItemName Optional: The name of a subcategory item (e.g., 'Bags') to filter products by.
   * @param subcategoryItemChildName Optional: The name of a subcategory item child (e.g., 'Handbags') to filter products by.
   * @returns An object containing filtered products, brands, price range, categories, genders, availabilities, and colors.
   */
  async findAll(
    searchTerm?: string,
    categoryName?: string, // Renamed from categorySlug
    subcategoryName?: string, // Renamed from subcategorySlug
    subcategoryItemName?: string, // Renamed from subcategoryItemSlug
    subcategoryItemChildName?: string, // Renamed from subcategoryItemChildSlug
  ) {
    let subcategoryItemId: string | undefined;
    let subcategoryId: string | undefined;
    let categoryId: string | undefined;
    let resolvedSubcategoryItemChildId: string | undefined;
    let filterAppliedButNoMatch = false;

    // Prioritize subcategoryItemChildName if provided.
    if (subcategoryItemChildName) {
        const foundSubcategoryItemChild = await this.subcategoryItemChildRepository
            .createQueryBuilder('subcategoryItemChild')
            .leftJoinAndSelect('subcategoryItemChild.subcategoryItem', 'subcategoryItem')
            .leftJoinAndSelect('subcategoryItem.subcategory', 'subcategory')
            .leftJoinAndSelect('subcategory.category', 'category')
            .where('LOWER(subcategoryItemChild.name) = LOWER(:name)', { name: subcategoryItemChildName }) // Filter by name
            .getOne();

        if (foundSubcategoryItemChild) {
            resolvedSubcategoryItemChildId = foundSubcategoryItemChild.id;
        } else {
            filterAppliedButNoMatch = true;
        }
    }
    // Then prioritize subcategoryItemName if provided.
    else if (subcategoryItemName) {
      const foundSubcategoryItem = await this.subcategoryItemRepository
        .createQueryBuilder('subcategoryItem')
        .leftJoinAndSelect('subcategoryItem.subcategory', 'subcategory')
        .leftJoinAndSelect('subcategory.category', 'category')
        .where('LOWER(subcategoryItem.name) = LOWER(:name)', { name: subcategoryItemName }) // Filter by name
        .getOne();

      if (foundSubcategoryItem) {
        subcategoryItemId = foundSubcategoryItem.id;
      } else {
        filterAppliedButNoMatch = true;
      }
    }
    // If no subcategoryItemName, check for subcategoryName.
    else if (subcategoryName) {
      const foundSubcategory = await this.subcategoryRepository.findOne({
        where: { name: subcategoryName }, // Filter by name
        relations: ['subcategoryItems'],
      });

      if (foundSubcategory) {
        subcategoryId = foundSubcategory.id;
      } else {
        filterAppliedButNoMatch = true;
      }
    }
    // If no subcategoryItemName or subcategoryName, check for categoryName.
    else if (categoryName) {
      const foundCategory = await this.categoryRepository.findOne({
        where: { name: categoryName }, // Filter by name
        relations: ['subcategories', 'subcategories.subcategoryItems'],
      });

      if (foundCategory) {
        categoryId = foundCategory.id;
      } else {
        filterAppliedButNoMatch = true;
      }
    }

    // If a specific filter was applied but no matching entity was found, return empty.
    if ((categoryName || subcategoryName || subcategoryItemName || subcategoryItemChildName) && filterAppliedButNoMatch) {
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

    // --- Step 2: Build the main product query ---
    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.company', 'company')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.colors', 'colors')
      .leftJoinAndSelect('product.sizes', 'sizes')
      .leftJoinAndSelect('product.subcategoryItem', 'subcategoryItem')
      .leftJoinAndSelect('subcategoryItem.subcategory', 'subcategory')
      .leftJoinAndSelect('subcategory.category', 'category')
      .leftJoinAndSelect('product.subcategoryItemChild', 'subcategoryItemChild') // Join with SubcategoryItemChild
      .orderBy('images.sortOrder', 'ASC');

    // Add the most specific filter first.
    if (resolvedSubcategoryItemChildId) {
        query.andWhere('product.subcategoryItemChild.id = :resolvedSubcategoryItemChildId', { resolvedSubcategoryItemChildId });
    } else if (subcategoryItemId) {
      query.andWhere('subcategoryItem.id = :subcategoryItemId', { subcategoryItemId });
    } else if (subcategoryId) {
      query.andWhere('subcategory.id = :subcategoryId', { subcategoryId });
    } else if (categoryId) {
      query.andWhere('category.id = :categoryId', { categoryId });
    }

    if (searchTerm) {
      query.andWhere(
        '(LOWER(product.name) LIKE LOWER(:searchTerm) OR LOWER(product.description) LIKE LOWER(:searchTerm))',
        { searchTerm: `%${searchTerm}%` },
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
    if (products.length > 0 || (!searchTerm && !categoryName && !subcategoryName && !subcategoryItemName && !subcategoryItemChildName)) {
      const brandsQuery = this.productRepository
        .createQueryBuilder('product')
        .leftJoin('product.company', 'company')
        .leftJoin('product.subcategoryItem', 'subcategoryItem')
        .leftJoin('subcategoryItem.subcategory', 'subcategory')
        .leftJoin('subcategory.category', 'category')
        .leftJoin('product.subcategoryItemChild', 'subcategoryItemChild')
        .select(['company.id AS id', 'company.entityName AS name'])
        .groupBy('company.id')
        .addGroupBy('company.entityName');

      if (resolvedSubcategoryItemChildId) {
        brandsQuery.andWhere('product.subcategoryItemChild.id = :resolvedSubcategoryItemChildId', { resolvedSubcategoryItemChildId });
      } else if (subcategoryItemId) {
        brandsQuery.andWhere('subcategoryItem.id = :subcategoryItemId', { subcategoryItemId });
      } else if (subcategoryId) {
        brandsQuery.andWhere('subcategory.id = :subcategoryId', { subcategoryId });
      } else if (categoryId) {
        brandsQuery.andWhere('category.id = :categoryId', { categoryId });
      }

      if (searchTerm) {
        brandsQuery.andWhere(
          '(LOWER(product.name) LIKE LOWER(:searchTerm) OR LOWER(product.description) LIKE LOWER(:searchTerm))',
          { searchTerm: `%${searchTerm}%` },
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
      relations: ['subcategories', 'subcategories.subcategoryItems', 'subcategories.subcategoryItems.subcategoryItemChildren'],
      order: { name: 'ASC' },
    });

    const categoriesForFacets = allCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      subCategory: cat.subcategories
        ? cat.subcategories.map(subcat => ({
          id: subcat.id,
          name: subcat.name,
          subcategoryItems: subcat.subcategoryItems
            ? subcat.subcategoryItems.map(item => ({
              id: item.id,
              name: item.name,
              subcategoryItemChildren: item.subcategoryItemChildren
                ? item.subcategoryItemChildren.map(child => ({
                  id: child.id,
                  name: child.name,
                }))
                : [],
            }))
            : [],
        }))
        : [],
    }));

    const productCategoryHierarchy = new Map<
      string,
      {
        id: string;
        name: string;
        subCategory: Map<
          string,
          {
            id: string;
            name: string;
            subcategoryItems: Map<string, { id: string; name: string; subcategoryItemChildren: Map<string, { id: string; name: string }> }>;
          }
        >;
      }
    >();

    for (const product of products) {
      const mainCategory = product.subcategoryItem?.subcategory?.category;
      const subcategory = product.subcategoryItem?.subcategory;
      const subcategoryItem = product.subcategoryItem;
      const subcategoryItemChild = product.subcategoryItemChild;

      if (mainCategory) {
        if (!productCategoryHierarchy.has(mainCategory.id)) {
          productCategoryHierarchy.set(mainCategory.id, {
            id: mainCategory.id,
            name: mainCategory.name,
            subCategory: new Map(),
          });
        }
        const currentCategory = productCategoryHierarchy.get(mainCategory.id)!;

        if (subcategory) {
          if (!currentCategory.subCategory.has(subcategory.id)) {
            currentCategory.subCategory.set(subcategory.id, {
              id: subcategory.id,
              name: subcategory.name,
              subcategoryItems: new Map(),
            });
          }
          const currentSubcategory = currentCategory.subCategory.get(
            subcategory.id,
          )!;

          if (subcategoryItem) {
            if (!currentSubcategory.subcategoryItems.has(subcategoryItem.id)) {
              currentSubcategory.subcategoryItems.set(subcategoryItem.id, {
                id: subcategoryItem.id,
                name: subcategoryItem.name,
                subcategoryItemChildren: new Map(),
              });
            }
            const currentSubcategoryItem = currentSubcategory.subcategoryItems.get(
              subcategoryItem.id,
            )!;

            if (subcategoryItemChild) {
              if (!currentSubcategoryItem.subcategoryItemChildren.has(subcategoryItemChild.id)) {
                currentSubcategoryItem.subcategoryItemChildren.set(subcategoryItemChild.id, {
                  id: subcategoryItemChild.id,
                  name: subcategoryItemChild.name,
                });
              }
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
            const productHierarchySubcat = productHierarchyCat.subCategory.get(
              subcat.id,
            )!;
            enrichedSubcat.subcategoryItems = enrichedSubcat.subcategoryItems.map(item => {
              const enrichedItem = { ...item };
              if (productHierarchySubcat.subcategoryItems.has(item.id)) {
                const productHierarchyItem = productHierarchySubcat.subcategoryItems.get(item.id)!;
                enrichedItem.subcategoryItemChildren = enrichedItem.subcategoryItemChildren.filter(
                  child => productHierarchyItem.subcategoryItemChildren.has(child.id)
                );
              } else {
                enrichedItem.subcategoryItemChildren = [];
              }
              return enrichedItem;
            }).filter(item => item.subcategoryItemChildren.length > 0);
          } else {
            enrichedSubcat.subcategoryItems = [];
          }
          return enrichedSubcat;
        });
        enrichedCat.subCategory = enrichedCat.subCategory.filter(
          subcat => subcat.subcategoryItems.length > 0,
        );
      } else {
        enrichedCat.subCategory = [];
      }
      return enrichedCat;
    });

    const productGendersResult = this.productRepository
      .createQueryBuilder('product')
      .select('DISTINCT product.gender', 'gender')
      .where('product.gender IS NOT NULL')
      .leftJoin('product.subcategoryItem', 'subcategoryItem')
      .leftJoin('subcategoryItem.subcategory', 'subcategory')
      .leftJoin('subcategory.category', 'category')
      .leftJoin('product.subcategoryItemChild', 'subcategoryItemChild'); // Join with SubcategoryItemChild

    if (resolvedSubcategoryItemChildId) {
        productGendersResult.andWhere('product.subcategoryItemChild.id = :resolvedSubcategoryItemChildId', { resolvedSubcategoryItemChildId });
    } else if (subcategoryItemId) {
      productGendersResult.andWhere('subcategoryItem.id = :subcategoryItemId', { subcategoryItemId });
    } else if (subcategoryId) {
      productGendersResult.andWhere('subcategory.id = :subcategoryId', { subcategoryId });
    } else if (categoryId) {
      productGendersResult.andWhere('category.id = :categoryId', { categoryId });
    }

    if (searchTerm) {
      productGendersResult.andWhere(
        '(LOWER(product.name) LIKE LOWER(:searchTerm) OR LOWER(product.description) LIKE LOWER(:searchTerm))',
        { searchTerm: `%${searchTerm}%` },
      );
    }
    const distinctProductGenders = (await productGendersResult.getRawMany()).map(
      g => g.gender,
    );
    const allPossibleGenders = ['women', 'men', 'unisex'];
    const genders = Array.from(new Set([...allPossibleGenders, ...distinctProductGenders]));

    const availabilitySet = new Set<string>();
    for (const product of products as any[]) {
      const inStock = product.variants?.some(v => v.stock > 0);
      const status = inStock ? 'In stock' : 'Out of stock';
      (product as any).availability = status;
      availabilitySet.add(status);
    }
    const availabilities = Array.from(availabilitySet);

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

    return {
      products,
      brands: formattedBrands,
      priceRange: { min: 0, max: 0 },
      category: finalCategoryFacets,
      genders,
      availabilities,
      colors,
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
      // Updated relations to load the full hierarchy including subcategoryItemChild
      relations: [
        'subcategoryItem',
        'subcategoryItem.subcategory',
        'subcategoryItem.subcategory.category',
        'subcategoryItemChild', // Load the direct child relation
        // If a product has a subcategoryItemChild, its parent subcategoryItem,
        // subcategory, and category will also be loaded via the relations on subcategoryItemChild.
        // We also keep the direct subcategoryItem relations for products that don't have a child.
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
   * Performs a free-form search across product names, descriptions, company names,
   * category names, and subcategory names. It supports optional filtering by category
   * and subcategory slugs. All text-based searches are case-insensitive and hyphen-insensitive.
   *
   * @param searchTerm An optional general search query string.
   * @param categorySlug An optional slug to filter by category.
   * @param subcategorySlug An optional slug to filter by subcategory or subcategory item.
   * @returns A promise that resolves to an array of products matching the criteria.
   */
   async performFreeFormSearch(
    searchTerm?: string,
    categorySlug?: string,
    subcategorySlug?: string,
  ) {
    const normalizedSearchTermForComparison = searchTerm
      ? `%${this.normalizeSearchText(searchTerm)}%`
      : null;

    const productsQuery = this.productRepository.createQueryBuilder('product')
      .select([
        'product.id',
        'product.name',
        'product.price',
        'product.slug',
        'product.description',
      ])
      .leftJoinAndSelect('product.company', 'company')
      .addSelect([
        'company.id',
        'company.entityName',
      ])
      .leftJoin('product.images', 'images')
      .leftJoin('product.subcategoryItem', 'subcategoryItem')
      .leftJoin('subcategoryItem.subcategory', 'subcategory')
      .leftJoin('subcategory.category', 'category')
      .orderBy('images.sortOrder', 'ASC');

    if (normalizedSearchTermForComparison) {
      productsQuery.andWhere(new Brackets(qb => {
        // Apply normalization (lowercase, remove hyphens, remove spaces) to database column values
        // Note: You still need REPLACE in SQL for hyphens if your DB *could* store values with them
        // and you're normalizing them away only on the search side.
        // However, if normalizeSearchText removes spaces, the SQL REPLACE should also remove spaces.
        // Let's adjust the SQL REPLACE as well for consistency.
        qb.where('LOWER(REPLACE(REPLACE(product.name, \'-\', \'\'), \' \', \'\')) LIKE :term', { term: normalizedSearchTermForComparison })
          .orWhere('LOWER(REPLACE(REPLACE(product.description, \'-\', \'\'), \' \', \'\')) LIKE :term', { term: normalizedSearchTermForComparison })
          // Apply to company.entityName
          .orWhere('LOWER(REPLACE(REPLACE(company.entityName, \'-\', \'\'), \' \', \'\')) LIKE :term', { term: normalizedSearchTermForComparison })
          // Apply to category.name
          .orWhere('LOWER(REPLACE(REPLACE(category.name, \'-\', \'\'), \' \', \'\')) LIKE :term', { term: normalizedSearchTermForComparison })
          // Apply to subcategory.name
          .orWhere('LOWER(REPLACE(REPLACE(subcategory.name, \'-\', \'\'), \' \', \'\')) LIKE :term', { term: normalizedSearchTermForComparison })
          // Apply to subcategoryItem.name
          .orWhere('LOWER(REPLACE(REPLACE(subcategoryItem.name, \'-\', \'\'), \' \', \'\')) LIKE :term', { term: normalizedSearchTermForComparison });
      }));
    }

    // Category and subcategory slugs are typically exact matches, so 'REPLACE' might not be needed
    // unless you store slugs with hyphens but expect searches without them.
    // For now, assuming slugs are always consistently formatted.
    if (categorySlug) {
      // If category slugs also might have spaces/hyphens that need ignoring during direct matching,
      // you would also apply normalization here:
      // productsQuery.andWhere('LOWER(REPLACE(REPLACE(category.name, \'-\', \'\'), \' \', \'\')) = :categorySlugNormalized', { categorySlugNormalized: this.normalizeSearchText(categorySlug) });
      // Otherwise, keep as is for exact slug matching:
      productsQuery.andWhere('LOWER(category.name) = LOWER(:categorySlug)', { categorySlug });
    }
    if (subcategorySlug) {
      // Same consideration as for categorySlug
      productsQuery.andWhere(new Brackets(qb => {
        qb.where('LOWER(subcategory.name) = LOWER(:subcategorySlug)', { subcategorySlug })
          .orWhere('LOWER(subcategoryItem.name) = LOWER(:subcategorySlug)', { subcategorySlug });
      }));
    }

    const products = await productsQuery.getMany();

    return products;
  }
  
}
