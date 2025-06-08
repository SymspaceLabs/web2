"use client"

// ==========================================================
// Product Details Page
// ==========================================================

// Material-UI components
import { useEffect, useState } from "react";
import { Box, CircularProgress, Container } from "@mui/material";

// Local custom components
import ProductTabs from "../product-tabs";
import ProductDetails from "../product-details";
import { BlobBox } from "@/components/BlobBox";

export default function ProductDetailsPageView({slug}) {

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProduct();
  }, [slug]);
  
  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', background: '#FFF', display: 'flex', justifyContent: 'center' }}>
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
