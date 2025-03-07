"use client";

import { useState, useRef, useEffect } from "react";
import { TextField, Box } from "@mui/material";

const OtpForm = ({ onVerifyOtp }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

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
            style: { textAlign: "center", fontSize: 18, width: 40, height: 40 },
          }}
          InputProps={{
            style: { color: "#fff" },
          }}
          sx={{
            background: "#000",
            borderRadius: "5px",
            color: "#fff",
          }}
        />
      ))}
    </Box>
  );
};

export default OtpForm;
