"use client";
// =========================================
// Login Page
// app/(auth)/sign-in/page.tsx
// =========================================

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LoginForm } from "@/components/forms/login";
import { SymSubmitButton } from "@/components/buttons/sym-submit";

export default function Login() {
  const router = useRouter();
  const { handleAuthResponse } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsValid(!!email && !!password);
  }, [email, password]);

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
        toast.error(data.message || "Login failed");

        // Handle email verification required
        if (data.statusCode === 413) {
          router.push(`/otp?email=${encodeURIComponent(email)}`);
          return;
        }
      } else {
        // Successful login
        toast.success(data.message || "Login successful");

        handleAuthResponse(data.user, data.accessToken);

        // Redirect based on user role
        if (data.user.role === 'seller') {
          window.location.href = `${process.env.NEXT_PUBLIC_SELLER_URL}`;
        } else {
          router.push('/marketplace');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />

      <SymSubmitButton
        isValid={isValid}
        onClick={handleSubmit}
        loading={loading}
      >
        Sign In
      </SymSubmitButton>
    </div>
  );
}