import { useEffect } from "react";
import { useAuth } from '../../../contexts/AuthContext';
import Image from "next/image"; // MUI
import Button from "@mui/material/Button";
import appleLogo from "../../../../public/assets/images/icons/apple-white.svg"; // =======================================
import axios from 'axios';
import { useRouter } from "next/navigation";

const AppleSigninButton = () => {
  const { handleAuthResponse } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (window.AppleID) {
      window.AppleID.auth.init({
        clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID,
        scope: "email name",
        redirectURI: "https://festaging.symspacelabs.com",
        state: "state-value",
        usePopup: true,
      });      
    }
  }, []);

  const handleAppleResponse = async (response) => {
    try {
      console.log("Apple Sign-in Response:", response);
  
      // Extract `id_token` from the response
      const { id_token } = response.authorization;
  
      // Log the `id_token` for debugging purposes
      console.log("ID Token:", id_token);
  
      // Make a POST request to the backend with the `idToken` as the body
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/apple`,
        { idToken: id_token } // Use key-value pair with consistent casing
      );
  
      // Log the backend response for debugging
      console.log("Login Result:", result.data);
  
      // Handle the response
      handleAuthResponse(result.data.user, result.data.accessToken);
  
      // Redirect to the marketplace
      router.push('/marketplace');
    } catch (error) {
      // Handle errors and log them for debugging
      console.error("Apple login failed:", error.response?.data || error.message);
    }
  };
  

  return (
    <Button 
      onClick={() => {
        if (window.AppleID) {
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
      <Image 
        alt="apple" 
        src={appleLogo} 
        style={{ height: '25px' }} 
      />
    }
  />
  );
};

export default AppleSigninButton;
