import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import styled from "@mui/material/styles/styled";
import InputBase from "@mui/material/InputBase";
import FlexRowCenter from "../../../../components/flex-box/flex-row-center";
export const DashboardNavbarRoot = styled(AppBar)(({
  theme
}) => ({
  zIndex: 11,
  boxShadow: theme.shadows[2],
  color: theme.palette.text.primary,
  background:'linear-gradient(180deg, rgba(62, 61, 69, 0.48) 0%, rgba(32, 32, 32, 0.64) 100%)',
  marginTop:"1rem",
  borderRadius: '15px 15px 0 0', overflow:'hidden', 
  // boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
  backdropFilter:' blur(12px)',
}));
export const StyledToolBar = styled(Toolbar)({
  "@media (min-width: 0px)": {
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: "auto"
  }
});
export const ToggleWrapper = styled(FlexRowCenter)(({
  theme
}) => ({
  width: 40,
  height: 40,
  flexShrink: 0,
  display: "none",
  cursor: "pointer",
  borderRadius: "8px",
  backgroundColor: theme.palette.grey[100],
  [theme.breakpoints.down("lg")]: {
    display: "flex"
  }
}));
export const CustomButton = styled(Button)(({
  theme
}) => ({
  minHeight: 40,
  flexShrink: 0,
  marginLeft: 16,
  padding: "0 20px",
  borderRadius: "8px",
  backgroundColor: theme.palette.grey[100],
  [theme.breakpoints.down("xs")]: {
    display: "none"
  }
}));
export const StyledInputBase = styled(InputBase)(({
  theme
}) => ({
  width: 200,
  padding: "5px 10px",
  borderRadius: "8px",
  color: theme.palette.grey[500],
  backgroundColor: theme.palette.grey[100],
  [theme.breakpoints.down("md")]: {
    display: "none"
  }
}));