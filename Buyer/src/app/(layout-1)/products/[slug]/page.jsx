// ================================================
// Product Details Component (Server Component)
// ================================================

import { ProductDetailsPageView } from "@/pages-sections/product-details/page-view";
import { fetchProductBySlug } from "@/services/productService";

// Generate dynamic metadata based on product data
export async function generateMetadata({ params }) {

  const { slug } = await params;
  
  try {
    const product = await fetchProductBySlug(slug);
    
    const metadata = {
      title: product?.name || "Product Details",
      description: product?.description || "Symspace is an E-commerce website.",
      authors: [{
        name: "SYMSPACE LABS",
        url: "https://www.symspacelabs.com"
      }],
      keywords: ["e-commerce", product?.name].filter(Boolean),
      openGraph: {
        title: product?.name,
        description: product?.description,
        images: product?.images?.[0] ? [product.images[0]] : [],
      }
    };

    return metadata;
  } catch (error) {
    return {
      title: "Product Details",
      description: "Symspace is an E-commerce website.",
      authors: [{
        name: "SYMSPACE LABS",
        url: "https://www.symspacelabs.com"
      }],
      keywords: ["e-commerce"]
    };
  }
}

export default async function ProductDetails({ params }) {
  const { slug } = await params;
  
  // Fetch product data on the server
  let product = null;
  let error = null;
  
  try {
    product = await fetchProductBySlug(slug);
  } catch (err) {
    error = err.message;
    console.error("ProductDetails - Fetch error:", err);
  }
    
  return (
    <ProductDetailsPageView 
      slug={slug} 
      initialProduct={product}
      initialError={error}
    />
  );
}