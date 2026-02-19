"use client";

// ===================================================================
// Section 1 | AR App Simulation - Tailwind Version
// ===================================================================

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlobBox } from "./blobBox";
import AppStore from "@/components/app-store";

// ===================================================================

export default function Section1() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const emailInputRef = useRef<HTMLDivElement>(null);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setError("");
  };

  const handleEmailSubmit = async () => {
    setError("");
    if (!isValidEmail(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/potential-users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email.trim() }),
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
        setEmail("");
        setTimeout(() => {
          setIsSubmitted(false);
          setShowEmailInput(false);
        }, 3000);
      } else {
        const data = await response.json();
        setError(data.message || "Failed to submit email.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  const handleShowEmailInput = () => {
    setShowEmailInput(true);
  };

  const handleImageClick = () => {
    handleShowEmailInput();
  };

  // Click outside to hide email input
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emailInputRef.current &&
        !emailInputRef.current.contains(event.target as Node)
      ) {
        setShowEmailInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex justify-center items-center text-center min-h-[80vh] pt-[100px] sm:pt-[100px] md:pt-[200px]">
      {/* Decorative Blob centered as background */}
      <BlobBox />

      {/* Content Section */}
      <div className="relative z-[1] flex flex-col items-center px-4">
        {/* Headline */}
        <h1 className="text-[48px] sm:text-[72px] md:text-[80px] font-elemental text-white mb-4">
          SYMSPACE
        </h1>

        {/* Promotional Offer */}
        <p className="text-base mb-8 text-white max-w-2xl">
          Revolutionizing the shopping experience through Augmented Reality +
          Artificial Intelligence
        </p>

        {/* Button group - Converted from MUI styles */}
        <div className="flex flex-col sm:flex-row gap-[10px] sm:gap-[15px] pt-[20px] w-full max-w-md">
          <Button
            onClick={() =>
              router.push(`${process.env.NEXT_PUBLIC_SELLER_URL}/register`)
            }
            className="font-elemental lowercase flex-1 text-base text-white rounded-[50px] py-4 px-[30px] bg-black border-2 border-transparent transition-all duration-300 ease-in-out hover:bg-gradient-to-br hover:from-[#18C8FF] hover:via-[#7B5FD3] hover:to-[#933FFE] hover:border-white"
          >
            Join as Business
          </Button>
          <Button
            onClick={handleShowEmailInput}
            className="font-elemental lowercase flex-1 text-base text-black rounded-[50px] py-4 px-[30px] bg-transparent border-2 border-black transition-all duration-300 ease-in-out hover:bg-gradient-to-br hover:from-[#696969] hover:to-[#000000] hover:text-white hover:border-white"
          >
            Join the Waitlist
          </Button>
        </div>

        {/* Images Section */}
        <div className="py-3">
          <AppStore onClick={handleImageClick} />
        </div>

        {/* Email Input with Animation */}
        {showEmailInput && (
          <>
            <div
              ref={emailInputRef}
              className="flex flex-col items-center mt-8 w-full max-w-[400px] relative animate-fadeIn"
            >
              <div className="relative w-full">
                <Input
                  type="email"
                  placeholder={
                    isSubmitted ? "Successfully subscribed!" : "Enter your email"
                  }
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full box-border rounded-[50px] pr-[70px] text-white py-5 px-[30px] border-none focus-visible:ring-0 focus-visible:ring-offset-0 ${
                    error ? "border-red-500" : ""
                  }`}
                  style={{
                    background:
                      "linear-gradient(90.77deg, #474747 0%, #1D1D1D 63%)",
                  }}
                />
                <Button
                  onClick={handleEmailSubmit}
                  className={`absolute right-[10px] top-1/2 -translate-y-1/2 border border-white rounded-[50px] px-3 py-[6px] ${
                    isSubmitted
                      ? "bg-white text-black hover:bg-gray-100"
                      : "bg-gradient-to-r from-[#666666] to-[#1D1D1D] text-white hover:from-[#888888] hover:to-[#2D2D2D]"
                  }`}
                >
                  {isSubmitted ? "✔️" : "Submit"}
                </Button>
              </div>
            </div>
            {error && <p className="py-1 px-1 text-red-500">{error}</p>}
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        :global(.animate-fadeIn) {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}