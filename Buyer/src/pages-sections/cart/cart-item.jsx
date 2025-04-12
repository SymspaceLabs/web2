// =========================================================
// Cart Item used in 
// - cart page
// =========================================================

import Link from "next/link";
import useCart from "hooks/useCart";
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove";
import Image from "@/components/custom-components/SymImage";

import { currency } from "lib";
import { H1 } from "components/Typography";
import { Span, Paragraph } from "components/Typography";
import { FlexBox } from "components/flex-box";
import { Button, Box, IconButton } from "@mui/material";
// =========================================================

export default function CartItem({product}) {

  const { dispatch } = useCart(); // HANDLE CHANGE CART PRODUCT QUANTITY

  const { 
    selectedColor,
    selectedSize,
    salePrice,
    name,
    qty,
    price,
    imgUrl,
    slug
  } = product;

  const handleCartAmountChange = (amount) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { ...product, qty: amount }
    });
  };

  return (
    <Box sx={styles.wrapper}>
      <Image alt={name} width={140} height={140} display="block" src={imgUrl || "/assets/images/products/iphone-xi.png"} />

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

      <FlexBox p={2} rowGap={2} width="100%" flexDirection="column">
        <Link href={`/products/${slug}`}>
          <Span color="#FFF" ellipsis fontWeight="600" fontSize={18}>
            {name}
          </Span>
        </Link>

        {/* PRODUCT PRICE SECTION */}
        <FlexBox gap={1} flexWrap="wrap" alignItems="center">
          <Paragraph mt={0.5} color='#5B5B5B' sx={{textDecoration:'line-through'}}>
            {currency(salePrice)}
          </Paragraph>

          <Span fontWeight={600} color="#FFF">
            {currency(price)}
          </Span>
        </FlexBox>

        <FlexBox alignItems="center" gap={1} pt={1} >
          <Box 
            sx={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: selectedColor
            }}
          />
          <H1 color="#FFF" mt={0.5}>
            {selectedSize}
          </H1>
          <H1 color="#FFF" mt={0.5}>
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
    display: "flex",
    overflow: "hidden",
    alignItems: "center",
    position: "relative",
    borderRadius: "10px",
    marginBottom: "1.5rem",
    background:'rgba(255, 255, 255, 0.1)',
    "@media only screen and (max-width: 425px)": {
      flexWrap: "wrap",
      img: {
        height: "auto",
        minWidth: "100%"
      }
    }
  }
}