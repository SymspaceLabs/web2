// favorites/components/cart-item.jsx

// ==============================================================
// Cart Item with Dynamic Variant Pricing
// ==============================================================

import Link from "next/link";
import Close from "@mui/icons-material/Close";

import { useState, useEffect } from "react";
import { LazyImage } from "@/components/lazy-image";
import { useCart } from "@/hooks/useCart";
import { currency } from "@/lib";
import { Paragraph } from "@/components/Typography";
import { FlexBox, FlexCol, FlexColCenter } from "@/components/flex-box";
import { Box, Button, CircularProgress } from "@mui/material";
import { SymColorDropdown, SymRoundedDropdown } from "@/components/custom-inputs";
import { useFavorites } from "@/contexts/FavoritesContext";
import { H1 } from "@/components/Typography";

// Services
import { fetchProductAvailability } from "@/services/productService";

// ==============================================================

export default function MiniCartItem({ item, mode = 'light' }) {

  const { state, dispatch } = useCart();
  const { dispatch: favoritesDispatch } = useFavorites();

  // ✅ Initialize with saved variant if available, otherwise use first option
  const [selectedColor, setSelectedColor] = useState(
    item.selectedVariant?.color || item.colors?.[0] || null
  );
  const [selectedSize, setSelectedSize] = useState(
    item.selectedVariant?.size?.value || item.sizes?.[0]?.value || ''
  );
  const [availability, setAvailability] = useState(null); // ✅ Store full availability data
  const [stockWarningMessage, setStockWarningMessage] = useState('');
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [displayImage, setDisplayImage] = useState(item.imgUrl);
  const [loadingImage, setLoadingImage] = useState(false);

  // Determine text color based on the 'mode' prop
  const textColor = mode === 'dark' ? '#000' : '#FFF';
  const salePriceColor = mode === 'dark' ? '#000' : '#5B5B5B';

  // ✅ Effect to fetch variant data including price and stock
  useEffect(() => {
    const checkAvailability = async () => {
      setStockWarningMessage('');

      if (!item.id || !selectedColor || !selectedColor.value || !selectedSize) {
        setAvailability(null);
        if (!selectedSize) {
          setStockWarningMessage("Please select a size.");
        } else if (!selectedColor || !selectedColor.value) {
          setStockWarningMessage("Please select a color.");
        } else {
          setStockWarningMessage("");
        }
        return;
      }

      setLoadingAvailability(true);

      try {
        const data = await fetchProductAvailability(item.id, selectedColor.id, selectedSize);
        setAvailability(data); // ✅ Store the full availability object
        
        if (data?.stock === 0) {
          setStockWarningMessage("Out of Stock");
        } else {
          setStockWarningMessage("");
        }
      } catch (err) {
        console.error("Error fetching availability for mini cart item:", err);
        setAvailability(null);
      } finally {
        setLoadingAvailability(false);
      }
    };

    checkAvailability();
  }, [item.id, selectedColor, selectedSize]);

  // ✅ Dynamic price calculation based on availability data
  const getDisplayPrice = () => {
    // If variant is selected and loaded, show exact variant price
    if (availability && selectedColor && selectedSize) {
      return {
        current: availability.hasSale ? availability.salePrice : availability.price,
        original: availability.price,
        hasSale: availability.hasSale,
        showOriginal: availability.hasSale
      };
    }
    
    // Fallback to item's base price
    return {
      current: item.salePrice || item.price,
      original: item.price,
      hasSale: item.salePrice && item.salePrice < item.price,
      showOriginal: item.salePrice && item.salePrice < item.price
    };
  };

  const priceInfo = getDisplayPrice();

  const handleAddToCart = () => {
    if (!selectedSize) {
      setStockWarningMessage("Please select a size.");
      return;
    }
    if (!selectedColor || !selectedColor.value) {
      setStockWarningMessage("Please select a color.");
      return;
    }

    const existingItem = state.cart.find(
      (cartItem) =>
        cartItem.id === item.id &&
        cartItem.selectedColor?.value === selectedColor?.value &&
        cartItem.selectedSize === selectedSize
    );

    const currentCartQty = existingItem ? existingItem.qty : 0;
    const newQty = currentCartQty + 1;

    const currentVariantStock = availability?.stock || 0;

    if (newQty > currentVariantStock) {
      setStockWarningMessage(`Only ${currentVariantStock} items of this variant are available.`);
      return;
    }

    setStockWarningMessage('');

    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price: availability?.price || item.price, // ✅ Use variant price
        qty: newQty,
        name: item.name,
        imgUrl: item.imgUrl,
        images: item.images,
        id: item.id,
        slug: item.slug,
        selectedColor: {
          code: selectedColor.value,
          label: selectedColor.label
        },
        selectedSize,
        salePrice: availability?.salePrice || item.salePrice, // ✅ Use variant sale price
        sizes: item.sizes,
        stock: currentVariantStock,
      },
    });

    favoritesDispatch({
      type: "REMOVE_FAVORITE",
      payload: item.id,
    });
  };

  const handleRemoveItem = () => {
    // ✅ Use the stored favorite key for removal
    favoritesDispatch({
      type: "REMOVE_FAVORITE",
      payload: item._favoriteKey || item.id, // Use composite key if available
    });
  };

  const isAddToCartDisabled = 
    (availability?.stock === 0) || 
    loadingAvailability || 
    !selectedSize || 
    !selectedColor?.value;

  // Handle image change based on selected color
  useEffect(() => {
    if (selectedColor && item.images && item.images.length > 0) {
      setLoadingImage(true);
      const newImage = item.images.find(img => img.colorCode === selectedColor.value);
      if (newImage) {
        setDisplayImage(newImage.url);
        setLoadingImage(false);
      } else {
        setDisplayImage(item.imgUrl);
        setLoadingImage(false);
      }
    } else {
      setDisplayImage(item.imgUrl);
      setLoadingImage(false);
    }
  }, [selectedColor, item.images, item.imgUrl]);

  return (
    <FlexBox
      py={2}
      px={2.5}
      key={item.id}
      gap={1}
      justifyContent="space-between"
      borderBottom="1px solid"
      borderColor="divider"
      sx={{
        alignItems: 'stretch',
        minHeight: 100
      }}
    >
      {/* Product Image */}
      <FlexColCenter alignItems="center" sx={{ width: 100 }}>
        <Link href={`/products/${item.slug}`}>
          {loadingImage ? (
            <CircularProgress size={50} />
          ) : (
            <LazyImage
              alt={item.name}
              src={displayImage}
              width={75}
              height={75}
              sx={{ width: 75, height: 75 }}
              onLoad={() => setLoadingImage(false)}
              onError={() => setLoadingImage(false)}
            />
          )}
        </Link>
      </FlexColCenter>

      {/* Product Info */}
      <FlexCol height="100%" maxWidth={150}>
        <Link href={`/products/${item.slug}`}>
          <Paragraph color={textColor}>
            {item.name}
          </Paragraph>
        </Link>

        {/* ✅ Show Saved Variant Info */}
        {item.selectedVariant?.color && item.selectedVariant?.size && (
          <Box sx={{ 
            mt: 0.5, 
            mb: 0.5,
            py: 0.5, 
            px: 1, 
            background: 'rgba(48, 132, 255, 0.1)',
            borderRadius: '4px',
            border: '1px solid rgba(48, 132, 255, 0.3)'
          }}>
            <Paragraph fontSize="9px" color={textColor}>
              Saved: {item.selectedVariant.color.label} / {item.selectedVariant.size.label}
            </Paragraph>
          </Box>
        )}

        {/* ✅ UPDATED: Dynamic Price Display with Loading State */}
        <FlexBox gap={2} alignItems="center" mt={0.5}>
          {loadingAvailability ? (
            <CircularProgress size={16} />
          ) : (
            <>
              <Paragraph color={textColor}>
                {currency(priceInfo.current)}
              </Paragraph>
              {priceInfo.showOriginal && (
                <Paragraph 
                  color={salePriceColor} 
                  sx={{ textDecoration: 'line-through' }}
                >
                  {currency(priceInfo.original)}
                </Paragraph>
              )}
            </>
          )}
        </FlexBox>

        {/* 2 Dropdowns side by side */}
        <FlexBox alignItems="center" gap={0.5} pt={1}>
          <SymColorDropdown
            value={selectedColor?.value || ''}
            onChange={(e) => {
              const selected = item.colors.find(c => c.value === e.target.value);
              setSelectedColor(selected);
            }}
            options={item.colors}
          />

          <SymRoundedDropdown
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            options={item.sizes}
          />
        </FlexBox>
      </FlexCol>

      <FlexCol
        sx={{ flex: 1 }}
        alignItems="flex-end"
        justifyContent="space-between"
        gap={1}
      >
        <Button sx={{ height: 28, width: 28 }} onClick={handleRemoveItem}>
          <Close fontSize="small" sx={{ color: textColor }} />
        </Button>

        {/* Stock Warning Display */}
        {loadingAvailability ? (
          <CircularProgress size={20} sx={{ mt: 0.5 }} />
        ) : (
          stockWarningMessage && (
            <Box sx={styles.statusPill}>
              <H1 fontSize="8px" color="#000">
                {stockWarningMessage}
              </H1>
            </Box>
          )
        )}
        
        <FlexBox alignItems="center" gap={1}>
          <Button
            sx={isAddToCartDisabled ? { ...styles.btn, ...styles.disabledBtn } : styles.btn}
            onClick={handleAddToCart}
            disabled={isAddToCartDisabled}
          >
            Add to cart
          </Button>
        </FlexBox>
      </FlexCol>
    </FlexBox>
  );
}

const styles = {
  btn: {
    background: 'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)',
    borderRadius: '80px',
    border: '2px solid #FFF',
    color: '#FFF',
    fontSize: 10,
    py: 1,
    px: 1.5,
    minWidth: '115px'
  },
  statusPill: {
    py: '5px',
    px: '10px',
    background: 'linear-gradient(94.91deg, #858585 0%, #FFFFFF 100%)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '100px'
  },
  disabledBtn: {
    background: 'rgba(128, 128, 128, 0.55)',
    color: "#FFF",
    cursor: "not-allowed",
    pointerEvents: "none",
    border: "2px solid #FFF",
  }
};