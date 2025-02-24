import { Box, useMediaQuery} from '@mui/material';
import { FlexBox } from "../flex-box";
import { LazyImage } from "../lazy-image";
import { Fragment } from "react";
import { HeaderWrapper, StyledContainer } from "./styles"; 
import Link from "next/link";
import useTheme from "@mui/material/styles/useTheme";
import clsx from "clsx";
import useHeader from "./hooks/use-header";
import MobileHeader from "./components/mobile-header";
import DialogDrawer from "./components/dialog-drawer";
import LoginCartButtons from "./components/login-cart-buttons";

// ==============================================================
export default function Header({
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