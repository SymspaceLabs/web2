// components/header-wrapper.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import Header from './header';

export default function HeaderWrapper() {
  const { isAuthenticated } = useAuth();
  
  return (
    <Header isAuthenticated={isAuthenticated} />
  );
}