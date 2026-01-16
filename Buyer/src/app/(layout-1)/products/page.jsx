// src/app/products/page.jsx

// ==================================================================
// PAGE VIEW COMPONENT
// ==================================================================

import { ProductSearchPageView } from "@/pages-sections/product-details/page-view";

// ==================================================================

export const metadata = {
  title: "Product Search",
  description: 'Symspace is an E-commerce website.',
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

// ==================================================================

export default async function ProductSearch() {
  return <ProductSearchPageView />;
}