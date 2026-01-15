"use client"

// ==========================================================
// Product Details Page
// ==========================================================

import { useEffect, useState } from "react";
import { Box, CircularProgress, Container } from "@mui/material";
import ProductTabs from "../product-tabs";
import ProductDetails from "../product-details";
import { BlobBox } from "@/components/BlobBox";
import { fetchProductBySlug } from "@/services/productService";

export default function ProductDetailsPageView({ slug, initialProduct, initialError }) {
 
  const [product, setProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(!initialProduct && !initialError);
  const [error, setError] = useState(initialError);

  useEffect(() => {
    
    // Only fetch if we don't have initial data
    if (!initialProduct && !initialError) {

      const getProduct = async () => {
        try {
          setLoading(true);
          const data = await fetchProductBySlug(slug);
          setProduct(data);
        } catch (err) {
          console.error("Client fetch error:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      getProduct();
    }
  }, [slug, initialProduct, initialError]);
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'error.main' }}>
        <div>Error: {error}</div>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Product not found.</div>
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', background: '#FFF', display: 'flex', justifyContent: 'center', pt: {xs:'100px', sm:'100px', md:'200px'} }}>
      <BlobBox top="-5%" right="-10%" background="rgba(0,0,0,0.5)" widthHeight='500px' displayNoneMobile={true} />
      <BlobBox top="20%" right="15%" background="#0366FE" widthHeight='750px' displayNoneMobile={true} />
      <BlobBox top="35%" left={'-10%'} background="rgba(0,0,0,0.5)" widthHeight='500px' displayNoneMobile={true} />
      <BlobBox top="60%" left={'-10%'} background="#0366FE" widthHeight='500px' displayNoneMobile={true} />

      <Container className="mt-2 mb-2">
        <ProductDetails product={product} />
        <ProductTabs productId={product.id} />
      </Container>
    </Box>
  );
}