"use client";

import Grid from "@mui/material/Grid";
import styled from "@mui/material/styles/styled";
export const StyledGrid = styled(Grid)(({ theme }) => ({
  borderRadius: 8,
  alignItems: "center",
  display: "flex",
  flexDirection: "row", // Default

  [theme.breakpoints.down("sm")]: {
    gap: 24,
    flexDirection: "column", // Avoid reverse unless needed
  },

  [theme.breakpoints.between("sm", "lg")]: {
    "& .grid-2": {
      display: "none"
    }
  }
}));
