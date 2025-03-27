import { usePathname } from "next/navigation";
import { NavLink } from "@/components/nav-link";
import { FlexBox, FlexCol } from "@/components/flex-box";

import { MenuItem } from "@mui/material"; // MUI ICON COMPONENTS
import navigation from "@/data/navbarNavigation"; // STYLED COMPONENTS
import SymCard from "@/components/custom-components/SymCard"; // LOCAL CUSTOM COMPONENTS
import NavItemChild from "./nav-item-child";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown"; // GLOBAL CUSTOM COMPONENTS
import { StyledNavLink, NAV_LINK_STYLES, ChildNavListWrapper, elementalEndFont } from "../styles"; // DATA TYPES

export default function NavigationList() {
  const renderNestedNav = (list = [], isRoot = false) => {
  const pathname = usePathname();

    return list.map(nav => {
      if (isRoot) {

        if (nav.url) {
          return (
            <StyledNavLink
              href={nav.url}
              key={nav.title}
              active={nav.url === pathname}
            >
              {nav.title}
            </StyledNavLink>
          );
        }

        if (nav.child) {
          return (
            <FlexCol sx={{ "&:hover": { "& > .child-nav-item": { display: "block" } }}} key={nav.title} alignItems="center" position="relative">
              <FlexBox alignItems="flex-end" gap={0.3} sx={{...NAV_LINK_STYLES, "&:hover": { color: "#FFF"}}}>
                {nav.title} <KeyboardArrowDown sx={{ color: "grey.500", fontSize: "1.1rem"}} />
              </FlexBox>

              <ChildNavListWrapper className="child-nav-item">
                <SymCard elevation={3}
                  sx={{
                    mt: 2.5,
                    py: 1,
                    minWidth: 100,
                    borderRadius: "8px",
                    border: "1px solid white",
                    "& .MuiMenuItem-root:hover": {
                      background:'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)',
                      color:'#fff',
                    },
                    "& .MuiMenuItem-root:active": {
                      background:'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)',
                      color:'#fff',
                    },
                  }}
                >
                  {renderNestedNav(nav.child)}
                </SymCard>
              </ChildNavListWrapper>
            </FlexCol>
          );
        }
      } else {

        // SECOND LAYER DROPDOWN
        // THIS WHERE WE CAN CHANGE COLOR OF THE ACTIVE DROPDOWN ITEMS
        if (nav.url) {
          return (
            <NavLink href={nav.url} key={nav.title} >
                <MenuItem
                  selected={nav.url === pathname} // Ensures that the item is selected
                  sx={{
                    color: "#fff",
                    ...elementalEndFont,
                    "&.Mui-selected": {
                      background: "linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)",
                      color: "#fff",
                    },
                    "&:hover": {
                      background: "rgba(48, 132, 255, 0.7)", // Lighter blue on hover
                    },
                  }}
                >
                {nav.title}
              </MenuItem>
            </NavLink>
          )
        }

        //SECOND LAYER DROPDOWN
        if (nav.child) {
          return (
            <NavItemChild 
              nav={nav} 
              key={nav.title} 
              sx={{ 
                background:'#000',
                ...elementalEndFont,
              }}>
              {renderNestedNav(nav.child)}
            </NavItemChild>
          );
        }
      }
    });
  };

  return <FlexBox gap={10} justifyContent="space-between" >{renderNestedNav(navigation, true)}</FlexBox>;
}