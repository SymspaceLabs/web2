"use client";

import Container from "@mui/material/Container";
import ButtonBase from "@mui/material/ButtonBase";
import styled from "@mui/material/styles/styled";
export const StyledContainer = styled(Container)(({
  theme
}) => ({
  paddingTop: "5rem",
  [theme.breakpoints.down("sm")]: {
    paddingTop: "1.5rem"
  }
})); // ==============================================================

// ==============================================================
export const StyledButton = styled(ButtonBase, {
  shouldForwardProp: prop => prop !== "isWhite"
})(({
  theme,
  isWhite
}) => ({
  fontFamily: 'Elemental End',
  textTransform: 'lowercase',
  fontWeight: 500,
  borderRadius: 32,
  padding: ".5rem 1.5rem",
  backgroundColor: theme.palette.grey[800],
  ...(isWhite && {
    backgroundColor: theme.palette.common.white,
    color:"#1A1A1A",
  })
})); // ==============================================================

// ==============================================================
export const ContentWrapper = styled("div", {
  shouldForwardProp: prop => prop !== "hasGradient"
})(({
  theme,
  hasGradient
}) => ({
  height: "100%",
  color: "white",
  borderRadius: 12,
  backgroundColor: "#353535",
  ...(hasGradient && {
    background: "#E0F0FD"
  })
}));