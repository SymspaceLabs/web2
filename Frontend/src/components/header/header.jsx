import Link from "next/link";
import { Fragment } from "react";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import clsx from "clsx"; // LOCAL CUSTOM HOOKS
import useHeader from "./hooks/use-header"; // GLOBAL CUSTOM COMPONENTS
import LazyImage from "../LazyImage";
import FlexBox from "../flex-box/flex-box"; // LOCAL CUSTOM COMPONENTS
import MobileHeader from "./components/mobile-header";
import DialogDrawer from "./components/dialog-drawer";
import CategoriesMenu from "./components/categories-menu";
import LoginCartButtons from "./components/login-cart-buttons"; // STYLED COMPONENTS
import { Box } from '@mui/material';

import { HeaderWrapper, StyledContainer } from "./styles"; // ==============================================================

// ==============================================================
export default function Header({
  isFixed,
  className,
  midSlot,
  position="relative",
  showLoginButtons = true
}) {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down(1150));
  const {
    dialogOpen,
    sidenavOpen,
    toggleDialog,
    toggleSidenav
  } = useHeader();
  const CONTENT_FOR_LARGE_DEVICE = <Fragment>

      <FlexBox minWidth={100} alignItems="center">
        <Link href="/">
          <LazyImage src={require("../../../public/assets/images/logos/Logo.svg")} alt="logo" />
        </Link>
        {/* {isFixed ? <CategoriesMenu /> : null} */}
      </FlexBox>

      {midSlot}

      {showLoginButtons? 
        <LoginCartButtons toggleDialog={toggleDialog} toggleSidenav={toggleSidenav} />
        :
        <Box></Box>
      }
      <DialogDrawer dialogOpen={dialogOpen} sidenavOpen={sidenavOpen} toggleDialog={toggleDialog} toggleSidenav={toggleSidenav} />
    </Fragment>;
    
  return <HeaderWrapper position={position} className={clsx(className)}>
      <StyledContainer>{downMd ? <MobileHeader /> : CONTENT_FOR_LARGE_DEVICE}</StyledContainer>
    </HeaderWrapper>;
}