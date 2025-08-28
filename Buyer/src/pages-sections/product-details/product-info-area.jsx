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
    composition,
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
            fontSize: { xs: 12, sm: 16 },
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
        <H1 fontSize={{ xs: 18, sm: 40 }} color="#000" mb={1}>
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
        <FlexBox
          alignItems={{ xs: "left", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          gap={1}
          mb={2}
        >
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
        </FlexBox>

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
      <SymAccordion title="Composition" content={composition} />
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