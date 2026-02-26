import { Product } from "./products"

export interface Company {
  id: string
  slug: string
  entityName: string
  description?: string
  logo?: string
  banner?: string
  tagLine?: string  // Add this
  emailSupport?: string  // Add this
  phoneSupport?: string  // Add this
  website?: string
  instagram?: string
  twitter?: string
  youtube?: string
  facebook?: string
  products?: Product[]
}