"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// MUI
import { Tooltip } from "@mui/material";

// GLOBAL CUSTOM COMPONENTS
import SearchInput from "@/components/SearchInput";
// import IconComponent from "@/components/IconComponent";
import IconComponent from "@/components/service-cards/icon-component";
import OverlayScrollbar from "@/components/overlay-scrollbar";
import { MobileNavigationBar } from "@/components/mobile-navigation";
import { HeaderCart, HeaderLogin } from "@/components/header";
import { MobileMenu } from "@/components/navbar/mobile-menu";
import { HeaderSearch, MobileHeader } from "@/components/header/mobile-header";
import renderChild from "./render-child";

// STYLES
import { CategoryListItem, StyledRoot } from "./styles";

// TYPES


// ==============================================================


// ==============================================================

export default function MobileCategoriesPageView({
  data
}) {
  const {
    header,
    mobileNavigation
  } = data;
  const router = useRouter();
  const [selected, setSelected] = useState(header.categoryMenus[0]);
  return <StyledRoot>
      <div className="header">
        <MobileHeader>
          <MobileHeader.Left>
            <MobileMenu navigation={header.navigation} />
          </MobileHeader.Left>

          <MobileHeader.Logo logoUrl={mobileNavigation.logo} />

          <MobileHeader.Right>
            <HeaderSearch>
              <SearchInput />
            </HeaderSearch>

            <HeaderLogin />
            <HeaderCart />
          </MobileHeader.Right>
        </MobileHeader>
      </div>

      <OverlayScrollbar className="category-list">
        {header.categoryMenus.map((item, i) => <Tooltip key={i} title={item.title} placement="right" arrow>
            <CategoryListItem isActive={selected.title === item.title} onClick={() => {
          if (item.children) setSelected(item);else router.push(item.href);
        }}>
              <IconComponent icon={item.icon} className="icon" />

              <p className="title">{item.title}</p>
            </CategoryListItem>
          </Tooltip>)}
      </OverlayScrollbar>

      <div className="container">{renderChild(selected.children)}</div>

      <MobileNavigationBar navigation={mobileNavigation.version1} />
    </StyledRoot>;
}