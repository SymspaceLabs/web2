import Card from "@mui/material/Card";
import styled from "@mui/material/styles/styled";
import NavLink from "../../../components/nav-link/nav-link";
export const MainContainer = styled(Card)(({
  theme
}) => ({
  paddingLeft:'25px',
  paddingRight:'25px',
  background: 'linear-gradient(176.84deg, #B7B7B9 -3.62%, #777777 109.48%)',
  boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
  backdropFilter: 'blur(12px)',
  paddingBottom: "1.5rem",
  borderRadius: '15px',
  [theme.breakpoints.down("md")]: {
    boxShadow: "none",
    overflowY: "auto",
    height: "calc(100vh - 64px)"
  }
}));
export const StyledNavLink = styled(NavLink, {
  shouldForwardProp: prop => prop !== "isCurrentPath"
})(({
  theme,
  isCurrentPath
}) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "1px",
  justifyContent: "space-between",
  padding:'18px',
  borderRadius:'50px',
  // borderColor: isCurrentPath ? theme.palette.primary.main : "transparent",
  background: isCurrentPath ? theme.palette.primary.main : "transparent",
  "& .nav-icon": {
    // color: isCurrentPath ? theme.palette.primary.main : theme.palette.grey[600]
    color: 'white'
  },
  "&:hover": {
    // borderColor: theme.palette.primary.main,
    background: theme.palette.primary.main,
    "& .nav-icon": {
      color: 'white'
    }
  }
}));