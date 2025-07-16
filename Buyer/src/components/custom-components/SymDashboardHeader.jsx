"use client"

// ==============================================================
// Custom Blue Table Header
// ==============================================================

import SideNav from "@/components/side-nav";
import { Menu } from "@mui/icons-material";
import { H1 } from "@/components/Typography";
import { FlexBox } from "@/components/flex-box";
import { Navigation } from "@/components/layouts/customer-dashboard";
import {
  CircularProgress,
  Box,
  Button,
  useMediaQuery,
  IconButton,
} from "@mui/material";

// ==============================================================

export default function SymDashboardHeader({
  title,
  buttonText,
  Icon,
  onClick,
  loading = false,
}) {
  const isTablet = useMediaQuery("(max-width:1025px)");

  const HEADER_LINK = (
    <Button
      sx={styles.btn}
      onClick={onClick}
      disabled={loading}
    >
      {!loading ? buttonText :
        <CircularProgress size={20} sx={{ color: "white", ml: 1 }} />
      }
    </Button>
  );

  return (
    <Box sx={styles.container}>
      <Box
        className="headerHold"
        sx={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <FlexBox alignItems="center" gap={1.5}>
          {Icon && <Icon sx={{ color: "white", fontSize: "30px" }} />}
          <H1 color="#fff" fontSize="24px">
            {title}
          </H1>
        </FlexBox>

        <Box
          className="sidenav"
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          <SideNav
            mode="dark"
            position="left"
            handler={(close) => (
              <IconButton onClick={close}>
                <Menu fontSize="small" />
              </IconButton>
            )}
          >
            <Navigation />
          </SideNav>
        </Box>

        {/* This button will be hidden on mobile (xs and sm) and shown on md and up */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          {HEADER_LINK}
        </Box>
      </Box>

      {/* Removed the button that was previously shown on tablet/mobile */}
      {/* {isTablet && buttonText ? <Box mt={2}>{HEADER_LINK}</Box> : null} */}
    </Box>
  );
}

const styles = {
  container: {
    background: "linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)",
    boxShadow: "0px 1px 24px -1px rgba(0, 0, 0, 0.18)",
    backdropFilter: "blur(12px)",
    borderRadius: "15px 15px 0px 0px",
    padding: "20px",
    borderBottom: "5px solid white",
    display: "flex",
    flexDirection: "column",
  },
  btn: {
    background: "linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)",
    color: "#FFF",
    px: 4,
    border: "3px solid #FFF",
    borderRadius: "12px",
    "&:hover": {
      background: "linear-gradient(94.44deg, #666666 29%, #000000 100%)",
    },
  },
};