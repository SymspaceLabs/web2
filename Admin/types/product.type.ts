// types/product.type.ts
// Shared types for product management

export type Product = {
  id?: string
  name: string
  description: string
  price?: number
  stock?: number
  material?: string
  
  // Category information
  category?: string | {
    id: string
    name: string
    code?: string
    fullPath: string
    path: string[]
    createdAt?: string
    updatedAt?: string
  }
  status?: "active" | "draft" | "archived"
  
  // ⭐ Critical fields for category pre-population
  subcategoryItemId?: string
  subcategoryItemChildId?: string | null
  
  // Nested objects from API
  subcategoryItem?: {
    id: string
    name: string
    slug: string
    subcategoryId: string
    subcategory?: {
      id: string
      name: string
      categoryId: string
      slug: string
      category?: {
        id: string
        name: string
        slug: string
      }
    }
  }
  subcategoryItemChild?: {
    id: string
    name: string
    slug: string
    subCategoryItemId: string
  } | null
  
  // Company information
  company?: {
    id: string
    entityName: string
  }
  
  // Product attributes
  colors?: Array<{
    id: string
    name: string
    code: string
    createdAt?: string
    updatedAt?: string
  }>
  
  sizes?: Array<{
    id: string
    size: string
    dimensions?: {
      length: number | null
      width: number | null
      height: number | null
      unit: string
    } | null
    sizeChartUrl?: string | null
    productWeight?: {
      value: number
      unit: string
    } | null
  }>
  
  variants?: Array<{
    id?: string
    color: {
      id: string
      name: string
      code: string
    }
    size: {
      id: string
      size: string
    }
    sku: string
    price: number
    salePrice?: number
    cost?: number
    stock: number
  }>
  
  images?: Array<{
    id: string
    url: string
    colorId: string | null
    colorCode?: string | null
    isPrimary?: boolean
    sortOrder?: number
  }>
  
  threeDModels?: Array<{
    id: string
    url: string
    colorCode: string
    colorId?: string
    pivot?: [number, number, number]
    format?: string
    boundingBox?: {
      max: [number, number, number]
      min: [number, number, number]
    }
  }>
  
  // ✅ NEW: Category tags/attributes
  age_group?: string  // Single value (e.g., "adult", "kids")
  gender?: string     // ✅ Single value (e.g., "male", "female", "unisex")
  season?: string[]   // Multiple values (e.g., ["summer", "spring"])
  occasion?: string[] // Multiple values (e.g., ["casual", "formal"])
}

export type FormData = {
  // Basic Info (Step 1)
  name: string
  companyId: string
  companyName?: string
  category: string      // Human-readable category path for display
  categoryId?: string   // ⭐ The most granular category ID (subcategoryItemChild or subcategoryItem)
  description: string
  
  // ✅ NEW: Category tags/attributes (Step 1)
  age_group?: string    // Single value
  gender?: string       // ✅ Single value (not array)
  season?: string[]     // Multiple values
  occasion?: string[]   // Multiple values
  
  // Variants & Inventory (Step 2)
  material?: string
  selectedColors: Array<{
    id: string
    name: string
    code: string
    createdAt?: string
    updatedAt?: string
  }>
  
  selectedSizes: Array<{
    id: string
    size: string
    dimensions?: {
      length: string  // Form uses strings, will be parsed to numbers
      width: string
      height: string
      unit: string
    } | null
    sizeChartUrl?: string | null
    productWeight?: {
      value: number
      unit: string
    } | null
  }>
  
  variants: Array<{
    id?: string        // ✅ Added for existing variants
    color: string      // Color name
    size: string       // Size name
    sku: string
    price: number
    salePrice: number
    cost: number
    stock: number
    colorHex?: string  // For display purposes
  }>

  // Media (Step 3)
  images: Array<{
    id: string
    url: string
    colorId: string | null
    isPrimary: boolean
    sortOrder: number
  }>
  
  models?: Array<{
    id: string
    colorId: string | null
    url: string
    fileName: string
    fileSize: number
  }>
  
  model3d?: File  // For new uploads

}

// ✅ Type for API payloads
export type ProductCreatePayload = {
  name: string
  description: string
  company: string
  subcategoryItem?: string
  status?: "active" | "draft" | "archived"
  
  // Category tags
  age_group?: string
  gender?: string      // ✅ Single string value
  season?: string[]
  occasion?: string[]
}

export type ProductUpdatePayload = Partial<ProductCreatePayload> & {
  material?: string
  colors?: Array<{
    name: string
    code: string
  }>
  sizes?: Array<{
    size: string
    dimensions?: {
      length: number | null
      width: number | null
      height: number | null
      unit: string
    } | null
    sizeChart?: string | null
    productWeight?: {
      value: number
      unit: string
    } | null
  }>
  variants?: Array<{
    id?: string
    colorName: string
    sizeName: string
    sku: string
    stock: number
    price?: number
    salePrice?: number
    cost?: number
  }>
  images?: Array<{
    url: string
    colorId: string | null
    colorCode: string | null
  }>
  threeDModels?: Array<{
    url: string
    colorId: string
    colorCode: string
  }>
}