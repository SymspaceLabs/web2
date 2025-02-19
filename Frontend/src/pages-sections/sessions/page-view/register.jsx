/**
 * RegisterPageView Component
 *
 * A React component for handling user registration.
 * This includes:
 * - Providing real-time feedback via Material UI Snackbar.
 * - Sending registration data to a backend API endpoint.
 * - Redirecting to an email verification page upon successful signup.
 * - Supporting Google signup with OAuth.
 *
 * Key Features:
 * - Password visibility toggle.
 * - Responsive error and success messages.
 */


"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Navigation for Next.js
import { Box, Button } from "@mui/material";
import { useSnackbar } from "@/contexts/SnackbarContext";
import SignUpForm from "@/components/forms/SignUpForm";


// ==============================================================

const RegisterPageView = () => {
  const router = useRouter();

  const { showSnackbar } = useSnackbar();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState(''); 
  const [retypeError, setRetypeError] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isValid, setIsValid] = useState(true);
  
  useEffect(() => {
    setIsValid(
        firstName && 
        lastName && 
        password &&
        email && 
        isChecked
    );
  }, [firstName, lastName, password, email, isChecked]);


  // Form submission handler
  const handleSubmit = async () => {
    const body = {
      firstName,
      lastName,
      email,
      password,
      role: "buyer"
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`,
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
        showSnackbar(data.message, "success");
        router.push('/verify-email')
      } else {
        showSnackbar(data.message, "error");
      }

    } catch (error) {
      showSnackbar(error, "error")
    }
  };

  return (
    <Box sx={{maxWidth:'1400px'}}>
        <SignUpForm
          email={email}
          setEmail={setEmail}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          password={password}
          setPassword={setPassword}
          retypePassword={retypePassword}
          setRetypePassword={setRetypePassword}
          retypeError={retypeError}
          setRetypeError={setRetypeError}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
        />
      

          <Button sx={{ fontFamily: 'Helvetica', fontWeight:'bold', background: !isValid 
              ? "linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)" 
              : "linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)",
            boxShadow: "0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(50px)",
            borderRadius: "12px",
            color: '#fff',
            cursor: !isValid ? 'not-allowed' : 'pointer',
            pointerEvents: !isValid ? 'none' : 'auto',
            '&:hover': {
              background: !isValid 
                ? "linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)" 
                : "linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)",
            },
          }}
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          size="large"
          onClick={handleSubmit}
        >
          Sign up
        </Button>          
      </Box>
  );
};

export default RegisterPageView;
