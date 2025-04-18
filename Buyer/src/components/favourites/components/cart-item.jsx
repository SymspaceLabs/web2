// ==============================================================
// Cart Item
// ==============================================================

import Link from "next/link";
import { useState } from "react";
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import LazyImage from "@/components/LazyImage";
import Remove from "@mui/icons-material/Remove"; // GLOBAL CUSTOM COMPONENTS
import useCart from "@/hooks/useCart"; // GLOBAL CUSTOM COMPONENTS

import { currency } from "@/lib"; // CUSTOM DATA MODEL
import { H1, Paragraph } from "@/components/Typography";
import { FlexBox, FlexCol, FlexColCenter } from "@/components/flex-box";
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import { SymColorDropdown, SymRoundedDropdown } from "@/components/custom-inputs";
import { useFavorites } from "@/contexts/FavoritesContext";

// ==============================================================

export default function MiniCartItem({ item }) {

  const { state, dispatch } = useCart();
  const { dispatch: favoritesDispatch } = useFavorites();

  const [selectedColor, setSelectedColor] = useState(item.colors?.[0]?.value || '');
  const [selectedSize, setSelectedSize] = useState(item.sizes?.[0]?.value || '');

    const handleAddToCart = () => {
     
      // Check if the item already exists in the cart (matching by id + color + size)
      const existingItem = state.cart.find(
        (item) =>
          item.id === id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );
  
      const newQty = existingItem ? existingItem.qty + 1 : 1;
  
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: {
          price:item.price,
          qty: newQty,
          name: item.name,
          imgUrl: item.imgUrl,
          id: item.id,
          slug: item.slug,
          selectedColor,
          selectedSize,
          salePrice: item.salePrice,
          sizes: item.sizes,
        },
      });

      // ❌ REMOVE FROM FAVORITES
      favoritesDispatch({
        type: "REMOVE_FAVORITE",
        payload: item.id,
      });
    };

  return (
    <FlexBox
      py={2}
      px={2.5}
      key={item.id}
      gap={1}
      justifyContent="space-between"
      borderBottom="1px solid"
      borderColor="divider"
      sx={{ alignItems: 'stretch', minHeight: 100 }} // ✅ ADD THIS
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
          <Paragraph color="#FFF">
            {item.name}
          </Paragraph>
        </Link>

        <FlexBox gap={2}>
          <Paragraph mt={0.5} color='#5B5B5B' sx={{textDecoration:'line-through'}}>
            {currency(item.salePrice)}
          </Paragraph>
          <Paragraph color="#FFF" mt={0.5}>
            {currency(item.price)}
          </Paragraph>
        </FlexBox>
        
        {/* 2 Dropdowns side by side */}
        <FlexBox alignItems="center" gap={0.5} pt={1}>
          <SymColorDropdown
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
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
        // maxWidth={150}
      >
        <Button sx={{ height: 28, width: 28 }}>
          <Close fontSize="small" sx={{ color: "#FFF" }} />
        </Button>
        <Button sx={styles.btn} onClick={handleAddToCart}>
          Add to cart
        </Button>
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
  }
}