// =========================================
// Forgot Password Page
// app/(auth)/forgot-password/page.tsx
// =========================================

import { Metadata } from 'next';
import ForgotPasswordPage from '@/pages-section/forgot-password';

export const metadata: Metadata = {
  title: "Forgot Password - Symspace",
  description: "Reset your Symspace account password",
};

export default function ForgotPassword() {
  return <ForgotPasswordPage />
}