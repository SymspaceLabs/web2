// ==============================================================
// Cart Item
// ==============================================================

import Link from "next/link";
import Close from "@mui/icons-material/Close";

import { useState, useEffect } from "react";
import { LazyImage } from "@/components/lazy-image";
import { useCart } from "@/hooks/useCart";
import { currency } from "@/lib"; // CUSTOM DATA MODEL
import { Paragraph } from "@/components/Typography";
import { FlexBox, FlexCol, FlexColCenter } from "@/components/flex-box";
import { Box, Button, CircularProgress } from "@mui/material"; // Import CircularProgress
import { SymColorDropdown, SymRoundedDropdown } from "@/components/custom-inputs";
import { useFavorites } from "@/contexts/FavoritesContext";
import { H1 } from "@/components/Typography";

// Services
import { fetchProductAvailability } from "@/services/productService"; // Adjust path if needed

// ==============================================================

// Add 'mode' as an optional prop with a default value of 'light'
export default function MiniCartItem({ item, mode = 'light' }) {

  const { state, dispatch } = useCart();
  const { dispatch: favoritesDispatch } = useFavorites();

  const [selectedColor, setSelectedColor] = useState(item.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(item.sizes?.[0]?.value || '');
  const [currentVariantStock, setCurrentVariantStock] = useState(0); // State for current variant's stock
  const [stockWarningMessage, setStockWarningMessage] = useState(''); // State for stock warning message
  const [loadingAvailability, setLoadingAvailability] = useState(false); // New state for loading availability

  // Determine text color based on the 'mode' prop
  const textColor = mode === 'dark' ? '#000' : '#FFF';
  const salePriceColor = mode === 'dark' ? '#000' : '#5B5B5B'; // Change sale price to black in dark mode too

  // Effect to update stock based on selected color and size using fetchProductAvailability
  useEffect(() => {
    const checkAvailability = async () => {
      // Clear any previous warning when selections change
      setStockWarningMessage('');

      // Ensure product.id, selectedColor, and selectedSize are available and valid
      if (!item.id || !selectedColor || !selectedColor.value || !selectedSize) {
        setCurrentVariantStock(0); // Reset stock if not all options are selected
        if (!selectedSize) {
          setStockWarningMessage("Please select a size.");
        } else if (!selectedColor || !selectedColor.value) {
          setStockWarningMessage("Please select a color.");
        } else {
          setStockWarningMessage(""); // Clear if all valid but initial state
        }
        return;
      }

      setLoadingAvailability(true); // Set loading to true before fetching

      try {
        // Call the external fetchProductAvailability function
        // Assuming fetchProductAvailability expects color.value and size.value as parameters
        const data = await fetchProductAvailability(item.id, selectedColor.id, selectedSize);
        setCurrentVariantStock(data?.stock || 0); // Update stock with fetched data
        if (data?.stock === 0) {
          setStockWarningMessage("Out of Stock");
        } else {
          setStockWarningMessage(""); // Clear warning if stock is available
        }
      } catch (err) {
        console.error("Error fetching availability for mini cart item:", err);
        setCurrentVariantStock(0); // Set stock to 0 on error
        setStockWarningMessage("Failed to check stock. Please try again.");
      } finally {
        setLoadingAvailability(false); // Set loading to false after fetch completes
      }
    };

    checkAvailability();
  }, [item.id, selectedColor, selectedSize]); // Re-run when these dependencies change


  const handleAddToCart = () => {
    // Basic validation before proceeding
    if (!selectedSize) {
      setStockWarningMessage("Please select a size.");
      return;
    }
    if (!selectedColor || !selectedColor.value) {
      setStockWarningMessage("Please select a color.");
      return;
    }

    // Check if the item already exists in the cart (matching by id + color + size)
    const existingItem = state.cart.find(
      (cartItem) =>
        cartItem.id === item.id &&
        cartItem.selectedColor?.value === selectedColor?.value &&
        cartItem.selectedSize === selectedSize
    );

    const currentCartQty = existingItem ? existingItem.qty : 0;
    const newQty = currentCartQty + 1;

    // Check stock availability before adding to cart
    if (newQty > currentVariantStock) {
      setStockWarningMessage(`Only ${currentVariantStock} items of this variant are available.`);
      return; // Prevent adding to cart if stock is insufficient
    }

    setStockWarningMessage(''); // Clear warning if successfully added

    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price: item.price,
        qty: newQty,
        name: item.name,
        imgUrl: item.imgUrl,
        id: item.id,
        slug: item.slug,
        selectedColor: {
          code: selectedColor.value,
          label: selectedColor.label
        },
        selectedSize,
        salePrice: item.salePrice,
        // Ensure sizes are passed correctly for the cart item structure
        // Assuming item.sizes is already in the correct format for SymRoundedDropdown
        sizes: item.sizes,
      },
    });

    // ❌ REMOVE FROM FAVORITES
    favoritesDispatch({
      type: "REMOVE_FAVORITE",
      payload: item.id,
    });
  };

  // Function to handle removing the item from the cart
  const handleRemoveItem = () => {
    favoritesDispatch({
      type: "REMOVE_FAVORITE",
      payload: item.id,
    });
  };

  // Determine if the "Add to cart" button should be disabled
  // It's disabled if stock is 0, or if availability is still loading, or if color/size not selected
  const isAddToCartDisabled = currentVariantStock === 0 || loadingAvailability || !selectedSize || !selectedColor?.value;

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
          <LazyImage
            alt={item.name}
            src={item.imgUrl}
            width={75}
            height={75}
            sx={{ width: 75, height: 75 }}
          />
        </Link>
      </FlexColCenter>


      {/* Product Info */}
      <FlexCol height="100%" maxWidth={150}>
        <Link href={`/products/${item.slug}`}>
          <Paragraph color={textColor}>
            {item.name}
          </Paragraph>
        </Link>

        <FlexBox gap={2}>
          <Paragraph mt={0.5} color={salePriceColor} sx={{ textDecoration: 'line-through' }}>
            {currency(item.salePrice)}
          </Paragraph>
          <Paragraph color={textColor} mt={0.5}>
            {currency(item.price)}
          </Paragraph>
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

      {/* Add to Cart & Cancel Button */}
      <FlexCol
        sx={{ flex: 1 }}
        alignItems="flex-end"
        justifyContent="space-between"
        gap={1}
      >
        <Button sx={{ height: 28, width: 28 }} onClick={handleRemoveItem}>
          <Close fontSize="small" sx={{ color: textColor }} />
        </Button>
        {/* Stock warning message and loading spinner moved above the button */}
        {loadingAvailability ? (
          <CircularProgress size={20} sx={{ mt: 0.5 }} />
        ) : (
          stockWarningMessage && (
            <Box sx={styles.statusPill}>
              <H1 fontSize="8px" color="#000">
                {loadingAvailability ? <CircularProgress size={8} /> : stockWarningMessage}
              </H1>
            </Box>
          )
        )}
        <FlexBox alignItems="center" gap={1}> {/* FlexBox to align button and stock message */}
          <Button
            sx={isAddToCartDisabled ? { ...styles.btn, ...styles.disabledBtn } : styles.btn}
            onClick={handleAddToCart}
            // disabled={isAddToCartDisabled}
          >
            Add to cart
          </Button>
        </FlexBox>
      </FlexCol>

    </FlexBox>
  );
}

const styles = {
  btn : {
    background: 'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)',
    borderRadius: '80px',
    border: '2px solid #FFF',
    color:'#FFF',
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
  disabledBtn : {
    background: 'rgba(128, 128, 128, 0.55)',
    color: "#FFF",
    cursor: "not-allowed",
    pointerEvents: "none",
    border: "2px solid #FFF",
  }
}
