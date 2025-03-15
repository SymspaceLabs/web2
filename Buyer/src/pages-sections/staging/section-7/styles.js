"use client";

import styled from "@mui/material/styles/styled";
export const RootStyle = styled("div")(({
  theme
}) => (
  {
  minHeight: 300,
  borderRadius: '50px',
  display: "flex",
  overflow: "hidden",
  position: "relative",
  img: {
    objectFit: "cover"
  },
  ".content": {
    top: "40%",
    left: "10%",
    position: "absolute",
    transform: "translateY(-40%)",
    [theme.breakpoints.down("sm")]: {
      top: "50%",
      insetInline: 0,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: "2rem",
      paddingRight: "2rem",
      transform: "translateY(-50%)"
    },
    [theme.breakpoints.down(375)]: {
      h2: {
        fontSize: 24,
        marginTop: 0
      }
    }
  },
  [theme.breakpoints.down(375)]: {
    minHeight: 260
  }
}));