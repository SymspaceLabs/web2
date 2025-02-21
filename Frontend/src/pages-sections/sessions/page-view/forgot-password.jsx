"use client";

import { useState, useEffect } from 'react';
import { useSnackbar } from "@/contexts/SnackbarContext";
import { ForgotPasswordForm } from '@/components/forms';
import { FlexBox } from '@/components/flex-box';
import { AuthSubmitButton } from '@/components/custom-buttons';

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
  const { showSnackbar } = useSnackbar();

  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIsValid(email);
  }, [email]);
      

  const handleSubmit = async (values) => {
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
  
      if (!response.ok) {   
        showSnackbar(data.message, "error"); 
      } else {
        showSnackbar(data.message, "error");  
      }
    } catch (error) {
      console.error('Error during forgot password request:', error);
    }
  };
  
  return (
    <FlexBox sx={{width:'100%'}} flexDirection="column" gap={3}>
      
      {/* FORM */}
      <ForgotPasswordForm
        email={email}
        setEmail={setEmail}
      />

      {/* BUTTON */}
      <AuthSubmitButton
        title="Reset Password"
        isValid={isValid}
        onClick={handleSubmit}
      />
    </FlexBox>
  );
};

export default ForgotPasswordPage;
