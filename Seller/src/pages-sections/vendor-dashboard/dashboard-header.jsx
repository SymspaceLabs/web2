"use client"

// ==============================================================
// Blue Table Header
// ==============================================================

import Link from "next/link";
import SideNav from "@/components/side-nav";

import { Menu } from "@mui/icons-material";
import { H1 } from "@/components/Typography";
import { styled } from "@mui/material/styles";
import { FlexBox } from "@/components/flex-box";
import { Navigation } from "@/components/layouts/customer-dashboard";
import { Box, Button, useMediaQuery, IconButton } from "@mui/material";

// ==============================================================

export default function DashboardHeader({
  title,
  buttonText,
  href,
  Icon,
  isEdit=false,
  handleSave
}) {
  const isTablet = useMediaQuery(theme => theme.breakpoints.down(1025));
  const HEADER_LINK = (
    <Button
      sx={styles.btn}
      href={isEdit ? undefined : href}
      LinkComponent={isEdit ? undefined : Link}
      onClick={isEdit ? handleSave : undefined}
    >
      {buttonText}
    </Button>
  );
  return (
    <StyledBox>
      <FlexBox className="headerHold">
        <FlexBox alignItems="center" gap={1.5}>
          {Icon && <Icon sx={{ color: "white", fontSize: "30px" }} />}

          <H1 color="#fff" fontSize="24px">
            {title}
          </H1>
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


const styles = {
    btn : {
      background: 'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)',
      color:"#FFF",
      px: 4,
      border: '3px solid #FFF',
      borderRadius: '12px',
      '&:hover' : {
        background: 'linear-gradient(94.44deg, #666666 29%, #000000 100%)'
      }
    }
}