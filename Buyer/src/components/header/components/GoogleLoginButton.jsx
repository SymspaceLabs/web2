// GoogleLoginButton.js
import './styles.css';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from "next/navigation";

export default function GoogleLoginButton() {
  const { handleAuthResponse } = useAuth();
  const router = useRouter();

  const handleGoogleLoginSuccess = async (response) => {
    try {
      console.log(response);
      const idToken = response.credential;
      const result = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/google`, { idToken });
      handleAuthResponse(result.data.user, result.data.token);
      router.push('/marketplace');
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleLoginSuccess}
      onError={() => console.error("Google login error")}
      useOneTap={false}
      ux_mode="popup"
    />
  );
}
