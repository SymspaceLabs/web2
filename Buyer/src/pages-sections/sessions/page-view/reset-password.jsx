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

import { useState, useEffect } from "react";
import { FlexColCenter } from '@/components/flex-box';
import { ResetPasswordForm } from "@/components/forms";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useSearchParams, useRouter } from "next/navigation";
import { AuthSubmitButton } from '@/components/custom-buttons';

const ResetPassword = () => {
  
  // Extract token from URL query parameters
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const otp = searchParams.get("otp");
  
  const { showSnackbar } = useSnackbar();
  const [isValid, setIsValid] = useState(true);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [retypeError, setRetypeError] = useState("");

  useEffect(() => {
    const passwordIsValid = password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const passwordMatch = repeatPassword === password;
  
    setIsValid(
      passwordIsValid &&
      passwordMatch
    );
  }, [password, repeatPassword]);
  
  // To handle navigation
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async () => {
    const body = {
      email,
      otp,
      newPassword:password,
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
        showSnackbar(data.message,"error")
      } else {
        // Show success notification and redirect
        showSnackbar(data.message, "success");
        router.push("/sign-in");
      }
    } catch (error) {
      console.error('Error during Signin:', error);
    }
  };

  return (
    <FlexColCenter width='100%' gap={3}>
 
        {/* Reset password form */}
        <ResetPasswordForm
          password={password}
          setPassword={setPassword}
          repeatPassword={repeatPassword}
          setRepeatPassword={setRepeatPassword}
          retypeError={retypeError}
          setRetypeError={setRetypeError}
        />

        {/* Submit Button */}
        <AuthSubmitButton
          title="Submit"
          isValid={isValid}
          onClick={handleSubmit}
        />
        
      </FlexColCenter>
  );
};

export default ResetPassword;