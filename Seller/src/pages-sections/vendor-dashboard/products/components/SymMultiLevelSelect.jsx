import ChevronRight from "@mui/icons-material/ChevronRight";
import styled from "@mui/material/styles/styled";
import Category from "@/icons/Category"; // Assuming you have this icon path

import { CATEGORIES_DATA } from "@/data/categoryMenus"; 
import { useCallback, useEffect, useState } from "react";
import { Button, Typography, Box } from "@mui/material";

// --- LEVEL 0: Main Component ---
const SymMultiLevelSelect = ({ onCategorySelect, selectedCategory }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <CategoryMenu
        onCategorySelect={onCategorySelect}
        render={(handler) => (
          <CategoryMenuButton variant="text" onClick={(e) => handler(e)}>
            <div className="prefix">
              <Category fontSize="small" />
              <Typography sx={{textTransform: "capitalize",}}>
                Categories {selectedCategory ? ` - ${selectedCategory}` : ""}
              </Typography>
            </div>
            <ChevronRight className="dropdown-icon" fontSize="small" />
          </CategoryMenuButton>
        )}
      />
    </Box>
  );
};

// --- LEVEL 0/1: Menu Management Wrapper ---
function CategoryMenu({ render, onCategorySelect }) {
  const [open, setOpen] = useState(false);

  const onClick = (e) => {
    e.stopPropagation();
    setOpen((open) => !open);
  };

  const handleDocumentClick = useCallback(() => setOpen(false), []);
  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, [handleDocumentClick]);

  return (
    <Wrapper open={open}>
      {render(onClick)}
      {/* Start of Level 1 dropdown, passing CATEGORIES_DATA (Level 1 array) */}
      <NestedCategoryList 
          open={open} 
          onCategorySelect={onCategorySelect}
          onMenuClose={() => setOpen(false)} // Pass a function to close the menu
          list={CATEGORIES_DATA}
          isRoot={true} 
          currentPath=""
          level={1} // Start at level 1 for the root list 
      />
    </Wrapper>
  );
}

// --- LEVEL 1, 2, 3: The Recursive Nested List Component ---
function NestedCategoryList({ open, onCategorySelect, onMenuClose, list, isRoot = false, currentPath, level }) {
  const [activeItem, setActiveItem] = useState(null);
  
  // Conditionally apply style root only for the main dropdown
  const ListComponent = isRoot ? StyledRoot : StyledNestedRoot;

  return (
    <ListComponent open={open} position={isRoot ? "absolute" : "static"} level={level}>
      {list.map((item) => {
        let nextLevelData = [];
        let isFinalLevel = false;

        // Logic to determine the next level data
        if (item.subcategories) {
            nextLevelData = item.subcategories;
        } else if (item.subcategoryItems) {
            nextLevelData = item.subcategoryItems;
        } else if (item.subcategoryItemChildren) {
            nextLevelData = item.subcategoryItemChildren;
        } else {
            isFinalLevel = true; 
        }

        const title = item.name;
        const nextPath = currentPath ? `${currentPath} > ${title}` : title;
        
        // Logic to handle selection and pass ID
        const handleItemClick = (e) => {
            e.stopPropagation(); 
            if (isFinalLevel) {
                onCategorySelect({ 
                    id: item.id,
                    name: item.name,
                    path: nextPath,
                }); 
            }
            onMenuClose();
        };

        return (
          <CategoryListItem
            key={item.id}
            title={title}
            caret={!!nextLevelData.length}
            onClick={handleItemClick}
            isActive={activeItem === title} 
            onHover={() => setActiveItem(title)} 
            render={
              nextLevelData.length ? (
                // Recursive call to the next level
                <NestedCategoryList
                  open={activeItem === title}
                  onCategorySelect={onCategorySelect}
                  onMenuClose={onMenuClose}
                  list={nextLevelData} 
                  isRoot={false}
                  currentPath={nextPath}
                  level={level + 1} // Increment the level for the next list
                />
              ) : null
            }
          />
        );
      })}
    </ListComponent>
  );
}

