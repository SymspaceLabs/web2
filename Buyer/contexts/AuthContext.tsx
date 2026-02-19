"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  logout: () => Promise<void>;
  handleAuthResponse: (userData: User, userToken: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  const logout = async (): Promise<void> => {
    try {
      // Replaced Axios with native fetch
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        method: 'GET',
        // 'include' ensures cookies are sent, similar to axios 'withCredentials: true'
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
          // If your backend requires the token in the header:
          // 'Authorization': `Bearer ${token}` 
        },
      });

      if (!response.ok) {
        throw new Error(`Logout failed with status: ${response.status}`);
      }

      // Reset state and storage
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
      
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('onboardingDialogClosed');
      localStorage.removeItem('favoriteIds');
      localStorage.removeItem('favoriteData');
      
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleAuthResponse = (userData: User, userToken: string): void => {
    setUser(userData);
    setToken(userToken);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userToken);
    router.push('/marketplace');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, logout, handleAuthResponse }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};