import { ProductDetailsPageView } from "../../../../pages-sections/product-details/page-view";

/**
 * ProductDetails Component
 * 
 * This component fetches and displays details of a specific product based on the slug provided in the URL.
 * It handles fetching data from the backend, displaying the product details, and rendering a "not found" page
 * if the product cannot be fetched.
 * 
 * Props:
 * - paramsPromise (Promise): A promise that resolves to the route parameters, containing the product slug.
 * 
 * @component
 */

export const metadata = {
  title: "Product Details",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "UI-LIB",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default function ProductDetails({ params }) {

  return <ProductDetailsPageView slug={params.slug} />
}
