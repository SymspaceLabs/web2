"use client";

/**
 * RegisterPartnerPageView Component
 * 
 * This component provides a registration form for users to create an account as a seller. 
 * It includes fields for user details such as first name, last name, email, business name, 
 * website, password, and a retype password. The form validates inputs using Yup schema, 
 * and upon submission, sends the data to the backend for account creation.
 */


import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FlexBox } from "../../../components/flex-box";
import { useSnackbar } from "../../../contexts/SnackbarContext";
import { PartnerSignUpForm } from "../../../components/forms";
import { AuthSubmitButton } from "../../../components/custom-buttons";
import { BoxLink } from '../../../pages-sections/sessions/components';
import { Span } from '../../../components/Typography';

const RegisterPartnerPageView = () => {
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(''); 
  const [businessName, setBusinessName] = useState('');
  const [website, setWebsite] = useState(''); 
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState(''); 
  const [retypeError, setRetypeError] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [location, setLocation] = useState('');
  const [ein, setEin] = useState('');

  useEffect(() => {
    const passwordIsValid = password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const passwordMatch = retypePassword === password;
    
    setIsValid(
      firstName &&
      lastName &&
      email &&
      location &&
      ein &&
      passwordIsValid &&
      passwordMatch
    );
  }, [firstName, lastName, email, password, location, ein, retypePassword]);

  // Form submission handler
  const handleSubmit = async () => {
    const body = {
      firstName,
      lastName,
      email,
      businessName,
      website,
      location,
      ein,
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
        router.push(`/otp?email=${email}`);
      } else {
        showSnackbar(data.message, "error");  
      }
    } catch (error) {
      showSnackbar(error, "error");  
    }
  };

  return (
    <FlexBox flexDirection="column" sx={{ width:'100%', gap:2, py:{xs:1, sm:2} }}>
      
      {/* Sign Up form */}
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
        location={location}
        setLocation={setLocation}
        ein={ein}
        setEin={setEin}
      />

      {/* Submit Button */}
      <AuthSubmitButton
        title="Sign Up"
        isValid={isValid}
        onClick={handleSubmit}
      />

      {/* Checkbox */}
      <Span display={{ color:'#fff', sm: "inline-block" }}>
        By clicking Sign Up, you agree to our <BoxLink title="Terms" href="/legal#terms" />, <BoxLink title="Privacy Policy" href="/legal#privacy-policy" /> and <BoxLink title="Cookies" href="/legal#cookies" />. You may receive SMS Notifications from us and can opt out any time.
      </Span> 
    </FlexBox>
  )
};

export default RegisterPartnerPageView;