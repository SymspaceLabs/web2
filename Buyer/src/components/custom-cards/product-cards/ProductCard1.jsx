// =============================================================
// Product Card 1
// --------------------------------------------------------------
// Used In:
// 1. Landing Page
// 2. Marketplace (Section 5)
// =============================================================

import Link from "next/link";
import { currency } from "@/lib";
import { Box } from "@mui/material";
import { LazyImage } from "@/components/lazy-image";
import { Paragraph } from "@/components/Typography";
import { FlexBox, FlexCol } from "@/components/flex-box";


const ProductCard1 = (props) => {

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

        <Box sx={{ px: { xs: 1.5, sm: 4 }, py: 4, flexGrow: 1 }}>
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
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {companyName}
          </Paragraph>

          <FlexBox gap={1}>
            {/* Conditionally render the sale price and original price */}
            <Paragraph
              sx={{
                color: "#fff",
                fontSize: { xs: 10, sm: 17 },
                fontWeight: 500,
              }}
            >
              {hasSale ? currency(salePrice) : currency(price)}
            </Paragraph>
            
            {/* Only show the original price with a strikethrough if a sale is active */}
            {hasSale && (
              <Paragraph
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: { xs: 10, sm: 17 },
                  fontWeight: 500,
                  textDecoration: "line-through",
                }}
              >
                {currency(price)}
              </Paragraph>
            )}
          </FlexBox>
        </Box>
      </FlexCol>
    </Link>
  );
};

export default ProductCard1;