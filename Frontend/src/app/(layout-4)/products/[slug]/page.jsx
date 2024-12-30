"use client";

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
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
export default function ProductDetails({ params: paramsPromise }) {
  // State to store the fetched product details
  const [product, setProduct] = useState(null);

  // State to handle errors during the fetch process
  const [error, setError] = useState(false);

  useEffect(() => {
    /**
     * Fetches the product details from the backend using the slug from the route params.
     */
    const fetchProduct = async () => {
      try {
        const params = await paramsPromise; // Resolve the params promise to get the slug
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${params.slug}`);

        // If the response is not OK, set error state
        if (!response.ok) {
          setError(true);
          return;
        }

        // Parse and store the product data
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        // Set error state if an exception occurs
        setError(true);
      }
    };

    fetchProduct();
  }, [paramsPromise]); // Run when paramsPromise changes

  // If an error occurred, navigate to the "not found" page
  if (error) {
    notFound();
    return null;
  }

  return (
    <>
      {/* Render the ProductDetailsPageView component if product data is available */}
      {product && <ProductDetailsPageView product={product} />}
    </>
  );
}
