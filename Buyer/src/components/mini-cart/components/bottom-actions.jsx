// ==============================================================
// Bottom Actions
// ==============================================================

import { Box, Button } from "@mui/material"; 
import { styles } from "@/components/styles";
import { FlexColCenter } from "@/components/flex-box";

// ==============================================================

export default function BottomActions({
  total,
  handleNavigate
}) {
  return (
    <FlexColCenter p={2.5} gap={1}>
      <Button fullWidth sx={btn} onClick={handleNavigate("/checkout-alternative")}>
        Checkout Now ({total})
      </Button>

      <Button fullWidth sx={{ ...btn, background:'transparent'}} onClick={handleNavigate("/cart")}>
        View Cart
      </Button>
    </FlexColCenter>
  );
}

const btn = { 
  height: "50px",
  color:'#FFF',
  background:'linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)',
  borderRadius:'50px',
  border:'2px solid white',
  py:1.5,
  '&:hover': {
    background:'linear-gradient(94.44deg, #666666 29%, #000000 100%)'
  }
}