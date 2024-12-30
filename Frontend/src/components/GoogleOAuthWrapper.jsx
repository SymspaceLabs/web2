import { GoogleOAuthProvider } from '@react-oauth/google';

const GoogleOAuthWrapper = ({ children }) => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    console.error("Google Client ID is missing. Please set NEXT_PUBLIC_GOOGLE_CLIENT_ID in your environment variables.");
    return null; // Or a fallback UI
  }

  return <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>;
};

export default GoogleOAuthWrapper;
