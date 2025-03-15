import ChevronRight from "@mui/icons-material/ChevronRight";
import styled from "@mui/material/styles/styled";
import Category from "../../../../icons/Category";
import Button from "@mui/material/Button";
import { Typography, Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { categoryMenus } from "../../../../data/categoryMenus";
import Card from "@mui/material/Card";
import { FlexBox } from "../../../../components/flex-box";
import Grid from "@mui/material/Grid";

const SymMultiLevelSelect = ({ onCategorySelect, selectedCategory }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <CategoryMenu
        onCategorySelect={onCategorySelect}
        render={(handler) => (
          <CategoryMenuButton variant="text" onClick={(e) => handler(e)}>
            <div className="prefix">
              <Category fontSize="small" />
              <Typography>
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
      <CategoryList open={open} onCategorySelect={onCategorySelect} />
    </Wrapper>
  );
}

function CategoryList({ open, onCategorySelect, position = "absolute" }) {
  const [activeItem, setActiveItem] = useState(null); // State to track the active option

  return (
    <StyledRoot open={open} position={position}>
      {categoryMenus.map((item) => {
        const { title, children, component, icon, offer } = item;
        const MegaMenu = component === MegaMenu1.name ? MegaMenu1 : MegaMenu2;
        return (
          <CategoryListItem
            key={title}
            title={title}
            icon={icon}
            caret={!!children}
            onClick={() => onCategorySelect(title)}
            isActive={activeItem === title} // Set active if it matches
            onHover={() => setActiveItem(title)} // Set the current option as active when hovered
            render={
              component ? (
                <MegaMenu data={children} onCategorySelect={onCategorySelect} banner={offer} />
              ) : null
            }
          />
        );
      })}
    </StyledRoot>
  );
}



function CategoryListItem({ title, onClick, render, caret = true, icon: Icon, isActive, onHover }) {
  return (
    <Wrapper1 
      onClick={onClick}
      onMouseEnter={onHover} // Trigger when mouse enters
      className={isActive ? "active" : ""} // Add active class if it is the selected option
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


function MegaMenu1({ data, onCategorySelect }) {
  return <ColumnList list={data} onCategorySelect={onCategorySelect} />;
}


function ColumnList({ list, onCategorySelect, children, minWidth = 760 }) {
  return (
    <StyledRoot1 elevation={2} sx={{ minWidth }}>
      <FlexBox px={2.5}>
        <Box flex="1 1 0">
          <Grid container spacing={4}>
            {list.map((item, ind) => (
              <Grid item md={3} key={ind}>
                <div className="title-link">{item.title}</div>
                {item.children?.map((sub, subInd) => (
                  <Box
                    className="child-link"
                    key={subInd}
                    onClick={() => onCategorySelect(sub.title)} // Select the child category
                  >
                    {sub.title}
                  </Box>
                ))}
              </Grid>
            ))}
          </Grid>
        </Box>
      </FlexBox>
      {children}
    </StyledRoot1>
  );
}


export const StyledRoot1 = styled(Card)(({ theme }) => ({
  marginLeft: "1rem",
  paddingBlock: "0.5rem",
  "& .title-link, & .child-link": {
    color: "inherit",
    fontWeight: 600,
    display: "block",
    padding: "0.5rem 0px",
  },
  "& .child-link": {
    fontWeight: 400,
  },
  "& .mega-menu-content": {
    borderRadius: 4,
    marginLeft: "1rem",
    padding: "0.5rem 0px",
    boxShadow: theme.shadows[3],
    transition: "all 250ms ease-in-out",
    backgroundColor: theme.palette.background.paper,
  },
}));

function MegaMenu2({ data, onCategorySelect }) {
  return (
    <StyledRoot1 elevation={2}>
      {data.map((item) => (
        <CategoryListItem
          key={item.title}
          title={item.title}
          caret={!!item.children}
          render={
            item.children?.length ? (
              <ColumnList list={item.children} onCategorySelect={onCategorySelect} />
            ) : null
          }
        />
      ))}
    </StyledRoot1>
  );
}


const StyledRoot = styled("div")(({ theme, position, open }) => ({
  left: 0,
  zIndex: 98,
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
}));

const Wrapper = styled("div")(({ open, theme: { direction } }) => ({
  cursor: "pointer",
  position: "relative",
  "& .dropdown-icon": {
    transition: "all 250ms ease-in-out",
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
  "& .category-dropdown-link": {
    height: 40,
    display: "flex",
    minWidth: "278px",
    cursor: "pointer",
    whiteSpace: "pre",
    padding: "0px 1rem",
    alignItems: "center",
    transition: "all 300ms ease-in-out",
    ".title": {
      flexGrow: 1,
      paddingLeft: "0.75rem",
    },
  },
  ":hover, &.active": { // Apply hover and active styles
    color: theme.palette.primary.main,
    background: theme.palette.action.hover,
    "& > .mega-menu": {
      display: "block",
    },
  },
  ".mega-menu": {
    top: 0,
    zIndex: 99,
    left: "100%",
    display: "none",
    position: "absolute",
  },
}));


export default SymMultiLevelSelect;
