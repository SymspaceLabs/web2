"use client";

/**
 * ResetPassword Component
 * 
 * This component provides a user interface for resetting a password. 
 * Users can input and confirm their new password, which is validated against 
 * strength requirements before submission. Upon submission, the component sends 
 * the new password to the backend API with a token for verification.
 * 
 * Features:
 * - Password visibility toggle
 * - Form validation with detailed error messages
 * - Snackbar notifications for success or failure
 * - Redirect to signin upon successful password reset
 */


import { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup"; // For form validation
import BazaarTextField from "../../../components/BazaarTextField"; // Custom text field component
import usePasswordVisible from "../use-password-visible"; // Hook to toggle password visibility
import EyeToggleButton from "../components/eye-toggle-button"; // Button for toggling password visibility
import { Box, Button, Typography, Snackbar, Alert } from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";
import LazyImage from "@/components/LazyImage"; // For lazy-loaded images

const ResetPassword = () => {
  
  // Extract token from URL query parameters
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // To handle navigation
  const router = useRouter();

  // Custom hook to manage password visibility
  const { visiblePassword, togglePasswordVisible } = usePasswordVisible();

  // Input props for password fields with the eye toggle button
  const inputProps = {
    endAdornment: <EyeToggleButton show={visiblePassword} click={togglePasswordVisible} />
  };

  // State for managing snackbar notifications
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Initial form values
  const initialValues = {
    password1: "",
    password2: ""
  };

  // Validation schema for the form
  const validationSchema = yup.object().shape({
    password1: yup.string()
    .required("Password is required")
    .test(
      "is-strong-password",
      "Password must meet the following requirements:\n- At least 8 characters long\n- At least one uppercase letter (A-Z)\n- At least one lowercase letter (a-z)\n- At least one number (0-9)\n- At least one special character (@$!%*?&#)",
      value =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/.test(value)
    ),
    password2: yup
      .string()
      .oneOf([yup.ref("password1"), null], "Passwords must match")
      .required("Retype Password is required"),
  });

  // Handle form submission
  const onSubmit = async (values) => {
    const body = {
      token,
      newPassword:values.password2,
    };
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
  
      if (!response.ok) {  
        // Show error notification 
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage(data.message);
      } else {
        // Show success notification and redirect
        setSnackbarOpen(true);
        setSnackbarSeverity("success");
        setSnackbarMessage(data.message);
        router.push("/sign-in");
        
      }
    } catch (error) {
      console.error('Error during Signin:', error);
    }
  };

  // Formik setup
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
      {/* Main container for the reset password UI */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          px: 2,
        }}
      >
        {/* Image section */}
        <LazyImage alt="model" width={500} height={500} sx={{ width: "50%" }} src="/assets/images/3d-reset-password.png" />
        
        {/* Page title */}
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
          Reset Password
        </Typography>
        <Typography sx={{ textAlign: "center", color: "#fff", mb: 3 }}>
            Enter a new password
        </Typography>

        {/* Reset password form */}
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          {/* New password field */}
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ color:'#fff', mb:1 }}>
              New password
            </Typography>
            <BazaarTextField
              mb={2}
              id="password1"
              fullWidth
              size="small"
              name="password1"
              label="Password"
              variant="outlined"
              autoComplete="on"
              placeholder="*********"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password1}
              type={visiblePassword ? "text" : "password"}
              error={!!touched.password1 && !!errors.password1}
              helperText={touched.password1 && errors.password1 && (
                <Box component="ul" sx={{ m: 0, pl: 2, color: 'error.main', fontSize: 12 }}>
                  {errors.password1.split('\n').map((line, index) => (
                    <Typography key={index} component="li">
                      {line}
                    </Typography>
                  ))}
                </Box>
              )}
              InputProps={inputProps}
            />
          </Box>
          
          {/* Confirm password field */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ color:'#fff', mb:1 }}>
              Confirm New Password
            </Typography>
            <BazaarTextField
              mb={2}
              id="password2"
              fullWidth
              size="small"
              name="password2"
              label="Password"
              variant="outlined"
              autoComplete="on"
              placeholder="*********"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password2}
              type={visiblePassword ? "text" : "password"}
              error={!!touched.password2 && !!errors.password2}
              helperText={touched.password2 && errors.password2 && (
                <Box component="ul" sx={{ m: 0, pl: 2, color: 'error.main', fontSize: 12 }}>
                  {errors.password2.split('\n').map((line, index) => (
                    <Typography key={index} component="li">
                      {line}
                    </Typography>
                  ))}
                </Box>
              )}
              InputProps={inputProps}
            />
          </Box>
          
          {/* Submit button */}
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

        {/* Help link */}
        <Typography sx={{ textAlign: "center", color: "#fff", py: 5 }}>
          Need help? Contact us
        </Typography>
      </Box>

      {/* Snackbar for notifications */}
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

export default ResetPassword;