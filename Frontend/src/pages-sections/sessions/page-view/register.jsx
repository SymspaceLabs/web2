/**
 * RegisterPageView Component
 *
 * A React component for handling user registration.
 * This includes:
 * - Validating form inputs with `yup` and `formik`.
 * - Providing real-time feedback via Material UI Snackbar.
 * - Sending registration data to a backend API endpoint.
 * - Redirecting to an email verification page upon successful signup.
 * - Supporting Google signup with OAuth.
 *
 * Key Features:
 * - Form validation using `yup` schema.
 * - Password visibility toggle.
 * - Responsive error and success messages.
 */


"use client";

import * as yup from "yup"; // Validation schema
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation"; // Navigation for Next.js
import { Snackbar, Alert, Checkbox, Box, FormControlLabel, Typography, Button } from "@mui/material";

import BazaarTextField from "../../../components/BazaarTextField"; // Custom input field
import EyeToggleButton from "../components/eye-toggle-button"; // Password visibility toggle
import usePasswordVisible from "../use-password-visible"; // Hook for managing password visibility
import BoxLink from "../components/box-link"; // Custom link component
import { Span } from "../../../components/Typography";
import { FlexBox } from "../../../components/flex-box";


// ==============================================================

const RegisterPageView = () => {
  const router = useRouter(); // Next.js router for navigation

  // Hook to toggle password visibility
  const { visiblePassword, togglePasswordVisible } = usePasswordVisible();

  // Input props to include password toggle
  const inputProps = {
    endAdornment: <EyeToggleButton show={visiblePassword} click={togglePasswordVisible} />,
  };

  // Snackbar state for feedback messages
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");


  // Initial form values
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    re_password: "",
    agreement: false
  };

  // Form validation schema
  const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string()
    .required("Password is required")
    .test(
      "is-strong-password",
      "Password must meet the following requirements:\n- At least 8 characters long\n- At least one uppercase letter (A-Z)\n- At least one lowercase letter (a-z)\n- At least one number (0-9)\n- At least one special character (@$!%*?&#)",
      value =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/.test(value)
    ),
  re_password: yup.string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please re-type password"),
  agreement: yup.bool()
    .test("agreement", "You have to agree with our Terms and Conditions!", value => value === true)
    .required("You have to agree with our Terms and Conditions!")
});


  // Form submission handler
  const onSubmit = async (values) => {
    console.log(values);

    const body = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
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

      if (response.ok) {
        const data = await response.json();
        setSnackbarSeverity('success');
        setSnackbarMessage('Account created!');
        setSnackbarOpen(true);
        // router.push('/verify-email');
        router.push(`/verify-email?email=${encodeURIComponent(values.email)}`);
      } else {
        const errorData = await response.json();
        console.error('Signup failed:', errorData);
        setSnackbarSeverity('error');
        setSnackbarMessage(errorData.message || 'Signup failed. Please try again.');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('An error occurred. Please try again later.');
      setSnackbarOpen(true);
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
    onSubmit,
    validateOnMount: true, // Validate fields on mount
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box sx={{maxWidth:'650px'}}>
          <Box sx={{display:'flex', gap:1, flexDirection:'column', pb:2}}>
            <Typography sx={{ width:'fit-content', fontFamily: 'Helvetica', fontSize: 16, color:'#fff' }}>
              Email
            </Typography>
            <BazaarTextField mb={1.5} fullWidth name="email" size="small" type="email" variant="outlined" onBlur={handleBlur} value={values.email} onChange={handleChange} label="Email" placeholder="example@mail.com" error={!!touched.email && !!errors.email} helperText={touched.email && errors.email} />
          </Box>
          <Box
            sx={{
              px: 0,
              display: "flex",
              gap: 1,
              pb: 2,
              flexDirection: { xs: "column", sm: "row" }
            }}
          >
            <Box sx={{ display: 'flex', flex: 'auto', gap: 1, flexDirection: 'column' }}>
              <Typography sx={{ width: 'fit-content', fontFamily: 'Helvetica', fontSize: 16, color: '#fff' }}>
                First name
              </Typography>
              <BazaarTextField
                mb={1.5}
                fullWidth
                name="firstName"
                size="small"
                label="First Name"
                variant="outlined"
                onBlur={handleBlur}
                value={values.firstName}
                onChange={handleChange}
                placeholder="John"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
              />
            </Box>
            <Box sx={{ display: 'flex', flex: 'auto', gap: 1, flexDirection: 'column' }}>
              <Typography sx={{ width: 'fit-content', fontFamily: 'Helvetica', fontSize: 16, color: '#fff' }}>
                Last name
              </Typography>
              <BazaarTextField
                mb={1.5}
                fullWidth
                name="lastName"
                size="small"
                label="Last Name"
                variant="outlined"
                onBlur={handleBlur}
                value={values.lastName}
                onChange={handleChange}
                placeholder="Doe"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
              />
            </Box>
          </Box>


          <Box sx={{ px: 0, display: "flex", gap: 1, pb: 2 }}>
            <Box sx={{ display: 'flex', flex: 'auto', gap: 1, flexDirection: 'column' }}>
              <Typography sx={{ width: 'fit-content', fontFamily: 'Helvetica', fontSize: 16, color: '#fff' }}>
                Password
              </Typography>
              <BazaarTextField
                id="password"
                fullWidth
                size="small"
                name="password"
                label="Password"
                variant="outlined"
                autoComplete="on"
                placeholder="*********"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                type={visiblePassword ? "text" : "password"}
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password && (
                  <Box component="ul" sx={{ m: 0, pl: 2, color: 'error.main', fontSize: 12 }}>
                    {errors.password.split('\n').map((line, index) => (
                      <Typography key={index} component="li">
                        {line}
                      </Typography>
                    ))}
                  </Box>
                )}
                InputProps={inputProps}
              />
            </Box>

          </Box>
          <Box sx={{display:'flex', gap:1, flexDirection:'column', pb:2}}>
            <Box sx={{ display: 'flex', flex: 'auto', gap: 1, flexDirection: 'column' }}>
              <Typography sx={{ width: 'fit-content', fontFamily: 'Helvetica', fontSize: 16, color: '#fff' }}>
                Repeat password
              </Typography>
              <BazaarTextField
              id="passwordRe"
                fullWidth
                size="small"
                autoComplete="on"
                name="re_password"
                variant="outlined"
                label="Retype Password"
                placeholder="*********"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.re_password}
                type={visiblePassword ? "text" : "password"}
                error={!!touched.re_password && !!errors.re_password}
                helperText={touched.re_password && errors.re_password}
                InputProps={inputProps}
              />
            </Box>
          </Box>


          <FormControlLabel name="agreement" className="agreement" onChange={handleChange} control={<Checkbox 
            size="small" 
            color="secondary" 
            checked={values.agreement || false} 
            sx={{
              color: 'white',
              '& .MuiSvgIcon-root': {
                backgroundColor: 'black',
                borderRadius: '4px',
                border: 'none',
              },
              '&.Mui-checked .MuiSvgIcon-root': {
                color: 'white',
                backgroundColor: 'black',
              },
              '&:not(.Mui-checked) .MuiSvgIcon-root': {
                color: 'white',
                borderColor: 'black',
              }
            }}
          />} label={<FlexBox flexWrap="wrap" alignItems="center" justifyContent="flex-start" gap={1}>
                      <Span display={{ color:'#fff', sm: "inline-block", xs: "none"}}>By clicking Sign Up, you agree to our <BoxLink title="Terms" href="/legal#terms" />, <BoxLink title="Privacy Policy" href="/legal#privacy-policy" /> and <BoxLink title="Cookies" href="/legal#cookies" />. You may receive SMS Notifications from us and can opt out any time.</Span>            
                    </FlexBox>} />

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
          >
            Sign up
          </Button>          
        </Box>
      </form>

      {/* Snackbar for feedback messages */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        style={{ zIndex: 2147483647 }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RegisterPageView;
