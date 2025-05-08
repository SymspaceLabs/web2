// EMPTY CART

import Link from "next/link";
import Image from "next/image"; // GLOBAL CUSTOM COMPONENTS
import { Button } from "@mui/material";
import { H1 } from "@/components/Typography";
import { FlexColCenter } from "@/components/flex-box";

export default function EmptyCartView() {
  return (
    <FlexColCenter alignItems="center" height="calc(100% - 74px)">

      {/* EMPTY CART IMAGE */}
      <Image width={250} height={250} alt="banner" src="/assets/images/favourites/3d-heart.png" />

      <FlexColCenter gap={2}>
        {/* EMPTY CART TEXT */}
        <H1 fontSize={15} mt={2} color="#FFF" textAlign="center" maxWidth={200}>
          save to favorites
        </H1>

        {/* Button Goes To AR Marketplace */}
        <Link href="/marketplace">
          <Button sx={btn}>
            browse products
          </Button>
        </Link>

      </FlexColCenter>


    </FlexColCenter>
  );
}

const btn = {
  color: '#FFF',
  fontSize: 12,
  px:3,
  background:'linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)',
  borderRadius:'50px',
  border:'2px solid white',
  ':hover' : {
    background:'linear-gradient(94.44deg, #666666 29%, #000000 100%)',
  }
}