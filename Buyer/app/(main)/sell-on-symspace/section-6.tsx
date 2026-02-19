"use client";

// =======================================================
// Section 6 Banner Component - Tailwind Version
// ======================================================

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ======================================================

export default function Section6() {
  // Animation variants
  const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] as const } },
  };

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBetaAccessClick = () => {
    setShowInput(true);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
          setShowInput(false);
        }, 3000);
      } else {
        const data = await response.json();
        setError(data.message || "Failed to submit email.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container mx-auto px-4 pb-10">
      <motion.div
        variants={fadeInVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div
          className="rounded-[50px] mt-24 p-4 relative bg-cover bg-no-repeat bg-top"
          style={{
            backgroundImage: "url(/images/marketplace/banner-bg.png)",
          }}
        >
          <div className="p-5">
            {/* Main Header */}
            <h1 className="text-[20px] sm:text-[36px] text-white font-elemental leading-[1.2] mb-4">
              generate 3d models
              <br /> of any retail product
            </h1>

            {/* Subheader */}
            <p className="font-helvetica text-[14px] sm:text-[18px] mb-4 text-white">
              Customize your customer experience today
            </p>

            {/* Call-to-Action Button */}
            {!showInput && (
              <Button
                onClick={handleBetaAccessClick}
                className="gap-2 text-white rounded-[50px] py-5 px-8 bg-gradient-to-br from-[#18C8FF] via-[#6B7FFF] to-[#933FFE] hover:opacity-90 transition-opacity"
              >
                {/* Button Text */}
                <span className="font-elemental lowercase text-xs">Beta Access</span>

                {/* Icon inside the Button */}
                <div className="w-[35px] flex items-center justify-center">
                  <Image
                    alt="sparkler"
                    width={25}
                    height={25}
                    src="/images/sparkler-white.webp"
                  />
                </div>
              </Button>
            )}

            {showInput && (
              <>
                <div className="flex flex-col items-center mt-8 w-full max-w-[400px] relative animate-fadeIn">
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
                      className={`font-elemental absolute right-[10px] top-1/2 -translate-y-1/2 border border-white rounded-[50px] px-3 py-[6px] ${
                        isSubmitted
                          ? "bg-white text-black hover:bg-gray-100"
                          : "bg-gradient-to-r from-[#666666] to-[#1D1D1D] text-white hover:from-[#888888] hover:to-[#2D2D2D]"
                      }`}
                    >
                      {isSubmitted ? "✔️" : "Submit"}
                    </Button>
                  </div>
                </div>
                {error && <p className="py-1 px-3 text-red-500">{error}</p>}
              </>
            )}
          </div>
        </div>
      </motion.div>

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