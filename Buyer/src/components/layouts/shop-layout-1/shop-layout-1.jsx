"use client";

// ==============================================================
// Shop Layout 1
// ==============================================================

import { Box, Card } from "@mui/material";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { styled } from '@mui/material/styles';
import { FlexBox } from "@/components/flex-box";
import { MiniCart } from "@/components/mini-cart";
import { SearchInput } from "@/components/search-box";
import { MiniFavorite } from "@/components/favourites";
import { SymDrawer } from "@/components/custom-drawer";
import { Fragment, useCallback, useState } from "react";
import { MobileNavigationBar } from "@/components/mobile-navigation";

import Sticky from "@/components/sticky";
import Header from "@/components/header";
import LogoWithTitle from "@/components/LogoWithTitle";
import useHeader from "@/components/header/hooks/use-header";
import SymDialog from "@/components/custom-dialog/SymDialog";
import NavigationList from "@/components/navbar/nav-list/nav-list";
import LoginCartButtons from "@/components/header/components/login-cart-buttons";
import { LoginPageView } from "@/pages-sections/sessions/page-view";
import { SocialButtons } from "@/components/header/components/SocialButtons";
import { LoginBottom } from "@/pages-sections/sessions/components";

// ==============================================================

export default function ShopLayout1({children, noFooter=false}) {
  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback(fixed => setIsFixed(fixed), []);
  const {
    dialogOpen,
    toggleDialog,

    cartOpen,
    toggleCartOpen,

    favouriteOpen,
    toggleFavouriteOpen
  } = useHeader();

  const HEADER_SLOT = (
    <FlexBox width="90%" alignItems="center" justifyContent="space-between">
      <NavigationList />
      <SearchInput btn={false} mxWidth="350px" />
      <LoginCartButtons
        toggleDialog={toggleDialog}
        toggleCartOpen={toggleCartOpen}
        toggleFavouriteOpen={toggleFavouriteOpen}
      />
    </FlexBox>
  );

  return (
    <Fragment>

      {/* TOP NAVBAR */}
      <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={300}>
        {/* TOP HEADER */}
        <Header isFixed={isFixed} midSlot={HEADER_SLOT} />

        {/* CATEGORY NAVBAR */}
        <Navbar />
      </Sticky>


      {/* BODY CONTENT */}
      {children}

      {/* SMALL DEVICE BOTTOM NAVIGATION */}
      {/* BOTTOM NAVBAR */}
      <MobileNavigationBar />

      {/* LOGIN DIALOG */}
      {/* <SymDialog
        dialogOpen={dialogOpen} 
        toggleDialog={toggleDialog}
      /> */}

      <SymDialog dialogOpen={dialogOpen} toggleDialog={toggleDialog}>
        <Box style={{ width: '100%', maxWidth: 580, height: 885, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'inline-flex' }}>
          <Box style={{ width: '100%', alignSelf: 'stretch',  flex: '1 1 0', position: 'relative', overflow: 'hidden' }}>
            <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', textAlign: 'center'}}>
              <Wrapper>
                <LogoWithTitle title="Continue your Journey" subTitle="Log in to an existing account using your email" />
                <LoginPageView closeDialog={toggleDialog} />
                <SocialButtons />
                <LoginBottom />
              </Wrapper>
            </Box>
          </Box>
        </Box>
      </SymDialog>

      {/* SHOPPING CART SIDE DRAWER */}
      <SymDrawer
        open={cartOpen}
        toggleOpen={toggleCartOpen}
      >
        <MiniCart
          toggleSidenav={toggleCartOpen}
        />
      </SymDrawer>

      {/* FAVOURITES SIDE DRAWER */}
      <SymDrawer
        open={favouriteOpen}
        toggleOpen={toggleFavouriteOpen}
      >
        <MiniFavorite
          toggleSidenav={toggleFavouriteOpen}
        />
      </SymDrawer>

      {/* Footer Component */}
      {
        !noFooter && <Footer />
      }
      
      
    </Fragment>
  );
}

const fbStyle = {
  background: "#3B5998",
  color: "white"
};
const googleStyle = {
  background: "#4285F4",
  color: "white"
};

const Wrapper = styled(Card)(({ theme }) => ({
  padding: "2rem 3rem",
  background: 'transparent',

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: "2rem 2rem", // Mobile-specific padding
  },
  ".facebookButton": {
    marginBottom: 10,
    ...fbStyle,
    "&:hover": fbStyle,
  },
  ".googleButton": {
    ...googleStyle,
    "&:hover": googleStyle,
  },
  ".agreement": {
    marginTop: 12,
    marginBottom: 24,
  },
}));