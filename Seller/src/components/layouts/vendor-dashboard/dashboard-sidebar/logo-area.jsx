// ==============================================================
// Logo Area
// ==============================================================

import Avatar from "@mui/material/Avatar"; // GLOBAL CUSTOM COMPONENT
import { useLayout } from "../dashboard-layout-context"; // STYLED COMPONENT
import { FlexBox } from "@/components/flex-box";
import { H1 } from "@/components/Typography";

// ==============================================================

export default function LogoArea() {
  const { TOP_HEADER_AREA, COMPACT } = useLayout();

  return (
    <FlexBox p={2} maxHeight={TOP_HEADER_AREA} alignItems="center" gap={2}>
      <Avatar
        alt="Bazaar Logo"
        src="/assets/images/logo/logo-white-bg.svg" 
        sx={{ borderRadius: 0, width: "auto", marginLeft: COMPACT ? 0 : 1 }}
      />
      <H1 color='#FFF' fontSize={16}>
        Symspace
      </H1>
    </FlexBox>
  );
}