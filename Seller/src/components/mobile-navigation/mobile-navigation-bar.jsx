"use client";

// ===========================================================
// Mobile Navbar
// ===========================================================

import { Badge, useMediaQuery } from "@mui/material";

import useCart from "@/hooks/useCart"; // STYLED COMPONENTS
import { MOBILE_NAVIGATION } from "@/data/mobileNavigation";

import { iconStyle, StyledNavLink, Wrapper } from "./styles";
export default function MobileNavigationBar() {
  const {
    state
  } = useCart();
  const DOWN_900 = useMediaQuery(theme => theme.breakpoints.down(900));

  if (DOWN_900) {
    return <Wrapper>
        {MOBILE_NAVIGATION.map(({
        Icon,
        href,
        title
      }) => <StyledNavLink href={href} key={title}>
            {title === "Cart" ? <Badge badgeContent={state.cart.length} color="primary">
                <Icon fontSize="small" sx={iconStyle} />
              </Badge> : <Icon sx={iconStyle} fontSize="small" />}

            {title}
          </StyledNavLink>)}
      </Wrapper>;
  }

  return null;
}
