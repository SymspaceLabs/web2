"use client";
// =========================================
// Forgot Password Page
// components/pages/forgot-password.tsx
// =========================================

// At the top of app/pages/forgot-password/page.tsx
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SymSubmitButton } from "@/components/buttons/sym-submit";
import { ForgotPasswordForm } from "@/components/forms/forgot-password";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsValid(!!email);
  }, [email]);

  const handleSubmit = async () => {
    setLoading(true);
    const body = { email };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Request failed");
      } else {
        toast.success(data.message || "Reset email sent");
        router.push(`/otp-forgot-password?email=${encodeURIComponent(email)}`);
      }
    } catch (error) {
      console.error('Error during forgot password request:', error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* FORM */}
      <ForgotPasswordForm
        email={email}
        setEmail={setEmail}
      />

      {/* BUTTON */}
      <SymSubmitButton 
        isValid={isValid} 
        onClick={handleSubmit}
        loading={loading}
      >
        Reset Password
      </SymSubmitButton>
    </div>
  );
}