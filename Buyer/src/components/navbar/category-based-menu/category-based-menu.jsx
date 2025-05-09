import { useState } from "react";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown"; // GLOBAL CUSTOM COMPONENT

import FlexRowCenter from "../../../components/flex-box/flex-row-center"; // LOCAL CUSTOM COMPONENTS

import Categories from "./components/categories";
import ChildCategories from "./components/child-categories"; // STYLED COMPONENTS

import { Wrapper, StyledCard, MenusContainer } from "./styles"; // DATA TYPES
import Link from "next/link"; // MUI

// ===============================================================
export default function CategoryBasedMenu({
  title,
  menuList,
  url = "/"
}) {
  const [openList, setOpenList] = useState(menuList[0].title);
  const categories = menuList.reduce((prev, curr) => [...prev, curr.title], []);
  const subCategories = menuList.find(item => item.title === openList);
  return (
    <Wrapper>
      <FlexRowCenter alignItems="flex-end" gap={0.3}>
      <Link href={url} target="blank">{title}</Link>
        <KeyboardArrowDown sx={{ color: "grey.500", fontSize: "1.1rem" }} />
      </FlexRowCenter>

      <MenusContainer className="menu-list">
        <StyledCard>
          <Categories
            openList={openList} 
            categories={categories} 
            handleOpen={item => setOpenList(item)}
          />
          <ChildCategories
            categories={subCategories}
          />
        </StyledCard>
      </MenusContainer>
    </Wrapper>
    );
}