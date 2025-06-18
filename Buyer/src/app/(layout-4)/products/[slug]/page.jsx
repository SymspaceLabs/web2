// ================================================
// Product Details Component
// ================================================

import { ProductDetailsPageView } from "../../../../pages-sections/product-details/page-view";

export const metadata = {
  title: "Product Details",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default async function ProductDetails({params}) {
  const { slug } = await params;
  return (
    <ProductDetailsPageView slug={slug} />
  )
}
