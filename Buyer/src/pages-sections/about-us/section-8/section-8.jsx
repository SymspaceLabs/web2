"use client"

import { useState } from "react";
import { LazyImage } from "@/components/lazy-image";
import { Paragraph } from "@/components/Typography"; 
import { RootStyle } from "./styles"; 
import { Box, Typography, Button, Container, useMediaQuery } from "@mui/material";

export default function Section8() {
  const isMobile = useMediaQuery('(max-width:600px)');
  
  const [showInput, setShowInput] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleBetaAccessClick = () => {
    setShowInput(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = async () => {
    setError(""); // Reset error state before validation
    if (!isValidEmail(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/potential-users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });
  
      if (response.ok) {
        setIsSubmitted(true);
        setEmail(""); // Clear the input field
        setTimeout(() => {
          setIsSubmitted(false);
          setShowInput(false);
        }, 3000);
      } else {
        const data = await response.json();
        setError(data.message || "Failed to submit email.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };
  
  return (
    <Container sx={{ py:10, display: "flex", justifyContent: "center" }}>
      <Box sx={{ maxWidth: "1400px", width: "100%" }}>
        <RootStyle>
          <LazyImage
            src="/assets/images/banners/banner-55.png"
            alt="offer"
            width={500}
            height={500}
          />
          <div className="content">
            <Typography
              sx={{ fontFamily: "'Elemental End', sans-serif", textTransform: "lowercase" }}
              mt={3}
              mb={1}
              lineHeight={1.2}
              fontSize={{ sm: 40, xs: 30 }}
            >
              get in touch
            </Typography>

            <Paragraph mb={3} lineHeight={1.2} fontSize={{ sm: 18, xs: 14 }}>
              Let us help you learn more.
            </Paragraph>

            {!showInput && (
              <Button
                fullWidth={isMobile ? true : false}
                variant="contained"
                color="primary"
                onClick={handleBetaAccessClick}
                sx={{
                  gap: 2,
                  color: "#fff",
                  borderRadius: "50px",
                  py: 2,
                  px: 4,
                  mt: { xs: 0, sm: 4 },
                  background:
                    "linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Elemental End', sans-serif",
                    textTransform: "lowercase",
                    fontSize: 12,
                  }}
                >
                  Contact Us
                </Typography>
                <Box
                  sx={{
                    width: "35px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LazyImage
                    alt="furniture shop"
                    width={25}
                    height={25}
                    src="/assets/images/sparkler-white.png"
                  />
                </Box>
              </Button>
            )}
          </div>
        </RootStyle>
      </Box>
    </Container>
  );
}
