// =========================================================
// Onboarding Dialog
// =========================================================

import axios from 'axios';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from "@/contexts/SnackbarContext";
import { Preferences, LogoWithTitle, Measurements, DOB } from './components';
import { useMediaQuery, IconButton, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';


const OnboardingDialog = ({ open, onClose, user }) => {

    const router = useRouter();
    
    const { showSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(false);
    const [isMetric, setIsMetric] = useState(true);
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

    {/* Preferences */}
    const [gender, setGender] = useState();
    const [styles, setStyles] = useState([]);
    const [fits, setFits] = useState([]);
    const [colors, setColors] = useState([]);
    const [brands, setBrands] = useState([]);
    const [tops, setTops] = useState([]);
    const [bottoms, setBottoms] = useState([]);
    const [outerwears, setOuterwears] = useState([]);
    const [accessories, setAccessories] = useState([]);

    {/* DOB */}
    const [dob, setDob] = useState(null);

    const handleSaveSettings = async () => {
    
        // Construct the request body
        const requestBody = {
            "measurement" : {
                "weight":weight.kg,
                "height":height.cm,
                "isMetric":isMetric
            },
            "preference" : {
                "gender":gender,
                "tops": tops,
                "bottoms":bottoms,
                "outerwears": outerwears,
                "accessories": accessories,
                "styles": styles,
                "fits": fits,
                "brands": brands,
                "colors": colors
            },
            "user" : {
                "dob": dob
            }
            
        };
        
        try {
            // Make the POST request
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/onboarding/user/${user.id}`,
                requestBody
            );
            // Handle success and failure responses
            if (response.status === 201) {
              showSnackbar(response.data.message, "success");
              onClose(); // Close the dialog
            } else {
              // alert("Failed to create onboarding. Please try again.");
            }
            
        }  catch (error) {
            console.error("Error creating onboarding:", error);
            // alert("An error occurred while creating onboarding.");
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
                    borderRadius: isMobile ? "20px" : "40px",
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
                        top: 10,
                        right: 15,
                        color: "#ffffff",
                        background : 'transparent',
                        "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.5)",
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{p: isMobile ? 0: '10px'}}>
                <Box sx={{ padding: 1, background: 'transparent' }}>
                    <Measurements
                        setIsMetric={setIsMetric}
                        isMetric={isMetric}
                        height={height}
                        setHeight={setHeight}
                        weight={weight}
                        setWeight={setWeight}
                        isMobile={false}
                        sidebar={true}
                    />
                    <Preferences
                        gender={gender}
                        setGender={setGender}
                        styles={styles}
                        setStyles={setStyles}
                        setFits={setFits}
                        fits={fits}
                        colors={colors}
                        setColors={setColors}
                        brands={brands}
                        setBrands={setBrands}
                        tops={tops}
                        setTops={setTops}
                        bottoms={bottoms}
                        setBottoms={setBottoms}
                        outerwears={outerwears}
                        setOuterwears={setOuterwears}
                        accessories={accessories}
                        setAccessories={setAccessories}
                        sidebar={true}
                        isMobile={isMobile}
                        isEdit={true}
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
                    onClick={()=> router.push('/profile')} // Call the save function
                    sx={{
                        fontSize: isMobile? "10px" : "14px",
                        background: "#FFF",
                        color: "#000000",
                        border: "1px solid #CCC",
                        borderRadius:'75px',
                        py:'10px',
                        "&:hover": {
                            background: "#F5F5F5",
                        },
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


