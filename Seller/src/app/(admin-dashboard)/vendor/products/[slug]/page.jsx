import { EditProductPageView } from "../../../../../pages-sections/vendor-dashboard/products/page-view";
export const metadata = {
  title: "Product",
  description: `Symspace is an Ecommerce Website`,
  authors: [{
    name: "SYMSPACE",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};
export default function ProductEdit() {
  return <EditProductPageView />;
}