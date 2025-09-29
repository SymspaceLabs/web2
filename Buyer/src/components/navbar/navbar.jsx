// src/components/Navbar.js

import { useState } from "react"; // Import useState for managing component state
import { FlexBox } from "../flex-box";
import { StyledNavLink } from "./styles";
import { NavBarWrapper, InnerContainer } from "./styles"; // DATA TYPES

import Categories from "./categories"; // This is your Categories (dropdown) component
import NavigationList from "./nav-list/nav-list"; // STYLED COMPONENTS

// ==========================================================

export default function Navbar({
  bg,
  elevation = 2,
  hideCategories = false
}) {
  // State to control the open/close status of the Categories dropdown.
  // Initialize as false (closed).
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);

  // Handler function to explicitly close the Categories dropdown.
  // This will be passed to Categories and triggered by NavLink clicks.
  const handleCloseCategoriesDropdown = () => {
    setIsCategoriesDropdownOpen(false);
  };

  // Handler function to toggle the Categories dropdown's open/close state.
  // This will be passed to the Categories component's main button.
  const handleToggleCategoriesDropdown = () => {
    setIsCategoriesDropdownOpen(prev => !prev);
  };

  // Handler for when a StyledNavLink is clicked.
  // It will close the Categories dropdown before navigation occurs.
  const handleNavLinkClick = () => {
    handleCloseCategoriesDropdown();
  };

  return (
    <NavBarWrapper hoverEffect={false} elevation={elevation} border={0}>
      {hideCategories ?
        <InnerContainer sx={{ justifyContent: "center"}}>
          <NavigationList />
        </InnerContainer>
        :
        <InnerContainer>
          {/* CATEGORY DROPDOWN || CATEGORIES DROPDOWN */}
          {/* Pass the isOpen state, the onClose handler, AND the onToggle handler. */}
          <Categories
            isOpen={isCategoriesDropdownOpen}
            onClose={handleCloseCategoriesDropdown}
            onToggle={handleToggleCategoriesDropdown} // Correctly passed here
          />

          {/* CATEGORY LIST */}
          <FlexBox justifyContent="space-between" width="80%">
            {categories.map((item, index)=> (
                <StyledNavLink
                  href={`/products/search/all?${item.slug}` }
                  key={index}
                  onClick={handleNavLinkClick} // Attach the new click handler here
                  sx={{
                    fontWeight:500,
                    color:bg=='dark'?'#FFF':'#',
                    "&:hover": {
                      color: "#0366FE" //BLUE
                    }
                  }}
                >
                  {item.title}
                </StyledNavLink>
              ))
            }
          </FlexBox>
        </InnerContainer>
      }
    </NavBarWrapper>
  );
}

const categories = [
  {
    title:"Women",
    slug:"gender=women"
  },
  {
    title:"Men",
    slug:"gender=men"
  },
  {
    title:"Kids",
    slug:"gender=kids"
  },
  {
    title:"Maternity",
    slug:"category=maternity-&-prenatal-care"
  },
  {
    title:"Elderly",
    slug:"ageGroup=elderly"
  },
  {
    title:"Assisted Aid",
    slug:"category=special-needs-&-accessibility"
  },
  {
    title:"Home & Furniture",
    slug:"category=home-furniture-appliances"
  },
  {
    title:"Sales & Deals",
    slug:"tag=sales-&-deals"
  }
]