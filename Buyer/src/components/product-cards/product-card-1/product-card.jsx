"use client";

import Link from "next/link";
import { Rating, Box} from "@mui/material"; // GLOBAL CUSTOM COMPONENTS
import { LazyImage } from "@/components/lazy-image";
import { Span } from "@/components/Typography";
import ProductViewDialog from "@/components/products-view/product-view-dialog"; // LOCAL CUSTOM HOOK

import useProduct from "../use-product";
import HoverActions from "./components/hover-actions";
import ProductPrice from "../product-price";
import ProductTitle from "../product-title";
import DiscountChip from "../discount-chip";
import QuantityButtons from "./components/quantity-buttons"; // STYLED COMPONENTS

import { ImageWrapper, ContentWrapper, StyledBazaarCard } from "./styles"; // ========================================================

// ========================================================
export default function ProductCard1({
  id,
  slug,
  name,
  price,
  imgUrl,
  rating = 5,
  hideRating,
  hoverEffect,
  discount = 5,
  showProductSize
}) {
  const {
    isFavorite,
    openModal,
    cartItem,
    toggleDialog,
    toggleFavorite,
    handleCartAmountChange
  } = useProduct(slug);

  const handleIncrementQuantity = () => {
    const product = {
      id,
      slug,
      price,
      imgUrl,
      name: name,
      qty: (cartItem?.qty || 0) + 1
    };
    handleCartAmountChange(product);
  };

  const handleDecrementQuantity = () => {
    const product = {
      id,
      slug,
      price,
      imgUrl,
      name: name,
      qty: (cartItem?.qty || 0) - 1
    };
    handleCartAmountChange(product, "remove");
  };

  return (
    <StyledBazaarCard hoverEffect={hoverEffect}>
      <ImageWrapper>
        
        {/* DISCOUNT PERCENT CHIP IF AVAILABLE */}
        <DiscountChip discount={discount} />

        {/* HOVER ACTION ICONS */}
        <HoverActions isFavorite={isFavorite} toggleView={toggleDialog} toggleFavorite={toggleFavorite} />

        {/* PRODUCT IMAGE / THUMBNAIL */}
        <Link href={`/products/${slug}`}>
          <LazyImage priority src={imgUrl} width={500} height={500} alt={name} />
        </Link>
      </ImageWrapper>

      {/* PRODUCT VIEW DIALOG BOX */}
      <ProductViewDialog 
        openDialog={openModal} 
        handleCloseDialog={toggleDialog} 
        product={{ name, price, id, slug, imgGroup: [imgUrl, imgUrl] }}
      />

      <ContentWrapper>
        <Box flex="1 1 0" minWidth="0px" mr={1}>
          {/* PRODUCT NAME / TITLE */}
          <ProductTitle name={name} slug={slug} />

          {/* PRODUCT RATINGS IF AVAILABLE */}
          {!hideRating ? <Rating size="small" value={rating} color="warn" readOnly /> : null}

          {/* PRODUCT SIZE IF AVAILABLE */}
          {showProductSize ? <Span color="grey.600" mb={1} display="block">
              Liter
            </Span> : null}

          {/* PRODUCT PRICE WITH DISCOUNT */}
          <ProductPrice discount={discount} price={price} />
        </Box>

        {/* PRODUCT QUANTITY HANDLER BUTTONS */}
        <QuantityButtons quantity={cartItem?.qty || 0} handleIncrement={handleIncrementQuantity} handleDecrement={handleDecrementQuantity} />
      </ContentWrapper>
    </StyledBazaarCard>
  );
}