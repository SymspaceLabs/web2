// =================================================================
// Mobile Header
// =================================================================

import Icon from "@/icons";
import Link from "next/link";
import { Fragment } from "react";
import { Box, IconButton } from "@mui/material";
import Clear from "@mui/icons-material/Clear"; // CUSTOM ICON COMPONENTS
import { SymDialog } from "@/components/custom-dialog";

import useHeader from "../hooks/use-header"; // GLOBAL CUSTOM HOOK
import { H1 } from "@/components/Typography";
import { SymDrawer } from "@/components/custom-drawer";
import { HeaderLogin } from "@/components/header";

import { SearchInput } from "@/components/search-box";
import { MobileMenu } from "@/components/navbar/mobile-menu";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// LOCAL CUSTOM COMPONENTS
import { FlexBetween, FlexBox } from "@/components/flex-box"; 
import { SymImage } from "@/components/custom-components";


export default function MobileHeader() {

  const {
    dialogOpen,
    searchBarOpen,
    toggleDialog,
    toggleSearchBar,
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
          <SymImage height={35} src="/assets/images/logo_without_text.svg" alt="logo" />
        </Link>

        {/* RIGHT CONTENT - LOGIN, CART, SEARCH BUTTON */}
        <FlexBox justifyContent="end" flex={1}>

          {/* SEARCH ICON */}
          <IconButton onClick={toggleSearchBar}>
            <Icon.Search sx={ICON_STYLE} />
          </IconButton>

          {/* FAVOURITE ICON */}
          <IconButton onClick={toggleDialog}>
            <FavoriteBorderIcon sx={{ color: "grey.600" }} />
          </IconButton>

          {/* AVATAR ICON */}
          <HeaderLogin />

        </FlexBox>
      </FlexBetween>

      {/* SEARCH DRAWER */}
      <SymDrawer open={searchBarOpen} toggleOpen={toggleSearchBar} anchor="top">
        <Box width="auto" padding={2} height="100vh">
          <FlexBetween mb={1}>
            <H1 color="#FFF" fontSize={15}>
              Search Symspace
            </H1>
            <IconButton onClick={toggleSearchBar}>
              <Clear />
            </IconButton>
          </FlexBetween>
          <SearchInput />
        </Box>
      </SymDrawer>


      {/* LOGIN FORM DIALOG AND CART SIDE BAR  */}
      <SymDialog dialogOpen={dialogOpen} toggleDialog={toggleDialog} />

    </Fragment>
  );
}