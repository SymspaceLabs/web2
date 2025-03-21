// =================================================================
// Mobile Header
// =================================================================

import Link from "next/link";
import { Fragment } from "react";
import { Box, IconButton } from "@mui/material";
import Clear from "@mui/icons-material/Clear"; // CUSTOM ICON COMPONENTS
import Icon from "@/icons"; // LOCAL CUSTOM COMPONENTS
import { SymDialog } from "@/components/custom-dialog";

import Image from "@/components/BazaarImage";
import { SearchInput } from "@/components/search-box";
import { MobileMenu } from "@/components/navbar/mobile-menu";
import { FlexBetween, FlexBox } from "@/components/flex-box"; // GLOBAL CUSTOM HOOK
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import useHeader from "../hooks/use-header";
import { H1 } from "@/components/Typography";
import { SymDrawer } from "@/components/custom-drawer";

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

// import Link from "next/link";
// import Image from "next/image";
// import Box from "@mui/material/Box";

// GLOBAL CUSTOM COMPONENTS
// import { FlexBetween, FlexBox } from "components/flex-box";

// export default function MobileHeader({children}) {
//   return <FlexBetween width="100%">{children}</FlexBetween>;
// }

// MobileHeader.Left = ({
//   children
// }) => {
//   return <Box flex={1}>{children}</Box>;
// };
// MobileHeader.Logo = ({
//   logoUrl
// }) => {
//   return <Link href="/">
//       <Image width={60} height={44} src={logoUrl} alt="logo" />
//     </Link>;
// };
// MobileHeader.Right = ({
//   children
// }) => {
//   return <FlexBox justifyContent="end" flex={1}>
//       {children}
//     </FlexBox>;
// };