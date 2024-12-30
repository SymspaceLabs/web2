"use client";

/**
 * ProductIntro Component
 *
 * This component displays a product's detailed information, including a 3D model or image gallery,
 * product details (price, name, variants), and user-interactive features such as selecting colors,
 * sizes, and adding items to the cart. It also includes functionality to toggle a favorite icon
 * and navigate product images.
 *
 * @param {Object} product - The product object containing details like name, price, colors, sizes, images, and more.
 * @returns {JSX.Element} A React component for displaying product details.
 */


import Link from "next/link";
import { useState, Fragment, useCallback } from "react";
import { useRouter } from "next/navigation";

import { Box, Button, Select, MenuItem, FormControl, InputLabel, Drawer, Grid, Avatar, Rating, Accordion, AccordionSummary, AccordionDetails, IconButton, Divider } from '@mui/material';

import useCart from "../../hooks/useCart"; // GLOBAL CUSTOM COMPONENTS

import LazyImage from "../../components/LazyImage";
import { H1, H2, H3, H6, Paragraph } from "../../components/Typography";
import { FlexBox, FlexRowCenter } from "../../components/flex-box"; // CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "../../lib"; // DUMMY DATA

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Clear from "@mui/icons-material/Clear"; // LOCAL CUSTOM COMPONENTS

