// ==============================
// Apple Sign-In Button Component
// ==============================

// --- React and App Context Imports ---
import { useEffect } from "react"; // React hook for side effects
import { useAuth } from '../../../contexts/AuthContext'; // Custom hook for authentication context

// --- UI and Utility Imports ---
import Button from "@mui/material/Button"; // MUI Button component
import axios from 'axios'; // For HTTP requests
import { useRouter } from "next/navigation"; // Next.js router for navigation

// --- Main Apple Sign-In Button Component ---
const AppleSigninButton = () => {
  // Get authentication handler from context
  const { handleAuthResponse } = useAuth();
  // Get Next.js router instance
  const router = useRouter();

  const currentHost = window.location.origin;
  console.log(currentHost);

  // --- Initialize AppleID JS SDK on mount ---
  useEffect(() => {
    if (window.AppleID) {
      window.AppleID.auth.init({
        clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID, // Apple client ID from env
        scope: "email name", // Request email and name
        redirectURI: `${currentHost}`, // Redirect URI from env
        state: "state-value", // Optional state
        usePopup: true, // Use popup for login
      });      
    }
  }, []);

  // --- Handle Apple Sign-In Response ---
  const handleAppleResponse = async (response) => {
    try {
      // Extract id_token from Apple response
      const { id_token } = response.authorization;
    
      // Send idToken to backend for authentication
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/apple`,
        { idToken: id_token }
      );
    
      // Save user and token in auth context
      handleAuthResponse(result.data.user, result.data.accessToken);
  
      // Redirect user to marketplace after login
      router.push('/marketplace');
    } catch (error) {
      // Log errors for debugging
      console.error("Apple login failed:", error.response?.data || error.message);
    }
  };
  
  // --- Render Apple Sign-In Button ---
  return (
    <Button 
      onClick={() => {
        // Trigger Apple sign-in popup
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
        <img
          src="/assets/images/icons/apple-white.svg"
          style={{
            width: "100%",
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