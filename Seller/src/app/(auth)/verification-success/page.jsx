"use client"

import { useRouter, useSearchParams  } from "next/navigation";
import { useEffect } from 'react';

export default function VerificationSuccess() {
  const searchParams = useSearchParams()
  const queryRole = searchParams.get('role')
  const router = useRouter();
  
  // useEffect(() => {
  //     if (queryRole === "seller") {
  //       router.push('/vendor/dashboard');
  //     } else {
  //       router.push('/buyer-route');
  //     }
  // }, [queryRole]);
  
  return (
    <div>
      <h1>Email Verified Successfully</h1>
      <p>Thank you for verifying your email. You can now log in.</p>
    </div>
  );
}
