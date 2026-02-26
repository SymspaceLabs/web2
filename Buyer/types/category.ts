export interface Category {
  title: string;
  slug: string;
  child: CategoryChild[];
}

export interface CategoryChild {
  id: string | number;
  name: string;
  slug: string;
  child?: CategoryChild[];
}


export interface ProductCategory {
  id: string | number;
  name: string;
  parent?: ProductCategory;
  slug: string;
}