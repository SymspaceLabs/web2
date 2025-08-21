// src/components/categories.js

import { H1 } from "@/components/Typography";
import { FlexBox } from "@/components/flex-box";
import { CategoryMenuButton } from "./styles";
import { ChildNavListWrapper } from "./styles";
import { NavLink } from "../nav-link";
import { MenuItem } from "@mui/material";
import { IoGrid } from "react-icons/io5";
import NavItemChild from "./nav-list/nav-item-child";
import SymCard from "../custom-components/SymCard";
import styled from "@mui/material/styles/styled";
import CATEGORIES_DATA from "@/data/categories";

// ==========================================================

// 1. Update Categories to accept onToggle prop
export default function Categories({ isOpen, onClose, onToggle }) {
  return (
    <Wrapper>
      {/* 2. Pass the onToggle prop down to NavigationList */}
      <NavigationList isOpen={isOpen} onClose={onClose} onToggle={onToggle} />
    </Wrapper>
  );
}

// 3. Update NavigationList to accept onToggle prop
function NavigationList({ isOpen, onClose, onToggle }) {
  const renderNestedNav = (list = [], isRoot = false, level = 0) => {
    return list.map(nav => {
      // Check if the current item has a child array.
      if (nav.child) {
        if (isRoot) {
          return (
            <FlexBox
              sx={{
                // Removed the hover-based display control from here,
                // as `isOpen` prop now explicitly controls visibility via inline style.
              }}
              key={nav.title}
              alignItems="center"
              position="relative"
              flexDirection="column"
            >
              {/* 4. Change onClick from onClose to onToggle for CategoryMenuButton */}
              <CategoryMenuButton onClick={onToggle}>
                <IoGrid size="1.3em" color="#FFF" />
                <H1 color="#FFF">
                  Categories
                </H1>
              </CategoryMenuButton>
              {/* ChildNavListWrapper's display is now strictly controlled by isOpen */}
              <ChildNavListWrapper className="child-nav-item" style={{ display: isOpen ? "block" : "none" }}>
                <SymCard elevation={3} sx={{ mt: 2.5, ml: 20, border: '1px solid #FFF', py: 1, minWidth: 100 }}>
                  {renderNestedNav(nav.child, false, level + 1)}
                </SymCard>
              </ChildNavListWrapper>
            </FlexBox>
          );
        } else {
          // Pass the level prop to NavItemChild, and onClose to its children (onToggle not needed here)
          return (
            <NavItemChild nav={nav} key={nav.title} level={level} onClose={onClose}>
              {/* This is the key: NavItemChild must also call renderNestedNav with an incremented level */}
              {renderNestedNav(nav.child, false, level + 1)}
            </NavItemChild>
          );
        }
      } else if (nav.slug) {
        // This is the final link.
        const isFourthLevel = level === 3;
        const subcategoryItemQuery = !isFourthLevel ? `?subcategoryItemChild=${nav.slug}` : `?subcategoryItem=${nav.slug}`;
        
        return (
          <NavLink
            href={`/products/search/all${subcategoryItemQuery}`}
            key={nav.title}
            sx={{ "&:hover": { backgroundColor: "#000" } }}
            onClick={onClose} // Call onClose when a final NavLink (list item) is clicked
          >
            <MenuItem>
              {nav.title}
            </MenuItem>
          </NavLink>
        );
      }
      return null; // Return null for items that don't render anything
    });
  };

  return <FlexBox gap={4}>{renderNestedNav(CATEGORIES_DATA, true, 0)}</FlexBox>;
}

const Wrapper = styled("div", {
  shouldForwardProp: prop => prop !== "open"
})(() => ({
  cursor: "pointer",
  position: "relative",
  "& .dropdown-icon": {
    transition: "all 250ms ease-in-out",
  }
}));