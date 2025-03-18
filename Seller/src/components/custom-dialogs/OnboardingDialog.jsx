import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { FlexColCenter, FlexBox, FlexCol } from '@/components/flex-box';
import { OnboardingMultiStepForm } from '../multi-step-forms';
import { IconButton, Button, Dialog, DialogContent, DialogTitle, useMediaQuery, Typography, Box } from '@mui/material';
import LazyImage from '../LazyImage';
import { useAuth } from '@/contexts/AuthContext';

const OnboardingDialog = () => {
    const [open, setOpen] = useState(true);
    const { user } = useAuth();
    const [step, setStep] = useState(0); // 0 for WelcomeDialog, 1+ for Onboarding

    const handleClose = () => setOpen(false);
    const handleContinue = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);


    // Media query to detect mobile screens
    const isMobile = useMediaQuery('(max-width:600px)');
    
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
                    borderRadius: isMobile ? "20px" : "50px",
                    paddingBottom: 5,
                    paddingTop: 5,
                    paddingLeft: 5,
                    paddingRight: 5,
                },
            }}
        >
            <DialogTitle sx={{ position: "relative" }}>
                <IconButton
                    onClick={handleClose}
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

            <DialogContent sx={{ p: { xs: 0, sm: '25px' } }}>
                <FlexCol gap={3}>
                    {/* Show WelcomeDialog if step is 0 */}
                    {step === 0 ? (
                        <>
                            <DialogTitle sx={{ pt: { xs: 3, sm: 5 }, pb: { xs: 3, sm: 5 } }}>
                                <FlexColCenter>
                                    <Box width={250}>
                                        <LazyImage src="/assets/images/dashboard/welcome.png" width={500} height={500} />
                                    </Box>
                                </FlexColCenter>
                                <FlexColCenter gap={2}>
                                    <Typography sx={styles.titleHeader}>congrats, {user.firstName}!</Typography>
                                    <Typography sx={{ ...styles.titleHeader, fontSize: 32 }}>you're officially a seller</Typography>
                                    <Typography sx={styles.subtitle}>
                                        We’re excited to have you join our community and AR marketplace.<br />
                                        Continue to complete setting up your business prior to listing products
                                    </Typography>
                                </FlexColCenter>
                            </DialogTitle>
                        </>
                    ) : (
                        <OnboardingMultiStepForm step={step} />
                    )}
                    <FlexBox justifyContent={step > 1 ? "space-between" : "flex-end"  }>
                        {
                            step > 0 && <Button sx={styles.btn} onClick={handleBack}>
                                Back
                            </Button>
                        }
                        
                        <Button sx={styles.btn} onClick={handleContinue}>
                            Continue
                        </Button>
                    </FlexBox>
                </FlexCol>
            </DialogContent>
        </Dialog>
    );
};

export default OnboardingDialog;

const styles = {
    titleHeader: {
        lineHeight: 1.25,
        fontFamily: 'Elemental End',
        textTransform: 'lowercase',
        color: '#fff',
        fontSize: { xs: 16, sm: 40 },
        textAlign: 'center',
        letterSpacing: '0.05em',
        wordSpacing: '0.1em',
    },
    subtitle: {
        color: '#FFF',
        fontSize: { xs: 16, sm: 20 },
        textAlign: 'center',
        fontWeight: 400,
    },
    btn: {
        background: 'linear-gradient(94.44deg, #666666 29%, #000000 100%)',
        boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(50px)',
        borderRadius: '30px',
        color: '#FFF',
        fontFamily: 'Elemental End',
        textTransform: 'lowercase',
        px: 2,
        fontSize: { xs: 12, sm: 16 },
        fontWeight: 500,
        '&:hover': {
            background: 'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)'
        }
    }
};
