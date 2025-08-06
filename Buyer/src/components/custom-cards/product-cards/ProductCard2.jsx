// =============================================================
// Product Card 2
// --------------------------------------------------------------
// Used In:
// 1. Marketplace
// =============================================================

import Link from "next/link";
import { Box } from "@mui/material";
import { LazyImage } from "@/components/lazy-image";
import { calculateDiscount, currency } from "@/lib";
import { Paragraph } from "@/components/Typography";
import { FlexBox, FlexCol, FlexColCenter } from "@/components/flex-box";


const ProductCard2 = ({ product }) => {
  // Determine if a sale price exists and is less than the original price
  const hasSale = product.salePrice > 0 && product.salePrice < product.price;

  return (
    <Link href={`/products/${product.slug}`} style={{ width: "100%" }}>
      <FlexCol
        bgcolor="rgba(255, 255, 255, 0.1)"
        borderRadius={3}
        mb={2}
        sx={{
          width: "100%",
          height: "100%",
          transition: "background-color 0.3s ease",
          "&:hover": { bgcolor: "rgba(255, 255, 255, 0.15)" },
        }}
      >
        <FlexColCenter sx={{ width: "100%", p: 2 }}>
          <LazyImage
            alt="product images"
            width={500}
            height={500}
            src={product.images?.[0]?.url || "/placeholder.png"}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              width: "100%",
              height: "auto",
              aspectRatio: "1 / 1",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            }}
          />
        </FlexColCenter>

        <Box sx={{ px: { xs: 1.5, sm: 2 }, flexGrow: 1 }}>
          <Paragraph
            sx={{
              color: "#fff",
              fontSize: { xs: 10, sm: 14 },
              fontWeight: 500,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.name}
          </Paragraph>

          <Paragraph
            sx={{
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              fontSize: { xs: 10, sm: 14 },
            }}
          >
            {product.company.entityName}
          </Paragraph>

          <FlexBox gap={1}>
            {/* Conditionally render the sale price and original price */}
            <Paragraph
              sx={{
                color: "#fff",
                fontSize: { xs: 10, sm: 14 },
                fontWeight: 500,
              }}
            >
              {hasSale ? currency(product.salePrice) : currency(product.price)}
            </Paragraph>
            
            {/* Only show the original price with a strikethrough if a sale is active */}
            {hasSale && (
              <Paragraph
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: { xs: 10, sm: 14 },
                  fontWeight: 500,
                  textDecoration: "line-through",
                }}
              >
                {currency(product.price)}
              </Paragraph>
            )}
          </FlexBox>
        </Box>
      </FlexCol>
    </Link>
  );
};

export default ProductCard2;