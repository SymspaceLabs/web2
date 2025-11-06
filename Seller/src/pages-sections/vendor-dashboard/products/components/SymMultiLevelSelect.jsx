import ChevronRight from "@mui/icons-material/ChevronRight";
import styled from "@mui/material/styles/styled";
import Category from "@/icons/Category"; // Assuming you have this icon path
import { FlexBox } from "@/components/flex-box"; // Assuming you have this component path
import { CATEGORIES_DATA } from "@/data/categoryMenus"; 
import { useCallback, useEffect, useState } from "react";
import { Card, Button, Typography, Box } from "@mui/material";

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
          list={CATEGORIES_DATA} // The new source data
          isRoot={true} // Mark this as the first list
          currentPath="" // Start with an empty path for the root level
      />
    </Wrapper>
  );
}

// --- LEVEL 1, 2, 3: The Recursive Nested List Component ---
// This component replaces CategoryList, MegaMenu1, and MegaMenu2 for the sequential flow
function NestedCategoryList({ open, onCategorySelect, list, isRoot = false, currentPath }) {
  const [activeItem, setActiveItem] = useState(null); // State to track the active option
  
  // Conditionally apply style root only for the main dropdown
  const ListComponent = isRoot ? StyledRoot : StyledNestedRoot;

  return (
    <ListComponent open={open} position={isRoot ? "absolute" : "static"}>
      {list.map((item) => {
        // Determine the current level and the next level's data array
        let nextLevelData = [];
        let isFinalLevel = false;

        if (item.subcategories) { // Level 1: Has 'subcategories' (Level 2 data)
            nextLevelData = item.subcategories;
        } else if (item.subcategoryItems) { // Level 2: Has 'subcategoryItems' (Level 3 data)
            nextLevelData = item.subcategoryItems;
        } else if (item.subcategoryItemChildren) { // Level 3: Has 'subcategoryItemChildren' (Level 4 data, the final one)
            nextLevelData = item.subcategoryItemChildren;
        } else {
            isFinalLevel = true; // This is the final selectable item (Level 4)
        }

        const title = item.name;
        // Construct the new path for the next level/final selection
        const nextPath = currentPath ? `${currentPath} > ${title}` : title;

        return (
          <CategoryListItem
            key={item.id}
            title={title}
            caret={!!nextLevelData.length} // Show caret if there is a next level
            // If it's the final level, call onCategorySelect with the FULL path (nextPath)
            onClick={() => isFinalLevel && onCategorySelect(nextPath)} 
            isActive={activeItem === title} 
            // Hover logic to show the next level
            onHover={() => setActiveItem(title)} 
            render={
              nextLevelData.length ? (
                // Recursively render the next level, passing the calculated nextPath
                <NestedCategoryList 
                  open={activeItem === title} // Only open if this item is active
                  onCategorySelect={onCategorySelect} 
                  list={nextLevelData} 
                  isRoot={false}
                  currentPath={nextPath} // Pass the path down
                />
              ) : null
            }
          />
        );
      })}
    </ListComponent>
  );
}

// --- Generic List Item for All Levels (CategoryListItem is renamed to avoid confusion with the old structure) ---
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

// --- Styled Components (Minimal changes to support the sequential flow) ---

// StyledRoot is for the main (Level 1) dropdown
const StyledRoot = styled("div")(({ theme, position, open }) => ({
  // ... (existing styles for the main dropdown)
  left: 0,
  zIndex: 10000, // 👈 INCREASED Z-INDEX HERE
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
  minWidth: "280px", // Ensure main list has width
}));

// StyledNestedRoot is for Level 2 and Level 3 dropdowns
// New width variable based on CategoryListItem's minWidth
const CATEGORY_ITEM_WIDTH = "278px";

// StyledNestedRoot is for Level 2 and Level 3 dropdowns
// StyledNestedRoot is for Level 2, 3, etc. dropdowns
const StyledNestedRoot = styled("div")(({ theme, open, level }) => ({
    display: open ? 'block' : 'none',
    position: 'absolute', 
    top: 0,
    zIndex: 99,
    // 🚨 CORRECTED POSITIONING: 
    // Shift the menu by one extra list width (278px) if the current menu level is 3 or higher.
    // Level 2 (level=2) -> left: 100% (correct)
    // Level 3 (level=3) -> left: calc(100% + 278px) (correctly aligns with Level 2's starting point)
    // Level 4 (level=4) -> left: calc(100% + 278px) (which will align with Level 3's starting point)
    left: level >= 3 ? `calc(100% + ${CATEGORY_ITEM_WIDTH})` : "100%", 
    
    borderRadius: 4,
    padding: "0.5rem 0px",
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.background.paper,
    minWidth: CATEGORY_ITEM_WIDTH,
}));


const Wrapper = styled("div")(({ open, theme: { direction } }) => ({
  // ... (existing styles)
  cursor: "pointer",
  position: "relative",
  "& .dropdown-icon": {
    transition: "all 250ms ease-in-out",
    transform: `rotate(${open ? (direction === "rtl" ? "-90deg" : "90deg") : "0deg"})`,
  },
}));

const CategoryMenuButton = styled(Button)(({ theme }) => ({
  // ... (existing styles)
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
  "& .category-dropdown-link": {
    height: 40,
    display: "flex",
    minWidth: "278px",
    cursor: "pointer",
    whiteSpace: "pre",
    padding: "0px 1rem",
    alignItems: "center",
    transition: "all 300ms ease-in-out",
    
    // Default color for the link itself
    color: theme.palette.text.primary, // Ensure default text color is applied

    ".title": {
      flexGrow: 1,
      paddingLeft: "0.75rem",
    },
  },
  
  // 🚨 CORRECTED STYLES: 
  // 1. Only apply primary color and background to the current item on hover/active.
  // 2. Do NOT change color at the top level of Wrapper1.
  "& .category-dropdown-link:hover, &.active > .category-dropdown-link": {
    color: theme.palette.primary.main, // ⬅️ ONLY apply blue color here
  },
  
  ":hover, &.active": { // Apply hover and active styles to the container
    // Removed 'color: theme.palette.primary.main,' from here.
    background: theme.palette.action.hover, // Apply the light background
    
    "& > .mega-menu > div": {
      display: "block",
    },
  },
  
  ".mega-menu": {
    top: 0,
    zIndex: 99,
    left: "100%",
    position: "absolute",
  },
}));


// Removed unused components (MegaMenu1, ColumnList, MegaMenu2, StyledRoot1) 
// as they are no longer necessary for the sequential dropdown structure.

export default SymMultiLevelSelect;