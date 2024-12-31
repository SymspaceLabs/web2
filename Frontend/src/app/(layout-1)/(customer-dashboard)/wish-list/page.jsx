import { WishListPageView } from "pages-sections/customer-dashboard/wish-list"; // API FUNCTIONS

import { getWishListProducts } from "utils/__api__/wish-list";
export const metadata = {
  title: "Wish List - Bazaar Next.js E-commerce Template",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "UI-LIB",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function WishList({
  searchParams
}) {
  const {
    products,
    totalProducts
  } = await getWishListProducts(searchParams.page);
  return <WishListPageView products={products} totalProducts={totalProducts} />;
}