"use client";

import { Navbar } from "@/components/navbar";
import { Fragment, useCallback, useState } from "react";
import { MobileNavigationBar } from "@/components/mobile-navigation";
import { FlexBox } from "@/components/flex-box";

import Sticky from "@/components/sticky";
import Header from "@/components/header";
import NavigationList from "@/components/navbar/nav-list/nav-list";
import { SearchInput } from "@/components/search-box";

import LoginCartButtons from "@/components/header/components/login-cart-buttons";
import useHeader from "@/components/header/hooks/use-header";
import DialogDrawer from "@/components/header/components/dialog-drawer";
import { Footer } from "@/components/footer";
import { DrawerRight } from "@/components/drawer";
import SymRightDrawer from "@/components/header/components/drawer-right";

/**
 *  USED IN:
 *  Landing Page
 */

export default function ShopLayout1({
  children
}) {
  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback(fixed => setIsFixed(fixed), []);
  const {
    dialogOpen,
    sidenavOpen,
    toggleDialog,
    toggleSidenav
  } = useHeader();

  const HEADER_SLOT = (
    <FlexBox width="90%" alignItems="center" justifyContent="space-between">
      <NavigationList />
      <SearchInput btn={false} mxWidth="350px" />
      <LoginCartButtons toggleDialog={toggleDialog} toggleSidenav={toggleSidenav} />
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
        sidenavOpen={sidenavOpen}
        toggleSidenav={toggleSidenav}
      />

      <Footer />
    </Fragment>
  );
}