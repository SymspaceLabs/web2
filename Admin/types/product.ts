// Create a shared types file: types/product.ts
// This ensures both files use the same Product type

export type Product = {
  id?: string
  name: string
  description: string
  price?: number  // Made optional to match API
  stock?: number  // Made optional to match API
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
    sizeChartUrl?: string | null
  }>
  variants?: Array<{
    color: string
    size: string
    sku: string
    stock: number
    price: number
    colorHex?: string
  }>
  images?: Array<{
    id: string
    url: string
    colorCode: string
    colorId: string
    sortOrder: number
  }>
}

export type FormData = {
  name: string
  category: string  // Human-readable category path for display
  categoryId?: string  // ⭐ The most granular category ID (subcategoryItemChild or subcategoryItem)
  description: string
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
    sizeChartUrl?: string | null
  }>
  variants: Array<{
    color: string
    size: string
    sku: string
    stock: number
    price: number
    colorHex?: string
  }>
  images: Array<{
    id: string
    url: string
    colorId: string | null
    isPrimary: boolean
    sortOrder: number
  }>
  model3d?: string
}