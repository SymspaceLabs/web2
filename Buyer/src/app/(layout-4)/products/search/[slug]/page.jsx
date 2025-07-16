// ==================================================================
// PAGE VIEW COMPONENT
// ==================================================================

import { ProductSearchPageView } from "@/pages-sections/product-details/page-view";

// ==================================================================

export const metadata = {
  title: "Product Search",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

// ==================================================================

export default async function ProductSearch({
  params
}) {
  return <ProductSearchPageView slug={params.slug} />;
}