// =========================================
// Register Page View
// =========================================

"use client";

import Link from "next/link";
import { useState } from "react";
import { SignUpForm } from "@/components/forms/sign-up";
import { SymSubmitButton } from "@/components/buttons/sym-submit";

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [retypeError, setRetypeError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = async () => {
    setIsFormSubmitted(true);
    
    let formIsValid = true;
    const newErrors: Record<string, string> = {};

    if (!firstName) {
      newErrors.firstName = "First name is required";
      formIsValid = false;
    }
    if (!lastName) {
      newErrors.lastName = "Last name is required";
      formIsValid = false;
    }
    if (!email) {
      newErrors.email = "Email is required";
      formIsValid = false;
    }
    
    if (!password) {
      formIsValid = false;
    } else if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      newErrors.password = "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
      formIsValid = false;
    }

    if (!retypePassword) {
      formIsValid = false;
    } else if (password !== retypePassword) {
      newErrors.retypePassword = "Passwords do not match";
      formIsValid = false;
      setRetypeError("Passwords do not match");
    } else {
      setRetypeError("");
    }

    setErrors(newErrors);

    if (!formIsValid) {
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Sign Up:', { firstName, lastName, email, password });
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <SignUpForm
        email={email}
        setEmail={setEmail}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        password={password}
        setPassword={setPassword}
        retypePassword={retypePassword}
        setRetypePassword={setRetypePassword}
        retypeError={retypeError}
        setRetypeError={setRetypeError}
        errors={errors}
        isFormSubmitted={isFormSubmitted}
      />

      <SymSubmitButton
        isValid={true}
        onClick={handleSubmit}
        loading={loading}
      >
        Sign Up
      </SymSubmitButton>

      <p className="text-white text-xs text-center">
        By clicking Sign Up, you agree to our{" "}
        <Link href="/terms-and-conditions#terms" className="text-purple-400 underline">
          Terms
        </Link>
        ,{" "}
        <Link href="/terms-and-conditions#privacy-policy" className="text-purple-400 underline">
          Privacy Policy
        </Link>
        {" "}and{" "}
        <Link href="/terms-and-conditions#privacy-policy" className="text-purple-400 underline">
          Cookies
        </Link>
        . You may receive SMS Notifications from us and can opt out any time.
      </p>
    </div>
  );
}