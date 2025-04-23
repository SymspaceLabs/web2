"use client";

// =========================================================
// Renders a login form for user authentication
// =========================================================

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { LoginForm } from '@/components/forms';
import { useAuth } from '@/contexts/AuthContext';
import { FlexColCenter } from "@/components/flex-box";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { SymSubmitButton } from "@/components/custom-buttons";

// =========================================================


const LoginPageView = ({ closeDialog }) => {
  const router = useRouter();

  const { handleAuthResponse } = useAuth(); // Context for handling authentication state.
  const { showSnackbar } = useSnackbar();
  
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIsValid(email && password);
  }, [email, password]);

  // Form submission handler
  const handleSubmit = async () => {
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
          // router.push('/verify-email');
          router.push(`/otp?email=${email}`);
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
          router.push('/marketplace');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
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
      <SymSubmitButton isValid={isValid} onClick={handleSubmit}>
        Sign In
      </SymSubmitButton>

    </FlexColCenter>
  );
};

export default LoginPageView;
