"use client"

import { useState } from "react";
import { styles } from "../styles";
import { motion } from "framer-motion";
import styled from "@mui/material/styles/styled";
import { LazyImage } from '@/components/lazy-image';
import { Box, Typography, Button, TextField, Container} from "@mui/material";

export default function EmailBanner({title}) {
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
    <Box>
      <motion.div
        component={Box}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{ width: "100%", overflow: "hidden" }} // Ensures content stays within bounds
      >
        <Container sx={{ py: 10 }}>
          <RootStyle>
            <LazyImage
              src="/assets/images/banners/banner-55.png"
              alt="offer"
              width={500}
              height={500}
            />
            <div className="content">
              <Typography
                sx={styles.elementalEndFont}
                mt={3}
                mb={1}
                lineHeight={1.2}
                fontSize={{ xs: 20, sm: 40 }}
              >
                {title}
              </Typography>

              <Typography fontFamily="Helvetica" mb={{ xs: 0, sm: 3 }} lineHeight={1.2} fontSize={{ sm: 18, xs: 14 }}>
                Get updates on new partnered brands, products, and technology.
              </Typography >

              {!showInput && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBetaAccessClick}
                  sx={{
                    gap: 2,
                    color: "#fff",
                    borderRadius: "50px",
                    py: 2,
                    px: 4,
                    mt: 4,
                    background:
                      "linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)",
                  }}
                >
                  <Typography
                    sx={{
                      ...styles.elementalEndFont,
                      fontSize: 12,
                    }}
                  >
                    Beta Access
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

              {showInput && (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginTop: "2rem",
                      width: "100%",
                      maxWidth: "400px",
                      position: "relative",
                      animation: "fadeIn 0.5s ease-in-out",
                      "@keyframes fadeIn": {
                        from: { opacity: 0, transform: "translateY(-20px)" },
                        to: { opacity: 1, transform: "translateY(0)" },
                      },
                    }}
                  >
                    <TextField
                      variant="outlined"
                      placeholder={
                        isSubmitted ? "Successfully subscribed!" : "Enter your email"
                      }
                      value={email}
                      onChange={handleEmailChange}
                      error={!!error}
                      // helperText={error}
                      sx={{
                        width: "100%",
                        boxSizing: "border-box",
                        background:
                          "linear-gradient(90.77deg, #474747 0%, #1D1D1D 63%)",
                        borderRadius: "50px",
                        paddingRight: "70px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        input: {
                          color: "#fff",
                          padding: "20px 30px",
                        },
                      }}
                    />
                    <Button
                      variant="contained"
                      onClick={handleEmailSubmit}
                      sx={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: isSubmitted
                          ? "#fff"
                          : "linear-gradient(97.04deg, #666666 0%, #1D1D1D 100%)",
                        border: "1px solid #FFFFFF",
                        borderRadius: "50px",
                        color: isSubmitted ? "#000" : "#fff",
                        padding: "6px 12px",
                        ...styles.elementalEndFont,
                        "&:hover": {
                          background: isSubmitted
                            ? "#f0f0f0"
                            : "linear-gradient(97.04deg, #888888 0%, #2D2D2D 100%)",
                        },
                      }}
                    >
                      {isSubmitted ? "✔️" : "Submit"}
                    </Button>
                  </Box>
                  <Typography sx={{ py:1, px:3, color:'red' }}>
                    {error}
                  </Typography>
                </>
                
              )}
            </div>
          </RootStyle>
        </Container>
      </motion.div>
    </Box>
  );
}

const RootStyle = styled("div")(({
    theme
  }) => ({
    minHeight: 300,
    borderRadius: '50px',
    display: "flex",
    overflow: "hidden",
    position: "relative",
    img: {
      objectFit: "cover"
    },
    ".content": {
      top: "40%",
      left: "10%",
      position: "absolute",
      transform: "translateY(-40%)",
      [theme.breakpoints.down("sm")]: {
        top: "50%",
        insetInline: 0,
        padding: "2rem",
        transform: "translateY(-50%)"
      },
      [theme.breakpoints.down(375)]: {
        h2: {
          fontSize: 24,
          marginTop: 0
        }
      }
    },
    [theme.breakpoints.down(375)]: {
      minHeight: 260
    }
  }));
