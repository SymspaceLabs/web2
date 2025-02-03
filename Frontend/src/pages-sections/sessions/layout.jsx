"use client";

import { Fragment, useCallback, useState, useMemo } from "react";
import Link from "next/link";
import Image from "../../components/BazaarImage";
import { usePathname } from "next/navigation";
import { Button, Box, Divider } from "@mui/material";
import BoxLink from "./components/box-link";
import LogoWithTitle from "./components/logo-title";
import LoginBottom from "./components/login-bottom";
import { SocialButtons } from "@/components/header/components/SocialButtons";
import { Span } from "../../components/Typography";
import { Wrapper, mainContainerStyle, blurredOverlayStyle1, blurredOverlayStyle2, wrapperStyle, registerButtonStyle, dividerTextStyle } from "./styles";
import NavigationList from "../../components/navbar/nav-list/nav-list";
import { FlexRowCenter } from "../../components/flex-box"; // ==============================================================

export default function AuthLayout({ children }) {
  const pathname = usePathname();
  let BOTTOM_CONTENT = null;
  let TITLE = null;
  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback((fixed) => setIsFixed(fixed), []);
  const HEADER_SLOT = <div><NavigationList /></div>;

  if (pathname === "/signin") {
    BOTTOM_CONTENT = (
      <>
        <SocialButtons />
        <LoginBottom />
      </>
    );
    TITLE = <LogoWithTitle title="Continue your Journey" subTitle="Log in to an existing account using your email" />;
  }

  if (pathname === "/register") {
    BOTTOM_CONTENT = (
      <>
        <SocialButtons />
        <Fragment>
          <Box my={3}>
            <Divider>
              <Span sx={dividerTextStyle}>or</Span>
            </Divider>
          </Box>
          <Button href="/register-partner" fullWidth size="large" sx={registerButtonStyle}>
            Create a business profile
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", gap: 1, pt: 2, pb: 5 }}>
            Already have an account? <BoxLink title="Sign in" href="/signin" />
          </Box>
        </Fragment>
      </>
    );
    TITLE = <LogoWithTitle title="Begin your Journey" subTitle="Create an account using your email" />;
  }

  if (pathname === "/register-partner") {
    BOTTOM_CONTENT = (
      <FlexRowCenter sx={{ fontFamily: 'Helvetica', color: '#fff', flexDirection: 'column' }} gap={1} mt={3}>
        <Box sx={{ pt: 2, pb: 5 }}>
          Already have an account? <BoxLink title="Sign in" href="/signin" />
        </Box>
      </FlexRowCenter>
    );
    TITLE = <LogoWithTitle title="Simulate Reality Together" subTitle="Create an account using your email" />;
  }

  if (pathname === "/register-applicant") {
    BOTTOM_CONTENT = (
      <FlexRowCenter sx={{ fontFamily: 'Helvetica', color: '#fff', flexDirection: 'column' }} gap={1} mt={3}>
        <Box sx={{ pt: 2, pb: 5 }}>
          Already have an account? <BoxLink title="Sign in" href="/signin" />
        </Box>
      </FlexRowCenter>
    );
    TITLE = <LogoWithTitle title="Get started" subTitle="Fill out the form and attach your resume so we can contact you. At Symspace, you can be sure about making positive change." />;
  }

  if (pathname === "/verify-email") {
      BOTTOM_CONTENT = null;
      TITLE = null;
  }

  if (pathname === "/forgot-password") {
    BOTTOM_CONTENT = null;
    TITLE = null;
  }

  if (pathname === "/reset-password") {
    BOTTOM_CONTENT = null;
    TITLE = null;
  }

  // Responsive Card Style
  const cardStyle = {
    zIndex: 1,
    minWidth: { xs: '100%', sm: '100%', md: 600 },
    maxWidth: 600,
    margin: '0 auto',
  };

  const blurredOverlayStyle = useMemo(() => {
    return pathname === "/signin" ? blurredOverlayStyle1 : blurredOverlayStyle2;
  }, [pathname]);

  return (
    <Box sx={{ minHeight:'60rem' }}>
      <Box sx={mainContainerStyle}>
        <Box style={{ zIndex: 2 }}>
          <Link href="/">
            <Image height={45} src="/assets/images/logos/Logo.svg" alt="logo" />
          </Link>
        </Box>
        <Box sx={cardStyle}>
          <Wrapper sx={wrapperStyle}>
            {TITLE}
            {children}
            {BOTTOM_CONTENT}
          </Wrapper>
        </Box>
        <Box sx={blurredOverlayStyle} />
      </Box>
    </Box>
  );
}
