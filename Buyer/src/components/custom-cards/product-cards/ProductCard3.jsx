"use client";
// =======================================================
// product-card-3.jsx
// ProductCard3
// Product Card 3
// Used In:
// - Wish List
// - Product Search Page
// - Company Details Page
// =======================================================

import { Paragraph, Span } from "components/Typography";
import { Card, Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

// =======================================================
function ProductCard3(props) {

  const { product } = props;

  // Destructure the new price fields from the displayPrice object
  const { 
    salePrice, 
    price, 
    hasSale
  } = product.displayPrice || {};

  // Get company name from the nested company object in the response
  const companyName = product.company?.entityName || "";

  return (
    <Link href={`/products/${product.slug}`} passHref>
      <Card
        sx={{
          height: "100%",
          borderRadius: "12px",
          border: "1px solid #E3E9EF",
          overflow: "hidden",
          transition: "0.25s ease-in-out",
          ":hover": {
            boxShadow: 2,
          },
          boxShadow: 0,
          display: "flex",
          flexDirection: "column",
          bgcolor: "#FAFAFA",
        }}
      >
        <Box
          sx={{
            height: 300, // This defines the total height of the image area
            width: "100%", 
            display: "flex",
            overflow: "hidden",
            position: "relative", // Required for Next.js Image "fill"
            "&:hover .hover-image": {
              transform: "scale(1.1)",
            },
          }}
        >
          <Box
            className="hover-image"
            sx={{
              position: "relative",
              width: "100%", // Changed from 250
              height: "100%", // Changed from 250
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <Image
              src={product?.thumbnail || product.images?.[0]?.url || "/placeholder.png"}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }} // Use "cover" to fill the entire box
            />
          </Box>
        </Box>

        <Box sx={{ py: 2, px: 2, background: "#FFF", flexGrow: 1 }}>
          <Paragraph
            fontSize={{ xs: 10, sm: 14 }}
            fontWeight={600}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {product.name}
          </Paragraph>
          <Paragraph fontSize={{ xs: 10, sm: 14 }}>
            {companyName}
          </Paragraph>
          
          <Paragraph fontWeight={600} color="primary">
            {/* Conditionally display price and sale price */}
            {hasSale ? `$${salePrice}` : `$${price}`}
            {hasSale && (
              <Span sx={{ textDecoration: 'line-through', color: 'grey', fontWeight: 400 }}>
                &nbsp;${price}
              </Span>
            )}
          </Paragraph>
        </Box>
      </Card>
    </Link>
  );
}

export default ProductCard3;