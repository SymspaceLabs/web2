// src/components/categories.js


import { NavLink } from "../nav-link";
import { MenuItem } from "@mui/material";
import { IoGrid } from "react-icons/io5";
import { H1 } from "@/components/Typography";
import { CategoryMenuButton } from "./styles";
import { ChildNavListWrapper } from "./styles";
import { FlexBox } from "@/components/flex-box";
import { CATEGORIES_DATA } from "@/data/categories";

import NavItemChild from "./nav-list/nav-item-child";
import SymCard from "../custom-components/SymCard";
import styled from "@mui/material/styles/styled";

// ==========================================================

export default function Categories({ isOpen, onClose, onToggle }) {
  return (
    <Wrapper>
      <NavigationList isOpen={isOpen} onClose={onClose} onToggle={onToggle} />
    </Wrapper>
  );
}

function NavigationList({ isOpen, onClose, onToggle }) {
  const renderNestedNav = (list = [], level = 0) => {
    // This logic creates the nested list items within the flyout.
    return list.map(nav => {
      // Base condition: Render final navigatable link item
      if (nav.slug && !nav.child) {
        // Correctly determine query parameter based on nesting level
        const subcategoryItemQuery = level === 3 ? `?subcategoryItem=${nav.slug}` : `?subcategoryItem=${nav.slug}`;

        return (
          <NavLink
            href={`/products/search/all${subcategoryItemQuery}`}
            key={nav.name}
            sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" } }}
            onClick={onClose}
          >
            <MenuItem>
              {nav.name}
            </MenuItem>
          </NavLink>
        );
      }
      
      // Recursive condition: Render an item that has children (a sub-menu)
      if (nav.child) {
        // Use NavItemChild for all category levels that have sub-categories
        return (
          <NavItemChild nav={nav} key={nav.name} level={level} onClose={onClose} >
            {renderNestedNav(nav.child, level + 1)}
          </NavItemChild>
        );
      }
      return null;
    });
  };

  // The content of the main flyout menu is all the root categories (level 1)
  const flyoutContent = renderNestedNav(CATEGORIES_DATA, 1);

  return (
    <FlexBox gap={4} alignItems="center" position="relative" flexDirection="column">
      {/* Main button with the hardcoded name */}
      <CategoryMenuButton onClick={onToggle}>
        <IoGrid size="1.3em" color="#FFF" />
        <H1 color="#FFF">Categories</H1>
      </CategoryMenuButton>
      
      {/* Flyout Menu Container */}
      <ChildNavListWrapper className="child-nav-item" style={{ display: isOpen ? "block" : "none" }}>
        {/* SymCard holds the list of top-level categories */}
        <SymCard elevation={3} sx={{ mt: 2.5, ml: 1, py: 1, minWidth: 280 }}>
          {flyoutContent}
        </SymCard>
      </ChildNavListWrapper>
    </FlexBox>
  );
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