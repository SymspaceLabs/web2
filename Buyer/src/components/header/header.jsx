"use client";

// ==============================================================
// Header - Optimized for Faster Loading Without useMediaQuery
// ==============================================================

import Link from "next/link";
import clsx from "clsx";
import { FlexBox } from "../flex-box";
import { Fragment, Suspense, lazy, useEffect, useState } from "react";
import { HeaderWrapper, StyledContainer } from "./styles";

// Dynamically import MobileHeader (lazy-load for smaller screens)
const MobileHeader = lazy(() =>
  import("./mobile-header").then((mod) => ({ default: mod.MobileHeader }))
);

// Custom hook to detect screen width without MUI's useMediaQuery
const useIsMobile = (breakpoint = 1150) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    checkScreen(); // Initial check
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [breakpoint]);

  return isMobile;
};

export default function Header({
  className,
  midSlot,
  position = "relative",
}) {
  const isMobile = useIsMobile(); // Detect screen size

  // ✅ Preload MobileHeader on idle inside the component (fixes hook error)
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => {
          import("./mobile-header");
        });
      } else {
        setTimeout(() => import("./mobile-header"), 2000);
      }
    }
  }, []);

  const CONTENT_FOR_LARGE_DEVICE = (
    <Fragment>
      <FlexBox minWidth={100} alignItems="center">
        <Link href="/">
          <img
            src="/assets/images/logos/Logo.svg"
            alt="Symspace Logo"
            width={175}
            height={40}
            style={{
              width: "100%",
              maxWidth: 175,
              height: "auto",
              display: "block",
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
        {isMobile ? (
          <Suspense fallback={<div style={{ height: 60 }}></div>}>
            <MobileHeader />
          </Suspense>
        ) : (
          CONTENT_FOR_LARGE_DEVICE
        )}
      </StyledContainer>
    </HeaderWrapper>
  );
}
