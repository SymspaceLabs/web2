"use client";

// =======================================================================
// Register Seller Page View
// =======================================================================

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Span } from '@/components/Typography';
import { FlexBox } from "@/components/flex-box";
import { PartnerSignUpForm } from "@/components/custom-forms/auth";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { SymSubmitButton} from "@/components/custom-buttons";
import { BoxLink } from '@/pages-sections/sessions/components';

// =======================================================================

const RegisterPartnerPageView = () => {
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(''); 
  const [businessName, setBusinessName] = useState('');
  const [website, setWebsite] = useState(''); 
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState(''); 
  const [retypeError, setRetypeError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [location, setLocation] = useState('');
  const [ein, setEin] = useState(null);


  useEffect(() => {
    const passwordIsValid = password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const passwordMatch = retypePassword === password;

    const isEinFilled = (ein !== null)?true:false;
    setIsValid(
      firstName &&
      lastName &&
      email &&
      passwordIsValid &&
      passwordMatch &&
      location &&
      isEinFilled 
    );

  }, [firstName, lastName, email, password, location, ein, retypePassword]);
    
  // Form submission handler
  const handleSubmit = async () => {

    setLoading(true);

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
        router.push(`/verify-otp?email=${email}`);
      } else {
        showSnackbar(data.message, "error");  
      }
    } catch (error) {
      showSnackbar(error, "error");  
    } finally {
      setLoading(false);
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
      <SymSubmitButton isValid={isValid} onClick={handleSubmit} loading={loading}>
        Sign Up
      </SymSubmitButton>


      {/* Checkbox */}
      <Span display={{ color:'#fff', sm: "inline-block" }}>
        By clicking Sign Up, you agree to our <BoxLink href={`${process.env.NEXT_PUBLIC_BUYER_URL}/terms-and-conditions#terms`}>Terms</BoxLink>, <BoxLink href={`${process.env.NEXT_PUBLIC_BUYER_URL}/terms-and-conditions#privacy`}>Privacy Policy</BoxLink> and <BoxLink href={`${process.env.NEXT_PUBLIC_BUYER_URL}/terms-and-conditions#cookies`}>Cookies</BoxLink>. You may receive SMS Notifications from us and can opt out any time.
      </Span> 
    </FlexBox>
  )
};

export default RegisterPartnerPageView;