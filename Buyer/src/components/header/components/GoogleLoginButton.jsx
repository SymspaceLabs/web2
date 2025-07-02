// ============================================
// Google Login Button
// ============================================
'use client';

import { Button } from '@mui/material';

// ============================================


const GoogleLoginButton = () => {

  // The redirect URI where Google will send the user back after authentication.
  // This MUST match an Authorized redirect URI in your Google Cloud Console.
  // Construct the Google OAuth URL for the implicit flow (response_type=id_token)
  // Redirect the user's browser to Google's authentication page
  const handleGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = window.location.origin + '/google-callback'; 
    const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=id_token&scope=openid%20email%20profile&prompt=select_account&nonce=${Math.random().toString(36).substring(2)}`;
    window.location.href = googleOAuthUrl;
  };

  return (
    <Button
      onClick={handleGoogleLogin} // This button's click event triggers the redirect
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
      <img
        src="/assets/images/icons/google-1.svg"
        style={{ 
          width: "100%",
          width: 25,
          height: "auto"
        }}
        alt="google"
      />
    </Button>
  );
};

export default GoogleLoginButton;