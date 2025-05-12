"use client";

// =====================================================================
// Register Applicant Page
// =====================================================================

import React, { useState, useMemo } from "react";
import { Box, Button } from '@mui/material';
import JobForm from "@/components/custom-forms/JobForm";
import { useAuth } from "@/contexts/AuthContext";
import { styles } from "./styles";

const RegisterApplicantPageView = () => {

    const { isAuthenticated } = useAuth();
  
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [linkedInUrl, setLinkedInUrl] = useState('');
    const [role, setRole] = useState('');
    const [comments, setComments] = useState('');
    const [uploadedFile, setUploadedFile] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [isValid, setIsValid] = useState(true);


  const buttonStyles = useMemo(() => ({
    ...styles.elementalEndFont,
    background: isValid
        ? "linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)"
        : "linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)",
    boxShadow: "0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)",
    backdropFilter: "blur(50px)",
    borderRadius: "12px",
    color: '#fff',
    cursor: isValid ? 'pointer' : 'not-allowed',
    pointerEvents: isValid ? 'auto' : 'none',
    '&:hover': {
        background: isValid
            ? "linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)"
            : "linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)",
    },
  }), [isValid]);

  const handleSubmit = async () => {
  
  };




  return (
    <Box>
      <JobForm
        email={email}
        setEmail={setEmail}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        password={password}
        setPassword={setPassword}
        repeatPassword={repeatPassword}
        setRepeatPassword={setRepeatPassword}
        linkedInUrl={linkedInUrl}
        setLinkedInUrl={setLinkedInUrl}
        role={role}
        setRole={setRole}
        comments={comments}
        setComments={setComments}
        uploadedFile={uploadedFile}
        setUploadedFile={setUploadedFile}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        isAuthenticated={isAuthenticated}
      />
      <Button 
        sx={buttonStyles} 
        fullWidth 
        type="submit" 
        color="primary" 
        variant="contained" 
        size="large"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </Button>
    </Box>
  )
};

export default RegisterApplicantPageView;