"use client";

// ===========================================
// Forgot Password Page
// ===========================================

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FlexCol } from '@/components/flex-box';
import { ForgotPasswordForm } from '@/components/custom-forms';
import { useSnackbar } from "@/contexts/SnackbarContext";
import { SymSubmitButton } from '@/components/custom-buttons';

// ===========================================

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
      <SymSubmitButton isValid={isValid} onClick={handleSubmit}>
        Reset Password
      </SymSubmitButton>
    </FlexCol>
  );
};

export default ForgotPasswordPage;
