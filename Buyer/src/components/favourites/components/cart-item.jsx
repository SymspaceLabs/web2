// favorites/components/cart-item.jsx

// ==============================================================
// Refactored Cart Item with Reference Design Patterns
// ==============================================================

import Link from "next/link";
import Close from "@mui/icons-material/Close";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";

import { useState, useEffect } from "react";
import { LazyImage } from "@/components/lazy-image";
import { useCart } from "@/hooks/useCart";
import { currency } from "@/lib";
import { Paragraph } from "@/components/Typography";
import { FlexBox, FlexCol, FlexColCenter } from "@/components/flex-box";
import { Box, Button, CircularProgress, IconButton, Typography } from "@mui/material";
import { SymColorDropdown, SymRoundedDropdown } from "@/components/custom-inputs";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useSnackbar } from "notistack";

// Services
import { fetchProductAvailability } from "@/services/productService";

// ==============================================================

export default function MiniCartItem({ item, mode = 'light' }) {
  const { state, dispatch } = useCart();
  const { dispatch: favoritesDispatch } = useFavorites();
  const { enqueueSnackbar } = useSnackbar();

  // ✅ Initialize with saved variant if available, otherwise use first option
  const [selectedColor, setSelectedColor] = useState(
    item.selectedVariant?.color || item.colors?.[0] || null
  );
  const [selectedSize, setSelectedSize] = useState(
    item.selectedVariant?.size?.value || item.sizes?.[0]?.value || ''
  );
  const [availability, setAvailability] = useState(null);
  const [stockWarningMessage, setStockWarningMessage] = useState('');
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [displayImage, setDisplayImage] = useState(item.imgUrl);
  const [loadingImage, setLoadingImage] = useState(false);

  // Design constants from reference
  const textColor = mode === 'dark' ? '#000' : '#FFF';
  const salePriceColor = mode === 'dark' ? '#666' : '#999';
  
  // ✅ Effect to fetch variant data including price and stock
  useEffect(() => {
    const checkAvailability = async () => {
      setStockWarningMessage('');

      if (!item.id || !selectedColor || !selectedColor.value || !selectedSize) {
        setAvailability(null);
        if (!selectedSize) {
          setStockWarningMessage("Select size");
        } else if (!selectedColor || !selectedColor.value) {
          setStockWarningMessage("Select color");
        }
        return;
      }

      setLoadingAvailability(true);

      try {
        const data = await fetchProductAvailability(item.id, selectedColor.id, selectedSize);
        setAvailability(data);
        
        if (data?.stock === 0) {
          setStockWarningMessage("Out of Stock");
        } else {
          setStockWarningMessage("");
        }
      } catch (err) {
        console.error("Error fetching availability:", err);
        setAvailability(null);
      } finally {
        setLoadingAvailability(false);
      }
    };

    checkAvailability();
  }, [item.id, selectedColor, selectedSize]);

  // ✅ Dynamic price calculation
  const getDisplayPrice = () => {
    if (availability && selectedColor && selectedSize) {
      return {
        current: availability.hasSale ? availability.salePrice : availability.price,
        original: availability.price,
        hasSale: availability.hasSale,
        showOriginal: availability.hasSale
      };
    }
    
    return {
      current: item.salePrice || item.price,
      original: item.price,
      hasSale: item.salePrice && item.salePrice < item.price,
      showOriginal: item.salePrice && item.salePrice < item.price
    };
  };

  const priceInfo = getDisplayPrice();

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor?.value) {
      enqueueSnackbar("Please select options", { variant: "warning" });
      return;
    }

    if (!availability || !availability.variantId) {
      enqueueSnackbar("Product information not loaded", { variant: "error" });
      return;
    }

    if (availability.stock === 0) {
      enqueueSnackbar("Product is out of stock", { variant: "error" });
      return;
    }

    const cartItem = state.cart.find(c => c.variantId === availability.variantId);
    const currentQty = cartItem ? cartItem.quantity : 0;

    if (currentQty >= availability.stock) {
      enqueueSnackbar(`Maximum stock (${availability.stock}) already in cart`, { variant: "warning" });
      return;
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        variantId: availability.variantId,
        quantity: 1,
      },
    });

    enqueueSnackbar(`${item.name} added to cart!`, { variant: "success" });
    favoritesDispatch({
      type: "REMOVE_FAVORITE",
      payload: item._favoriteKey || item.id,
    });
  };

  const handleRemoveItem = () => {
    favoritesDispatch({
      type: "REMOVE_FAVORITE",
      payload: item._favoriteKey || item.id,
    });
  };

  const isAddToCartDisabled = (availability?.stock === 0) || loadingAvailability || !selectedSize || !selectedColor?.value;

  // Handle image change based on selected color
  useEffect(() => {
    if (selectedColor && item.images && item.images.length > 0) {
      setLoadingImage(true);
      const newImage = item.images.find(img => img.colorCode === selectedColor.value);
      if (newImage) {
        setDisplayImage(newImage.url);
      } else {
        setDisplayImage(item.imgUrl);
      }
      setLoadingImage(false);
    } else {
      setDisplayImage(item.imgUrl);
      setLoadingImage(false);
    }
  }, [selectedColor, item.images, item.imgUrl]);

  return (
    <Box
      sx={{
        position: 'relative',
        mx: 2,
        my: 1.5,
        p: 2,
        borderRadius: '20px',
        background: mode === 'dark' 
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 245, 245, 0.95) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: mode === 'dark'
          ? '0 4px 20px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
          : '0 4px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        border: mode === 'dark' 
          ? '1px solid rgba(255, 255, 255, 0.8)'
          : '1px solid rgba(255, 255, 255, 0.15)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: mode === 'dark'
            ? '0 8px 30px rgba(0, 0, 0, 0.12)'
            : '0 8px 30px rgba(0, 0, 0, 0.2)',
        }
      }}
    >
      {/* Close Button - Reference Style */}
      <IconButton
        onClick={handleRemoveItem}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          width: 32,
          height: 32,
          background: mode === 'dark' 
            ? 'rgba(0, 0, 0, 0.05)'
            : 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: mode === 'dark'
            ? '1px solid rgba(0, 0, 0, 0.1)'
            : '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'all 0.2s ease',
          '&:hover': {
            background: mode === 'dark'
              ? 'rgba(255, 0, 0, 0.1)'
              : 'rgba(255, 255, 255, 0.2)',
            transform: 'rotate(90deg)',
          }
        }}
      >
        <Close fontSize="small" sx={{ color: textColor, fontSize: '18px' }} />
      </IconButton>

      <FlexBox gap={2.5} alignItems="center">
        {/* Product Image - Reference Style */}
        <FlexColCenter alignItems="center" sx={{ minWidth: 100 }}>
          <Link href={`/products/${item.slug}`}>
            <Box
              sx={{
                width: 90,
                height: 90,
                borderRadius: '16px',
                background: mode === 'dark'
                  ? 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                boxShadow: mode === 'dark'
                  ? 'inset 0 2px 8px rgba(0, 0, 0, 0.05)'
                  : 'inset 0 2px 8px rgba(0, 0, 0, 0.1)',
                border: mode === 'dark'
                  ? '1px solid rgba(0, 0, 0, 0.06)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                }
              }}
            >
              {loadingImage ? (
                <CircularProgress size={24} />
              ) : (
                <LazyImage
                  alt={item.name}
                  src={displayImage}
                  width={90}
                  height={90}
                  sx={{
                    width: '100%', 
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: '12px'
                  }}
                />
              )}
            </Box>
          </Link>
        </FlexColCenter>

        {/* Product Info */}
        <FlexCol height="100%" flex={1} gap={0.5}>
          <Link href={`/products/${item.slug}`}>
            <Paragraph 
              color={textColor}
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontWeight: 600,
                lineHeight: 1.3,
                fontSize: '15px',
                letterSpacing: '-0.01em'
              }}
            >
              {item.name}
            </Paragraph>
          </Link>

          {/* Price Section - Reference Style */}
          <FlexBox gap={1.5} alignItems="center" mt={0.5}>
            {loadingAvailability ? (
              <CircularProgress size={14} />
            ) : (
              <>
                <Typography 
                  sx={{
                    color: textColor,
                    fontSize: '16px',
                    fontWeight: 700,
                    letterSpacing: '-0.02em'
                  }}
                >
                  {currency(priceInfo.current)}
                </Typography>
                {priceInfo.showOriginal && (
                  <Typography 
                    sx={{
                      color: salePriceColor,
                      fontSize: '15px',
                      textDecoration: 'line-through',
                      fontWeight: 500
                    }}
                  >
                    {currency(priceInfo.original)}
                  </Typography>
                )}
              </>
            )}
          </FlexBox>

          {/* Selection Dropdowns - Integrated into the design */}
          <FlexBox alignItems="center" gap={1} pt={1}>
            <SymColorDropdown
              value={selectedColor?.value || ''}
              onChange={(e) => {
                const selected = item.colors.find(c => c.value === e.target.value);
                setSelectedColor(selected);
              }}
              options={item.colors}
              sx={{
                height: 32,
                borderRadius: '12px',
                background: mode === 'dark' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
                border: mode === 'dark' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.2)',
                color: textColor,
                fontSize: '12px'
              }}
            />

            <SymRoundedDropdown
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              options={item.sizes}
              sx={{
                height: 32,
                borderRadius: '12px',
                background: mode === 'dark' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
                border: mode === 'dark' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.2)',
                color: textColor,
                fontSize: '12px'
              }}
            />
          </FlexBox>

          {/* Add to Cart Action */}
          <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Button
              variant="contained"
              disabled={isAddToCartDisabled}
              onClick={handleAddToCart}
              startIcon={!loadingAvailability && <ShoppingCartOutlined sx={{ fontSize: '16px !important' }} />}
              sx={{
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '13px',
                py: 0.8,
                px: 2,
                background: isAddToCartDisabled 
                  ? (mode === 'dark' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)')
                  : 'linear-gradient(135deg, #0366FE 0%, #0052CC 100%)',
                color: isAddToCartDisabled ? (mode === 'dark' ? '#999' : 'rgba(255,255,255,0.3)') : 'white',
                boxShadow: isAddToCartDisabled ? 'none' : '0 4px 12px rgba(3, 102, 254, 0.3)',
                '&:hover': {
                  background: isAddToCartDisabled 
                    ? 'none' 
                    : 'linear-gradient(135deg, #0052CC 0%, #0366FE 100%)',
                }
              }}
            >
              {loadingAvailability ? <CircularProgress size={16} color="inherit" /> : 'Add to Cart'}
            </Button>

            {stockWarningMessage && (
              <Typography 
                sx={{ 
                  fontSize: '11px', 
                  fontWeight: 600, 
                  color: '#FF4E4E',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                {stockWarningMessage}
              </Typography>
            )}
          </Box>
        </FlexCol>
      </FlexBox>
    </Box>
  );
}
