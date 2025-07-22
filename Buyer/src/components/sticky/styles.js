import { keyframes, styled } from "@mui/material/styles";

// ==============================================================
// StyledBox - Adjusted for Z-Index Prop Consumption
// ==============================================================
const slideDown = keyframes`
    from {transform: translateY(-200%)}
    to {transform: translateY(0)}
`;

export const StyledBox = styled("div", {
  shouldForwardProp: prop => prop !== "componentHeight" && prop !== "fixed" && prop !== "fixedOn" && prop !== "zIndex" // Add zIndex to prevent it from being forwarded to the DOM
})(({
  theme,
  componentHeight,
  fixedOn,
  fixed,
  zIndex // Destructure zIndex prop here
}) => ({
  paddingTop: fixed ? componentHeight : 0,
  "& .hold": {
    zIndex: 5,
    boxShadow: "none",
    position: "relative"
  },
  "& .fixed": {
    left: 0,
    right: 0,
    zIndex: zIndex || 100, // Use the zIndex prop passed from Sticky, or a default low value
    position: "fixed",
    top: `${fixedOn}px`,
    boxShadow: theme.shadows[2],
    transition: "all 350ms ease-in-out",
    animation: `${slideDown} 400ms ${theme.transitions.easing.easeInOut}`
  }
}));
