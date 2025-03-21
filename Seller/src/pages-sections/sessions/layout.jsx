"use client";

/**
 * Authentication Layout Component
 *
 * This component dynamically renders different authentication pages based on the current route.
 * It customizes the UI for login, registration, password recovery, and email verification.
 *
 */

import Image from "next/image";
import Link from "next/link";
import BoxLink from "../../components/BoxLink";
import LoginBottom from "./components/login-bottom";
import { styles } from "./styles";
import { usePathname } from "next/navigation";
import { LazyImage } from "../../components/lazy-image";
import { FlexBox, FlexRowCenter } from "../../components/flex-box";
import { Box, Typography } from "@mui/material";
import LogoWithTitle from "../../components/LogoWithTitle";

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
        <LoginBottom />
      </>
    );

    BLURRED_BG = (
      <Box sx={styles.blurredOverlay1} />
    ) 
  }

  // Partner registration page
  if (pathname === "/register") {
    TITLE = (
      <LogoWithTitle subTitle="Create an account using your email">
        Simulate Reality Together
      </LogoWithTitle>
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
        src="/assets/images/auth/3d-mailbox.png"
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
