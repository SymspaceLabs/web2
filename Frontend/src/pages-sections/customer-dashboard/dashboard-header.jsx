import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery"; // MUI ICON COMPONENTS

import { Menu } from "@mui/icons-material"; // GLOBAL CUSTOM COMPONENTS

import SideNav from "../../components/side-nav";
import { H2 } from "../../components/Typography";
import FlexBox from "../../components/flex-box/flex-box";
import { Navigation } from "../../components/layouts/customer-dashboard";
import { IconButton, Typography } from "@mui/material"; // STYLED COMPONENT

const StyledBox = styled("div")(({ theme }) => ({
  background: 'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)',
  boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
  backdropFilter: 'blur(12px)',
  borderRadius: '15px 15px 0px 0px',
  padding:'20px',
  borderBottom: '5px solid white',
  display: "flex",
  "& .headerHold": {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-between"
  },
  [theme.breakpoints.up("md")]: {
    "& .sidenav": {
      display: "none"
    }
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column"
  }
}));
// ==============================================================

// ==============================================================
export default function DashboardHeader({
  title,
  buttonText,
  href,
  Icon,
  isEdit=false
}) {
  const isTablet = useMediaQuery(theme => theme.breakpoints.down(1025));
  const HEADER_LINK = <Button href={href} color="primary" LinkComponent={Link} sx={{
    bgcolor: "primary.light",
    px: 4
  }}>
      {buttonText}
    </Button>;
  return (
    <StyledBox>
      <FlexBox mt={2} className="headerHold">
        <FlexBox alignItems="center" gap={1.5}>
          {Icon && <Icon sx={{ color: "white", fontSize: "30px" }} />}

          <Typography color="#fff" fontSize="24px" sx={{ fontFamily:'Elemental End', textTransform:'lowercase' }}>
            {title}
          </Typography>
        </FlexBox>

        <div className="sidenav">
          <SideNav position="left" handler={close => <IconButton onClick={close}>
                <Menu fontSize="small" />
              </IconButton>}>
            <Navigation />
          </SideNav>
        </div>

        {!isTablet && buttonText && !isEdit ? HEADER_LINK : null}
      </FlexBox>

      {isTablet && buttonText ? <Box mt={2}>{HEADER_LINK}</Box> : null}
    </StyledBox>
  );
}