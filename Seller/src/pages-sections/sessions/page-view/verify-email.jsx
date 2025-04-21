"use client";

// ===============================================================
// Verify Email Page
// ===============================================================

import { FlexBox } from "@/components/flex-box"; // Import custom FlexBox component
import { Button, Typography } from "@mui/material"; // Import Material-UI components
import { Paragraph } from "@/components/Typography";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useSearchParams, useRouter } from "next/navigation"; // Import Next.js navigation hooks

// ===============================================================

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userEmail = searchParams.get("email") || "your email"; // Get the user's email from query params
  const { showSnackbar } = useSnackbar();

  // Handles resending of the verification email
  const handleResend = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle error response
        showSnackbar(data.message, "error");
      } else {
        // Handle success
        showSnackbar(data.message, "error");
      }
    } catch (error) {
      // Handle network or other unexpected errors
      showSnackbar(data.message, "error");
    } 
  };

  // Navigates the user back to the main site
  const handleGoToSite = () => {
    router.push("/");
  };

  return (
    <FlexBox flexDirection="column" sx={{ width:'100%', gap:{xs:2, sm:3}, py:{xs:1, sm:2} }}>
      {/* Additional instructions */}
      <Paragraph sx={{ textAlign: "center", color: "#fff", fontSize: {xs:10, sm:14}, maxWidth:'750px' }}>
        You’re almost there! We sent an email with your verification link to{" "}
        {userEmail}
      </Paragraph>
      <Paragraph sx={{ textAlign: "center", color: "#fff", fontSize: {xs:10, sm:14}, maxWidth:'750px' }}>
        Click on the link in that email to complete the verification process.
        If you don’t see it, you may need to check your spam folder.
      </Paragraph>

      {/* Action buttons for resending email or returning to the site */}
      <FlexBox
        sx={{
          justifyContent: "space-between",
          gap: 2,
          width: "100%",
          flexDirection: { xs: "column", sm: "row" },
          pt: { xs: 2, sm: 5 },
        }}
      >
        <Button onClick={handleResend} sx={styles.btn}>
          Resend Email
        </Button>
        <Button
          onClick={handleGoToSite}
          sx={{
            fontSize: '16px',
            fontWeight: 500,
            background: "transparent",
            border: "2px solid black",
            color: "#000",
            width: "100%",
            py: 2,
            borderRadius: '12px',
            ":hover": {
              background: "#fff",
              color: "#000",
            },
          }}
        >
          Return to site
        </Button>
      </FlexBox>

    </FlexBox>
  );
};

export default VerifyEmailPage;

const styles = {
    btn : {
      fontSize: '16px',
      fontWeight: 500,
      background: "#000",
      color: "#fff",
      width: "100%",
      border: "2px solid transparent",
      py: 1,
      borderRadius: '12px',
      ":hover": {
        background: "#fff",
        color: "#000",
        border: "2px solid black",
      },
    }
  };
