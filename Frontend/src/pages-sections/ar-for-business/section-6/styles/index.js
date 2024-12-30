"use client";

import ButtonBase from "@mui/material/ButtonBase";
import styled from "@mui/material/styles/styled";
export const StyledButton = styled(ButtonBase)(({
  theme
}) => ({
  fontWeight: 600,
  borderRadius: 32,
  padding: ".75rem 2.25rem",
  backgroundColor: theme.palette.grey[800]
}));
export const RootStyle = styled("div")(({
  theme
}) => ({
  borderRadius: 50,
  marginTop: "6rem",
  padding: "1rem",
  position: "relative",
  backgroundImage: "url(/assets/images/background/banner-bg.png)",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "top center",
  ".content": {
    zIndex: 2,
    color: "white",
    paddingLeft: "2rem",
    position: "relative",
    paddingBlock: "2rem",
    p: {
      fontSize: 16,
    },
    h2: {
      fontSize: 48,
      lineHeight: 1.2,
      marginBottom: "1rem",
      fontFamily:'Helvetica',
    },
    [theme.breakpoints.down("md")]: {
      paddingLeft: "3rem"
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "1.5rem",
      h2: {
        fontSize: 36
      }
    },
    [theme.breakpoints.down(375)]: {
      paddingLeft: "1rem",
      h2: {
        fontSize: 30,
        marginBottom: "2rem"
      }
    }
  },
  ".img-wrapper": {
  zIndex: 1,
  right: 10,
  top: '50%',
  transform: 'translateY(-50%)',
  width: "70%",
  display: "flex",
  position: "absolute",
  [theme.breakpoints.down(890)]: {
    display: "none"
  }
}
}));