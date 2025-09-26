// src/seed/category/interfaces.ts

export interface SubcategoryItemChildSeedData {
  id: string;
  name: string;
  slug?: string;
  tags_required?: string[];
  optional_tags?: string[];
  tag_defaults?: { [key: string]: string };
}

export interface SubcategoryItemSeedData {
  id: string;
  name: string;
  slug?: string;
  tags_required?: string[];
  optional_tags?: string[];
  tag_defaults?: { [key: string]: string };
  // This makes the nested children array optional
  subcategoryItemChildren?: SubcategoryItemChildSeedData[];
}

export interface SubcategorySeedData {
  id: string;
  name: string;
  slug?: string;
  gender?: string[];
  subcategoryItems: SubcategoryItemSeedData[];
}

export interface CategorySeedData {
  id: string;
  name: string;
  slug: string;
  subcategories: SubcategorySeedData[];
}