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
    background: 'rgba(255, 255, 255, 0.5)',
  },

  //Glassmorphic Style
  borderRadius: '45.0463px 45.0463px 0px 0px',
  backdropFilter: 'blur(36.037px)',
  boxShadow: '0px -4.50463px 27.0278px rgba(41, 39, 130, 0.1), inset 0px 0.900926px 0.450463px rgba(255, 255, 255, 0.5)',
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