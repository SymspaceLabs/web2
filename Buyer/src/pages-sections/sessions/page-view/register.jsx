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
import { SignUpForm } from "@/components/custom-forms";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { BoxLink } from '@/pages-sections/sessions/components';
import { SymButton } from "@/components/custom-components";


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
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // New state variable

    useEffect(() => {
      // This useEffect handles overall form validity based on current input values.
      // The forceValidate prop in SymPasswordInput will handle the "is required" on submit.
      const passwordIsValid = password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const passwordMatch = retypePassword === password;
      
      // Update isValid based on the presence of required fields and password validation
      setIsValid(
        firstName &&
        lastName &&
        email &&
        passwordIsValid &&
        passwordMatch &&
        !retypeError // Ensure retype password doesn't have an error
      );
    }, [firstName, lastName, email, password, retypePassword, retypeError]);

  // Form submission handler
  const handleSubmit = async () => {
    setIsFormSubmitted(true); // Indicate that the form has been submitted, triggering validation messages
    
    let formIsValid = true;
    const newErrors = {};

    // Validate basic text fields
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
    
    // Validate password fields. SymPasswordInput will handle its own "required" error.
    // Here, we just check for the retype match and complex password requirements.
    if (!password) {
        // SymPasswordInput will show "Password is required"
        formIsValid = false;
    } else if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        // This is a more comprehensive check for password complexity, aligning with SymPasswordInput's validatePassword
        newErrors.password = "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
        formIsValid = false;
    }

    if (!retypePassword) {
        // SymPasswordInput will show "Password is required" for retype
        formIsValid = false;
    } else if (password !== retypePassword) {
        newErrors.retypePassword = "Passwords do not match";
        formIsValid = false;
        setRetypeError("Passwords do not match"); // Ensure retypeError state is also set
    } else {
        setRetypeError(""); // Clear retype error if they match
    }

    setErrors(newErrors); // Update errors state for SymTextFields

    // If there are any errors or the retype password doesn't match, stop submission
    if (Object.keys(newErrors).length > 0 || retypeError) {
        return; 
    }
    
    // If password itself is empty, don't proceed with API call
    if (!password || !retypePassword || password !== retypePassword) {
        return;
    }

    setLoading(true);

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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      if (response.ok) {
        showSnackbar(data.message, "success");
        router.push(`/otp?email=${email}`)
      } else {
        showSnackbar(data.message, "error");
      }
    } catch (error) {
      showSnackbar(error, "error")
    } finally {
      setLoading(false);
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
        errors={errors}
        isFormSubmitted={isFormSubmitted}
      />

      {/* Submit Button */}
      <SymButton
        sx={styles.btn}
        onClick={handleSubmit}
        loading={loading}
      >
        Sign Up
      </SymButton>

      {/* Checkbox */}
      <Span display={{ color:'#fff', sm: "inline-block" }}>
          By clicking Sign Up, you agree to our <BoxLink title="Terms" href="/terms-and-conditions#terms" />, <BoxLink title="Privacy Policy" href="/terms-and-conditions#privacy-policy" /> and <BoxLink title="Cookies" href="/terms-and-conditions#privacy-policy" />. You may receive SMS Notifications from us and can opt out any time.
      </Span>     
    </FlexBox>
  );
};

export default RegisterPageView;


const styles = {
  btn : {
    width:'100%',
    py:1.5,
    fontWeight: 500,
    fontSize: {xs:14, sm:18},
    background: "linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)",
    boxShadow: "0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)",
    backdropFilter: "blur(50px)",
    borderRadius: "12px",
    color: "#fff",
    // cursor: !isValid ? "not-allowed" : "pointer",
    // pointerEvents: !isValid ? "none" : "auto",
    "&:hover": {
      background: "linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)",
    },
  }
}
