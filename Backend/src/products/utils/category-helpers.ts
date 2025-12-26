// ============================================================================
// utils/category-helpers.ts
// Simple helper to add granularCategory to existing products
// ============================================================================

export interface CategoryNode {
  id: string;
  name: string;
  slug: string;
  parent?: CategoryNode; // Recursive nested structure
}

export interface GranularCategory {
  id: string;
  name: string;
  slug: string;
  parent?: CategoryNode; // Optional parent chain
}

/**
 * Extracts the most granular category level from a product
 * and returns it with full breadcrumb hierarchy
 */
export function extractGranularCategory(product: any): GranularCategory {
  // Determine if product has child or just item
  const hasChild = !!product.subcategoryItemChild;
  const granular = hasChild ? product.subcategoryItemChild : product.subcategoryItem;
  
  if (!granular) {
    throw new Error(`Product ${product.id} has no category assignment`);
  }

  let subcategoryItem, subcategory, category;
  
  if (hasChild) {
    // Path: product -> subcategoryItemChild -> subcategoryItem -> subcategory -> category
    const childEntity = product.subcategoryItemChild;
    
    // Get parent subcategoryItem through the child's relation
    subcategoryItem = childEntity.subcategoryItem || product.subcategoryItem;
    
    if (!subcategoryItem) {
      throw new Error(`SubcategoryItemChild ${childEntity.id} missing parent subcategoryItem`);
    }
    
    subcategory = subcategoryItem.subcategory;
    category = subcategory?.category;
    
  } else {
    // Path: product -> subcategoryItem -> subcategory -> category
    subcategoryItem = product.subcategoryItem;
    subcategory = subcategoryItem?.subcategory;
    category = subcategory?.category;
  }

  if (!category || !subcategory) {
    throw new Error(`Failed to resolve category hierarchy for product ${product.id}`);
  }

  // Build nested parent structure
  // Start from the top (category) and nest downwards
  const categoryNode: CategoryNode = {
    id: category.id,
    name: category.name,
    slug: category.slug,
    // Category has no parent (top level)
  };

  const subcategoryNode: CategoryNode = {
    id: subcategory.id,
    name: subcategory.name,
    slug: subcategory.slug,
    parent: categoryNode, // Points to category
  };

  // Build the result based on whether we have a child level
  if (hasChild) {
    // 3-level hierarchy: child -> item -> subcategory -> category
    const itemNode: CategoryNode = {
      id: subcategoryItem.id,
      name: subcategoryItem.name,
      slug: subcategoryItem.slug,
      parent: subcategoryNode, // Points to subcategory
    };

    return {
      id: granular.id,
      name: granular.name,
      slug: granular.slug,
      parent: itemNode, // Child's parent is the item (Bags)
    };
  } else {
    // 2-level hierarchy: item -> subcategory -> category
    return {
      id: granular.id,
      name: granular.name,
      slug: granular.slug,
      parent: subcategoryNode, // Item's parent is subcategory
    };
  }
}
