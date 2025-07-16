// ==============================================================
//  Header For Side Drawer
// ==============================================================

import { IconButton } from "@mui/material";
import { FlexBetween, FlexBox } from "@/components/flex-box"; // CUSTOM ICON COMPONENT
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import Clear from "@mui/icons-material/Clear"; // LOCAL CUSTOM COMPONENTS
import { H1 } from "@/components/Typography";

// ==============================================================
export default function TopHeader({ toggle, total, mode = 'light' }) { // Add mode prop with default
  const textColor = mode === 'dark' ? '#000' : '#FFF'; // Determine text color based on mode

  return (
    <FlexBetween px={3} height={74} sx={bg}>
      <FlexBox gap={1} alignItems="center">

        {/* Shopping Cart Icon */}
        <PiShoppingCartSimpleBold color={textColor} size="1.5em" /> {/* Apply dynamic color */}

        {/* Shopping Cart Item Count */}
        <H1 lineHeight={0} color={textColor}> {/* Apply dynamic color */}
          {total} <span style={{fontSize:'10px'}}>items</span>
        </H1>
      </FlexBox>

      {/* Close Button */}
      {/* Only show the close button if toggle function is provided (i.e., not a standalone page) */}
      {toggle && (
        <IconButton onClick={toggle}>
          <Clear sx={{ color: textColor }} /> {/* Apply dynamic color */}
        </IconButton>
      )}
    </FlexBetween>
  );
}

const bg = {
  boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
  backdropFilter: 'blur(0.5px)'
}
