"use client";

/**
 * RegisterPageView Component
 *
 * A React component for handling user registration.
 * This includes:
 * - Sending registration data to a backend API endpoint.
 * - Redirecting to an email verification page upon successful signup.
 * 
 **/

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Span } from '@/components/Typography';
import { FlexBox } from "@/components/flex-box";
import { SignUpForm } from "@/components/forms";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { AuthSubmitButton } from "@/components/custom-buttons";
import { BoxLink } from '@/pages-sections/sessions/components';


// ==============================================================

const RegisterPageView = () => {
  const router = useRouter();

  const { showSnackbar } = useSnackbar();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState(''); 
  const [retypeError, setRetypeError] = useState("");
  const [isValid, setIsValid] = useState(true);
  
  useEffect(() => {
    const passwordIsValid = password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const passwordMatch = retypePassword === password;
    setIsValid(
      firstName &&
      lastName &&
      email &&
      passwordIsValid &&
      passwordMatch
    );
  }, [firstName, lastName, email, password, retypePassword]);
  
  // Form submission handler
  const handleSubmit = async () => {
    const body = {
      firstName,
      lastName,
      email,
      password,
      role: "buyer"
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`,
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
        showSnackbar(data.message, "success");
        router.push(`/otp?email=${email}`)
      } else {
        showSnackbar(data.message, "error");
      }

    } catch (error) {
      showSnackbar(error, "error")
    }
  };

  return (
    <FlexBox flexDirection="column" gap={3}>
      
      {/* Sign Up form */}
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
      />

      {/* Submit Button */}
      <AuthSubmitButton
        title="Sign Up"
        isValid={isValid}
        onClick={handleSubmit}
      />     

      {/* Checkbox */}
      <Span display={{ color:'#fff', sm: "inline-block" }}>
          By clicking Sign Up, you agree to our <BoxLink title="Terms" href="/terms-and-conditions#terms" />, <BoxLink title="Privacy Policy" href="/terms-and-conditions#privacy-policy" /> and <BoxLink title="Cookies" href="/terms-and-conditions#privacy-policy" />. You may receive SMS Notifications from us and can opt out any time.
      </Span>     
    </FlexBox>
  );
};

export default RegisterPageView;
