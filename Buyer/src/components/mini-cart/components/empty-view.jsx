// EMPTY CART

import Image from "next/image"; // GLOBAL CUSTOM COMPONENTS
import { FlexColCenter } from "@/components/flex-box";
import { Typography, Button } from "@mui/material";
import Link from "next/link";

export default function EmptyCartView() {
  return (
    <FlexColCenter alignItems="center" height="calc(100% - 74px)">

      {/* EMPTY CART IMAGE */}
      <Image width={250} height={250} alt="banner" src="/assets/images/cart/shopping-cart.png" />

      <FlexColCenter gap={2}>
        {/* EMPTY CART TEXT */}
        <Typography fontFamily="'Elemental End', sans-serif" fontSize={15} mt={2} color="#FFF" textAlign="center" maxWidth={200}>
          your cart is empty
        </Typography>

        {/* Button Goes To AR Marketplace */}
        <Link href="/marketplace">
          <Button sx={btn}>
            Start shopping
          </Button>
        </Link>

      </FlexColCenter>


    </FlexColCenter>
  );
}

const btn = {
  fontFamily:'Elemental End',
  textTransform:'lowercase',
  color: '#FFF',
  fontWeight:500,
  fontSize: 12,
  px:3,
  background:'linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)',
  borderRadius:'50px',
  border:'2px solid white',
  ':hover' : {
    background:'linear-gradient(94.44deg, #666666 29%, #000000 100%)',
  }
}