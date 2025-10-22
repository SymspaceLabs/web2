"use client";

import { useState, useRef } from "react";
import { H1 } from "@/components/Typography";
import { Box, Container, Button, styled, StepConnector } from "@mui/material";

import ProductForm1 from "../product-form-1";
import ProductForm2 from "../product-form-2";

import * as React from 'react';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  'Product Info',
  'Details',
  'Safety & Compliance',
  'Review & Submit'
];

// Custom StepConnector
const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  [`& .MuiStepConnector-line`]: {
    borderColor: theme.palette.grey[400], // Default color
  },
  [`&.Mui-active .MuiStepConnector-line`]: {
    borderColor: 'blue', // Color for active step
  },
  [`&.Mui-completed .MuiStepConnector-line`]: {
    borderColor: 'blue', // Color for completed step
  },
}));

const ProductCreatePageView = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  // Ref to access the current form's submit function
  const formRef = useRef(null); 
  
  // State to hold collected form data across steps
  const [formData, setFormData] = useState({});
  
  // Assuming 'router' is passed as a prop or imported from 'next/navigation'
  const router = { push: (path) => console.log('Navigating to:', path) }; 
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState(null);

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  // --- MODIFIED handleNext to use the formRef ---
  const handleNext = () => {
    // Trigger the submit function exposed by the current form component
    if (formRef.current) {
      formRef.current.submitForm();
    }
  };

  // This function is called by the individual form's onSubmit handler *after* validation succeeds
  const onStepSubmitSuccess = (values) => {
    // 1. Merge current step's data into total formData
    const newFormData = { ...formData, ...values };
    setFormData(newFormData);

    console.log(`Step ${activeStep + 1} data:`, values);
    console.log('Accumulated Data:', newFormData);

    // 2. Determine what to do next based on the step
    if (activeStep === 0) {
      // Step 0 logic (e.g., initial product creation)
      createProduct(newFormData)
        .then(response => {
          if (response) {
            moveToNextStep();
          }
        });
    } else if (activeStep < totalSteps() - 1) {
      // Intermediate steps (e.g., product update)
      updateProduct(newFormData)
        .then(response => {
          if (response) {
            moveToNextStep();
          }
        });
    } else if (isLastStep()) {
      // Last step logic (e.g., final product submission/review)
      updateProduct({...newFormData, status: 'submitted'})
        .then(response => {
          if (response) {
            // Final submission complete, maybe handle navigation or show success
            handleComplete(); // Mark as complete and move
            console.log("Final submission complete! Data:", newFormData);
          }
        });
    }
  };

  const moveToNextStep = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };
  // -------------------------------------------------------------------

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleComplete = () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    // Don't call handleNext here, it's now handled by onStepSubmitSuccess
    moveToNextStep(); 
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setFormData({});
    setProductId(null);
  };

  // This is now passed as the success handler
  const handleFormSubmit = onStepSubmitSuccess; 

  const handleSaveAndExit = () => {
    // Use the current accumulated data for saving draft
    console.log("Saving Draft Data:", formData);
    // You might want to trigger a final API call to save the draft here
    router.push('/vendor/products');
  };

  const INITIAL_VALUES = {
    name: "",
    tags: "",
    stock: "",
    price: "",
    category: [],
    sale_price: "",
    description: "",
    status:'draft',
    productType: ""
  };

  // --- API LOGIC (Kept as is for context) ---
  const createProduct = async (data) => {
    setLoading(true);
    console.log("--- API CALL: CREATE PRODUCT (Step 0) ---");
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    const mockResponse = { success: true, id: 'prod_' + Date.now(), ...data };
    setLoading(false);

    if (mockResponse.success) {
        console.log("Product CREATED successfully. ID:", mockResponse.id);
        setProductId(mockResponse.id);
        // Important: Update product data with the ID/response
        setFormData(mockResponse); 
        return mockResponse;
    } else {
        console.error("Product creation failed.");
        return null;
    }
  };

  const updateProduct = async (data) => {
    setLoading(true);
    console.log(`--- API CALL: UPDATE PRODUCT (Step ${activeStep}) ---`);
    await new Promise(resolve => setTimeout(resolve, 800)); 
    const mockResponse = { success: true, ...data };
    setLoading(false);

    if (mockResponse.success) {
        console.log("Product UPDATED successfully.");
        // Update product data
        setFormData(mockResponse); 
        return mockResponse;
    } else {
        console.error("Product update failed.");
        return null;
    }
  };
  // --- END API LOGIC ---

  // Determine which form component to render
  const renderStepContent = (step) => {
    // Pass initial values from the accumulated formData
    const currentInitialValues = formData; 

    switch (step) {
      case 0:
        return (
          <ProductForm1
            key={0} // Important for remounting/re-initializing Formik
            initialValues={currentInitialValues} 
            handleFormSubmit={handleFormSubmit}
            formRef={formRef} // Pass ref
          />
        );
      case 1:
        return (
          <ProductForm2
            key={1}
            initialValues={currentInitialValues}
            handleFormSubmit={handleFormSubmit}
            formRef={formRef} // Pass ref
          />
        );
      // ... Add cases for step 2 and 3 using their respective components
      default:
        return <Box sx={{ p: 3, textAlign: 'center' }}>Step {step + 1} Content (Missing component)</Box>;
    }
  };

    return (
      <Box sx={{background: 'linear-gradient(180deg, rgba(62, 61, 69, 0.48) 0%, rgba(32, 32, 32, 0.64) 100%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '0 0 15px 15px', overflow:'hidden'}}>
        <Box sx={{p:4, background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '0 0 15px  15px' }}>
          <H1 sx={{mb:2, color:'#fff' }}>
            Add New Product
          </H1>
          <Box sx={{ py:4, background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '15px' }}>
            <Container>
              <Stepper activeStep={activeStep} alternativeLabel connector={<CustomStepConnector />}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel
                      // ... (Stepper styling remains the same)
                      sx={{
                        '& .MuiStepLabel-label': { fontFamily:'Elemental End', textTransform:'lowercase', color: 'white' },
                        '& .MuiStepLabel-root': { flexDirection: 'column-reverse', color: 'white' },
                        '& .Mui-active .MuiStepLabel-label': { color: 'white' },
                        '& .Mui-completed .MuiStepLabel-label': { color: 'white' },
                        '& .Mui-disabled .MuiStepLabel-label': { color: 'white' },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Container>
            {/* Render the current step's content */}
            {renderStepContent(activeStep)}
            
            <Container>
              <Box sx={{ display:'flex', justifyContent:'space-between', mt: 3 }}>
                <Button 
                  onClick={handleBack} 
                  variant="contained" 
                  color="info" 
                  disabled={activeStep === 0 || loading} // Disable if on the first step or loading
                  sx={{ padding: '5px 46px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)', boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(50px)', borderRadius: '12px' }}
                >
                  Back
                </Button>
                <Box sx={{ display:'flex', gap:1}}>
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
                    {isLastStep() ? 'Review & Submit' : 'Next'}
                  </Button>
                </Box>
              </Box>
            </Container>
          </Box>
        </Box>
      </Box>
    );
};

export default ProductCreatePageView;
