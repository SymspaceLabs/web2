// =========================================================
// Cart Item used in 
// - cart page
// =========================================================

import Link from "next/link";
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove";

import { currency } from "lib";
import { useCart } from "hooks/useCart";
import { H1 } from "components/Typography";
import { FlexBox } from "components/flex-box";
import { LazyImage } from "@/components/lazy-image";
import { Button, Box, IconButton } from "@mui/material";
import { Span, Paragraph } from "components/Typography";

// =========================================================

export default function CartItem({
  product
}) {

  const { dispatch } = useCart(); // HANDLE CHANGE CART PRODUCT QUANTITY

  const { 
    selectedColor,
    selectedSize,
    salePrice,
    name,
    qty,
    price,
    imgUrl,
    slug,
    sizes
  } = product;

  const handleCartAmountChange = (amount) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { ...product, qty: amount }
    });
  };

  return (
    <Box sx={styles.wrapper}>
      <Box>
        <LazyImage
          alt={name}
          width={100}
          height={100}
          display="block"
          src={imgUrl || "/assets/images/products/iphone-xi.png"}
        />
      </Box>

      {/* DELETE BUTTON */}
      <IconButton 
        size="small"
        onClick={handleCartAmountChange(0)}
        sx={{
          position: "absolute",
          right: 15,
          top: 15
        }}
      >
        <Close fontSize="small" />
      </IconButton>

      <FlexBox p={2} rowGap={1} width="100%" flexDirection="column">
        <Link href={`/products/${slug}`}>
          <H1 color="#000" fontSize={18}>
            {name}
          </H1>
        </Link>

        {/* PRODUCT PRICE SECTION */}
        <FlexBox gap={1} flexWrap="wrap" alignItems="center">
          <Paragraph mt={0.5} color='#FFF' sx={{textDecoration:'line-through'}}>
            {currency(salePrice)}
          </Paragraph>

          <Span fontWeight={600} color="#000">
            {currency(price)} x {qty}
          </Span>
        </FlexBox>

        <FlexBox alignItems="center" gap={1}>
          <Box 
            sx={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: selectedColor.code
            }}
          />
          <H1 color="#000" mt={0.5}>
            {
              sizes?.find(size => size.value === selectedSize)?.label
            }
          </H1>
          <H1 color="#000" mt={0.5}>
            QTY : {qty}
          </H1>
        </FlexBox>

        {/* PRODUCT QUANTITY INC/DEC BUTTONS */}
        <FlexBox alignItems="center">
          <Button color="primary" sx={{ p:"5px" }} variant="outlined" disabled={qty === 1} onClick={handleCartAmountChange(qty - 1)}>
            <Remove fontSize="small" />
          </Button>

          <Span mx={1} fontWeight={600} fontSize={15}>
            {qty}
          </Span>

          <Button color="primary" sx={{p: "5px"}} variant="outlined" onClick={handleCartAmountChange(qty + 1)}>
            <Add fontSize="small" />
          </Button>
        </FlexBox>
      </FlexBox>
    </Box>
  );
}


const styles = {
  wrapper : {
    pl:4.5,
    py:1,
    display: "flex",
    gap:'15px',
    overflow: "hidden",
    alignItems: "center",
    position: "relative",
    borderRadius: "25px",
    marginBottom: "1.5rem",
    backdropFilter: 'blur(10.0285px)',
    boxShadow: 'inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4), inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5), inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)', 
    background: 'rgba(255, 255, 255, 0.35)',
    "@media only screen and (max-width: 425px)": {
      flexWrap: "wrap",
      img: {
        height: "auto",
        minWidth: "100%"
      }
    }
  }
}