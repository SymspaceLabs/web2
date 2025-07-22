"use client";

import { useState, useRef, useEffect } from "react";
import { TextField, Box, useMediaQuery, useTheme } from "@mui/material"; // Import useMediaQuery and useTheme

const OtpForm = ({ onVerifyOtp }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const theme = useTheme(); // Get the theme object
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if it's a mobile screen

  useEffect(() => {
    inputRefs.current[0]?.focus(); // Auto-focus the first input box on mount
  }, []);

  useEffect(() => {
    if (otp.join("").length === 6) {
      onVerifyOtp(otp.join(""));
    }
  }, [otp, onVerifyOtp]);

  const handleChange = (index, event) => {
    const value = event.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    const pastedData = event.clipboardData.getData("text").trim();
    if (!/^[0-9]{6}$/.test(pastedData)) return;

    setOtp(pastedData.split(""));
    inputRefs.current[5]?.focus();
  };

  // Determine input box width and gap based on screen size
  // On desktop (isMobile is false), inputWidth and inputHeight will be 40.
  // On mobile (isMobile is true), inputWidth and inputHeight will be 35.
  const inputWidth = isMobile ? 37 : 50;
  const inputHeight = isMobile ? 37 : 50;
  const gap = isMobile ? 0.5 : 1; // Smaller gap for mobile

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {otp.map((digit, index) => (
        <TextField
          key={index}
          value={digit}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          inputRef={(el) => (inputRefs.current[index] = el)}
          variant="outlined"
          inputProps={{
            maxLength: 1,
            style: {
              textAlign: "center",
              fontSize: isMobile ? 16 : 18, // Font size is 18 on desktop, 16 on mobile
              width: inputWidth, // Width is 40 on desktop, 35 on mobile
              height: inputHeight // Height is 40 on desktop, 35 on mobile
            },
          }}
          InputProps={{
            style: { color: "#fff" },
          }}
          sx={{
            background: "#000",
            borderRadius: "5px",
            color: "#fff",
            // Ensure the TextField itself doesn't have a fixed width that overrides inputProps
            '& .MuiOutlinedInput-root': {
              width: inputWidth,
              height: inputHeight,
            }
          }}
        />
      ))}
    </Box>
  );
};

export default OtpForm;
