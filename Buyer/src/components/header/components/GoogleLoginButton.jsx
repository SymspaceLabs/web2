'use client';

 // =======================================

import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import googleLogo from "../../../../public/assets/images/icons/google-1.svg";
import Image from "next/image"; // MUI


const GoogleLoginButton = ({ handleAuthResponse }) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google) {
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogleLoginSuccess,
      });
    }
  }, []);


  const handleGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = window.location.origin + '/google-callback'; // Frontend page to handle tokens
    const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=id_token&scope=openid%20email%20profile&prompt=select_account&nonce=random_nonce`;
  
    window.location.href = googleOAuthUrl;
  };
  

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const idToken = response.credential;
      const result = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/google`, { idToken });
      handleAuthResponse(result.data.user, result.data.token);
      router.push('/marketplace');
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      fullWidth 
      size="large" 
      sx={{
        background: '#1A1D21', 
        color: '#fff', 
        my: 1, 
        '&:hover': { 
          background: 'linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)' 
        }
      }}  
    >
      <Image
        alt="google"
        src={googleLogo}
        style={{ height: "25px" }}
      />
    </Button>
  );
};

export default GoogleLoginButton;