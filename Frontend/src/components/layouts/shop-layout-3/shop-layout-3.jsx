"use client";

import { Fragment, useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import Divider from "@mui/material/Divider"; // GLOBAL CUSTOM COMPONENTS

import Sticky from "../../sticky";
import Topbar from "../../topbar";
import { Footer4 } from "../../footer";
import Header from "../../header";
import NavigationList from "../../navbar/nav-list/nav-list";
import { MobileNavigationBar } from "../../mobile-navigation";
/**
 *  USED IN:
 *  1. GADGET-2 | FURNITURE-2 | MEDICAL | GROCERY-1
 */

export default function ShopLayout3({
  children
}) {
  const pathname = usePathname();
  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback(fixed => setIsFixed(fixed), []);
  const CENTERED = ["/medical", "/gift-shop", "/grocery-1"];
  // const STYLE = CENTERED.includes(pathname) ? {
  //   marginInline: "auto"
  // } : {
  //   marginRight: "auto",
  //   marginLeft: "2rem"
  // };
  const HEADER_SLOT = <div>
      <NavigationList />
    </div>;
  return <Fragment>

      <Topbar />
      <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={300}>
        <Header isFixed={isFixed} midSlot={HEADER_SLOT} />
        <Divider />
      </Sticky>
      {children}
      <MobileNavigationBar />
      {pathname !== "/grocery-1" ? <Footer4 /> : null}
    </Fragment>;
}