import HandBagCanvas from "../../components/HandBagCanvas";
import styles from "./styles"; // import styles
import SymAccordion from "./components/SymAccordion"
import DynamicCanvas from "@/components/DynamicCanvas";
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
    thumbnail,
    company,
    sizeFit,
    threeDModel,
  } = product || {};

  // State hooks for selected options and toggles
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState(sizes[0].size);
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const { state, dispatch } = useCart();

  // Toggles the favorite status of the product
  const toggleFavorite = () => setIsFavorited(!isFavorited);

  // Updates the selected color
  const handleColorSelect = (color) => setSelectedColor(color);

  // Updates the selected size
  const handleSizeSelect = (event) => setSelectedSize(event.target.value);

  // Changes the cart amount based on user action
  const handleCartAmountChange = amount => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { price, qty: amount, name, imgUrl: thumbnail,  id, slug }
    });
  };

    // Updates the selected image based on the thumbnail clicked
    const handleImageClick = ind => () => setSelectedImage(ind);




  // const [selectVariants, setSelectVariants] = useState({
  //   option: "option 1",
  //   type: "type 1"
  // });

  // const handleChangeVariant = (variantName, value) => () => {
  //   setSelectVariants(state => ({ ...state,
  //     [variantName.toLowerCase()]: value
  //   }));
  // };

  // const cartItem = state.cart.find(item => item.id === id);




  const [sidenavOpen, setSidenavOpen] = useState();
  const toggleSidenav = () => setSidenavOpen(state => !state);


  return (
    <>
      <Grid container spacing={3} justifyContent="space-around">
        { /* IMAGE GALLERY AREA */}
        <Grid item md={6} xs={12} alignItems="center">
          {/* Hero Image */}
          <FlexBox justifyContent="center" alignItems="center" position="relative" mb={6}>
          <IconButton 
            onClick={() => setSelectedImage((prev) => 
              prev > 0 ? prev - 1 : images?.length // If 0, wrap to last image
            )}
            style={{
              position: "absolute",
              left: 0,
              zIndex: 1,
              backgroundColor: "white",
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>

            {selectedImage === 0 ? (                               
              //  <DynamicCanvas gltfPath={threeDModel} />
               <HandBagCanvas />
            ) : (
              <LazyImage 
                alt={name} 
                width={300} 
                height={300} 
                loading="eager" 
                src={product.images[selectedImage-1]?.url} 
                sx={{ objectFit: "contain" }} 
              />
            )}
            
            <IconButton 
              onClick={() => setSelectedImage((prev) => 
                prev < images?.length ? prev + 1 : 0 // If last, wrap to 0
              )}
              style={{
                position: "absolute",
                right: 0,
                zIndex: 1,
                backgroundColor: "white",
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>

            {/* Heart Icon */}
            <IconButton 
              onClick={toggleFavorite}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                zIndex: 2,
              }}
            >
              {isFavorited ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon color="action" />
              )}
            </IconButton>
          </FlexBox>

          {/* Thumbnails */}
          <FlexBox
            overflow="auto"
            display="flex"
            justifyContent="center"
            gap={1} // Space between thumbnails
          >
            <>
              {/* 3D Model Thumbnail */}
              <FlexRowCenter
                width={64}
                height={64}
                minWidth={64}
                bgcolor="white"
                border="1px solid"
                borderRadius="10px"
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedImage(0)} // 0 for 3D model
                borderColor={selectedImage === 0 ? "primary.main" : "grey.400"}
              >
                <Avatar
                  alt="3D Model"
                  src="/path-to-3d-thumbnail.png" // Replace with an appropriate 3D model thumbnail
                  variant="square"
                  sx={{ height: 40 }}
                />
              </FlexRowCenter>

              {/* Image Thumbnails */}
              {images?.length > 0 &&
                images.map((image, ind) => (
                  <FlexRowCenter
                    key={ind}
                    width={64}
                    height={64}
                    minWidth={64}
                    bgcolor="white"
                    border="1px solid"
                    borderRadius="10px"
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedImage(ind + 1)}
                    borderColor={selectedImage === ind + 1 ? "primary.main" : "grey.400"}
                  >
                    <Avatar
                      alt="product"
                      src={image.url}
                      variant="square"
                      sx={{ height: 40 }}
                    />
                  </FlexRowCenter>
                ))}
            </>
          </FlexBox>
        </Grid>

        {/* PRODUCT INFO AREA */}
        <Grid item md={6} xs={12} alignItems="center">
          {/* Card 1 */}
          <Box sx={{ p:5, boxSizing: 'border-box', background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: "30px" }}>
            {/* PRODUCT BRAND */}
            <H6 sx={{ fontFamily: 'Helvetica', fontSize: 16, textDecoration: 'underline', color: '#0366FE', fontWeight: 400 }}>
              <Link href={`/company/${company?.slug}`} passHref target="_blank">
                {company.businessName}
              </Link>
            </H6>
            
            {/* PRODUCT NAME */}
            <H1 sx={{ fontFamily: 'Elemental End', fontSize:40,  color: '#000', textTransform: 'lowercase', }} mb={1}>
              {name}
            </H1>

            {/* PRODUCT RATING */}
            <FlexBox alignItems="center" gap={1} mb={2}>
              <Rating color="warn" value={4} readOnly />
              <H6 sx={{ fontFamily: 'Helvetica', fontWeight: 400 }} lineHeight="1">(50)</H6>
            </FlexBox>

            {/* PRICE & STOCK */}
            <FlexBox alignItems="center" gap={1} mb={2}>
              <H2 color="primary.main" mb={0.5} lineHeight="1" sx={{ fontFamily: 'Helvetica', fontWeight: 700, fontSize: "32px", color: '#000000' }}>
                {currency(price)}
              </H2>
              <H6 sx={{ fontFamily: 'Helvetica', fontWeight: 400, fontSize: '24px', color: '#A0A0A0', textDecoration: 'line-through' }} lineHeight="1">
                {currency(salePrice)}
              </H6>
            </FlexBox>


            {/* PRODUCT VARIANTS */}

            {/*Color*/}
            <FlexBox alignItems="center" gap={1}  mb={2}>
                <H6 mb={1} sx={{fontFamily: 'Helvetica', fontWeight: 400, fontSize: '24px', color: '#353535'}}>
                  Select Color
                </H6>

                {colors.map((color) => (
                  <Button
                    key={color.id}
                    onClick={() => handleColorSelect(color.code)}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: color.code,
                      border: selectedColor === color.code ? '3px solid black' : '1px solid grey',
                      margin: '0 5px',
                      '&:hover': {
                        backgroundColor: color.code, // Maintain the same color on hover
                      },
                    }}
                  />
                ))}
            </FlexBox>

            {/*Size*/}
            <FlexBox gap={1} mb={2} sx={{ alignItems: 'center' }}>
              <H6 
                mb={1} 
                sx={{
                  fontFamily: 'Helvetica', 
                  fontWeight: 400, 
                  fontSize: '24px', 
                  color: '#353535',
                }}>
                Size
              </H6>

              <FormControl sx={{ flexGrow: 1, width:'100%' }}>
                <InputLabel id="size-select-label">Size</InputLabel>
                <Select
                  labelId="size-select-label"
                  id="size-select"
                  value={selectedSize}
                  label="Size"
                  onChange={handleSizeSelect}
                  fullWidth
                >
                  {sizes.map((size) => (
                    <MenuItem key={size.id} value={size.size}>
                      {size.size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                onClick={()=>setSidenavOpen(true)}
                sx={{
                  padding: "16px 9px",
                  border: "1px solid #000000",
                  borderRadius: "8px",
                  fontFamily: 'Helvetica',
                  fontWeight: 700,
                  fontSize: '14px',
                  color: '#000',
                  flexGrow: 1,
                  width:'100%'
                }}>
                Personalized Sizing
              </Button>
            </FlexBox>

              <FlexBox justifyContent="flex-end" >
                <Button onClick={()=>setSidenavOpen(true)} sx={{ fontSize:8, padding: "8px", borderRadius: "50px", background:'#52647D', fontFamily: 'Elemental End', color:'#fff', textTransform: 'lowercase', fontWeight: 400 }} color="primary" variant="contained">
                  Size chart
                </Button>
              </FlexBox>
            

            {/* ADD TO CART BUTTON */}
            <FlexBox alignItems="center" gap={1}  mb={2} mt={2}>
              <Button sx={{ padding: "16px 56px", border: "1px solid #000000", borderRadius: "50px", background:'transparent', fontFamily: 'Elemental End', color:'#000', textTransform: 'lowercase', fontWeight: 400 }} color="primary" variant="contained" onClick={handleCartAmountChange(1)}>
                Add to Cart
              </Button>

              <Button sx={{ padding: "16px 56px", borderRadius: "50px", background:'#000', fontFamily: 'Elemental End', color:'#fff', textTransform: 'lowercase', fontWeight: 400 }} color="primary" variant="contained" onClick={handleCartAmountChange(1)}>
                Buy now
              </Button>
            </FlexBox>
          </Box>

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
      <Fragment>
        <Drawer open={sidenavOpen} anchor="right" onClose={toggleSidenav} sx={{ zIndex: 9999 }}>
          <MiniCart toggleSidenav={toggleSidenav} />
        </Drawer> 
      </Fragment>
    </>
    
  );
}

function MiniCart({ toggleSidenav }) {
  const { push } = useRouter();

  const handleNavigate = useCallback(
    async (path) => {
      await push(path); // Wait for navigation to complete
      toggleSidenav();  // Close sidenav after navigation
    },
    [push, toggleSidenav]
  );

  return (
    <Box width="100%" minWidth={380}>
      {/* HEADING SECTION */}
      <FlexBox justifyContent="space-between" mx={3} height={74}>
        <FlexBox gap={1} alignItems="center" color="secondary.main">
          <Paragraph lineHeight={0} fontWeight={600}>
            Size guide
          </Paragraph>
        </FlexBox>

        <IconButton onClick={toggleSidenav}>
          <Clear />
        </IconButton>
      </FlexBox>

      <Divider />

      <Box height="calc(100vh - 75px)">
        <FlexBox
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          height="calc(100% - 74px)"
        >
          <LazyImage
            alt="Size Guide"
            width={200}
            height={200}
            src="/assets/images/sizeGuide.png"
            sx={{ objectFit: 'contain' }}
          />
        </FlexBox>
      </Box> 
    </Box>
  );
}

// const colors = ['#000', '#686868', '#0C3779', '#E1B000', '#E8E8E8'];
// const sizes = ['S', 'M', 'L', 'XL'];