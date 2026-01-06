import { usePathname } from "next/navigation";
import MenuItem from "@mui/material/MenuItem";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import ArrowRight from "@mui/icons-material/ArrowRight";
import useOverflowDetect from "@/hooks/useOverflowDetect";
import { H1 } from "@/components/Typography";
import SymCard from "@/components/custom-components/SymCard";
import useSettings from "@/hooks/useSettings";
import { ParentNav, ParentNavItem } from "../styles";

// Helper function to get children based on level
const getChildren = (item, level) => {
  if (level === 1) return item.subcategories;
  if (level === 2) return item.subcategoryItems;
  if (level === 3) return item.subcategoryItemChildren;
  return null;
};

export default function NavItemChild({ nav, children, level }) {
  const pathname = usePathname();
  const { settings } = useSettings();
  const {
    checkOverflow,
    elementRef,
    isLeftOverflowing,
    isRightOverflowing
  } = useOverflowDetect();

  // Check if any child matches the current path
  const childrenArray = getChildren(nav, level) || [];
  const isActive = childrenArray.some(item => item.slug && pathname.includes(item.slug));

  return (
    <ParentNav minWidth={200} active={isActive ? 1 : 0} onMouseEnter={checkOverflow}>
      
      {/* Parent */}
      <MenuItem color="grey.700">
        <H1 flex="1 1 0">
          {nav.name}
        </H1>
        {settings.direction === "ltr" ? <ArrowRight fontSize="small" /> : <ArrowLeft fontSize="small" />}
      </MenuItem>

      {/* The `children` prop contains the recursively rendered items */}
      <ParentNavItem ref={elementRef} left={isLeftOverflowing} right={isRightOverflowing} className="parent-nav-item">
        <SymCard elevation={3} sx={{ py: "0.5rem", minWidth: 180 }}>
          {children}
        </SymCard>
      </ParentNavItem>
    </ParentNav>
  );
}