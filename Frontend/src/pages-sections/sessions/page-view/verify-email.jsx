"use client";

/**
 * VerifyEmailPage Component
 * 
 * This component renders a verification page that informs the user about a verification email
 * sent to their email address. Users can resend the verification email or return to the main site.
 * 
 * Features:
 * - Displays email information and instructions to the user.
 * - Allows resending of the verification email with error handling.
 * - Includes navigation back to the main site.
 * - Displays success or error messages using a snackbar.
 */

import { useSearchParams, useRouter } from "next/navigation"; // Import Next.js navigation hooks
import { useState } from "react"; // Import React hooks
import { FlexBox } from "@/components/flex-box"; // Import custom FlexBox component
import LazyImage from "@/components/LazyImage"; // Import LazyImage component for optimized image loading
import { Box, Button, Typography, Snackbar, Alert } from "@mui/material"; // Import Material-UI components

const VerifyEmailPage = () => {
  const searchParams = useSearchParams(); // Access query parameters from the URL
  const router = useRouter(); // Initialize router for navigation

  const userEmail = searchParams.get("email") || "your email"; // Get the user's email from query params
  const [resendMessage, setResendMessage] = useState(""); // State to store resend message
  const [showSnackbar, setShowSnackbar] = useState(false); // State to control snackbar visibility
  const [snackbarSeverity, setSnackbarSeverity] = useState("info"); // State to control snackbar type

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
        setResendMessage(data.message || "An error occurred.");
        setSnackbarSeverity("error");
      } else {
        // Handle success
        setResendMessage(data.message || "Verification email has been resent successfully!");
        setSnackbarSeverity("success");
      }
    } catch (error) {
      // Handle network or other unexpected errors
      setResendMessage("An error occurred. Please try again later.");
      setSnackbarSeverity("error");
    } finally {
      setShowSnackbar(true); // Show the snackbar with the result message
    }
  };

  // Navigates the user back to the main site
  const handleGoToSite = () => {
    router.push("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        px: 2, // Padding on the x-axis
      }}
    >
      {/* Display a 3D mailbox image */}
      <LazyImage
        alt="model"
        width={500}
        height={500}
        sx={{ width: "50%" }}
        src="/assets/images/3d-mailbox.png"
      />

      {/* Informational text about the verification email */}
      <Typography
        variant="h5"
        component="p"
        sx={{
          fontFamily: "Helvetica",
          fontSize: "24px",
          color: "#fff",
          textAlign: "center",
          fontFamily: "Elemental End",
          textTransform: "lowercase",
          mb: 2, // Margin bottom
        }}
      >
        A verification email has been sent to your mailbox.
      </Typography>

      {/* Additional instructions */}
      <Typography sx={{ textAlign: "center", color: "#fff" }}>
        You’re almost there! We sent an email with your verification link to{" "}
        {userEmail}
      </Typography>
      <Typography sx={{ textAlign: "center", color: "#fff" }}>
        Click on the link in that email to complete the verification process.
        If you don’t see it, you may need to check your spam folder.
      </Typography>

      {/* Action buttons for resending email or returning to the site */}
      <FlexBox
        sx={{
          justifyContent: "space-between",
          gap: 2, // Space between buttons
          width: "100%",
          flexDirection: { xs: "column", sm: "row" }, // Stack on small screens
          pt: 5, // Padding top
        }}
      >
        <Button
          onClick={handleResend}
          sx={{
            fontFamily: "Elemental End",
            textTransform: "lowercase",
            background: "#000",
            color: "#fff",
            width: "100%",
            border: "2px solid transparent",
            py: 1, // Padding y-axis
            ":hover": {
              background: "#fff",
              color: "#000",
              border: "2px solid black",
            },
          }}
        >
          Resend Email
        </Button>
        <Button
          onClick={handleGoToSite}
          sx={{
            fontFamily: "Elemental End",
            textTransform: "lowercase",
            background: "transparent",
            border: "2px solid black",
            color: "#000",
            width: "100%",
            py: 1,
            ":hover": {
              background: "#fff",
              color: "#000",
            },
          }}
        >
          Return to site
        </Button>
      </FlexBox>

      {/* Snackbar to display feedback messages */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000} // Automatically close after 6 seconds
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Position at top-right
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {resendMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default VerifyEmailPage;
