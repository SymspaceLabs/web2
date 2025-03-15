import Avatar from "@mui/material/Avatar"; // GLOBAL CUSTOM COMPONENT

import FlexBetween from "../../../../components/flex-box/flex-between"; // LOCAL CUSTOM HOOK

import { useLayout } from "../dashboard-layout-context"; // STYLED COMPONENT

import { ChevronLeftIcon } from "./styles";
import { FlexBox } from "../../../flex-box";
import { Typography } from "@mui/material";
export default function LogoArea() {
  const {
    TOP_HEADER_AREA,
    COMPACT,
    sidebarCompact,
    handleSidebarCompactToggle
  } = useLayout();
  return <FlexBox p={2} maxHeight={TOP_HEADER_AREA} alignItems="center" gap={2}>
      <Avatar alt="Bazaar Logo" src="/assets/images/logo/logo-white-bg.svg"  sx={{ borderRadius: 0, width: "auto", marginLeft: COMPACT ? 0 : 1 }} />
      <Typography sx={{fontFamily:'Elemental End', textTransform:'lowercase', color:'#fff', fontSize:16}}>
        Symspace
      </Typography>
      {/* <ChevronLeftIcon color="disabled" compact={COMPACT} onClick={handleSidebarCompactToggle} sidebar_compact={sidebarCompact ? 1 : 0} /> */}
    </FlexBox>;
}