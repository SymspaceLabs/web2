"use client";

import * as yup from "yup";
import * as React from 'react';
import { useState } from 'react';
import { useFormik } from "formik";
import { Button, Snackbar, Alert, Box, Typography } from "@mui/material";
import LazyImage from "@/components/LazyImage";
import BazaarTextField from "../../../components/BazaarTextField";

/**
 * ForgotPasswordPage Component
 * 
 * Renders the Forgot Password page where users can request password reset instructions.
 * 
 * This component includes:
 * - A form for users to submit their email.
 * - Validation using Formik and Yup.
 * - Feedback messages using Material UI Snackbar.
 */

const ForgotPasswordPage = () => {
  // State to manage the visibility of the Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // State to manage the message displayed in the Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState('');
  // State to manage the severity (success/error) of the Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Initial values for the email field in the form
  const initialValues = {
    email: "",
  };

  // Validation schema for the email field using Yup
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required")
  });

  /**
   * Handles form submission.
   * Sends the email to the backend API to request password reset instructions.
   * @param {Object} values - Form values containing the email.
   */
  const onSubmit = async (values) => {
    const body = {
      email: values.email,
    };
  
    try {
      // Sending POST request to the backend API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
  
      // Displaying appropriate feedback based on API response
      if (!response.ok) {   
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage(data.message);
      } else {
        setSnackbarOpen(true);
        setSnackbarSeverity("success");
        setSnackbarMessage(data.message);
      }
    } catch (error) {
      console.error('Error during forgot password request:', error);
    }
  };
  
  // Setting up Formik for form management
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  return (
    <>
      {/* Main container */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          px: 2,
        }}
      >
        {/* Image Section */}
        <LazyImage alt="model" width={500} height={500} sx={{ width: "50%" }} src="/assets/images/3d-forgot-password.png" />

        {/* Title */}
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
            mb: 2,
          }}
        >
          Forgot your password?
        </Typography>

        {/* Description */}
        <Typography sx={{ textAlign: "center", color: "#fff", mb: 3 }}>
          No worries! Enter the email address associated with your SYMSPACE account, and we'll send you instructions on how to create a new password.
        </Typography>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Box sx={{ mb: 2 }}>
            {/* Email Input Field */}
            <BazaarTextField
              fullWidth
              name="email"
              size="small"
              type="email"
              variant="outlined"
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              label="Email or Phone Number"
              placeholder="Email"
              error={!!touched.email && !!errors.email}
              helperText={touched.email && errors.email}
            />
          </Box>
          {/* Submit Button */}
          <Button
            fullWidth
            type="submit"
            color="primary"
            variant="contained"
            size="large"
            sx={{
              fontFamily: "Elemental End",
              textTransform: "lowercase",
              background: "#fff",
              border: "2px solid black",
              color: "#000",
              width: "100%",
              py: 1,
              ":hover": {
                background: "#000",
                color: "#fff",
              },
            }}
          >
            Submit
          </Button>
        </form>

        {/* Contact Help Text */}
        <Typography sx={{ textAlign: "center", color: "#fff", py: 5 }}>
          Need help? Contact us
        </Typography>
      </Box>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ForgotPasswordPage;
