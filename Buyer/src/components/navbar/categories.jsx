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

// Helper function to get children based on level
const getChildren = (item, level) => {
  if (level === 1) return item.subcategories;
  if (level === 2) return item.subcategoryItems;
  if (level === 3) return item.subcategoryItemChildren;
  return null;
};

export default function Categories({ isOpen, onClose, onToggle }) {
  return (
    <Wrapper>
      <NavigationList isOpen={isOpen} onClose={onClose} onToggle={onToggle} />
    </Wrapper>
  );
}

function NavigationList({ isOpen, onClose, onToggle }) {
  const renderNestedNav = (list = [], level = 0) => {
    return list.map(nav => {
      const children = getChildren(nav, level);
      
      // If this item has children, render with flyout
      if (children && children.length > 0) {
        return (
          <NavItemChild nav={nav} key={nav.id} level={level}>
            {renderNestedNav(children, level + 1)}
          </NavItemChild>
        );
      }
      
      // Otherwise, render as a final clickable link
      if (nav.slug) {
        return (
          <NavLink
            href={`/products/search/all?subcategoryItem=${nav.slug}`}
            key={nav.id}
            sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" } }}
            onClick={onClose}
          >
            <MenuItem>
              {nav.name}
            </MenuItem>
          </NavLink>
        );
      }
      
      return null;
    });
  };

  // The content of the main flyout menu is all the root categories (level 1)
  const flyoutContent = renderNestedNav(CATEGORIES_DATA, 1);

  return (
    <FlexBox gap={4} alignItems="center" position="relative" flexDirection="column">
      {/* Main button */}
      <CategoryMenuButton onClick={onToggle}>
        <IoGrid size="1.3em" color="#FFF" />
        <H1 color="#FFF">Categories</H1>
      </CategoryMenuButton>
      
      {/* Flyout Menu Container */}
      <ChildNavListWrapper className="child-nav-item" style={{ display: isOpen ? "block" : "none" }}>
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