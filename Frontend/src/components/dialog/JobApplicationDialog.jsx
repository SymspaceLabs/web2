"use client"

import React, { useState, useEffect, useMemo } from "react";
import { useMediaQuery, IconButton, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { Preferences, LogoWithTitle, Measurements, DOB } from './components';
import { useSnackbar } from "@/contexts/SnackbarContext";
import JobForm from '../forms/JobForm';

const JobApplicationDialog = ({ open, onClose, job }) => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const { showSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [role, setRole] = useState('');
    const [comments, setComments] = useState('');
    const [uploadedFile, setUploadedFile] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const handleSubmit = async () => {
        
        // Construct the request body
        const requestBody = {

        };
        
        // try {
        //     // Make the POST request
        //     const response = await axios.post(
        //         `${process.env.NEXT_PUBLIC_BACKEND_URL}/onboarding/user/${user.id}`,
        //         requestBody
        //     );
        //     // Handle success and failure responses
        //     if (response.status === 201) {
        //       showSnackbar(response.data.message, "success");
        //       onClose(); // Close the dialog
        //     } else {
        //       // alert("Failed to create onboarding. Please try again.");
        //     }
            
        // }  catch (error) {
        //     console.error("Error creating onboarding:", error);
        //     // alert("An error occurred while creating onboarding.");
        // }
    };

     const buttonStyles = useMemo(() => ({
       fontFamily:'Elemental End',
       textTransform:'lowercase',
       fontWeight: 'bold',
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

       useEffect(() => {
         setIsValid(
             firstName && 
             lastName && 
             email && 
             password &&
             repeatPassword &&
             linkedin &&
             role &&
             comments &&
             isChecked
         );
       }, [firstName, lastName, email, password, repeatPassword, linkedin, role, comments, isChecked]);
    
      
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                style: {
                    backgroundColor: "#888888",
                    borderRadius: isMobile ? "20px" : "80px",
                    boxShadow:
                        "0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)",
                },
            }}
        >
            <DialogTitle id="scroll-dialog-title" sx={{ position: "relative" }}>
                <LogoWithTitle
                    title="Get started"
                    subTitle="Fill out the form and attach your resume so we can contact you. At Symspace, you can be sure about making positive change."
                    isMobile={isMobile}
                />
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        top: 15,
                        right: 25,
                        color: "#ffffff",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.7)",
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <Box sx={{ padding: {xs:0, sm:10}, background: 'transparent' }}>
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
                        linkedin={linkedin}
                        setLinkedin={setLinkedin}
                        role={role}
                        setRole={setRole}
                        comments={comments}
                        setComments={setComments}
                        uploadedFile={uploadedFile}
                        setUploadedFile={setUploadedFile}
                        isChecked={isChecked}
                        setIsChecked={isChecked}
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ display: "flex", justifyContent: "space-between", padding: isMobile? 2 : "35px" }}>
                <Box sx={{width:'100%', p:'10px' }}>
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
            </DialogActions>
        </Dialog>
    );
};
    

export default JobApplicationDialog


