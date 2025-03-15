import styled from "@mui/material/styles/styled";
// styled component
export const StyledRoot = styled("div", {
  shouldForwardProp: prop => prop !== "position" && prop !== "open"
})(({
  theme,
  position,
  open
}) => ({
  left: 0,
  zIndex: 98,
  right: "auto",
  borderRadius: 15,
  padding: "0.5rem 0px",
  transformOrigin: "top",
  boxShadow: theme.shadows[2],
  position: position || "unset",
  transition: "all 250ms ease-in-out",
  transform: open ? "scaleY(1)" : "scaleY(0)",
  // backgroundColor: theme.palette.background.paper,
  top: position === "absolute" ? "calc(100% + 0.7rem)" : "0.5rem",
  backgroundColor: '#3B3B3B',
  fontFamily:'Elemental End',
  textTransform:'lowercase',
  color:'#fff',
  border:'1px solid white'
}));