// ==============================================================
// Bottom Actions
// ==============================================================

import { Box, Button, useMediaQuery, useTheme } from "@mui/material"; // Import useMediaQuery and useTheme
import { styles } from "@/components/styles";
import { FlexColCenter } from "@/components/flex-box";

// ==============================================================

export default function BottomActions({
  total,
  handleNavigate
}) {
  return (
    <FlexColCenter
      p={2.5}
      gap={1}
      sx={{
        pb: { xs:'100px', sm:'100px', md: 2.5 } // Apply 100px padding only on mobile
      }}
    >
      <Button fullWidth sx={btn} onClick={handleNavigate("/checkout")}>
        Checkout Now ({total})
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
