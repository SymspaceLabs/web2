import React from 'react'
import { Box, Container, Button, CircularProgress } from "@mui/material";

const FooterButtons = ({
    handleBack,
    activeStep,
    handleSaveAndExit,
    loading,
    handleNext,
    allStepsCompleted,
    isLastStep
}) => {
  return (
    <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
                onClick={handleBack}
                variant="contained"
                color="info"
                disabled={activeStep === 0 || loading} // Disable if on the first step or loading
                sx={{ padding: '5px 46px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)', boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(50px)', borderRadius: '12px' }}
            >
                Back
            </Button>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                    onClick={handleSaveAndExit}
                    variant="contained"
                    color="info"
                    disabled={loading} // Disable if loading
                    sx={{ padding: '5px 46px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)', boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(50px)', borderRadius: '12px' }}
                >
                    Save & Exit
                </Button>
                <Button
                    onClick={handleNext}
                    variant="contained"
                    color="info"
                    disabled={allStepsCompleted() || loading} // Disable if all steps are complete or loading
                    sx={{ padding: '5px 46px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)', boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(50px)', borderRadius: '12px' }}
                >
                    {/* Conditional rendering for loading spinner */}
                    {loading ? (
                        <CircularProgress color="inherit" size={20} />
                    ) : (
                        isLastStep() ? 'Review & Submit' : 'Next'
                    )}
                </Button>
            </Box>
        </Box>
    </Container>
  )
}

export default FooterButtons