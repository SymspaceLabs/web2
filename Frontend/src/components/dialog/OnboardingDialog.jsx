import { useMediaQuery, IconButton, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

import { Preferences,LogoWithTitle, Measurements, DOB } from './components';


const OnboardingDialog = ({ open, onClose, user }) => {

    const [loading, setLoading] = useState(false);
    const [useMetric, setUseMetric] = useState(true);
    const [height, setHeight] = useState(
        {
            feet: 0,
            inches: 0,
            cm: 0,
        }
    );

    const [weight, setWeight] = useState(
        {
            lbs: 0,
            kg: Math.round((0) / 2.20462),
        }
    );

    const [dob, setDob] = useState(null);

    const handleSaveSettings = async () => {
        // Validate inputs
        if (!height.cm && (!height.feet || !height.inches)) {
            alert("Please provide a valid height.");
            return;
        }
    
        if (!weight.kg && !weight.lbs) {
            alert("Please provide a valid weight.");
            return;
        }
    
        if (!dob) {
            alert("Please provide your date of birth.");
            return;
        }
    
        // Construct the request body
        const requestBody = {
            userId:user.id,
            height: useMetric ? height.cm.toString() : `${height.feet}'${height.inches}"`,
            weight: useMetric ? weight.kg.toString() : weight.lbs.toString(),
            metric: useMetric ? "metric" : "imperial",
            dob,
        };
        
        try {
            setLoading(true);
    
            // Make the POST request
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/onboarding`,
                requestBody
            );
    
            // Handle success and failure responses
            if (response.status === 201) {
                // alert("Onboarding successfully created!");
                onClose(); // Close the dialog
            } else {
                alert("Failed to create onboarding. Please try again.");
            }
        } catch (error) {
            console.error("Error creating onboarding:", error);
            // alert("An error occurred while creating onboarding.");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    // Media query to detect mobile screens
    const isMobile = useMediaQuery('(max-width:600px)');
    
      
  
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
                title="enjoy shopping confidently & conveniently"
                subTitle="Complete the details below so we can offer better-tailored and personalized services"
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

        <DialogContent sx={{p: isMobile ? 0: '10px'}}>
            <Box sx={{ padding: 1, background: 'transparent' }}>
                <Measurements
                    setUseMetric={setUseMetric}
                    useMetric={useMetric}
                    height={height}
                    setHeight={setHeight}
                    weight={weight}
                    setWeight={setWeight}
                    isMobile={isMobile}
                />
                <Preferences
                    isMobile={isMobile}
                />
                <DOB
                    dob={dob}
                    setDob={setDob}
                    isMobile={isMobile}
                />
            </Box>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-between", padding: isMobile? 2 : "35px" }}>
            <Button
                variant="outlined"
                fullWidth
                sx={{
                    fontSize: isMobile? "10px" : "14px",
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    border: "1px solid #ccc",
                    textTransform: "none",
                    "&:hover": {
                        backgroundColor: "#f5f5f5",
                    },
                    borderRadius:'75px',
                    paddingBottom:'10px',
                    paddingTop:'10px',
                }}
            >
                Advanced Settings
            </Button>
            <Button
                variant="contained"
                fullWidth
                onClick={handleSaveSettings} // Call the save function
                disabled={loading} // Disable button during API call
                sx={{
                    fontSize: isMobile? "10px" : "14px",
                    paddingBottom:'10px',
                    paddingTop:'10px',
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    textTransform: "none",
                    "&:hover": {
                        backgroundColor: "#333333",
                    },
                    marginRight: "8px",
                    borderRadius:'75px',
                }}
                >
                {loading ? 'Saving...' : 'Save Settings'}
            </Button>
        </DialogActions>
    </Dialog>
  );
};
    

export default OnboardingDialog


