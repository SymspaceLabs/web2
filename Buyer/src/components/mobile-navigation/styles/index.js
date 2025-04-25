import Drawer from "@mui/material/Drawer";
import styled from "@mui/material/styles/styled";
import { NavLink } from "../../../components/nav-link";
import { layoutConstant } from "../../../utils/constants"; // STYLED COMPONENTS

const Wrapper = styled("div")(({
  theme
}) => ({
  left: 0,
  right: 0,
  bottom: 0,
  display: "none",
  position: "fixed",
  justifyContent: "space-around",
  zIndex: theme.zIndex.drawer + 1,
  height: layoutConstant.mobileNavHeight,
  "@media only screen and (max-width: 900px)": {
    display: "flex",
    width: "100vw",
    background: 'rgba(40, 40, 40, 0.4)',
    backdropFilter: 'blur(24px)'
  },

  //Glassmorphic Style
  borderRadius: '45.0463px 45.0463px 0px 0px',
  // backdropFilter: 'blur(36.037px)',
  boxShadow: '0px -4px 24px rgba(0, 0, 0, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.3)',
  backgroundBlendMode: 'overlay',
  
}));
const StyledNavLink = styled(NavLink)({
  flex: "1 1 0",
  display: "flex",
  fontSize: "13px",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  fontFamily:'Helvetica'
});
const StyledBox = styled("div")(({
  theme
}) => ({
  flex: "1 1 0",
  display: "flex",
  fontSize: "13px",
  cursor: "pointer",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  transition: "color 150ms ease-in-out",
  "&:hover": {
    color: `${theme.palette.primary.main} !important`
  }
}));
const StyledDrawer = styled(Drawer)(({
  theme
}) => ({
  width: 250,
  zIndex: 1501,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 250,
    boxSizing: "border-box",
    boxShadow: theme.shadows[2]
  }
})); // common icon component style

const iconStyle = {
  display: "flex",
  marginBottom: "4px",
  alignItems: "center",
  justifyContent: "center"
};
export { Wrapper, StyledBox, StyledNavLink, StyledDrawer, iconStyle };