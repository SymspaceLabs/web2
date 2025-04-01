// LOCAL CUSTOM COMPONENTS
import { FlexBox } from "../flex-box";
import Categories from "./categories";
import NavigationList from "./nav-list/nav-list"; // STYLED COMPONENTS
import { StyledNavLink } from "./styles";

import { NavBarWrapper, InnerContainer } from "./styles"; // DATA TYPES
// ==========================================================

// ==========================================================
export default function Navbar({
  bg,
  elevation = 2,
  hideCategories = false
}) {
  return (
    <NavBarWrapper hoverEffect={false} elevation={elevation} border={0}>
      {hideCategories ? 
        (
          <InnerContainer sx={{ justifyContent: "center"}}>
            <NavigationList />
          </InnerContainer>
        )
        : 
        (
          <InnerContainer>
            {/* CATEGORY DROPDOWN */}
            <Categories />

            {/* <NavigationList /> */}
            <FlexBox justifyContent="space-between" width="80%">
              {categories.map((item, index)=> (
                  <StyledNavLink 
                    href="" 
                    key={index} 
                    sx={{ 
                      fontWeight:500,
                      color:bg=='dark'?'#FFF':'#',
                      "&:hover": { 
                        color: "#0366FE" //BLUE
                      }
                    }}
                  >
                    {item}
                  </StyledNavLink>
                ))
              }
            </FlexBox>
          </InnerContainer>
        )
      }
    </NavBarWrapper>
  );
}

const categories = [
  "Women", "Men", "Kids", "Maternity", "Elderly", "Assisted Aid", "Home & Furniture", "Sales & Deals"
]