// ====================================================================
// Mobile Header
// ====================================================================

import { Fragment } from "react";
import { useCart } from "@/hooks/useCart";
import { H1 } from "@/components/Typography";
import { SearchInput } from "@/components/search-box";
import { Box, Drawer, IconButton } from "@mui/material/Box";
import { MobileMenu } from "@/components/navbar/mobile-menu";
import { FlexBetween, FlexBox } from "@/components/flex-box"; // GLOBAL CUSTOM HOOK

import Icon from "@/icons";
import Link from "next/link";
import Image from "@/components/SymImage";
import DialogDrawer from "./dialog-drawer"; // GLOBAL CUSTOM COMPONENTS
import useHeader from "../hooks/use-header";
import Clear from "@mui/icons-material/Clear"; // CUSTOM ICON COMPONENTS
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// ====================================================================

export default function MobileHeader() {
  const {
    state
  } = useCart();
  const {
    dialogOpen,
    sidenavOpen,
    searchBarOpen,
    toggleDialog,
    toggleSearchBar,
    toggleSidenav
  } = useHeader();
  const ICON_STYLE = {
    color: "grey.600",
    fontSize: 20
  };
  return (
    <Fragment>
      <FlexBetween width="100%">
        {/* LEFT CONTENT - NAVIGATION ICON BUTTON */}
        <Box flex={1}>
          <MobileMenu />
        </Box>

        {/* MIDDLE CONTENT - LOGO */}
        <Link href="/">
          <Image height={35} src="/assets/images/logo_without_text.svg" alt="logo" />
        </Link>

        {/* RIGHT CONTENT - LOGIN, CART, SEARCH BUTTON */}
        <FlexBox justifyContent="end" flex={1}>
          <IconButton onClick={toggleSearchBar}>
            <Icon.Search sx={ICON_STYLE} />
          </IconButton>

          <IconButton onClick={toggleDialog}>
            <FavoriteBorderIcon sx={{ color: "grey.600" }} />
          </IconButton>

        </FlexBox>
      </FlexBetween>

      {/* SEARCH FORM DRAWER */}
      <Drawer
        open={searchBarOpen} 
        anchor="top" 
        onClose={toggleSearchBar}
        sx={{ zIndex: 9999 }}
        PaperProps={{
          sx: {
            zIndex: 9999,
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(50px)',
          },
        }}
      >
        <Box width="auto" padding={2} height="100vh">
          <FlexBetween mb={1}>
            <H1
              color="#FFF"
              fontSize={15}
              fontWeight={400}
            >
              Search Symspace
            </H1>

            <IconButton onClick={toggleSearchBar}>
              <Clear />
            </IconButton>
          </FlexBetween>

          {/* CATEGORY BASED SEARCH FORM */}
          <SearchInput />
        </Box>
      </Drawer>

      {/* LOGIN FORM DIALOG AND CART SIDE BAR  */}
      <DialogDrawer
        dialogOpen={dialogOpen}
        sidenavOpen={sidenavOpen}
        toggleDialog={toggleDialog}
        toggleSidenav={toggleSidenav}
      />

    </Fragment>
  );
}