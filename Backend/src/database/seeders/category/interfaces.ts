// src/seed/category/interfaces.ts

export interface SubcategoryItemChildSeedData {
  mobileLevel3: string;
  id: string;
  name: string;
  slug?: string;
  tags_required?: string[];
  optional_tags?: string[];
  tag_defaults?: { [key: string]: string };
}

export interface SubcategoryItemSeedData {
  mobileLevel2: string;
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
  mobileLevel2: string;
  mobileLevel1: string;
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