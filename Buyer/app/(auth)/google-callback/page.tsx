'use client';

// =============================================
// Google OAuth Callback Handler
// =============================================

import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export default function GoogleCallback() {
  const router = useRouter();
  const { handleAuthResponse } = useAuth();

  useEffect(() => {
    // Extract id_token from URL
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.hash.substring(1)); // Remove '#' then parse
    const idToken = params.get('id_token');

    if (idToken) {
      // Send idToken to your backend
      axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/google`, { idToken })
        .then((response) => {
          handleAuthResponse(response.data.user, response.data.accessToken);
          router.push('/marketplace'); // After successful login
        })
        .catch((error) => {
          console.error('Login failed:', error);
        });
    } else {
      console.error('No id_token found in URL');
    }
  }, [router, handleAuthResponse]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}