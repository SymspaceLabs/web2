"use client";

import { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, useTheme, TextField, Snackbar, Alert } from '@mui/material';
import BlobBox from './blobBox';
import { section1Styles } from './styles';
import LazyImage from '@/components/LazyImage';
import { useRouter } from 'next/navigation';

export default function Section1() {
  const theme = useTheme();
  const styles = section1Styles(theme);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const emailInputRef = useRef(null);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError(''); // Reset error on new input
  };

  const handleEmailSubmit = async () => {
    setError(""); // Reset error state before validation
    if (!isValidEmail(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/potential-users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });
  
      if (response.ok) {
        setIsSubmitted(true);
        setEmail(""); // Clear the input field
        setTimeout(() => {
          setIsSubmitted(false);
          setShowEmailInput(false);
        }, 3000);
      } else {
        const data = await response.json();
        setError(data.message || "Failed to submit email.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  const handleShowEmailInput = () => {
    setShowEmailInput(true);
  };

  // Click outside to hide email input
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emailInputRef.current && !emailInputRef.current.contains(event.target)) {
        setShowEmailInput(false); // Hide email input box
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', py:{ xs:10, sm:25 } }}>
      {/* Content Section */}
      <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Headline */}
        <Typography sx={{ fontFamily: 'Elemental End', color: '#fff', fontSize: { xs: 20, sm: 35, md: 60 } }}>
          Let’s build the future <br /> together
        </Typography>

      </Box>
    </Box>
  );
}
