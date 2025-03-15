"use client";

import { useEffect, useRef, useState } from "react"; // Local CUSTOM COMPONENT

import Section4 from "../section-4"; // GLOBAL CUSTOM COMPONENT

import SideNavbar from "../../../components/page-sidenav/side-navbar"; // CUSTOM DATA MODEL
import api from "../../../utils/__api__/furniture-1";

// STYLED COMPONENT
import { StyledContainer } from "./styles"; // ==============================================================

// ==============================================================
export default async function Sidebar() {
  const ref = useRef();
  const [sidebarHeight, setSidebarHeight] = useState(0);
  useEffect(() => {
    if (ref.current) setSidebarHeight(ref.current.offsetHeight);
  }, []);
  const [ furnitureProducts, sidebarNavList] = await Promise.all([ api.getFurnitureProducts(), api.getFurnitureShopNavList()]);


  return <StyledContainer>
      {
      /* LEFT SIDEBAR */
    }
      <div className="sidenav">
        <SideNavbar lineStyle="dash" navList={sidebarNavList} sidebarStyle="colored" sidebarHeight={sidebarHeight || "85vh"} />
      </div>

      {
      /* OFFER BANNERS */
    }
      <div className="pageContent" ref={ref}>
        {/* <Section2 /> */}
        <Section4 products={furnitureProducts} />
      </div>
    </StyledContainer>;
}