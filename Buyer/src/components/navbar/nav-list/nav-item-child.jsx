import { usePathname } from "next/navigation";
import MenuItem from "@mui/material/MenuItem";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import ArrowRight from "@mui/icons-material/ArrowRight";
import useOverflowDetect from "@/hooks/useOverflowDetect";
import { H1 } from "@/components/Typography";
import SymCard from "@/components/custom-components/SymCard";
import useSettings from "@/hooks/useSettings";
import { ParentNav, ParentNavItem } from "../styles";

// ==============================================================

export default function NavItemChild({
  nav,
  children,
  level // The level prop is now accepted
}) {
  const pathname = usePathname();
  const { settings } = useSettings();
  const {
    checkOverflow,
    elementRef,
    isLeftOverflowing,
    isRightOverflowing
  } = useOverflowDetect();

  const isActive = nav.child.flat().find(item => item.url === pathname);

  return (
    <ParentNav minWidth={200} active={isActive ? 1 : 0} onMouseEnter={checkOverflow}>
      
      {/* Parent */}
      <MenuItem color="grey.700">
        <H1 flex="1 1 0">
          {nav.name}
        </H1>
        {settings.direction === "ltr" ? <ArrowRight fontSize="small" /> : <ArrowLeft fontSize="small" />}
      </MenuItem>

      {/* The `children` prop already contains the recursively rendered items with the correct level */}
      <ParentNavItem ref={elementRef} left={isLeftOverflowing} right={isRightOverflowing} className="parent-nav-item">
        <SymCard elevation={3} sx={{ py: "0.5rem", minWidth: 180 }}>
          {children}
        </SymCard>
      </ParentNavItem>
    </ParentNav>
  );
}