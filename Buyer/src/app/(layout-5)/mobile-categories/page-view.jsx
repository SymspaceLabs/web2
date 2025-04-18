"use client";

// ==============================================================

import { useState } from "react";
import renderChild from "./render-child";
import { useRouter } from "next/navigation";
import { categoryMenus } from "@/data/navigations";
import { CategoryListItem, StyledRoot } from "./styles";
import OverlayScrollbar from "@/components/overlay-scrollbar";
import IconComponent from "@/components/service-cards/icon-component";
import { Paragraph } from "@/components/Typography";
import { Box } from "@mui/material";

// ==============================================================

export default function MobileCategoriesPageView() {
  const router = useRouter();
  const [selected, setSelected] = useState(categoryMenus[0]);
  
  return (
    <Box sx={{ background:'rgba(0,0,0,0.3)' }}>
      <StyledRoot>

        {/* LEFT CATEGORY SCROLLER */}
        <OverlayScrollbar className="category-list">
          {categoryMenus.map((item, i) => 
            <CategoryListItem 
              key={i}
              isActive={selected.title === item.title}
              onClick={() => { 
                if (item.children) setSelected(item);
                else router.push(item.href);
              }}
            >
              {/* <IconComponent icon={item.icon} className="icon" /> */}
              <IconComponent icon={item.icon} isActive={selected.title === item.title} className="icon" />

              <Paragraph sx={styles.title}>
                {item.title}
              </Paragraph>
            </CategoryListItem>
          )}
        </OverlayScrollbar>

        <div className="container">
          {renderChild(selected.children)}
        </div>
      </StyledRoot>
    </Box>

  );
}

const styles = {
  title : {
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    textAlign: "center",
    fontSize: "11px",
    lineHeight: "1",
    color:'#FFF'
  }
}