import Link from "next/link";
import styles from "./styles"; // Assuming styles are in the same folder
import { currency } from "@/lib";
import { LazyImage } from "@/components/lazy-image";
import { H1, Paragraph } from "@/components/Typography";
import { FlexBox, FlexCol } from "@/components/flex-box";
import { SymAccordion, SymDialog } from "@/components/custom-components";
import {
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  Tooltip,
  Rating,
  CircularProgress,
  Typography,
} from "@mui/material";

export default function ProductInfoArea({
  product,
  selectedColor,
  handleColorSelect,
  selectedSize,
  handleSizeSelect,
  sizeError,
  setSizeError,
  availability,
  loadingAvailability,
  handleAddToCart,
  handleBuyNow,
  setSidenavOpen,
  setOpenModal,
  openModal
}) {
  const {
    price,
    salePrice,
    colors,
    sizes,
    description,
    name,
    company,
    sizeFit,
    sizeChart,
  } = product || {};

  const hasSale = salePrice > 0 && salePrice < price;

  return (
    <>
      <FlexCol gap={{ xs: 0, sm: 1.5 }} sx={styles.productCard}>
        {/* PRODUCT BRAND */}
        <Paragraph
          sx={{
            fontSize: { xs: 12, sm: 14 },
            color: "#0366FE",
            textTransform: "uppercase",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          <Link href={`/company/${company?.slug}`} passHref>
            {company.entityName}
          </Link>
        </Paragraph>

        {/* PRODUCT TITLE */}
        <H1 fontSize={{ xs: 18, sm: 20 }} color="#000" mb={1}>
          {name}
        </H1>

        {/* PRODUCT RATING */}
        <FlexBox alignItems="center" gap={1} mb={2}>
          <Rating color="warn" value={4} readOnly />
          <Paragraph lineHeight="1">(50)</Paragraph>
        </FlexBox>

        {/* PRICE & STOCK */}
        <FlexBox alignItems="center" gap={1} mb={2}>
          <Paragraph sx={styles.price}>
            {hasSale ? currency(salePrice) : currency(price)}
          </Paragraph>
          {hasSale && (
            <Paragraph sx={styles.strikethrough}>{currency(price)}</Paragraph>
          )}

          {/* Availabilty Status */}
          {selectedColor && selectedSize && availability?.stock < 10 && (
            <Box sx={styles.statusPill}>
              <H1 fontSize="14px" color={availability?.statusColor}>
                {loadingAvailability ? (
                  <CircularProgress size={16} />
                ) : (
                  availability?.status
                )}
              </H1>
            </Box>
          )}
        </FlexBox>

        {/*Color*/}
        {/* <FlexCol gap={1} mb={2}>
          <Paragraph mb={1} fontSize="24px" color="#353535">
            Select Color
          </Paragraph>
          <FlexBox>
            {colors.map((color) => (
              <Tooltip key={color.id} title={color.name || color.code} arrow>
                <Button
                  onClick={() => handleColorSelect(color)}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: color.code,
                    border:
                      selectedColor.id === color.id
                        ? "3px solid black"
                        : "1px solid grey",
                    margin: "0 5px",
                    "&:hover": {
                      backgroundColor: color.code,
                    },
                  }}
                />
              </Tooltip>
            ))}
          </FlexBox>
        </FlexCol> */}

        <FlexCol gap={1} mb={2}>
          <Paragraph mb={1} fontSize="18px" color="#353535" sx={{ fontWeight: 600 }}>
            SELECT COLOR
          </Paragraph>
          <FlexBox sx={{ gap: 1 }}>
            {colors.map((color) => (
              <Tooltip key={color.id} title={color.name || color.code} arrow>
                <Button
                  onClick={() => handleColorSelect(color)}
                  sx={{
                    minWidth: 0,
                    padding: "8px 12px",
                    borderRadius: "10px",
                    textTransform: "none",
                    
                    // --- UPDATED SELECTED COLOR LOGIC ---
                    // Set the border color based on selection status
                    borderColor: selectedColor.id === color.id ? "rgba(0,0,0,0.25)" : "transparent",
                    
                    color: "text.primary",
                    "&:hover": {
                      borderColor: selectedColor.id === color.id ? "rgba(0,0,0,0.25)" : "transparent",
                      // backgroundColor: "rgba(0,0,0,0.25)",
                    },
                    
                    // Background color for the selected state
                    backgroundColor: selectedColor.id === color.id ? "white" : "transparent",

                    
                    // Special styling for the selected button's outline
                    ...(selectedColor.id === color.id && {
                      borderWidth: "1.5px", // Make the border slightly thicker/more prominent when selected
                      // Use a dark grey/black shadow to mimic the solid outline in the reference
                      boxShadow: (theme) => `0 0 0 1.5px ${theme.palette.grey[900]}`, 
                    }),
                  }}
                >
                  <Box // Container for the color circle and text
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    {/* The small color circle */}
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: color.code,
                        border: "1px solid rgba(0, 0, 0, 0.2)",
                      }}
                    />
                    
                    {/* The color label */}
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {color.name}
                    </Typography>
                  </Box>
                </Button>
              </Tooltip>
            ))}
          </FlexBox>
        </FlexCol>

        {/* Size */}
        <FlexBox gap={{ xs: 2, sm: 3 }} py={{ xs: 2 }}>
          <FormControl sx={{ flexGrow: 1, width: "100%" }} error={sizeError}>
            <Select
              value={selectedSize}
              onChange={handleSizeSelect}
              fullWidth
              displayEmpty
              sx={{
                borderRadius: { xs: "999px", sm: "6px" },
                width: "100%",
                height: "100%",
                "& .MuiSelect-select": {
                  borderRadius: "999px",
                  padding: { xs: "15px 15px", sm: "20px 15px" },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "999px",
                  borderColor: sizeError ? "red" : undefined,
                  borderWidth: "2px",
                },
              }}
            >
              <MenuItem value="" disabled>
                <em>Select a size</em>
              </MenuItem>
              {sizes.map((size) => (
                <MenuItem key={size.id} value={size.id}>
                  {size.size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button sx={styles.personalised} onClick={() => setSidenavOpen(true)}>
            Personalized Sizing
          </Button>
        </FlexBox>

        {/* SIZE CHART */}
        <FlexBox justifyContent="flex-end">
          <Button sx={styles.sizeChart} onClick={() => setOpenModal(true)}>
            Size chart
          </Button>
        </FlexBox>

        {/* ADD TO CART BUTTON */}
        <FlexBox alignItems="center" gap={{ xs: 2, sm: 3 }} py={1}>
          <Button
            sx={{
              ...styles.addToCartButton,
              ...(availability?.stock === 0 && {
                background: "rgba(128, 128, 128, 0.55)",
                color: "#FFF",
                cursor: "not-allowed",
                pointerEvents: "none",
                border: "2px solid #FFF",
              }),
            }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>

          <Button
            sx={{
              ...styles.buyNowButton,
              ...(availability?.stock === 0 && {
                background: "rgba(128, 128, 128, 0.55)",
                color: "#FFF",
                cursor: "not-allowed",
                pointerEvents: "none",
                border: "2px solid #FFF",
              }),
            }}
            onClick={handleBuyNow}
          >
            Buy now
          </Button>
        </FlexBox>
      </FlexCol>

      <SymAccordion title="Product Details" content={description} />

      <SymAccordion
        title="Brand"
        content={company.description}
      />
      <SymAccordion title="Size and fit" content={sizeFit} />

      <SymDialog dialogOpen={openModal} toggleDialog={() => setOpenModal(false)}>
        <LazyImage
          src={sizeChart}
          width={500}
          height={500}
          alt="size-chart"
        />
      </SymDialog>
    </>
  );
}