// --- Generic List Item for All Levels ---
function CategoryListItem({ title, onClick, render, caret = true, icon: Icon, isActive, onHover }) {
  return (
    <Wrapper1 
      onClick={onClick}
      onMouseEnter={onHover} 
      className={isActive ? "active" : ""} 
    >
      <Box>
        <div className="category-dropdown-link">
          {Icon ? <Icon fontSize="small" color="inherit" /> : null}
          <span className="title">{title}</span>
          {caret ? <ChevronRight fontSize="small" className="caret-icon" /> : null}
        </div>
      </Box>
      {render ? <div className="mega-menu">{render}</div> : null}
    </Wrapper1>
  );
}

// --- Styled Components ---

// StyledRoot is for the main (Level 1) dropdown
const StyledRoot = styled("div")(({ theme, position, open }) => ({
  left: 0,
  zIndex: 10000, 
  right: "auto",
  borderRadius: 4,
  padding: "0.5rem 0px",
  transformOrigin: "top",
  boxShadow: theme.shadows[2],
  position: position || "unset",
  transition: "all 250ms ease-in-out",
  transform: open ? "scaleY(1)" : "scaleY(0)",
  backgroundColor: theme.palette.background.paper,
  top: position === "absolute" ? "calc(100% + 0.7rem)" : "0.5rem",
  minWidth: "280px",
}));

const CATEGORY_ITEM_WIDTH = "278px";

// FIX APPLIED HERE: Simplified positioning by removing the redundant left calculation.
const StyledNestedRoot = styled("div")(({ theme, open, level }) => ({
    display: open ? 'block' : 'none',
    position: 'absolute',
    top: 0,
    zIndex: 99,
    left: 0, 
    borderRadius: 4,
    padding: "0.5rem 0px",
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.background.paper,
    minWidth: CATEGORY_ITEM_WIDTH,
}));


const Wrapper = styled("div")(({ open, theme: { direction } }) => ({
  cursor: "pointer",
  position: "relative",
  "& .dropdown-icon": {
    transition: "all 250ms ease-in-out",
    // ⬇️ FIX APPLIED HERE: The closing parenthesis for 'rotate()' is now inside the template literal (before the final backtick)
    transform: `rotate(${open ? (direction === "rtl" ? "-90deg" : "90deg") : "0deg"})`,
  },
}));

const CategoryMenuButton = styled(Button)(({ theme }) => ({
  width: "100%",
  borderRadius: 4,
  backgroundColor: theme.palette.grey[100],
  ".prefix": {
    gap: 8,
    flex: 1,
    display: "flex",
    alignItems: "center",
    color: theme.palette.grey[800],
  },
}));

const Wrapper1 = styled("div")(({ theme }) => ({
  // Set position relative for the list item to serve as the anchor for the mega-menu
  position: "relative", // 👈 This is crucial for absolute positioning of nested menus
  
  "& .category-dropdown-link": {
    height: 40,
    display: "flex",
    minWidth: "278px",
    cursor: "pointer",
    whiteSpace: "pre",
    padding: "0px 1rem",
    alignItems: "center",
    transition: "all 300ms ease-in-out",
    color: theme.palette.text.primary,

    ".title": {
      flexGrow: 1,
      paddingLeft: "0.75rem",
    },
  },
  
  "& .category-dropdown-link:hover, &.active > .category-dropdown-link": {
    color: theme.palette.primary.main,
  },
  
  ":hover, &.active": {
    background: theme.palette.action.hover,
    
    "& > .mega-menu > div": {
      display: "block",
    },
  },
  
  ".mega-menu": {
    top: 0,
    zIndex: 99,
    left: "100%", // This shifts the nested list 100% to the right of the list item
    position: "absolute",
  },
}));

export default SymMultiLevelSelect;