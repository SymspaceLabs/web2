"use client";

// ==============================================================================
// Product Details Component
// - displays a product's detailed information
// ==============================================================================

import ProductGallery from "./product-gallery";
import ProductInfoArea from "./product-info-area";

import { useCart } from "@/hooks/useCart";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { DrawerRight } from "@/components/drawer";
import { Box, Drawer, Grid } from '@mui/material';

// Services
import { fetchProductAvailability } from "@/services/productService"; // Adjust path if needed
import BreadcrumbNav from "./breadcrumb-nav";

// ================================================================

export default function ProductDetails({ product }) {
  const {
    id,
    price,
    salePrice,
    colors,
    sizes,
    name, 
    images, 
    slug
  } = product || {};

  // State hooks for selected options and toggles
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState("");

  const { state, dispatch } = useCart();

  const router = useRouter();

  // Updates the selected color
  const handleColorSelect = (color) => setSelectedColor(color);

  // Updates the selected size
  const handleSizeSelect = (event) => setSelectedSize(event.target.value);

  // Changes the cart amount based on user action
  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }

    // Check if stock is available
    if (availability && availability.stock === 0) {
      return;
    }

    setSizeError(false);

    // Find the image that matches the selected color code
    const matchingImage = images.find(
      (image) => image.colorCode === selectedColor.code
    );

    // Check if the item already exists in the cart (matching by id + color + size)
    const existingItem = state.cart.find(
      (item) =>
        item.id === id &&
        item.selectedColor.id === selectedColor.id &&
        item.selectedSize === selectedSize
    );

    const newQty = existingItem ? existingItem.qty + 1 : 1;

    // Check against the current stock before dispatching
    if (availability && newQty > availability.stock) {
      return;
    }

    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price,
        qty: newQty,
        name,
        imgUrl: matchingImage ? matchingImage.url : images[0].url,
        id,
        slug,
        selectedColor,
        selectedSize,
        salePrice,
        sizes: sizes.map(size => ({
          label: size.size,
          value: size.id
        })),
        variant: selectedVariant,
        stock: availability.stock, // Correctly added the stock attribute
      },
    });
  };

  const toggleSidenav = () => setSidenavOpen(state => !state);
  const [sidenavOpen, setSidenavOpen] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [availability, setAvailability] = useState(null);
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  // THIS FUNCTION FETCHES AVAILABILILTY OF A PRODUCT INSTANTLY
  useEffect(() => {
    const checkAvailability = async () => {
      // Ensure product.id, selectedColor, and selectedSize are available
      if (!id || !selectedColor || !selectedSize) {
        setAvailability(null); // Reset availability if not all options are selected
        return;
      }
      setLoadingAvailability(true);

      try {
        const data = await fetchProductAvailability(id, selectedColor.id, selectedSize);
        setAvailability(data);
        setSelectedVariant(data.variantId);
      } catch (err) {
        console.error("Error fetching availability", err);
        setAvailability({ stock: 0, status: "Error", statusColor: "error.main" }); // Set a default error state
      } finally {
        setLoadingAvailability(false);
      }
    };

    checkAvailability();
  }, [id, selectedColor, selectedSize]);

  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    handleAddToCart();
    router.push('/checkout');
  };

  return (
    <>
      { /* Breadcrumb */}
      <BreadcrumbNav product={product} />

      <Grid container spacing={3} justifyContent="space-around">
        
        { /* IMAGE GALLERY AREA (Left Column) */}
        {/*
          Apply position: sticky and top: X to the inner Box.
          When the viewport scrolls, this Box will stick when its top
          position reaches 100px from the top of the viewport.
          It will stop sticking when the parent Grid item finishes scrolling.
          The height is set to ensure it doesn't take up the full viewport height,
          which could prevent the parent Grid container from scrolling properly.
        */}
        <Grid item md={6} xs={12}>
          <Box sx={{ 
            position: 'sticky', 
            top: 100, // Adjust this value based on your header height/desired offset
            height: 'fit-content' // Important to let the parent container define the scroll boundary
          }}>
            <ProductGallery
              product={product}
              selectedColor={selectedColor.code}
            />
          </Box>
        </Grid>

        {/* PRODUCT INFO AREA (Right Column) */}
        <Grid item md={6} xs={12}>
          <ProductInfoArea
            product={product}
            selectedColor={selectedColor}
            handleColorSelect={handleColorSelect}
            selectedSize={selectedSize}
            handleSizeSelect={handleSizeSelect}
            sizeError={sizeError}
            setSizeError={setSizeError}
            availability={availability}
            loadingAvailability={loadingAvailability}
            handleAddToCart={handleAddToCart}
            handleBuyNow={handleBuyNow}
            setSidenavOpen={setSidenavOpen}
            setOpenModal={setOpenModal}
            openModal={openModal}
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

    </>
  );
}