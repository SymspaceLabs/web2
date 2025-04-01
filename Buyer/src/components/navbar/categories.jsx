import { H1 } from "@/components/Typography";
import { FlexBox } from "@/components/flex-box";
import { CategoryMenuButton, elementalEndFont } from "./styles";
import { ChildNavListWrapper } from "./styles";
import { NavLink } from "../nav-link";
import { MenuItem } from "@mui/material";
import { IoGrid } from "react-icons/io5";
import NavItemChild from "./nav-list/nav-item-child";
import SymCard from "../custom-components/SymCard";
import styled from "@mui/material/styles/styled";
import CATEGORIES_DATA from "@/data/categories"

export default function Categories() {
  return (
    <Wrapper>
      <NavigationList />
    </Wrapper>
  );
}

function NavigationList() {
  const renderNestedNav = (list = [], isRoot = false) => {
    return list.map(nav => {
      if (isRoot) {
        if (nav.child) {
          return <FlexBox sx={{ "&:hover": { "& > .child-nav-item": { display: "block" } }}} key={nav.title} alignItems="center" position="relative" flexDirection="column" >

              <CategoryMenuButton onClick={e => handler(e)}>
                <IoGrid size="1.3em" color="#FFF" />
                <H1 color="#FFF">
                  Categories
                </H1>
              </CategoryMenuButton>

              <ChildNavListWrapper className="child-nav-item">
                <SymCard elevation={3} sx={{ mt: 2.5, ml: 20, border:'1px solid #FFF', py: 1, minWidth: 100 }}>
                  {renderNestedNav(nav.child)}
                </SymCard>
              </ChildNavListWrapper>
            </FlexBox>;
        }
      } else {
        if (nav.url) {
          return (
            <NavLink href={nav.url} key={nav.title} sx={{ "&:hover": { backgroundColor: "#000" }, }}>
              <MenuItem sx={elementalEndFont}>
                {nav.title}
              </MenuItem>
            </NavLink>
          )
        }

        if (nav.child) {
          return <NavItemChild nav={nav} key={nav.title}>
              {renderNestedNav(nav.child)}
            </NavItemChild>;
        }
      }
    });
  };

  return <FlexBox gap={4}>{renderNestedNav(CATEGORIES_DATA, true)}</FlexBox>;
}



const Wrapper = styled("div", {
  shouldForwardProp: prop => prop !== "open"
})(({
  // open,
  theme: {
    direction
  }
}) => ({
  cursor: "pointer",
  position: "relative",
  "& .dropdown-icon": {
    transition: "all 250ms ease-in-out",
    // transform: `rotate(${open ? direction === "rtl" ? "-90deg" : "90deg" : "0deg"})`
  }
}));

