// =================================================================
// Mobile Header
// =================================================================

import Icon from "@/icons";
import Link from "next/link";
import useHeader from "../hooks/use-header"; // GLOBAL CUSTOM HOOK
import Clear from "@mui/icons-material/Clear"; // CUSTOM ICON COMPONENTS
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { Fragment } from "react";
import { H1 } from "@/components/Typography";
import { HeaderLogin } from "@/components/header";
import { Box, IconButton, Card } from "@mui/material";
import { SearchInput } from "@/components/search-box";
import { SymDialog, SymDrawer, SymImage } from "@/components/custom-components";
import { MobileMenu } from "@/components/navbar/mobile-menu";
import { styled } from '@mui/material/styles';

// LOCAL CUSTOM COMPONENTS
import { FlexBetween, FlexBox } from "@/components/flex-box"; 

import { LogoWithTitle } from "@/components";
import { SocialButtons } from "../components/SocialButtons";
import { LoginBottom } from "@/pages-sections/sessions/components";
import { LoginPageView } from "@/pages-sections/sessions/page-view";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import { useFavorites } from "@/contexts/FavoritesContext";
import MiniCartItem from "@/components/favourites/components/cart-item";
import EmptyCartView from "@/components/favourites/components/empty-view";
import Scrollbar from "@/components/scrollbar"; // CUSTOM UTILS LIBRARY FUNCTION

export default function MobileHeader() {

    const { state: favState } = useFavorites();
  

  const {
    searchBarOpen,
    toggleSearchBar,
    dialogOpen,
    toggleDialog,
    favouriteOpen,
    toggleFavouriteOpen
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
          <IconButton onClick={toggleFavouriteOpen}>
            <FavoriteBorderIcon sx={{ color: "grey.600" }} />
          </IconButton>

          {/* AVATAR ICON */}
          <IconButton onClick={toggleDialog}>
            <AccountCircleOutlined sx={{color: "grey.600"}} />
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
              <Clear sx={{color: "#FFF"}} />
            </IconButton>
          </FlexBetween>
          <SearchInput />
        </Box>
      </SymDrawer>

      {/* Favourites DRAWER */}
      <SymDrawer open={favouriteOpen} toggleOpen={toggleFavouriteOpen} anchor="top">
        <Box width="auto" padding={2} height="100vh">
          <FlexBetween mb={1}>
            <H1 color="#FFF" fontSize={15}>
              Favorites
            </H1>
            <IconButton onClick={toggleFavouriteOpen}>
              <Clear sx={{color: "#FFF"}}/>
            </IconButton>
          </FlexBetween>
          {/* CART ITEM LIST */}
          <Box height={`calc(100vh - ${favState.favorites.length ? "207px" : "75px"})`}>
            {favState.favorites.length > 0 ? <Scrollbar>
              {favState.favorites.map(item => (
                <MiniCartItem
                  item={item}
                  key={item.id}
                />
              ))}
              </Scrollbar> : <EmptyCartView />}
          </Box>
        </Box>
      </SymDrawer>

      {/* LOGIN FORM DIALOG AND CART SIDE BAR  */}
      <SymDialog dialogOpen={dialogOpen} toggleDialog={toggleDialog}>
        <Box sx={{ width: '100%', maxWidth: 580, height: {xs:650, sm:800}, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'inline-flex' }}>
          <Box sx={{ width: '100%', alignSelf: 'stretch',  flex: '1 1 0', position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', textAlign: 'center'}}>
              <Wrapper>
                <LogoWithTitle title="Continue your Journey" subTitle="Log in to an existing account using your email" />
                <LoginPageView closeDialog={toggleDialog} />
                <SocialButtons />
                <LoginBottom />
              </Wrapper>
            </Box>
          </Box>
        </Box>
      </SymDialog>
    </Fragment>
  );
}


const fbStyle = {
  background: "#3B5998",
  color: "white"
};
const googleStyle = {
  background: "#4285F4",
  color: "white"
};

const Wrapper = styled(Card)(({ theme }) => ({
  padding: "2rem 3rem",
  background: 'transparent',

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: "2rem 2rem", // Mobile-specific padding
  },
  ".facebookButton": {
    marginBottom: 10,
    ...fbStyle,
    "&:hover": fbStyle,
  },
  ".googleButton": {
    ...googleStyle,
    "&:hover": googleStyle,
  },
  ".agreement": {
    marginTop: 12,
    marginBottom: 24,
  },
}));