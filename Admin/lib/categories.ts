export type SubcategoryItemChild = {
  id: string
  name: string
  slug: string
  mobileLevel3?: string
  tags_required?: string[]
  optional_tags?: string[]
  tag_defaults?: Record<string, string>
}

export type SubcategoryItem = {
  id: string
  name: string
  slug: string
  mobileLevel2?: string
  tags_required?: string[]
  optional_tags?: string[]
  tag_defaults?: Record<string, string>
  subcategoryItemChildren?: SubcategoryItemChild[]
}

export type Subcategory = {
  id: string
  name: string
  slug: string
  mobileLevel1?: string
  gender?: string[]
  subcategoryItems: SubcategoryItem[]
}

export type Category = {
  id: string
  name: string
  slug: string
  subcategories: Subcategory[]
}

// Re-export the data from categories-data.ts
export { CATEGORIES_DATA as categories } from "./categories-data"
