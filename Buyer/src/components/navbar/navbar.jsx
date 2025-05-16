// ==========================================================
// Navbar Component
// ==========================================================

import { FlexBox } from "../flex-box";
import { StyledNavLink } from "./styles";
import { NavBarWrapper, InnerContainer } from "./styles"; // DATA TYPES

import Categories from "./categories";
import NavigationList from "./nav-list/nav-list"; // STYLED COMPONENTS

// ==========================================================

export default function Navbar({
  bg,
  elevation = 2,
  hideCategories = false
}) {
  return (
    <NavBarWrapper hoverEffect={false} elevation={elevation} border={0}>
      {hideCategories ? 
        <InnerContainer sx={{ justifyContent: "center"}}>
          <NavigationList />
        </InnerContainer>
        : 
        <InnerContainer>
          {/* CATEGORY DROPDOWN */}
          <Categories />

          {/* CATEGORY LIST */}
          <FlexBox justifyContent="space-between" width="80%">
            {categories.map((item, index)=> (
                <StyledNavLink 
                  href={`/products/search/${item.slug}` }
                  key={index} 
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
    slug:"women"
  },
  {
    title:"Men",
    slug:"men"
  },
  {
    title:"Kids",
    slug:"kids"
  },
  {
    title:"Maternity",
    slug:"maternity"
  },
  {
    title:"Elderly",
    slug:"elderly"
  },
  {
    title:"Assisted Aid",
    slug:"assisted-aid"
  },
  {
    title:"Home & Furniture",
    slug:"home-furniture"
  },
  {
    title:"Sales & Deals",
    slug:"sales-deals"
  }
]