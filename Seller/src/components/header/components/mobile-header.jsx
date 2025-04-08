import Link from "next/link";
import { Fragment } from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton"; // MUI ICON COMPONENT

import Clear from "@mui/icons-material/Clear"; // CUSTOM ICON COMPONENTS

import Icon from "@/icons"; // LOCAL CUSTOM COMPONENTS

import DialogDrawer from "./dialog-drawer"; // GLOBAL CUSTOM COMPONENTS

import Image from "@/components/SymImage";
import { SearchInput } from "@/components/search-box";
import { MobileMenu } from "@/components/navbar/mobile-menu";
import { FlexBetween, FlexBox } from "@/components/flex-box"; // GLOBAL CUSTOM HOOK
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import useCart from "@/hooks/useCart"; // LOCAL CUSTOM HOOK

import useHeader from "../hooks/use-header";
import { Typography } from "@mui/material";
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
            <Typography
              fontFamily="'Elemental End', sans-serif" 
              textTransform="lowercase"
              color="#FFF"
              fontSize={15}
              fontWeight={400}
            >
              Search Symspace
            </Typography>

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