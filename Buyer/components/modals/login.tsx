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

// ── Social buttons ────────────────────────────────────────────────

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = window.location.origin + "/google-callback";
    const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=id_token&scope=openid%20email%20profile&prompt=select_account&nonce=${Math.random().toString(36).substring(2)}`;
    window.location.href = googleOAuthUrl;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full bg-white/10 text-white py-3 rounded-lg hover:bg-gradient-to-r hover:from-[#3084FF] hover:to-[#1D4F99] transition-all flex items-center justify-center cursor-pointer"
    >
      <img src="/images/icons/google-1.svg" className="w-5 h-auto" alt="google" />
    </button>
  );
};

const FacebookLoginButton = () => {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: "v12.0",
      });
    };
    (function (d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode?.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const handleFacebookLogin = () => {
    window.FB.login(
      (response) => {
        if (response.status === "connected") {
          console.log("Facebook connected:", response);
        }
      },
      { scope: "email,public_profile" }
    );
  };

  return (
    <button
      onClick={handleFacebookLogin}
      className="cursor-pointer w-full bg-white/10 text-white py-3 rounded-lg hover:bg-gradient-to-r hover:from-[#3084FF] hover:to-[#1D4F99] transition-all flex items-center justify-center"
    >
      <img src="/images/icons/facebook-1.svg" className="w-5 h-auto" alt="facebook" />
    </button>
  );
};

const AppleLoginButton = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.AppleID) {
      window.AppleID.auth.init({
        clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID,
        scope: "email name",
        redirectURI: window.location.origin,
        state: "state-value",
        usePopup: true,
      });
    }
  }, []);

  const handleAppleLogin = () => {
    if (typeof window !== "undefined" && window.AppleID) {
      window.AppleID.auth.signIn().catch(console.error);
    }
  };

  return (
    <button
      onClick={handleAppleLogin}
      className="cursor-pointer w-full bg-white/10 text-white py-3 rounded-lg hover:bg-gradient-to-r hover:from-[#3084FF] hover:to-[#1D4F99] transition-all flex items-center justify-center"
    >
      <img src="/images/icons/apple-white.svg" className="w-5 h-auto" alt="apple" />
    </button>
  );
};

const SocialButtons = () => (
  <div className="w-full">
    <div className="flex items-center my-5">
      <div className="flex-1 border-t border-white/20" />
      <span className="px-4 text-white/40 text-sm">or continue with</span>
      <div className="flex-1 border-t border-white/20" />
    </div>
    <div className="grid grid-cols-3 gap-2">
      <GoogleLoginButton />
      <FacebookLoginButton />
      <AppleLoginButton />
    </div>
  </div>
);

// ── Main modal ────────────────────────────────────────────────────

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
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
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0, 0, 0, 0.75)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg, rgba(62,61,69,0.85) 0%, rgba(20,20,20,0.97) 100%)",
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
          <h2 className="font-elemental text-2xl text-white tracking-tight">
            Welcome back
          </h2>
          <p className="mt-1 text-sm text-white/50">
            Sign in to your Symspace account
          </p>
        </div>

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

          <SymSubmitButton isValid={isValid} onClick={handleSubmit} loading={loading}>
            Sign In
          </SymSubmitButton>

          {/* Social login */}
          <SocialButtons />

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