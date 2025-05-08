

// =============================================================
// Product Card 1
// --------------------------------------------------------------
// Used In:
// 1. Landing Page
// 2. Marketplace
// =============================================================

import Link from "next/link";
import { Box } from "@mui/material";
import { LazyImage } from "@/components/lazy-image";
import { calculateDiscount, currency } from "@/lib";
import { Paragraph } from "@/components/Typography";
import { FlexBox, FlexCol } from "@/components/flex-box";


const ProductCard1 = ({ product }) => {
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
            <Box sx={{ width: "100%" }}>
              <LazyImage
                alt="product images"
                width={355}
                height={355}
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
            </Box>
  
            <Box sx={{ px: { xs: 1.5, sm: 4 }, pb: 4, flexGrow: 1 }}>
              <Paragraph
                sx={{
                  color: "#fff",
                  fontSize: { xs: 10, sm: 18 },
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
                  fontSize: { xs: 10, sm: 17 },
                }}
              >
                {product.company.entityName}
              </Paragraph>
  
              <FlexBox gap={1}>
                <Paragraph
                  sx={{
                    color: "#fff",
                    fontSize: { xs: 10, sm: 17 },
                    fontWeight: 500,
                  }}
                >
                  {currency(calculateDiscount(product.price, 0))}
                </Paragraph>
                <Paragraph
                  sx={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: { xs: 10, sm: 17 },
                    fontWeight: 500,
                    textDecoration: "line-through",
                  }}
                >
                  {currency(calculateDiscount(product.salePrice, 0))}
                </Paragraph>
              </FlexBox>
            </Box>
          </FlexCol>
        </Link>
    );
}

export default ProductCard1