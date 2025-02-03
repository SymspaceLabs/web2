"use client";

/**
 * LoginPageView Component
 * 
 * This component renders a login form for user authentication. It uses Formik for form handling,
 * Material UI for UI components, and integrates password visibility toggling and snackbar notifications.
 * It redirects users based on their role after successful login.
 * 
 * Props:
 * - closeDialog: A callback function to close the dialog containing this component.
 */

import * as React from 'react';
import { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import EyeToggleButton from "../components/eye-toggle-button";
import usePasswordVisible from "../use-password-visible";
import BazaarTextField from "../../../components/BazaarTextField";
import { useAuth } from '../../../contexts/AuthContext'; // Adjust the path as needed
import { useRouter } from "next/navigation";
import { FlexBox } from "../../../components/flex-box";
import { Span } from "../../../components/Typography";
import { FormControlLabel, Checkbox, Button, Snackbar, Alert } from "@mui/material";
import Link from "next/link";

const LoginPageView = ({ closeDialog }) => {
  const { handleAuthResponse } = useAuth(); // Context for handling authentication state.
  const { visiblePassword, togglePasswordVisible } = usePasswordVisible(); // Hook for toggling password visibility.
  const [errorMessage, setErrorMessage] = useState(''); // For displaying error messages.
  const router = useRouter(); // Next.js router for navigation.

  // Snackbar state for notifications
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Initial form values
  const initialValues = {
    email: "",
    password: ""
  };

  // Form validation schema using Yup
  const validationSchema = yup.object().shape({
    password: yup.string().required("Password is required"),
    email: yup.string().email("Invalid email").required("Email is required")
  });

  // Form submission handler
  const onSubmit = async (values) => {
    const body = { email: values.email, password: values.password };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle error scenarios
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage(data.message);

        if (data.statusCode === 413) {
          router.push('/verify-email');
          return;
        }
      } else {
        // Successful login
        setSnackbarOpen(true);
        setSnackbarSeverity("success");
        setSnackbarMessage('Login successful');
        closeDialog?.();
        handleAuthResponse(data.user, data.accessToken);

        // Redirect based on user role
        if (data.user.role === 'seller') {
          router.push('/vendor/dashboard');
        } else {
          router.push('/marketplace');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // Formik configuration for form handling
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Email Input Field */}
        <BazaarTextField
          mb={1.5}
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

        {/* Password Input Field */}
        <BazaarTextField
          mb={2}
          fullWidth
          size="small"
          name="password"
          label="Password"
          autoComplete="on"
          variant="outlined"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          placeholder="*********"
          type={visiblePassword ? "text" : "password"}
          error={!!touched.password && !!errors.password}
          helperText={touched.password && errors.password}
          InputProps={{
            endAdornment: <EyeToggleButton show={visiblePassword} click={togglePasswordVisible} />
          }}
        />

        {/* Additional Controls: Remember Me, Error Label, Forgot Password */}
        <FlexBox sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, py: 2 }}>
          <FormControlLabel
            name="agreement"
            sx={{ margin: 0 }}
            onChange={handleChange}
            control={<Checkbox size="small" color="secondary" sx={{ color:'#fff' }} />}
            label={<Span sx={{ color:'#fff' }}>Remember me</Span>}
          />
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          <Link href="/forgot-password" passHref>
            <Span sx={{ textDecoration: 'underline', cursor: 'pointer', color:'#fff' }}>Forgot your password?</Span>
          </Link>
        </FlexBox>

        {/* Submit Button */}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          sx={{
            background: isValid ? "linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)" : "rgba(255, 255, 255, 0.1)",
            color: '#fff',
            '&:hover': { background: isValid ? "#1D4F99" : "rgba(255, 255, 255, 0.1)" },
          }}
          disabled={!isValid}
        >
          Sigin
        </Button>
      </form>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginPageView;
