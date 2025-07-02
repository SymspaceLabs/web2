
import Link from "next/link";
import clsx from "clsx";
import { useMediaQuery} from '@mui/material';
import { FlexBox } from "../flex-box";
import { LazyImage } from "../lazy-image";
import { Fragment } from "react";
import { MobileHeader } from './mobile-header';
import useTheme from "@mui/material/styles/useTheme";
import { HeaderWrapper, StyledContainer } from "./styles"; 

// ==============================================================
export default function Header({
  className,
  midSlot,
  position="relative",
  
}) {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down(1150));

  const CONTENT_FOR_LARGE_DEVICE = (
    <Fragment>
      <FlexBox minWidth={100} alignItems="center">
        <Link href="/">
          <img 
            src="/assets/images/logos/Logo.svg" 
            alt="logo" 
            style={{ 
              width: "100%",
              width: 175,
              height: "auto"
            }}
          />
        </Link>
      </FlexBox>
      <FlexBox justifyContent="flex-end" alignItems="center" width="90%">
        {midSlot}
      </FlexBox>
    </Fragment>
  );
    
  return (
    <HeaderWrapper position={position} className={clsx(className)}>
      <StyledContainer>
        {downMd ? <MobileHeader /> : CONTENT_FOR_LARGE_DEVICE}
      </StyledContainer>
    </HeaderWrapper>
  );
}