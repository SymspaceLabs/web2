// ==============================================================
//  Header For Side Drawer
// ==============================================================

import { IconButton } from "@mui/material";
import { H1 } from "@/components/Typography";
import { FlexBetween, FlexBox } from "@/components/flex-box"; // CUSTOM ICON COMPONENT

import Clear from "@mui/icons-material/Clear"; // LOCAL CUSTOM COMPONENTS
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// ==============================================================
export default function TopHeader({ toggle, total }) {
  return (
    <FlexBetween px={3} height={74} sx={styles.bg}>
      <FlexBox gap={1} alignItems="center">
        {/* Shopping Cart Icon */}
        <FavoriteBorderIcon sx={{ color: "#FFF" }} />

        {/* Shopping Cart Item Count */}
        <H1 lineHeight={0} color="#FFF">
          {total} <span style={{fontSize:'10px'}}>items</span>
        </H1>
      </FlexBox>

      {/* Close Button */}
      <IconButton onClick={toggle}>
        <Clear sx={{ color:"#FFF" }} />
      </IconButton>
    </FlexBetween>
  );
}

const styles = {
  bg : {
    boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
    backdropFilter: 'blur(0.5px)'
  }
}