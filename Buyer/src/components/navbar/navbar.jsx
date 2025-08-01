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
          {/* CATEGORY DROPDOWN || CATEGORIES DROPDOWN  */}
          <Categories />

          {/* CATEGORY LIST */}
          <FlexBox justifyContent="space-between" width="80%">
            {categories.map((item, index)=> (
                <StyledNavLink 
                  href={`/products/search/all?${item.slug}` }
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
    slug:"category=home-furniture-&-appliances"
  },
  {
    title:"Sales & Deals",
    slug:"tag=sales-&-deals"
  }
]