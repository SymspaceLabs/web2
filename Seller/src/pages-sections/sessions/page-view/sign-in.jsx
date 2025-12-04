"use client";

// ==============================================================
// Sign In Page View
// ==============================================================

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from '@/contexts/AuthContext';
import { FlexColCenter } from "@/components/flex-box";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { LoginForm } from '@/components/custom-forms/auth';
import { SymSubmitButton } from "@/components/custom-buttons";

// ==============================================================

const LoginPageView = ({ closeDialog }) => {
  const router = useRouter();

  const { handleAuthResponse } = useAuth(); // Context for handling authentication state.
  const { showSnackbar } = useSnackbar();
  
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setIsValid(email && password);
  }, [email, password]);

  // Form submission handler
  const handleSubmit = async () => {
    
    setLoading(true);

    const body = { 
      email,
      password
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        showSnackbar(data.message, "error");

        if (data.statusCode === 413) {
          router.push(`/verify-otp?email=${email}`);
          return;
        }
      } else {
        // Successful login
        showSnackbar(data.message, "success");

        closeDialog?.();
        handleAuthResponse(data.user, data.accessToken);

        // Redirect based on user role
        if (data.user.role === 'seller') {
          router.push(`${process.env.NEXT_PUBLIC_SELLER_URL}`);
        } else {
          router.push(`${process.env.NEXT_PUBLIC_BUYER_URL}/marketplace`);
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlexColCenter width='100%' gap={3}>
      
      {/* LOGIN FORM */}
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      /> 

      {/* Submit Button */}
      <SymSubmitButton isValid={isValid} onClick={handleSubmit} loading={loading}>
        Sign In
      </SymSubmitButton>

    </FlexColCenter>
  );
};

export default LoginPageView;
