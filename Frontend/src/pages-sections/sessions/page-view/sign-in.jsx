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
 **/

import { useState, useEffect } from "react";
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from "next/navigation";
import { FlexBox } from "@/components/flex-box";
import { LoginForm } from '@/components/forms';
import { useSnackbar } from "@/contexts/SnackbarContext";
import { AuthSubmitButton } from "@/components/custom-buttons";

const LoginPageView = ({ closeDialog }) => {
  const router = useRouter(); // Next.js router for navigation.

  const { handleAuthResponse } = useAuth(); // Context for handling authentication state.
  const { showSnackbar } = useSnackbar();
  
  const [errorMessage, setErrorMessage] = useState(''); // For displaying error messages.
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIsValid( email && password);
  }, [email, password]);

  // Form submission handler
  const handleSubmit = async (values) => {
    const body = { email: values.email, password: values.password };

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
          router.push('/verify-email');
          return;
        }
      } else {
        // Successful login
        showSnackbar(data.message, "error");

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

  return (
    <FlexBox sx={{width:'100%'}} flexDirection="column" gap={3}>
      
      {/* LOGIN FORM */}
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      /> 

      {/* Submit Button */}
      <AuthSubmitButton
        title="Sign In"
        isValid={isValid}
        onClick={handleSubmit}
      />

    </FlexBox>
  );
};

export default LoginPageView;
