'use client'

import styled from "@mui/material/styles/styled";
export const Wrapper = styled("div")(({
  theme
}) => ({
  "& .category-dropdown-link": {
    height: 42,
    display: "flex",
    minWidth: "278px",
    cursor: "pointer",
    whiteSpace: "pre",
    padding: "0px 1rem",
    alignItems: "center",
    borderBottom:"0.5px solid white",
    transition: "all 300ms ease-in-out",
    ".title": {
      flexGrow: 1,
      paddingLeft: "0.75rem"
    }
  },
  ":hover": {
    color: theme.palette.primary.main,
    background: theme.palette.action.hover,
    "& > .mega-menu": {
      display: "block"
    }
  },
  ".mega-menu": {
    top: 0,
    zIndex: 99,
    left: "100%",
    right: "auto",
    display: "none",
    position: "absolute",
  },
  ...(theme.direction === "rtl" && {
    ".caret-icon": {
      rotate: "180deg"
    }
  })
}));