import { usePathname } from "next/navigation";
import MenuItem from "@mui/material/MenuItem"; // MUI ICON COMPONENTS

import ArrowLeft from "@mui/icons-material/ArrowLeft";
import ArrowRight from "@mui/icons-material/ArrowRight"; // GLOBAL CUSTOM HOOKS

import useOverflowDetect from "@/hooks/useOverflowDetect"; // GLOBAL CUSTOM COMPONENTS

import { Span } from "@/components/Typography";
import SymCard from "@/components/SymCard"; // GLOBAL CUSTOM HOOK

import useSettings from "@/hooks/useSettings"; // STYLED COMPONENTS

import { ParentNav, ParentNavItem } from "../styles";
// ==============================================================
export default function NavItemChild({
  nav,
  children
}) {
  const pathname = usePathname();
  const { settings } = useSettings();
  const {
    checkOverflow,
    elementRef,
    isLeftOverflowing,
    isRightOverflowing
  } = useOverflowDetect();
  const isActive = nav.child.flat().find(item => item.url === pathname); // console.log(isLeftOverflowing, isRightOverflowing);

  return (
    <ParentNav minWidth={200} active={isActive ? 1 : 0} onMouseEnter={checkOverflow}>
      
      {/* Parent */}
      <MenuItem color="grey.700">
        <Span flex="1 1 0" sx={{ fontFamily:'Elemental End', textTransform:'lowercase' }}>
          {nav.title}
        </Span>
        {settings.direction === "ltr" ? <ArrowRight fontSize="small" /> : <ArrowLeft fontSize="small" />}
      </MenuItem>

      <ParentNavItem ref={elementRef} left={isLeftOverflowing} right={isRightOverflowing} className="parent-nav-item">
        <SymCard elevation={3} sx={{ py: "0.5rem", minWidth: 180 }}>
          {children}
        </SymCard>
      </ParentNavItem>
    </ParentNav>
  );
}