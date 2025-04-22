"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";

// Create a context
const AuthContext = createContext();

// AuthProvider component to provide auth state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Add loading state

  const router = useRouter();

  useEffect(() => {
    // Check localStorage for existing user data and token
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setIsAuthenticated(true);
    }
    setLoading(false); // ✅ Mark as done checking

  }, []);

  const logout = async () => {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        withCredentials: true,
      });
      // Reset state after successful logout
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('onboardingDialogClosed');
      router.push("/"); // Redirect using Next.js router
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleAuthResponse = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userToken);
    router.push('/marketplace');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, logout, handleAuthResponse, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
