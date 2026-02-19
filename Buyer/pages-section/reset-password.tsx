"use client";
// =========================================
// Reset Password Page
// app/(auth)/reset-password/page.tsx
// =========================================

/**
 * ResetPassword Component
 * 
 * This component provides a user interface for resetting a password. 
 * Users can input and confirm their new password, which is validated against 
 * strength requirements before submission. Upon submission, the component sends 
 * the new password to the backend API with email and OTP for verification.
 * 
 * Features:
 * - Password visibility toggle
 * - Form validation with detailed error messages
 * - Toast notifications for success or failure
 * - Redirect to sign-in upon successful password reset
 */

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { ResetPasswordForm } from "@/components/forms/reset-password";
import { SymSubmitButton } from "@/components/buttons/sym-submit";

export default function ResetPasswordPage() {
  // Extract email and OTP from URL query parameters
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const email = searchParams.get("email");
  const otp = searchParams.get("otp");

  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [retypeError, setRetypeError] = useState("");

  // Validate password requirements
  useEffect(() => {
    const passwordIsValid =
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const passwordMatch = repeatPassword === password && repeatPassword !== "";

    setIsValid(passwordIsValid && passwordMatch);
  }, [password, repeatPassword]);

  // Verify email and OTP are present
  useEffect(() => {
    if (!email || !otp) {
      toast.error("Invalid reset link. Please request a new password reset.");
      router.push("/forgot-password");
    }
  }, [email, otp, router]);

  // Handle form submission
  const handleSubmit = async () => {
    if (!email || !otp) {
      toast.error("Missing required information");
      return;
    }

    setLoading(true);

    const body = {
      email,
      otp,
      newPassword: password,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Password reset failed");
      } else {
        toast.success(data.message || "Password reset successful!");
        router.push("/sign-in");
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
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
      <SymSubmitButton 
        isValid={isValid} 
        onClick={handleSubmit}
        loading={loading}
      >
        Submit
      </SymSubmitButton>
    </div>
  );
}