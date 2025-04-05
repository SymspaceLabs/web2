"use client"

// =========================================================
// Job Application Form 
// =========================================================

import { useState, useEffect, useMemo } from "react";
import { IconButton, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LogoWithTitle } from './components';
import { useSnackbar } from "@/contexts/SnackbarContext";
import JobForm from '../forms/JobForm';
import { useAuth } from "@/contexts/AuthContext";
import { styles } from "./styles";

// =========================================================

const JobApplicationDialog = ({ open, onClose, job }) => {

    const { showSnackbar } = useSnackbar();
    const { isAuthenticated } = useAuth();

    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [linkedInUrl, setLinkedInUrl] = useState('');
    const [role, setRole] = useState(job.title);
    const [comments, setComments] = useState('');
    const [uploadedFile, setUploadedFile] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const handleSubmit = async () => {
        if (!uploadedFile || uploadedFile.length === 0) {
            showSnackbar("Please upload at least one resume before submitting.", "error");
            return;
        }
    
        setLoading(true);
    
        try {
            let resumeUrls = [];
    
            // Step 1: Upload files one by one
            for (const file of uploadedFile) {
                const formData = new FormData();
                formData.append("file", file);
    
                const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/image`, {
                    method: "POST",
                    body: formData,
                });
    
                if (!uploadResponse.ok) {
                    throw new Error("Failed to upload a file.");
                }
    
                const { url } = await uploadResponse.json();
                resumeUrls.push(url); // Collect the uploaded file URL
            }
    
            // Step 2: Construct the request body
            const requestBody = {
                email,
                firstName,
                lastName,
                linkedInUrl,
                role,
                jobId: job.id,
                resumeUrls, // Use the collected URLs
            };
    
            // Step 3: Submit the job application
            const applicationResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/job-applications`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });
    
            if (!applicationResponse.ok) {
                throw new Error("Failed to submit job application.");
            }
    
            showSnackbar("Application submitted successfully!", "success");
            onClose(); // Close dialog on success
        } catch (error) {
            showSnackbar(error.message, "error");
        } finally {
            setLoading(false);
        }
    };    

    const buttonStyles = useMemo(() => ({
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
            linkedInUrl &&
            role &&
            comments &&
            isChecked
        );
    }, [firstName, lastName, email, linkedInUrl, role, comments, isChecked]);
    
      
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            PaperProps={{
                style: {
                    maxWidth: "650px", // Set custom max width here
                    width: "100%", // Ensure responsiveness
                    backgroundColor: "rgba(63, 103, 166, 0.8)",
                    backdropFilter: 'blur(10px)',
                    borderRadius: {xs:'20px', sm:'40px'},
                    boxShadow:
                        "0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)",
                },
            }}
        >
            <DialogTitle id="scroll-dialog-title" sx={{ position: "relative" }}>
                <LogoWithTitle
                    title="Get started"
                    subTitle="Fill out the form and attach your resume so we can contact you. At Symspace, you can be sure about making positive change."
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
                <Box sx={{ padding: {xs:0, sm:3}, background: 'transparent' }}>
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
                </Box>
            </DialogContent>

            <DialogActions sx={{ display: "flex", justifyContent: "space-between", padding: {xs:2, sm:"35px"} }}>
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


