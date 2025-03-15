"use client";

import { Fragment } from "react";
import Divider from "@mui/material/Divider"; // CUSTOM GLOBAL COMPONENTS
import Header from "components/header";
import { Navbar } from "components/navbar";
import { Footer1 } from "components/footer";
import { SearchInput } from "components/search-box";
import { MobileNavigationBar } from "components/mobile-navigation";
/** USED: SALES-1 & SALES-2 PAGES */
// =============================================================

// =============================================================
export default function SalesLayout(props) {
  const {
    children,
    type = "one",
    categoryNav
  } = props;
  let CONTENT = null; // FOR SALES 1 PAGE

  if (type == "one") {
    CONTENT = <Fragment>
        <Navbar />
        {children}
      </Fragment>;
  } // FOR SALES 2 PAGE


  if (type == "two") {
    CONTENT = <Fragment>
        <Divider />
        {categoryNav}
        <div className="section-after-sticky">{children}</div>
      </Fragment>;
  }

  return (
    <Fragment>
      {/* HEADER AREA */}
      <Header midSlot={<SearchInput />} />

      {/* RENDER MAIN CONTENT AREA */}
      {CONTENT}

      {/* FOOTER AREA */}
      <Footer1 />

      {/* SMALLER DEVICE NAVIGATION */}
      <MobileNavigationBar />
    </Fragment>
  );
}