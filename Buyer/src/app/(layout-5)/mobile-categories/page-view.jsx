"use client";

// ==============================================================

import { useState } from "react";
import renderChild from "./render-child";
import { useRouter } from "next/navigation";
import { categoryMenus } from "@/data/navigations";
import { CategoryListItem, StyledRoot } from "./styles";
import OverlayScrollbar from "@/components/overlay-scrollbar";
import IconComponent from "@/components/service-cards/icon-component";

// ==============================================================

export default function MobileCategoriesPageView() {
  const router = useRouter();
  const [selected, setSelected] = useState(categoryMenus[0]);
  
  return (
    <StyledRoot>

      {/* LEFT CATEGORY SCROLLER */}
      <OverlayScrollbar className="category-list">
        {categoryMenus.map((item, i) => 
          <CategoryListItem 
            isActive={selected.title === item.title}
            onClick={() => { 
              if (item.children) setSelected(item);
              else router.push(item.href);
            }}
          >
            <IconComponent icon={item.icon} className="icon" />
            <p className="title">{item.title}</p>
          </CategoryListItem>)}
      </OverlayScrollbar>

      <div className="container">
        {renderChild(selected.children)}
      </div>
    </StyledRoot>
  );
}