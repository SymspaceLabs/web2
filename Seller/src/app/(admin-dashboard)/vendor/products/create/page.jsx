import { ProductCreatePageView } from "../../../../../pages-sections/vendor-dashboard/products/page-view";
export const metadata = {
  title: "Create Product",
  description: `Symspace is an Ecommerce Website`,
  authors: [{
    name: "SYMSPACE",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};
export default function ProductCreate() {
  return <ProductCreatePageView />;
}