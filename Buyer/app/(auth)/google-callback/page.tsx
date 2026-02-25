'use client';

// =============================================
// Google OAuth Callback Handler
// =============================================

import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function GoogleCallback() {
  const router = useRouter();
  const { handleAuthResponse } = useAuth();

  useEffect(() => {
    // Extract id_token from URL
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.hash.substring(1));
    const idToken = params.get('id_token');

    if (idToken) {
      // Send idToken to your backend
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Login failed');
          return res.json();
        })
        .then((data) => {
          handleAuthResponse(data.user, data.accessToken);
          router.push('/marketplace');
        })
        .catch((error) => {
          console.error('Login failed:', error);
          router.push('/login');
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