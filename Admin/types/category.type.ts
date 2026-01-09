// ✅ Define proper type for subcategory details
export interface SubcategoryDetails {
  id: string;
  name: string;
  slug: string;
  subcategoryId: string;
  tags_required?: string[];
  tags_optional?: string[];
  tag_defaults?: Record<string, any>;
  mobileLevel2?: string;
  mobileLevel2Name?: string | null;
  subcategory?: {
    id: string;
    name: string;
    categoryId: string;
    slug: string;
    mobileLevel1?: string;
    category?: {
      id: string;
      name: string;
      slug: string;
    };
  };
}
