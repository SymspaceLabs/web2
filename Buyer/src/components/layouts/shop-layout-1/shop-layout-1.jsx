"use client";

// ==============================================================
// Shop Layout 1 - Optimized for Faster Loading
// ==============================================================

import { Box, Card, useTheme } from "@mui/material";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { usePathname } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { FlexBox } from "@/components/flex-box";
import { useAuth } from "@/contexts/AuthContext";
import { SearchInput } from "@/components/search-box";
import { Fragment, useCallback, useState, useEffect, Suspense, lazy } from "react";
import { HeaderProvider, useHeader } from "@/components/header/hooks/use-header";

import Sticky from "@/components/sticky"; // Re-added Sticky
import Header from "@/components/header"; // This is the old Header, we're recreating it here.
import LogoWithTitle from "@/components/LogoWithTitle";
import NavigationList from "@/components/navbar/nav-list/nav-list";
import LoginCartButtons from "@/components/header/components/login-cart-buttons";
import SimpleHeader from "@/components/SimpleHeader";

// Dynamically import components that are not always immediately visible
const MiniCart = lazy(() => import("@/components/mini-cart").then(mod => ({ default: mod.MiniCart })));
const MiniFavorite = lazy(() => import("@/components/favourites").then(mod => ({ default: mod.MiniFavorite })));
const SymDrawer = lazy(() => import("@/components/custom-components/SymDrawer").then(mod => ({ default: mod.default })));
const LoginBottom = lazy(() => import("@/pages-sections/sessions/components").then(mod => ({ default: mod.LoginBottom })));
const LoginPageView = lazy(() => import("@/pages-sections/sessions/page-view").then(mod => ({ default: mod.LoginPageView })));
const MobileNavigationBar = lazy(() => import("@/components/mobile-navigation").then(mod => ({ default: mod.MobileNavigationBar })));
const SocialButtons = lazy(() => import("@/components/header/components/SocialButtons").then(mod => ({ default: mod.SocialButtons })));
const SymDialog = lazy(() => import("@/components/custom-components/SymDialog").then(mod => ({ default: mod.default })));
const OnboardingDialog = lazy(() => import("@/components/custom-dialog/OnboardingDialog").then(mod => ({ default: mod.default })));

// ==============================================================

export default function ShopLayout1({ children, noFooter = false }) {
  return (
    <HeaderProvider>
      <ShopLayoutContent children={children} noFooter={noFooter} />
    </HeaderProvider>
  );
}

function ShopLayoutContent({ children, noFooter }) {
  const pathname = usePathname();
  const theme = useTheme();

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 960); // match MUI md breakpoint
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const { isAuthenticated, user } = useAuth();

  const [isFixed, setIsFixed] = useState(false); // Re-added isFixed state
  const [showPopup, setShowPopup] = useState(false);

  const toggleIsFixed = useCallback(fixed => setIsFixed(fixed), []); // Re-added toggleIsFixed callback


  const {
    dialogOpen,
    toggleDialog,
    cartOpen,
    toggleCartOpen,
    favouriteOpen,
    toggleFavouriteOpen
  } = useHeader();

  // Re-define HEADER_SLOT for the recreated Header's midSlot
  const HEADER_SLOT = (
    <FlexBox width="90%" alignItems="center" justifyContent="space-between" gap={5}>
      <NavigationList />
      <SearchInput btn={false} mxWidth="350px" />
      <LoginCartButtons
        toggleDialog={toggleDialog}
        toggleCartOpen={toggleCartOpen}
        toggleFavouriteOpen={toggleFavouriteOpen}
      />
    </FlexBox>
  );

  // Open Onboarding Form Only When User Hasn't Filled the Onboarding Form
  // and when they're in /Marketplace
  useEffect(() => {
    const isDialogClosed = localStorage.getItem("onboardingDialogClosed");

    if (
      pathname === "/marketplace" &&
      isAuthenticated &&
      !user?.isOnboardingFormFilled &&
      isDialogClosed !== "true"
    ) {
      setShowPopup(true);
    }
  }, [user?.isOnboardingFormFilled, isAuthenticated, pathname]);

  const handleClose = () => {
    setShowPopup(false);
    localStorage.setItem("onboardingDialogClosed", "true");
  };

  return (
    <Fragment>
      {/* TOP HEADER || Category Navbar */}
      <Sticky fixedOn={0} onSticky={toggleIsFixed} sx={{ zIndex: 100 }}>
        <Header isFixed={isFixed} midSlot={HEADER_SLOT} />
        <Navbar />
      </Sticky>

      {/* TOP HEADER || Category Navbar */}
      {/* <SimpleHeader /> */}
      
      {/* BODY CONTENT */}
      {children}

      {/* BOTTOM NAVBAR - MOBILE */}
      <Suspense fallback={null}>
        <MobileNavigationBar />
      </Suspense>


      {/* LOGIN DIALOG - Only show when user is NOT authenticated and dialog is open */}
      {!isAuthenticated && dialogOpen && ( // Only render if dialogOpen is true to lazy load
        <Suspense fallback={null}>
          <SymDialog dialogOpen={dialogOpen} toggleDialog={toggleDialog}>
            <Box sx={{ width: '100%', maxWidth: 580, height: { xs: 650, sm: 800 }, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'inline-flex' }}>
              <Box sx={{ width: '100%', alignSelf: 'stretch', flex: '1 1 0', position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', textAlign: 'center' }}>
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
        </Suspense>
      )}

      {/* BUYER ONBOARDING DIALOG */}
      {/* Wrap with Suspense to lazy load OnboardingDialog */}
      {showPopup && (
        <Suspense fallback={null}>
          <OnboardingDialog
            open={showPopup}
            onClose={handleClose}
            user={user}
          />
        </Suspense>
      )}

      {/* SHOPPING CART SIDE DRAWER */}
      {/* Wrap with Suspense to lazy load SymDrawer and MiniCart */}
      {cartOpen && ( // Only render if cartOpen is true to lazy load
        <Suspense fallback={null}>
          <SymDrawer open={cartOpen} toggleOpen={toggleCartOpen}>
            <MiniCart
              toggleSidenav={toggleCartOpen}
            />
          </SymDrawer>
        </Suspense>
      )}

      {/* FAVOURITES SIDE DRAWER - ONLY RENDER ON DESKTOP */}
      {isDesktop && favouriteOpen && ( // Only render if favouriteOpen is true to lazy load
        <Suspense fallback={null}>
          <SymDrawer open={favouriteOpen} toggleOpen={toggleFavouriteOpen}>
            <MiniFavorite
              toggleSidenav={toggleFavouriteOpen}
            />
          </SymDrawer>
        </Suspense>
      )}

      {/* Footer Component - Can be lazy loaded if not always needed */}
      {!noFooter && (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}

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
    padding: "2rem 2rem",
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