import AuthLayout from "../../pages-sections/sessions/layout";
import { GoogleOAuthProvider } from '@react-oauth/google';  
export default function Layout({children}) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <AuthLayout>{children}</AuthLayout>
    </GoogleOAuthProvider>
  );
}