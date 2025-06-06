"use client";
// =======================================================
// Product Card 3
// Used In:
// - Wish List
// =======================================================

import { Paragraph, Span } from "components/Typography";
import { Card, Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

// =======================================================
function ProductCard3(props) {

  const  {
    product,
    company={}
  } = props;
  
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
            height: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 4,
            overflow: "hidden", // prevent image from overflowing on zoom
            "&:hover .hover-image": {
              transform: "scale(1.1)", // only image scales
            },
          }}
        >
          <Box
            className="hover-image"
            sx={{
              position: "relative",
              width: 250,
              height: 250,
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <Image
              src={product?.images[0]?.url}
              alt={product.name}
              fill
              style={{ objectFit: "contain" }}
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
            {company?.entityName}
          </Paragraph>
          <Paragraph fontWeight={600} color="primary">
            ${product.price} <Span sx={{ textDecoration: 'line-through', color:'grey', fontWeight:400 }}>${product.salePrice}</Span>
          </Paragraph>
        </Box>
      </Card>
    </Link>
  );
}

export default ProductCard3;
