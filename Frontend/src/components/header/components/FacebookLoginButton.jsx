import { useEffect } from "react";
import { useAuth } from '../../../contexts/AuthContext';
import Image from "next/image"; // MUI
import Button from "@mui/material/Button";
import facebookLogo from "../../../../public/assets/images/icons/facebook-1.svg"; // =======================================
import axios from 'axios';
import { useRouter } from "next/navigation";

const FacebookSigninButton = () => {
  const { handleAuthResponse } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Initialize the Facebook SDK
    window.fbAsyncInit = function () {
      FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID, // Add your Facebook App ID here
        cookie: true,
        xfbml: true,
        version: "v12.0",
      });
    };

    // Load the Facebook SDK script
    (function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const handleFacebookResponse = async (response) => {
    try {
      console.log("Facebook Signin Response:", response);
  
      // Extract `accessToken` from the response
      const { accessToken } = response.authResponse;
  
      if (!accessToken) {
        throw new Error("Access token not found in the response");
      }
  
      // Send the `accessToken` to the backend
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/facebook`,
        { accessToken }
      );
  
      console.log("Backend Response:", result.data);
  
      // Handle the response: save user info and app's access token
      handleAuthResponse(result.data.user, result.data.accessToken);
  
      // Redirect to the marketplace
      router.push('/marketplace');
    } catch (error) {
      console.error("Facebook login failed:", error.response?.data || error.message);
    }
  };
  
  

  return (
    <Button
      onClick={() => {
        FB.login((response) => {
          if (response.status === "connected") {
            handleFacebookResponse(response);
          } else {
            console.error("Facebook login failed:", response);
          }
        }, { scope: "email,public_profile" });
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
          alt="facebook"
          src={facebookLogo}
          style={{ height: "25px" }}
        />
      }
    />
  );
};

export default FacebookSigninButton;
