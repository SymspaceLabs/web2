// app/(auth)/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from 'react';

// TypeScript declarations for Facebook SDK
declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: {
      init: (params: {
        appId: string | undefined;
        cookie: boolean;
        xfbml: boolean;
        version: string;
      }) => void;
      login: (
        callback: (response: { status: string; authResponse?: any }) => void,
        options?: { scope: string }
      ) => void;
    };
    AppleID: {
      auth: {
        init: (config: {
          clientId: string | undefined;
          scope: string;
          redirectURI: string;
          state: string;
          usePopup: boolean;
        }) => void;
        signIn: () => Promise<any>;
      };
    };
  }
}

// Social Login Buttons Components
const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = window.location.origin + '/google-callback'; 
    const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=id_token&scope=openid%20email%20profile&prompt=select_account&nonce=${Math.random().toString(36).substring(2)}`;
    window.location.href = googleOAuthUrl;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full bg-[#1A1D21] text-white py-3 rounded-lg hover:bg-gradient-to-r hover:from-[#3084FF] hover:to-[#1D4F99] transition-all flex items-center justify-center cursor-pointer"
    >
      <img
        src="/images/icons/google-1.svg"
        className="w-6 h-auto"
        alt="google"
      />
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
    window.FB.login((response) => {
      if (response.status === "connected") {
        console.log("Facebook connected:", response);
      }
    }, { scope: "email,public_profile" });
  };

  return (
    <button
      onClick={handleFacebookLogin}
      className="cursor-pointer w-full bg-[#1A1D21] text-white py-3 rounded-lg hover:bg-gradient-to-r hover:from-[#3084FF] hover:to-[#1D4F99] transition-all flex items-center justify-center"
    >
      <img
        src="/images/icons/facebook-1.svg"
        className="w-6 h-auto"
        alt="facebook"
      />
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
      className="cursor-pointer w-full bg-[#1A1D21] text-white py-3 rounded-lg hover:bg-gradient-to-r hover:from-[#3084FF] hover:to-[#1D4F99] transition-all flex items-center justify-center"
    >
      <img
        src="/images/icons/apple-white.svg"
        className="w-6 h-auto"
        alt="apple"
      />
    </button>
  );
};

const SocialButtons = () => {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-white"></div>
        <span className="px-4 text-white text-sm">or</span>
        <div className="flex-1 border-t border-white"></div>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <GoogleLoginButton />
        <FacebookLoginButton />
        <AppleLoginButton />
      </div>
    </div>
  );
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getPageConfig = () => {
    switch (pathname) {
      case "/sign-in":
        return {
          title: "Continue your Journey",
          subtitle: "Log in to an existing account using your email",
          showSocial: true,
        };
      case "/register":
        return {
          title: "Begin your Journey",
          subtitle: "Create an account using your email",
          showSocial: true,
          showBusinessButton: true,
        };
      case "/register-partner":
        return {
          title: "Simulate Reality Together",
          subtitle: "Create an account using your email",
        };
      case "/register-applicant":
        return {
          title: "Get started",
          subtitle: "Fill out the form and attach your resume so we can contact you. At Symspace, you can be sure about making positive change.",
        };
      case "/forgot-password":
        return {
          title: "Forgot your password?",
          subtitle: "No worries! Enter the email address associated with your SYMSPACE account, and we'll send you instructions on how to create a new password.",
          image: "/images/3d-forgot-password.png",
        };
      case "/verify-email":
        return {
          title: "Verify your e-mail to finish signing up",
          subtitle: "",
          image: "/images/3d-mailbox.png",
        };
      case "/otp":
      case "/otp-forgot-password":
        return {
          title: "Check your email",
          subtitle: "You're almost there! Enter the 6-digit code we just sent to your email to continue. If you don't see it, you may need to check your spam folder.",
          image: "/images/3d-mailbox.png",
        };
      case "/reset-password":
        return {
          title: "Reset Password",
          subtitle: "Enter a new password",
          image: "/images/3d-reset-password.png",
        };
      default:
        return {
          title: "Welcome",
          subtitle: "",
        };
    }
  };

  const config = getPageConfig();

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
      <div className="min-h-screen flex flex-col items-center  justify-center px-4 py-32 relative overflow-hidden" style={{ backgroundColor: '#3F3F3F' }}>
        
        {/* Blurred overlay - centered blob */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-[40%] w-full sm:w-4/5 md:w-[890px] h-[50vh] sm:h-[60vh] md:h-[700px] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] opacity-40 blur-[100px] pointer-events-none" 
             style={{ 
               backgroundColor: 'rgba(3, 102, 254, 0.8)',
               boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.5), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)'
             }}
        />

        {/* Content Container - Centered */}
        <div className="z-10 flex flex-col items-center w-full max-w-[500px] gap-8">
          {/* Logo */}
          <Link href="/">
            <img 
              src="/images/logos/Logo.svg" 
              alt="logo" 
              className="w-[250px] h-auto"
            />
          </Link>

          {/* Card */}
          <div className="w-full px-3 sm:px-10 py-6 sm:py-16 rounded-[50px] flex flex-col items-center" 
             style={{ background: 'rgba(140, 140, 140, 0.3)' }}>
          
            {/* Image (if exists) */}
            {config.image && (
              <img
                src={config.image}
                alt="illustration"
                className="w-1/3 h-auto mb-6"
              />
            )}

            {/* Title & Subtitle */}
            <div className="text-center mb-6">
              <h1 className="font-elemental text-2xl md:text-2xl text-white mb-2 font-[var(--font-elemental)] lowercase">
                {config.title}
              </h1>
              {config.subtitle && (
                <p className="text-gray-300 text-sm font-helvetica">
                  {config.subtitle}
                </p>
              )}
            </div>

            {/* Page Content */}
            {children}

            {/* Social Buttons (for sign-in/register) */}
            {config.showSocial && <SocialButtons />}

            {/* Business Profile Button (for register only) */}
            {config.showBusinessButton && (
              <>
                <div className="flex items-center my-6 w-full">
                  <div className="flex-1 border-t border-white"></div>
                  <span className="px-4 text-white text-sm">or</span>
                  <div className="flex-1 border-t border-white"></div>
                </div>
                
                <a href={`${process.env.NEXT_PUBLIC_SELLER_URL}/register`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-elemental lowercase w-full py-3 rounded-xl text-white text-sm sm:text-lg text-center block"
                  style={{
                    background: 'linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)',
                    boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.5), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)'
                  }}
                >
                  Create a business profile
                </a>
              </>
            )}

            {/* Footer Links */}
            {pathname === "/sign-in" && (
              <div className="text-center text-white text-sm pt-4 pb-10">
                Don't have an account?{" "}
                <Link href="/register" className="text-purple-400 underline hover:text-purple-300">
                  Sign up
                </Link>
              </div>
            )}

            {(pathname === "/register" || pathname === "/register-partner" || pathname === "/register-applicant") && (
              <div className="text-center text-white text-sm pt-4 pb-10 font-helvetica">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-purple-400 underline hover:text-purple-300">
                  Sign in
                </Link>
              </div>
            )}

            {["/forgot-password", "/verify-email", "/otp", "/otp-forgot-password", "/reset-password"].includes(pathname) && (
              <p className="text-white text-center text-xs sm:text-sm pt-10 pb-20 font-helvetica">
                Need help?{" "}
                <Link href="/contact-us" className="text-purple-400 underline hover:text-purple-300">
                  Contact Us
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}