"use client";

import { Fragment, useEffect, useState } from "react";
import { Box, Typography, Container, Button, styled, StepConnector  } from "@mui/material";
import { H3 } from "../../../../components/Typography"; // Local CUSTOM COMPONENT
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
  
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
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

  const handleFormSubmit = values => {
    console.log(values);
  };

  const handleSaveAndExit = () => {
    // Navigate to /vendor/products when Save & Exit is clicked
    router.push('/vendor/products');
  };

  

  return (
    <Box sx={{background: 'linear-gradient(180deg, rgba(62, 61, 69, 0.48) 0%, rgba(32, 32, 32, 0.64) 100%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '0 0 15px 15px', overflow:'hidden'}}>
      <Box sx={{p:4, background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '0 0 15px  15px' }}>
        <H1 sx={{mb:2, color:'#fff' }}>
          Add New Product
        </H1>
        
        <Box sx={{ py:4, background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '15px' }}>
          
        <Container>
          <Stepper activeStep={activeStep} alternativeLabel connector={<CustomStepConnector />}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    '& .MuiStepLabel-label': {
                      fontFamily:'Elemental End',
                      textTransform:'lowercase',
                      color: 'white',
                    },
                    '& .MuiStepLabel-root': {
                      flexDirection: 'column-reverse',
                      color: 'white',
                    },
                    '& .Mui-active .MuiStepLabel-label': {
                      color: 'white',
                    },
                    '& .Mui-completed .MuiStepLabel-label': {
                      color: 'white',
                    },
                    '& .Mui-disabled .MuiStepLabel-label': {
                      color: 'white',
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Container>




          {activeStep===0 ?
            <ProductForm1 initialValues={INITIAL_VALUES} handleFormSubmit={handleFormSubmit} handleNext={handleNext} handleBack={handleBack} />
            :
            <ProductForm2 initialValues={INITIAL_VALUES} handleFormSubmit={handleFormSubmit} handleNext={handleNext} handleBack={handleBack} />

          }
          
           <Container>
              <Box sx={{ display:'flex', justifyContent:'space-between' }}>
                <Button onClick={handleBack} variant="contained" color="info" type="submit" sx={{ padding: '5px 46px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)', boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(50px)', borderRadius: '12px' }}>
                  Back
                </Button>
                <Box sx={{ display:'flex', gap:1}}>
                  <Button onClick={handleSaveAndExit} variant="contained" color="info" type="submit" sx={{ padding: '5px 46px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)', boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(50px)', borderRadius: '12px' }}>
                    Save & Exit
                  </Button>
                  <Button onClick={handleNext} variant="contained" color="info" type="submit" sx={{ padding: '5px 46px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)', boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(50px)', borderRadius: '12px' }}>
                    Next
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
