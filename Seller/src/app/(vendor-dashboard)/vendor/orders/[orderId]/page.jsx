// app/vendor/products/[productId]/page.js (or similar)
import { ProductCreatePageView } from "@/pages-sections/vendor-dashboard/products/page-view";

export const metadata = {
  title: "Product",
  description: `Symspace is an Ecommerce Website`,
  authors: [{
    name: "SYMSPACE",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

// 1. Accept the `params` object from Next.js routing
export default function ProductEdit({ params }) {
  // 2. Destructure the slug from params.
  //    The key 'slug' must match the folder name in your file path (e.g., [slug]).
  const { productId } = params;
    
  // 3. Pass the slug to your component. I'm assuming you want to use the prop name `slug`.
  return <ProductCreatePageView productId={productId} />;
}