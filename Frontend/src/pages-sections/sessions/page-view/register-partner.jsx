"use client";

/**
 * RegisterPartnerPageView Component
 * 
 * This component provides a registration form for users to create an account as a seller. 
 * It includes fields for user details such as first name, last name, email, business name, 
 * website, password, and a retype password. The form validates inputs using Yup schema, 
 * and upon submission, sends the data to the backend for account creation.
 */

import { useState, useEffect } from "react";
import { FlexBox } from "@/components/flex-box";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { PartnerSignUpForm } from "@/components/forms";
import { AuthSubmitButton } from "@/components/custom-buttons";

const RegisterPartnerPageView = () => {
  const { showSnackbar } = useSnackbar();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(''); 

  const [businessName, setBusinessName] = useState('');
  const [website, setWebsite] = useState(''); 

  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState(''); 
  const [retypeError, setRetypeError] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const passwordIsValid = password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const passwordMatch = retypePassword === password;
  
    setIsValid(
      firstName &&
      lastName &&
      email &&
      passwordIsValid &&
      passwordMatch &&
      isChecked
    );
  }, [firstName, lastName, email, password, retypePassword, isChecked]);

  // Form submission handler
  const handleSubmit = async () => {
    const body = {
      firstName,
      lastName,
      email,
      businessName,
      website,
      password,
      role: "seller"
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup-seller`,
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
      } else {
        showSnackbar(data.message, "error");  
      }
    } catch (error) {
      showSnackbar(error, "error");  
    }
  };

  return (
    <FlexBox flexDirection="column" sx={{ width:'100%', gap:2, py:{xs:1, sm:2} }}>
      <PartnerSignUpForm
        email={email}
        setEmail={setEmail}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        businessName={businessName}
        setBusinessName={setBusinessName}
        website={website}
        setWebsite={setWebsite}
        password={password}
        setPassword={setPassword}
        retypePassword={retypePassword}
        setRetypePassword={setRetypePassword}
        retypeError={retypeError}
        setRetypeError={setRetypeError}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
      <AuthSubmitButton
        title="Sign Up"
        isValid={isValid}
        onClick={handleSubmit}
      />
    </FlexBox>
  )
};

export default RegisterPartnerPageView;