"use client";

// ==============================================================
// Shop Layout 1
// ==============================================================

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FlexBox } from "@/components/flex-box";
import { MiniCart } from "@/components/mini-cart";
import { MiniFavorite } from "@/components/favourites";
import { SearchInput } from "@/components/search-box";
import { Fragment, useCallback, useState } from "react";
import { MobileNavigationBar } from "@/components/mobile-navigation";

import Sticky from "@/components/sticky";
import Header from "@/components/header";
import useHeader from "@/components/header/hooks/use-header";
import NavigationList from "@/components/navbar/nav-list/nav-list";
import DialogDrawer from "@/components/header/components/dialog-drawer";
import SymRightDrawer from "@/components/header/components/drawer-right";
import LoginCartButtons from "@/components/header/components/login-cart-buttons";

export default function ShopLayout1({children}) {
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
      <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={300}>
        {/* HEADER */}
        <Header isFixed={isFixed} midSlot={HEADER_SLOT} />

        {/* CATEGORY NAVBAR */}
        <Navbar />
      </Sticky>


      {/* BODY CONTENT */}
      {children}

      {/* SMALL DEVICE BOTTOM NAVIGATION */}
      <MobileNavigationBar />

      {/* LOGIN DIALOG */}
      <DialogDrawer
        dialogOpen={dialogOpen} 
        toggleDialog={toggleDialog}
      />

      {/* SHOPPING CART SIDE DRAWER */}
      <SymRightDrawer
        sidenavOpen={cartOpen}
        toggleSidenav={toggleCartOpen}
      >
        <MiniCart
          toggleSidenav={toggleCartOpen}
        />
      </SymRightDrawer>

      {/* FAVOURITES SIDE DRAWER */}
      <SymRightDrawer
        sidenavOpen={favouriteOpen}
        toggleSidenav={toggleFavouriteOpen}
      >
        <MiniFavorite
          toggleSidenav={toggleFavouriteOpen}
        />
      </SymRightDrawer>

      <Footer />
    </Fragment>
  );
}