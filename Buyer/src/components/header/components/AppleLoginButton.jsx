import { useEffect, useState } from "react";
import { useAuth } from '../../../contexts/AuthContext';
import Button from "@mui/material/Button";
import axios from 'axios';
import { useRouter } from "next/navigation";

const AppleSigninButton = () => {
  const { handleAuthResponse } = useAuth();
  const router = useRouter();

  // ✅ New state to store currentHost
  const [currentHost, setCurrentHost] = useState("");

  // ✅ This only runs on client, so window is safe
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setCurrentHost(window.location.origin);

  //     if (window.AppleID) {
  //       window.AppleID.auth.init({
  //         clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID,
  //         scope: "email name",
  //         redirectURI: process.env.NEXT_PUBLIC_APPLE_CALLBACK_URL, // or use currentHost
  //         state: "state-value",
  //         usePopup: true,
  //       });
  //     }
  //   }
  // }, []);
  useEffect(() => {
    if (typeof window !== "undefined" && window.AppleID) {
      window.AppleID.auth.init({
        clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID,
        scope: "email name",
        // redirectURI: "https://www.symspacelabs.com/auth/apple/callback",
        usePopup: true,
      });
    }
  }, []);

  console.log(window.location.origin)
  console.log(process.env.NEXT_PUBLIC_APPLE_CLIENT_ID)
  console.log(process.env.NEXT_PUBLIC_APPLE_CALLBACK_URL)



  const handleAppleResponse = async (response) => {
    try {
      const { id_token } = response.authorization;
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/apple`,
        { idToken: id_token }
      );

      handleAuthResponse(result.data.user, result.data.accessToken);
      router.push('/marketplace');
    } catch (error) {
      console.error("Apple login failed:", error.response?.data || error.message);
    }
  };

  return (
    <Button 
      onClick={() => {
        if (typeof window !== "undefined" && window.AppleID) {
          window.AppleID.auth.signIn().then(handleAppleResponse).catch(console.error);
        }
      }}
      fullWidth 
      size="large" 
      sx={{
        fontFamily: 'Helvetica', 
        fontSize: 12, 
        background: '#1A1D21', 
        color: '#fff', 
        my: 1, 
        '&:hover': { 
          background: 'linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)' 
        }
      }}  
      startIcon={
        <img
          src="/assets/images/icons/apple-white.svg"
          style={{
            width: 25,
            height: "auto"
          }}
          alt="apple"
        />
      }
    />
  );
};

export default AppleSigninButton;
