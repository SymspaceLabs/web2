"use client";

// ================================================
// Mobile Categories
// ================================================

import { useState } from "react";
import renderChild from "./render-child";
import { useRouter } from "next/navigation";
import { categoryMenus } from "@/data/mobileCategoryMenus";
import { CategoryListItem, StyledRoot } from "./styles";
import OverlayScrollbar from "@/components/overlay-scrollbar";
import IconComponent from "@/components/service-cards/icon-component";
import { H1, Paragraph } from "@/components/Typography";
import { Box } from "@mui/material";

// ==============================================================

export default function MobileCategoriesPageView() {
  const router = useRouter();
  const [selected, setSelected] = useState(categoryMenus[0]);
  
  return (
    <Box>
      <StyledRoot>

        {/* LEFT CATEGORY SCROLLER */}
        <OverlayScrollbar className="category-list">
          {categoryMenus.map((item, i) => 
            <CategoryListItem 
              key={i}
              isActive={selected.title === item.title}
              onClick={() => { 
                if (item.children) setSelected(item);
                else router.push(`/products/search/all?category=${item.slug}`);

              }}
            >
              {/* <IconComponent icon={item.icon} className="icon" /> */}
              <IconComponent
                icon={item.icon}
                isActive={selected.title === item.title}
                className="icon"
                sx={{color: (selected.title === item.title) ? "#007BFF" : "#000"}}
              />

              <Paragraph
                sx={{
                  ...styles.title,
                  color: (selected.title === item.title) ? '#007BFF' : '#000',
                }}
              >
                {item.title}
              </Paragraph>
            </CategoryListItem>
          )}
        </OverlayScrollbar>

        <div className="container">
          <H1 color="#000" py={1}>
            {selected.title}
          </H1>
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
  }
}