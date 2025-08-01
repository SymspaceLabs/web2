
import { styled } from "@mui/material/styles";
import SymCard from "@/components/custom-components/SymCard"; // COMMON STYLED OBJECT

import { NavLink } from "@/components/nav-link";
import { Box, Button, Container } from "@mui/material";

export const NAV_LINK_STYLES = {
  color:'#6A6B6B',
  fontWeight: 'bold',
  cursor: "pointer",
  transition: "color 150ms ease-in-out",
  "&:hover": {
    color: "#0366FE"
  },
  "&:last-child": {
    marginRight: 0
  },
  fontFamily:'Helvetica'
};

export const StyledNavLink = styled(NavLink, {
  shouldForwardProp: prop => prop !== "active"
})(({
  theme,
  active
}) => ({ 
  color:'#6A6B6B',
  fontWeight: 'bold',
  cursor: "pointer",
  transition: "color 150ms ease-in-out",
  "&:hover": {
    color: "#FFF"
  },
  "&:last-child": {
    marginRight: 0
  },
  fontFamily:'Helvetica',
  ...(active && {
    color: "#FFF",
  })
}));

export const ParentNav = styled(Box, {
  shouldForwardProp: prop => prop !== "active"
})(({
  theme,
  active
}) => ({
  position: "relative",
  "&:hover": {
    color: "#fff",
    "& > .parent-nav-item": {
      display: "block"
    }
  },
  ...(active && {
    color: "#fff",
  })
}));
export const ParentNavItem = styled("div", {
  shouldForwardProp: prop => prop !== "left" && prop !== "right"
})(({
  theme,
  left,
  right
}) => ({
  top: 0,
  zIndex: 5,
  left: "100%",
  paddingLeft: 8,
  display: "none",
  position: "absolute",
  ...(right && {
    right: "100%",
    left: "auto",
    paddingRight: 8
  })
}));
export const NavBarWrapper = styled(SymCard, {
  shouldForwardProp: prop => prop !== "border"
})(({
  bg,
  theme,
  border
}) => ({
  background: 'linear-gradient(94.91deg, #FFFFFF 0%, #BEBEBE 100%)',
  height: "60px",
  display: "block",
  borderRadius: "0px",
  position: "relative",
  ...(border && {
    borderBottom: `1px solid ${theme.palette.grey[200]}`
  }),
  [theme.breakpoints.down(1150)]: {
    display: "none"
  }
}));
export const InnerContainer = styled(Container)({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
});
export const CategoryMenuButton = styled(Button)(({
  theme
}) => ({
  display: "flex",
  justifyContent:'flex-start',
  paddingLeft:'15px !important',
  gap: 8,
  flex: 1,
  minWidth:'200px',
  borderRadius: '50px',
  background:'#717171',
  color:'#fff',
  "&:hover": {
    background: "#000",
    color:'#717171',
  },
}));
export const ChildNavListWrapper = styled("div")({
  zIndex: 5,
  left: "50%",
  top: "100%",
  display: "none",
  position: "absolute",
  transform: "translate(-50%, 0%)",
  "& .MuiMenuItem-root": {
    padding: "8px 16px",
    "&:hover": {
      backgroundColor: "#1976d2", // Example hover background
      color: "#fff", // Example hover text color
    },
  },
  "& .MuiMenuItem-root:hover": {
    backgroundColor: "#f0f0f0", // Change hover background
    color: "#1976d2", // Change hover text color
  },
});
