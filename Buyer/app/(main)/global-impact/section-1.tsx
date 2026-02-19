"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Section1() {
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const emailInputRef = useRef<HTMLDivElement>(null);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setError('');
  };

  const handleEmailSubmit = async () => {
    setError("");
    if (!isValidEmail(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/potential-users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });
  
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emailInputRef.current && !emailInputRef.current.contains(event.target as Node)) {
        setShowEmailInput(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex justify-center items-center text-center py-10 sm:py-25 pt-[100px] md:pt-[200px]">
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Headline */}
        <h1 className="font-elemental text-white text-xl sm:text-[35px] md:text-[60px] leading-tight">
          Shaping the future of<br /> accessible ar Commerce
        </h1>

        {/* Promotional Offer */}
        <p className="font-helvetica mb-8 text-white text-xs sm:text-sm md:text-base max-w-[360px] sm:max-w-[1000px] md:max-w-[1500px]">
          Empowering Inclusion, Sustainability, and Innovation through Augmented Reality + Artificial Intelligence
        </p>

        {/* Button group */}
        {!showEmailInput && (
          <div className="flex gap-0 sm:gap-2.5 pt-2.5 flex-col sm:flex-row">
            <Button 
              onClick={handleShowEmailInput}
              className="font-elemental lowercase text-base bg-black text-white rounded-[50px] border-2 border-transparent py-4 px-[30px] transition-all duration-300 ease-in-out hover:bg-gradient-to-br hover:from-[#18C8FF] hover:to-[#933FFE] hover:border-white"
            >
              Get Involved
            </Button>
          </div>
        )}

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
                  placeholder={isSubmitted ? 'Successfully subscribed!' : 'Enter your email'}
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full bg-gradient-to-r from-[#474747] to-[#1D1D1D] rounded-[50px] pr-[70px] text-white py-5 px-[30px] border-none focus-visible:ring-0 focus-visible:ring-offset-0 ${error ? 'border-red-500' : ''}`}
                />
                <Button
                  onClick={handleEmailSubmit}
                  className={`font-elemental absolute right-2.5 top-1/2 -translate-y-1/2 ${
                    isSubmitted 
                      ? 'bg-white text-black hover:bg-gray-100' 
                      : 'bg-gradient-to-r from-[#666666] to-[#1D1D1D] text-white hover:from-[#888888] hover:to-[#2D2D2D]'
                  } border border-white rounded-[50px] px-3 py-1.5`}
                >
                  {isSubmitted ? '✔️' : 'Submit'}
                </Button>
              </div>
            </div>
            {error && (
              <p className="py-1 px-1 text-red-500">
                {error}
              </p>
            )}
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
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}