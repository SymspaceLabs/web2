"use client";

import ButtonBase from "@mui/material/ButtonBase";
import styled from "@mui/material/styles/styled";
export const StyledButton = styled(ButtonBase)(({
  theme
}) => ({
  fontWeight: 600,
  borderRadius: 50,
  padding: ".7rem 1.5rem",
  color: theme.palette.common.white,
  backgroundColor: theme.palette.grey[800]
}));
export const YellowBox = styled("div")(({
  theme,
  background
}) => ({
  padding: "3rem",
  borderRadius: 50,
  position: "relative",
  backgroundColor: background,
  height:'100%',
  ".img-wrapper": {
    right: 0,
    zIndex: 1,
    bottom: 0,
    width: 380,
    display: "block",
    position: "absolute",
    img: {
      display: "block"
    },
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  [theme.breakpoints.down(375)]: {
    padding: "2rem",
    h2: {
      fontSize: 27
    }
  }
}));
export const BlackBox = styled("div")(({
  theme,
  background
}) => ({
  maxHeight:'650px',
  overflow:'hidden',
  padding: "3rem",
  display: "flex",
  flexDirection:'column',
  color: "white",
  borderRadius: 50,
  position: "relative",
  backgroundColor: background,
  ".img-wrapper": {
    width: 250,
    display: "flex",
    img: {
      alignSelf: "flex-end"
    },
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  ".content": {
    [theme.breakpoints.down("sm")]: {
      paddingInline: "3rem"
    },
    [theme.breakpoints.down(375)]: {
      h2: {
        fontSize: 27
      }
    }
  }
}));