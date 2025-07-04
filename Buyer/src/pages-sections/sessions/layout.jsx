"use client";

// ==============================================
// Authentication Layout Component
// ==============================================

import Image from "next/image";
import Link from "next/link";
import BoxLink from "./components/box-link";
import LogoWithTitle from "@/components/LogoWithTitle";
import LoginBottom from "./components/login-bottom";
import { styles } from "./styles";
import { usePathname } from "next/navigation";
import { Span } from "@/components/Typography";
import { LazyImage } from "@/components/lazy-image";
import { FlexBox, FlexRowCenter } from "@/components/flex-box";
import { Button, Box, Divider, Typography } from "@mui/material";
import { SocialButtons } from "@/components/header/components/SocialButtons";

// ==============================================================

export default function AuthLayout({ children }) {
  const pathname = usePathname();
  let IMAGE = null;
  let TITLE = null;
  let BOTTOM_CONTENT = null;
  let BLURRED_BG = null;

  // Sign in page
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
      <Box sx={styles.blurredOverlay1} />
    ) 
  }

  // Registration page
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

        <Button href={`${process.env.NEXT_PUBLIC_SELLER_URL}/register`} target="_blank" fullWidth size="large" sx={styles.registerButton}>
          Create a business profile
        </Button>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", gap: 1, pt: 2, pb: 5 }}>
          Already have an account? <BoxLink title="Sign in" href="/sign-in" />
        </Box>
      </>
    );

    BLURRED_BG = (
      <Box sx={styles.blurredOverlay1} />
    ) 
  }

  // Partner registration page
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
      <Box sx={styles.blurredOverlay2} />
    ) 

  }

  // Applicant registration page
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

  // Email verification page
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
      <Box sx={styles.blurredOverlay1} />
    ) 
  }

  // OTP
  if (pathname === "/otp" || pathname === '/otp-forgot-password') {

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
        title="check your email"
        subTitle='You’re almost there! Enter the 6-digit code we just sent to your email to continue. If you don’t see it, you may need to check your spam folder.'
      />
    );

    BOTTOM_CONTENT = (
      <Typography sx={{ fontFamily:'Helvetica', color:'#FFF', pb:10, pt:5, textAlign:'center', fontSize:{xs:'12px', sm:'14px'} }}>
        Need help? <BoxLink title="Contact Us" href="/contact-us" />
      </Typography>
    )

    BLURRED_BG = (
      <Box sx={styles.blurredOverlay1} />
    ) 
  }
  

  // Forgot password page
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
      <Box sx={styles.blurredOverlay1} />
    ) 


  }

  // Reset password page
  if (pathname === "/reset-password") {

    IMAGE = (
      <LazyImage
        alt="model"
        width={500}
        height={500}
        sx={{ width: "35%" }}
        src="/assets/images/3d-reset-password.png"
      />
    );

    TITLE = (
      <LogoWithTitle
        title="Reset Password"
        subTitle="Enter a new password"
      />
    );

    BOTTOM_CONTENT = (
      <Typography sx={{ fontFamily:'Helvetica', color:'#FFF', pb:10, pt:5, textAlign:'center', fontSize:{xs:'12px', sm:'14px'} }}>
        Need help? <BoxLink title="Contact Us" href="/contact-us" />
      </Typography>
    )

    BLURRED_BG = (
      <Box sx={styles.blurredOverlay1} />
    ) 

  }

  // Responsive Card Style

  return (
    <FlexBox sx={styles.mainContainer}>
      {/* LOGO */}
      <FlexBox sx={{ zIndex: 2, py:3, minHeight : 50 }}>
        <Link href="/">
          <img 
            src="/assets/images/logos/Logo.svg" 
            alt="logo" 
            style={{ width: "100%", width: 250, height: "auto" }}
          />
        </Link>
      </FlexBox>

      {/* CARD */}
      <FlexBox flexDirection="column" sx={styles.cardStyle}>
        {IMAGE}
        {TITLE}
        {children}
        {BOTTOM_CONTENT}
      </FlexBox>

      {BLURRED_BG}

    </FlexBox>
  );
}
