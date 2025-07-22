"use client";

// ==============================================================
// Header - Optimized for Faster Loading
// ==============================================================

import Link from "next/link";
import clsx from "clsx";
import { useMediaQuery } from '@mui/material'; // useMediaQuery is fine here, as it's essential for responsive header
import { FlexBox } from "../flex-box";
import { Fragment, Suspense, lazy } from "react"; // Added Suspense and lazy
import useTheme from "@mui/material/styles/useTheme";
import { HeaderWrapper, StyledContainer } from "./styles"; // Ensure these styles are efficient

// Dynamically import MobileHeader as it's only rendered on smaller screens.
// This prevents its code from being part of the initial bundle for desktop users.
const MobileHeader = lazy(() => import('./mobile-header').then(mod => ({ default: mod.MobileHeader })));

// You might also consider lazy loading NavigationList and SearchInput if they are very heavy
// and not immediately critical for the *initial* render of the header on desktop.
// However, for a header, these are often considered critical, so it depends on their size.
// For now, we'll assume they are lightweight enough for direct import.
// If they are heavy, you would apply the same lazy loading pattern:
// const NavigationList = lazy(() => import("@/components/navbar/nav-list/nav-list"));
// const SearchInput = lazy(() => import("@/components/search-box"));


// ==============================================================
export default function Header({
  className,
  midSlot,
  position = "relative",
}) {
  const theme = useTheme();
  // Use a more specific breakpoint if 1150 is not a standard MUI breakpoint
  // For example, theme.breakpoints.down('md') or theme.breakpoints.down('lg')
  const downMd = useMediaQuery(theme.breakpoints.down(1150)); 

  const CONTENT_FOR_LARGE_DEVICE = (
    <Fragment>
      <FlexBox minWidth={100} alignItems="center">
        <Link href="/">
          {/* Image Optimization:
              - Use explicit width and height for CLS prevention.
              - SVG is generally good, but ensure it's optimized (minified).
              - If it were a raster image, you'd use LazyImage with WebP and srcset.
              - For a logo, it's often critical, so it might not be lazy-loaded.
          */}
          <img
            src="/assets/images/logos/Logo.svg"
            alt="Symspace Logo" // More descriptive alt text
            width={175} // Explicit width
            height={40} // Approximate height based on width for CLS (adjust as needed)
            style={{
              width: "100%", // Ensures responsiveness within its container
              maxWidth: 175, // Ensures it doesn't grow beyond its intended size
              height: "auto"
            }}
          />
        </Link>
      </FlexBox>
      <FlexBox justifyContent="flex-end" alignItems="center" width="90%">
        {midSlot} {/* Content passed from ShopLayout1, optimize there */}
      </FlexBox>
    </Fragment>
  );

  return (
    <HeaderWrapper position={position} className={clsx(className)}>
      <StyledContainer>
        {/* Conditionally render MobileHeader with Suspense for lazy loading */}
        {downMd ? (
          <Suspense fallback={null}> {/* Show nothing while MobileHeader loads */}
            <MobileHeader />
          </Suspense>
        ) : (
          CONTENT_FOR_LARGE_DEVICE
        )}
      </StyledContainer>
    </HeaderWrapper>
  );
}
