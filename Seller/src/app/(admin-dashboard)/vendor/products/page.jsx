import { ProductsPageView } from "../../../../pages-sections/vendor-dashboard/products/page-view"; // API FUNCTIONS

export const metadata = {
  title: "Products",
  description: `Symspace is an Ecommerce Website`,
  authors: [{
    name: "SYMSPACE",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default async function Products() {
  const products = [];
  return <ProductsPageView products={products} />;
}