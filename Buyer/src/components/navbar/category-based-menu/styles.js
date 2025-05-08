import { List, ListItem } from "@mui/material";
import styled from "@mui/material/styles/styled"; // LOCAL CUSTOM COMPONENT
import SymCard from "@/components/custom-components/SymCard";

const Wrapper = styled("div")(({
  theme
}) => ({
  cursor: "pointer",
  // transition: "color 150ms ease-in-out",
  fontFamily:'Helvetica',
  color:'#4C4C4C',
  fontWeight:'bold',
  ":hover": {
    color: "#fff",
    "& .menu-list": {
      display: "block"
    }
  }
}));

const MenusContainer = styled("div")({
  left: 0,
  zIndex: 2,
  top: "68%",
  width: "100%",
  height: "auto", // Allow the height to be dynamic based on content
  display: "none",
  minHeight: "500px",
  maxHeight: "500px",
  position: "absolute"
});

const StyledCard = styled(SymCard)({
  marginTop: 12,
  height: "100%",
  display: "flex",
  borderRadius: 0,
  background:'#FAFAFA'
});

const CategoryList = styled(List)(({
  theme
}) => ({
  padding: 0,
  width: 300,
  height: "100%",
  borderRight: `1px solid ${theme.palette.grey[200]}`
}));

const CategoryListItem = styled(ListItem, {
  shouldForwardProp: prop => prop !== "active"
})(({
  theme,
  active
}) => ({
  ...elementalEndFont,
  padding: "1rem 1.5rem",
  color:'#000',
  justifyContent: "space-between",
  border:'1px solid #BDBDBD',
  ...(active && {
    color: "#fff",
    background: "linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)"
  })
}));

const SubCategoryList = styled(List)(({
  theme
}) => ({
  padding: 0,
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  [theme.breakpoints.down("xl")]: {
    gridTemplateColumns: "repeat(5, 1fr)"
  },
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "repeat(4, 1fr)"
  }
}));

const SubCategoryListItem = styled(ListItem)(({
  theme
}) => ({
  gap: 12,
  fontSize: 13,
  padding: "0",
  alignItems: "center",
  marginBottom: "1.5rem",
  transition: "all 0.3s",
  color: "#000",
  ":hover": {
    color: theme.palette.primary.main,
  }
}));

export { Wrapper, StyledCard, CategoryList, MenusContainer, SubCategoryList, CategoryListItem, SubCategoryListItem };