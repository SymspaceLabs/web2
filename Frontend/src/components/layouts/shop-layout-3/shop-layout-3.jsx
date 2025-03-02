"use client";

import { Navbar } from "@/components/navbar";
import { Footer4 } from "@/components/footer";
import { usePathname } from "next/navigation";
import { Fragment, useCallback, useState } from "react";
import { MobileNavigationBar } from "@/components/mobile-navigation";

import Sticky from "@/components/sticky";
import Header from "@/components/header";
import NavigationList from "@/components/navbar/nav-list/nav-list";

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
  
  const HEADER_SLOT = <div><NavigationList /></div>;

  return (
    <Fragment>
      {/* HEADER */}
      <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={300}>
        <Header isFixed={isFixed} midSlot={HEADER_SLOT} />
      </Sticky>

      {/* NAVIGATION BAR */}
      <Navbar />

      {/* BODY CONTENT */}
      {children}

      {/* SMALL DEVICE BOTTOM NAVIGATION */}
      <MobileNavigationBar />

      {/* {pathname !== "/grocery-1" ? <Footer4 /> : null} */}
    </Fragment>
  );
}