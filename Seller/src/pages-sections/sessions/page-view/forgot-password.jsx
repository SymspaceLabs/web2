"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FlexCol } from '../../../components/flex-box';
import { ForgotPasswordForm } from '../../../components/forms';
import { useSnackbar } from "../../../contexts/SnackbarContext";
import { AuthSubmitButton } from '../../../components/custom-buttons';

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
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIsValid(email);
  }, [email]);
      

  const handleSubmit = async () => {
    const body = { email };
  
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
        showSnackbar(data.message, "success");
        router.push(`/otp-forgot-password?email=${email}`)  
      }
    } catch (error) {
      console.error('Error during forgot password request:', error);
    }
  };
  
  return (
    <FlexCol gap={3}>
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
    </FlexCol>
  );
};

export default ForgotPasswordPage;
