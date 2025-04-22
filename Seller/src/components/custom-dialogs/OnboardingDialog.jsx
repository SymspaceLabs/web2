// ===================================================================
// Onboarding Dialog
// ===================================================================

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import CloseIcon from '@mui/icons-material/Close';
import { FlexBox, FlexCol } from '@/components/flex-box';
import { SymProgressbar } from "@/components/custom-components";
import { OnboardingMultiStepForm } from '@/components/multi-step-forms';
import { CircularProgress, IconButton, Button, Dialog, DialogContent, DialogTitle, useMediaQuery, DialogActions } from '@mui/material';

// ===================================================================

const OnboardingDialog = ({
    open,
    setOpen,
    setStoreDialogOpen
}) => {

    const { user } = useAuth();
    const [userData, setUserData] = useState();
    const [formData, setFormData] = useState();
    const [step, setStep] = useState(0); // 0 for WelcomeDialog, 1+ for Onboarding
    const [isChecked, setIsChecked] = useState(false); // 0 for WelcomeDialog, 1+ for Onboarding
    const [uploadedFile, setUploadedFile] = useState([]); // Used For Form4 (File Uploader)
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user.id}`);
            const data = await response.json();
            setUserData(data);
          } catch (error) {
            console.error("Error fetching blogs:", error);
          }
        };
        fetchUser();
    }, [step]);


    const handleClose = () => setOpen(false);
    
    const handleContinue = async () => {
        if (loading) return; // Prevent multiple clicks

        if (step === 1 && !isChecked) return;

        setLoading(true); // Start loading

        try {
            await handleSubmit(); // Wait for API response
            setStep((prev) => prev + 1);
            setFormData({});
        } catch (error) {
            console.error("Error in submission:", error);
        } finally {
            setLoading(false); // Stop loading
        }

    };

    const handleBack = async () => {
        setFormData({});
        try {
            await handleSubmit(); // Wait for API response
            setStep((prev) => prev - 1);
            setFormData({});
        } catch (error) {
            console.error("Error in submission:", error);
        } finally {
            setLoading(false); // Stop loading
        }
        
    };

    const handleSubmit = async () => {
        let updatedFormData = { ...formData };
        const newUploadedFiles = [];
    
        try {
            //FILE UPLOADING SERVICE
            const validFiles = uploadedFile.filter((file) => file); // remove null/undefined/empty

            if (validFiles.length > 0) {
                const uploadPromises = validFiles.map(async (file) => {
                    const fileData = new FormData();
                    fileData.append("file", file);

                    const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/image`, {
                        method: "POST",
                        body: fileData,
                    });

                    if (!uploadResponse.ok) {
                        throw new Error("Failed to upload a file.");
                    }

                    const { url } = await uploadResponse.json();
                    return { url };
                });

                const uploadedFiles = await Promise.all(uploadPromises);
                newUploadedFiles.push(...uploadedFiles);
                const existingFiles = formData.files || [];
                const allFiles = [...existingFiles, ...newUploadedFiles].filter(f => f && f.url);
    
                updatedFormData = {
                    ...formData,
                    file: allFiles,
                };
        
                delete updatedFormData.files;
            }

            if(step !== 4){
                delete updatedFormData.file;
            }


            // DATA SAVING SERVICE
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller-onboarding/${user.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedFormData),
            });
    
            if (!response.ok) throw new Error("Failed to save data");
    
            console.log("Data saved successfully:", await response.json());
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    const handleOpenStoreDialog = () => {
        handleClose();
        setStoreDialogOpen(true);
    }

    // Milestone labels
    const milestoneLabels = ["business", "billing", "survey", "review & Submit", ""];
    
    return (
        <Dialog
            open={open}
            maxWidth="lg"
            fullWidth
            disableEscapeKeyDown
            disableBackdropClick
            PaperProps={{
                style: {
                    background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)',
                    boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: useMediaQuery('(max-width:600px)') ? "20px" : "50px",
                    paddingBottom: 5,
                    paddingTop: 5,
                    paddingLeft: 5,
                    paddingRight: 5,
                },
            }}
        >
            <DialogTitle sx={{ position: "relative" }}>
                {/* Progress Bar */}
                {(step > 0 && step < 5 ) && (
                    <SymProgressbar milestoneLabels={milestoneLabels} step={step} />
                )}

                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        top: 15,
                        right: 25,
                        color: "#ffffff",
                        "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.7)",
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: { xs: 0, sm: '25px' } }}>
                <FlexCol gap={3}>
                    <OnboardingMultiStepForm 
                        step={step}
                        handleContinue={handleContinue}
                        handleBack={handleBack}
                        user={userData}
                        setFormData={setFormData}
                        isChecked={isChecked}
                        setIsChecked={setIsChecked}
                        uploadedFile={uploadedFile}
                        setUploadedFile={setUploadedFile}
                        handleClose={handleClose}
                        handleOpenStoreDialog={handleOpenStoreDialog}
                    />
                </FlexCol>
            </DialogContent>

            <DialogActions>
                <FlexBox p={3} width="100%" justifyContent={step > 1 ? "space-between" : "flex-end"  }>
                    {
                        (step > 1 && step < 5) &&  <Button sx={styles.btn} onClick={handleBack}>
                            Back
                        </Button>
                    }
                    {
                        step < 5 && (
                            <Button sx={styles.btn} onClick={handleContinue}>
                                {loading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    step === 0 ? "Continue" : "Continue"
                                )}
                            </Button>

                        )
                    }
                </FlexBox>
            </DialogActions>
        </Dialog>
    );
};

export default OnboardingDialog;

const styles = {
    btn: {
        background: 'linear-gradient(94.44deg, #666666 29%, #000000 100%)',
        boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(50px)',
        borderRadius: '30px',
        color: '#FFF',
        px: 2,
        fontSize: { xs: 12, sm: 16 },
        fontWeight: 500,
        '&:hover': {
            background: 'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)'
        }
    }
};
