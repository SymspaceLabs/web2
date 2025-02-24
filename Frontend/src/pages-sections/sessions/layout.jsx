"use client";

import Image from "next/image";
import Link from "next/link";
import BoxLink from "./components/box-link";
import LogoWithTitle from "@/components/LogoWithTitle";
import LoginBottom from "./components/login-bottom";
import { usePathname } from "next/navigation";
import { Button, Box, Divider, Typography } from "@mui/material";
import { SocialButtons } from "@/components/header/components/SocialButtons";
import { Span } from "../../components/Typography";
import { mainContainerStyle, blurredOverlayStyle1, blurredOverlayStyle2, wrapperStyle, registerButtonStyle, dividerTextStyle } from "./styles";
import { FlexBox, FlexRowCenter } from "@/components/flex-box"; // ==============================================================
import { LazyImage } from "@/components/lazy-image";

export default function AuthLayout({ children }) {
  const pathname = usePathname();
  let IMAGE = null;
  let TITLE = null;
  let BOTTOM_CONTENT = null;
  let BLURRED_BG = null;

  if (pathname === "/sign-in") {

    TITLE = (
      <LogoWithTitle
        title="Continue your Journey"
        subTitle="Log in to an existing account using your email"
      />
    );

    BOTTOM_CONTENT = (
      <>
        <SocialButtons />
        <LoginBottom />
      </>
    );

    BLURRED_BG = (
      <Box sx={blurredOverlayStyle1} />
    ) 
  }

  if (pathname === "/register") {

    TITLE = (
      <LogoWithTitle
        title="Begin your Journey"
        subTitle="Create an account using your email"
      />
    );

    BOTTOM_CONTENT = (
      <>
        <SocialButtons />
        <Box my={3} width="100%">
          <Divider sx={{ borderColor: '#fff' }}>
              <Span lineHeight={1} px={1} sx={{ color: '#fff' }}>
                  or
              </Span>
          </Divider>
        </Box>

        <Button href="/register-partner" fullWidth size="large" sx={registerButtonStyle}>
          Create a business profile
        </Button>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", gap: 1, pt: 2, pb: 5 }}>
          Already have an account? <BoxLink title="Sign in" href="/sign-in" />
        </Box>
      </>
    );

    BLURRED_BG = (
      <Box sx={blurredOverlayStyle1} />
    ) 
  }

  if (pathname === "/register-partner") {
    TITLE = (
      <LogoWithTitle
        title="Simulate Reality Together"
        subTitle="Create an account using your email"
      />
    );

    BOTTOM_CONTENT = (
      <FlexRowCenter sx={{ fontFamily: 'Helvetica', color: '#fff', flexDirection: 'column' }} gap={1} mt={3}>
        <Box sx={{ pt: 2, pb: 5 }}>
          Already have an account? <BoxLink title="Sign in" href="/sign-in" />
        </Box>
      </FlexRowCenter>
    );

    BLURRED_BG = (
      <Box sx={blurredOverlayStyle2} />
    ) 

  }

  if (pathname === "/register-applicant") {
    BOTTOM_CONTENT = (
      <FlexRowCenter sx={{ fontFamily: 'Helvetica', color: '#fff', flexDirection: 'column' }} gap={1} mt={3}>
        <Box sx={{ pt: 2, pb: 5 }}>
          Already have an account? <BoxLink title="Sign in" href="/sign-in" />
        </Box>
      </FlexRowCenter>
    );
    TITLE = <LogoWithTitle title="Get started" subTitle="Fill out the form and attach your resume so we can contact you. At Symspace, you can be sure about making positive change." />;

  }

  if (pathname === "/verify-email") {

    IMAGE = (
      <LazyImage
        alt="model"
        width={500}
        height={500}
        sx={{ width: "35%" }}
        src="/assets/images/3d-mailbox.png"
      />
    );

    TITLE = (
      <LogoWithTitle
        title="Verify your e-mail to finish signing up"
        subTitle={false}
      />
    );

    BOTTOM_CONTENT = (
      <Typography sx={{ fontFamily:'Helvetica', color:'#FFF', pb:10, pt:5, textAlign:'center', fontSize:{xs:'12px', sm:'14px'} }}>
        Need help? <BoxLink title="Contact Us" href="/contact-us" />
      </Typography>
    )

    BLURRED_BG = (
      <Box sx={blurredOverlayStyle1} />
    ) 
  }
  

  if (pathname === "/forgot-password") {

    IMAGE = (
      <LazyImage
        alt="model"
        width={500}
        height={500}
        sx={{ width: "35%" }}
        src="/assets/images/3d-forgot-password.png"
      />
    );

    TITLE = (
      <LogoWithTitle
        title="Forgot your password?"
        subTitle="No worries! Enter the email address associated with your SYMSPACE account, and we'll send you instructions on how to create a new password."
      />
    );


    BOTTOM_CONTENT = (
      <Typography sx={{ fontFamily:'Helvetica', color:'#FFF', pb:10, pt:5, textAlign:'center', fontSize:{xs:'12px', sm:'14px'} }}>
        Need help? <BoxLink title="Contact Us" href="/contact-us" />
      </Typography>
    )

    BLURRED_BG = (
      <Box sx={blurredOverlayStyle1} />
    ) 


  }

  if (pathname === "/reset-password") {
    BOTTOM_CONTENT = null;
    TITLE = null;
  }

  // Responsive Card Style
  const cardStyle = {
    zIndex: 2,
    px: { xs:3, sm:10 },
    py: { xs:3, sm:8 },
    background: 'rgba(140, 140, 140, 0.3)',
    borderRadius: '50px',
    alignItems: 'center',
    maxWidth:'650px',
    width:'100%' 
  };

  return (
    <FlexBox sx={mainContainerStyle}>
      {/* LOGO */}
      <FlexBox sx={{ zIndex: 2, py:3 }}>
        <Link href="/">
          <Image 
            width={250} 
            height={250} 
            src="/assets/images/logos/Logo.svg" 
            alt="logo"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Link>
      </FlexBox>

      {/* CARD */}
      <FlexBox flexDirection="column" sx={cardStyle}>
        {IMAGE}
        {TITLE}
        {children}
        {BOTTOM_CONTENT}
      </FlexBox>

      {BLURRED_BG}

    </FlexBox>
  );
}
