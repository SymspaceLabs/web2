"use client";

// ==============================================================================
// Product Intro Component
// - displays a product's detailed information
// ==============================================================================

import Link from "next/link";
import { useState, useEffect } from "react";
import { currency } from "@/lib";
import { DrawerRight } from "@/components/drawer";
import { LazyImage } from "@/components/lazy-image";
import { H1, Paragraph } from "@/components/Typography";
import { FlexBox, FlexCol } from "@/components/flex-box";
import { SymAccordion, SymDialog } from "@/components/custom-components"
import { Box, Button, Select, MenuItem, FormControl, Tooltip , Drawer, Grid, Rating, CircularProgress } from '@mui/material';

import styles from "./styles";
import useCart from "@/hooks/useCart"; // GLOBAL CUSTOM COMPONENTS
import ProductGallery from "./product-gallery";

// ================================================================
export default function ProductIntro({ product }) {
  const {
    id,
    price,
    salePrice,
    colors,
    sizes,
    description,
    composition,
    name, 
    images, 
    slug,
    company,
    sizeFit,
    sizeChart
  } = product || {};

  // State hooks for selected options and toggles
  const [selectedColor, setSelectedColor] = useState(colors[0].id);
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const { state, dispatch } = useCart();

  // Updates the selected color
  const handleColorSelect = (colorId) => setSelectedColor(colorId);

  // Updates the selected size
  const handleSizeSelect = (event) => setSelectedSize(event.target.value);

  // Changes the cart amount based on user action
  const handleCartAmountChange = amount => () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
  
    setSizeError(false);

    // Check if the item already exists in the cart (matching by id + color + size)
    const existingItem = state.cart.find(
      (item) =>
        item.id === id &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize
    );

    const newQty = existingItem ? existingItem.qty + amount : amount;

    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price,
        qty: newQty,
        name,
        imgUrl: images[0].url,
        id,
        slug,
        selectedColor,
        selectedSize,
        salePrice,
        sizes: sizes.map(size => ({
          label: size.size,
          value: size.id
        })),
        colors: colors.map(color => ({
          label: color.name,
          value: color.code
        })),
      },
    });
  };

  const toggleSidenav = () => setSidenavOpen(state => !state);
  const [sidenavOpen, setSidenavOpen] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [availability, setAvailability] = useState(null); // null | true | false
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  // THIS FUNCTION FETCHES AVAILABILILTY OF A PRODUCT INSTANTLY
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!selectedSize || !selectedColor) return;
      setLoadingAvailability(true);
  
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/product-variants/${id}/availability?colorId=${selectedColor}&sizeId=${selectedSize}`
        );
        const data = await res.json();
        setAvailability(data);
      } catch (err) {
        console.error("Error fetching availability", err);
        setAvailability(null);
      } finally {
        setLoadingAvailability(false);
      }
    };
  
    fetchAvailability();
  }, [selectedColor, selectedSize]);
  

  return (
    <>
      <Grid container spacing={3} justifyContent="space-around">
        
        { /* IMAGE GALLERY AREA */}
        <Grid item md={6} xs={12} alignItems="center">
          {/* Image Gallery */}
          <ProductGallery product={product} />
        </Grid>

        {/* PRODUCT INFO AREA */}
        <Grid item md={6} xs={12} alignItems="center">
          {/* Card 1 */}
          <FlexCol gap={1.5} sx={styles.productCard}>
            
            {/* PRODUCT BRAND */}
            <Paragraph sx={{ fontSize: {xs:12, sm:16}, color: '#0366FE', textTransform:'uppercase', '&:hover': {textDecoration:'underline'} }}>
              <Link href={`/company/${company?.slug}`} passHref>
                {company.entityName}
              </Link>
            </Paragraph>
            
            {/* PRODUCT TITLE */}
            <H1 fontSize={{xs:20, sm:40}} color='#000' mb={1}>
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
                {currency(price)}
              </Paragraph>
              <Paragraph sx={styles.strikethrough}>
                {currency(salePrice)}
              </Paragraph>

              {/* Availabilty Status */}
              {selectedColor && selectedSize && availability?.stock < 10 && (
                <Box sx={styles.statusPill}>
                  <H1 fontSize="14px" color={availability?.statusColor}>
                    {loadingAvailability ? <CircularProgress size={16} /> : availability?.status}
                  </H1>
                </Box>
              )}

            </FlexBox>

            {/*Color*/}
            <FlexBox alignItems={{xs:'left', sm:"center"}} flexDirection={{xs:'column', sm:'row'}} gap={1} mb={2}>
              <Paragraph mb={1} fontSize='24px' color='#353535'>
                Select Color
              </Paragraph>
              <FlexBox>
                {colors.map((color) => (
                  <Tooltip key={color.id} title={color.name || color.code} arrow>
                    <Button
                      onClick={() => handleColorSelect(color.id)}
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: color.code,
                        border: selectedColor === color.id ? '3px solid black' : '1px solid grey',
                        margin: '0 5px',
                        '&:hover': {
                          backgroundColor: color.code,
                        },
                      }}
                    />
                  </Tooltip>
                ))}
              </FlexBox>
            </FlexBox>

            {/*Size*/}
            <FlexCol>
              <FlexBox gap={1} mb={2} sx={{ alignItems: {xs:'left', sm:'center'} }} flexDirection={{xs:'column', sm:'row'}}>
                <FormControl sx={{ flexGrow: 1, width: '100%' }} error={sizeError}>
                  <Select
                    value={selectedSize}
                    onChange={(e) => {
                      setSelectedSize(e.target.value);
                      setSizeError(false); // Clear error on select
                    }}
                    fullWidth
                    displayEmpty
                    sx={{
                      borderRadius: "25px",
                      width: "100%",
                      height: '100%',
                      paddingTop: '0px',
                      "& .MuiOutlinedInput-notchedOutline": {
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
                <Button sx={styles.personalised} onClick={()=>setSidenavOpen(true)}>
                  Personalized Sizing
                </Button>
              </FlexBox>

              {/* SIZE CHART */}
              <FlexBox justifyContent="flex-end" >
                <Button sx={styles.sizeChart} onClick={()=>setOpenModal(true)}>
                  Size chart
                </Button>
              </FlexBox>
            </FlexCol>
            
            {/* ADD TO CART BUTTON */}
            <FlexBox alignItems="center" gap={5} flexDirection={{xs:'column', sm:'row'}} mb={2} mt={2} >
              <Button sx={styles.addToCartButton} onClick={handleCartAmountChange(1)}>
                Add to Cart
              </Button>

              <Button sx={styles.buyNowButton} onClick={handleCartAmountChange(1)}>
                Buy now
              </Button>
            </FlexBox>
          </FlexCol>

          <SymAccordion
            title="Product Details"
            content={description}
          />
          

          <SymAccordion
            title="Composition"
            content={composition}
          />

          <SymAccordion
            title="Brand"
            content="Wave World aims to leverage Augmented Reality (AR) as our backbone to set ourselves apart from competitors while also providing multifaceted products. Our products embody both present and vintage fashion trends that have dominated the streetwear industry for decades. Not only are we ..."
          />

          <SymAccordion
            title="Size and fit"
            content={sizeFit}
          />
         
        </Grid>
      </Grid>

      <Box sx={{ background:'transparent' }}>
        <Drawer
          open={sidenavOpen}
          anchor="right"
          onClose={toggleSidenav}
          sx={{
            zIndex: 1200, // Default z-index of the Drawer
            overflow: 'visible', // Ensure the dropdown isn't clipped      
            '& .MuiPaper-root': {
              background: 'linear-gradient(117.54deg,rgba(255, 255, 255, 0.95) -19.85%,rgba(245, 245, 245, 0.6) 4.2%,rgba(240, 240, 240, 0.5) 13.88%,rgba(230, 230, 230, 0.4) 27.98%,rgba(225, 225, 225, 0.35) 37.8%,rgba(220, 220, 220, 0.3) 44.38%,rgba(215, 215, 215, 0.25) 50.54%,rgba(210, 210, 210, 0.2) 60.21%)',
              backdropFilter: 'blur(5px)',
              borderRadius:'15px'
            },
          }}
        >
          <DrawerRight
            toggleSidenav={toggleSidenav}
            headerTitle="personalized sizing"
          />
        </Drawer>
      </Box>

      {/* Size Chart Dialog */}
      <SymDialog
        dialogOpen={openModal} 
        toggleDialog={() => setOpenModal(state => !state)}
      >
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