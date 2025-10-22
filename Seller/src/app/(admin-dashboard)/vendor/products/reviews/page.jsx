import { ProductReviewsPageView } from "../../../../../pages-sections/vendor-dashboard/products/page-view";

export const metadata = {
  title: "Product Reviews",
  description: "Symspace is an Ecommerce Website",
  authors: [{
    name: "SYMSPACE",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default async function ProductReviews() {
  const reviews = []
  return <ProductReviewsPageView reviews={reviews} />;
}