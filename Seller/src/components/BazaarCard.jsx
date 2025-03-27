"use client";

import Card from "@mui/material/Card";
import styled from "@mui/material/styles/styled"; // ===============================================

// ===============================================
const SymCard = styled(Card, {
  shouldForwardProp: prop => prop !== "hoverEffect"
})(({
  theme,
  hoverEffect
}) => ({
  background:'linear-gradient(180deg, rgba(62, 61, 69, 0.48) 0%, rgba(32, 32, 32, 0.64) 100%)',
  color:'#fff',
  overflow: "unset",
  borderRadius: "8px",
  borderColor: "grey.200",
  transition: "all 250ms ease-in-out",
  "&:hover": { ...(hoverEffect && {
      boxShadow: theme.shadows[3],
    })
  }
}));
export default SymCard;