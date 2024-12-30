"use client";

import { Fragment, useCallback, useState } from "react"; // GLOBAL CUSTOM COMPONENTS

import Sticky from "../../../components/sticky";
import Topbar from "../../../components/topbar";
import { Navbar } from "../../../components/navbar";
import { Footer1 } from "../../../components/footer";
import Header from "../../../components/header/header";
import { SearchInput } from "../../../components/search-box";
import { MobileNavigationBar } from "../../../components/mobile-navigation";
import { Box } from "@mui/material";
/**
 *  USED IN:
 *  1. MARKET-1, MARKET-2, GADGET, FASHION-1, FASHION-2, FASHION-3, FURNITURE, GROCERY-3, GIFT
 *  2. PRODUCT DETAILS, PRODUCT-SEARCH, ORDER-CONFIRMATION
 *  5. SHOPS, SHOP-DETAILS
 */

export default function ShopLayout1({
  children
}) {
  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback(fixed => setIsFixed(fixed), []);
  return <Box sx={{background:'#fff' }}>
    <Fragment >
      {/* TOP BAR SECTION */}
      <Topbar />

      {/* HEADER */}
      <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={300}>
        <Header isFixed={isFixed} midSlot={<SearchInput />} />
      </Sticky>

      {/* NAVIGATION BAR */}
      <Navbar elevation={0} border={1} />

      {/* BODY CONTENT */}
      {children}
      

      {/* SMALL DEVICE BOTTOM NAVIGATION */}
      <MobileNavigationBar />

      {/* FOOTER */}
      <Footer1 />
    </Fragment>
    </Box>;
}