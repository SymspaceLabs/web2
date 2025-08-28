"use client"

// ==========================================================
// Product Details Page
// ==========================================================

// React Hooks
import { useEffect, useState } from "react";

// Material-UI components
import { Box, CircularProgress, Container } from "@mui/material";

// Local custom components
import ProductTabs from "../product-tabs";
import ProductDetails from "../product-details";
import { BlobBox } from "@/components/BlobBox";

// Services
import { fetchProductBySlug } from "@/services/productService"; // Adjust the path if needed

// ==========================================================

export default function ProductDetailsPageView({slug}) {

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductBySlug(slug);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    getProduct();
  }, [slug]);
  
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

  // Ensure product exists before rendering its properties
  if (!product) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Product not found.</div>
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', background: '#FFF', display: 'flex', justifyContent: 'center', pt: {xs:'100px', sm:'100px', md:'200px'} }}>
      {/* Animated blob background elements */}
      {/* Blob 1: Hero Section Left */}
      <BlobBox top="-5%" right="-10%" background="rgba(0,0,0,0.5)" widthHeight='500px' displayNoneMobile={true} /> {/* BLACK */}
      <BlobBox top="20%" right="15%" background="#0366FE" widthHeight='750px' displayNoneMobile={true} /> {/* BLUE */}

      {/* Blob 2: Hero Section Left */}
      <BlobBox top="35%" left={'-10%'} background="rgba(0,0,0,0.5)" widthHeight='500px' displayNoneMobile={true} /> {/* BLACK */}
      <BlobBox top="60%" left={'-10%'} background="#0366FE" widthHeight='500px' displayNoneMobile={true} /> {/* BLUE */}

      <Container className="mt-2 mb-2">
        <ProductDetails product={product} /> {/* Product introduction */}
        <ProductTabs productId={product.id} /> {/* Tabs section for detailed product information */}
      </Container>
    </Box>
  );
}