"use client";

// =============================================
// Login Modal Component
// components/modals/login-modal.tsx
// =============================================

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { LoginForm } from "@/components/forms/login";
import { SymSubmitButton } from "@/components/buttons/sym-submit";
import Link from "next/link";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter();
  const { handleAuthResponse } = useAuth();
  const overlayRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsValid(!!email && !!password);
  }, [email, password]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async () => {
    setLoading(true);
    const body = { email, password };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Login failed");
        if (data.statusCode === 413) {
          onClose();
          router.push(`/otp?email=${encodeURIComponent(email)}`);
          return;
        }
      } else {
        toast.success(data.message || "Login successful");
        handleAuthResponse(data.user, data.accessToken);
        onClose();

        if (data.user.role === "seller") {
          window.location.href = `${process.env.NEXT_PUBLIC_SELLER_URL}`;
        } else {
          router.push("/marketplace");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    // Backdrop
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0, 0, 0, 0.75)", backdropFilter: "blur(6px)" }}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* Modal panel */}
      <div
        className="relative w-full max-w-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, rgba(62,61,69,0.85) 0%, rgba(20,20,20,0.97) 100%)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Welcome back
          </h2>
          <p className="mt-1 text-sm text-white/50">
            Sign in to your Symspace account
          </p>
        </div>

        {/* Divider */}
        <div className="mx-8 h-px bg-white/10" />

        {/* Form body */}
        <div className="px-8 py-6 flex flex-col gap-5">
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

          <p className="text-center text-sm text-white/40">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-[#3084FF] hover:text-blue-400 font-medium transition-colors"
              onClick={onClose}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}