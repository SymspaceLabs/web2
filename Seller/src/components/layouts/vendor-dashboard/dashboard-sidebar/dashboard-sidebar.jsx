// ==============================================
// Dashboard Sidebar
// ==============================================

import Image from "next/image";
import LogoArea from "./logo-area";
import { SidebarWrapper } from "./styles";
import LayoutDrawer from "../../layout-drawer";
import MultiLevelMenu from "./multi-level-menu"; // LOCAL CUSTOM HOOK
import { useMediaQuery, Box } from "@mui/material"; // Local CUSTOM COMPONENTS
import { useLayout } from "../dashboard-layout-context"; // STYLED COMPONENT

// ==============================================

export default function DashboardSidebar() {
  const {
    sidebarCompact,
    TOP_HEADER_AREA,
    showMobileSideBar,
    handleSidebarHover,
    handleCloseMobileSidebar
  } = useLayout();
  const downLg = useMediaQuery(theme => theme.breakpoints.down("lg"));

  if (downLg) {
    return (
      <LayoutDrawer open={showMobileSideBar ? true : false} onClose={handleCloseMobileSidebar}>
        <Box p={2} maxHeight={TOP_HEADER_AREA}>
          <Image alt="Logo" width={105} height={50} src="/assets/images/logo.svg" style={{ marginLeft: 8 }} />
        </Box>
        <MultiLevelMenu />
      </LayoutDrawer>
    );
  }

  return (
    <SidebarWrapper compact={sidebarCompact ? 1 : 0} onMouseEnter={() => handleSidebarHover(true)} onMouseLeave={() => sidebarCompact && handleSidebarHover(false)}>
      <Box sx={{ background: "linear-gradient(180deg, rgba(62, 61, 69, 0.48) 0%, rgba(32, 32, 32, 0.64) 100%)", borderRadius: "15px",   boxShadow: "0px 1px 24px -1px rgba(0, 0, 0, 0.18)", backdropFilter: "blur(12px)" }}>
        <Box sx={{ background: "linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)", paddingBottom:5}}>
          <LogoArea />
          <MultiLevelMenu />
        </Box>
      </Box>
    </SidebarWrapper>
  );
}