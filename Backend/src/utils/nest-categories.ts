// utils/nest-categories.ts

export function nestCategoriesFromProducts(products: any[]) {
  const categoryMap = new Map<
    string,
    {
      title: string;
      id: string;
      subCategory: {
        title: string;
        subcategoryItem: {
          id: string;
          name: string;
        };
      }[];
    }
  >();

  for (const product of products) {
    const item = product.subcategoryItem;
    if (!item || !item.subcategory || !item.subcategory.category) continue;

    const subcategory = item.subcategory;
    const category = subcategory.category;

    // Initialize category if not present
    if (!categoryMap.has(category.id)) {
      categoryMap.set(category.id, {
        title: category.name,
        id: category.id,
        subCategory: [],
      });
    }

    const catEntry = categoryMap.get(category.id)!;

    // Avoid duplicates
    const exists = catEntry.subCategory.some(
      (sub) => sub.subcategoryItem.id === item.id
    );

    if (!exists) {
      catEntry.subCategory.push({
        title: subcategory.name,
        subcategoryItem: {
          id: item.id,
          name: item.name,
        },
      });
    }
  }

  return Array.from(categoryMap.values());
}
