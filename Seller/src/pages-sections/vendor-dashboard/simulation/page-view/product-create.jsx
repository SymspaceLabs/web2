"use client";

import { Fragment, useEffect, useState } from "react";
import { Box, Typography  } from "@mui/material"; // GLOBAL CUSTOM COMPONENT
import { H3 } from "../../../../components/Typography"; // Local CUSTOM COMPONENT
import ProductForm from "../product-form";
import { FlexBox } from "../../../../components/flex-box";

const ProductCreatePageView = () => {

  const [selectedStep, setSelectedStep] = useState(1);

  const handleStepChange = step => {
    // switch (step) {
    //   case 0:
    //     router.push("/cart");
    //     break;

    //   case 1:
    //     router.push("/checkout");
    //     break;

    //   case 2:
    //     router.push("/payment");
    //     break;

    //   case 3:
    //     router.push("/orders");
    //     break;

    //   default:
    //     break;
    // }
  };

  const INITIAL_VALUES = {
    name: "",
    tags: "",
    stock: "",
    price: "",
    category: [],
    sale_price: "",
    description: ""
  };

  const handleFormSubmit = values => {
    console.log(values);
  };

  return (
    <Box sx={{background: 'linear-gradient(180deg, rgba(62, 61, 69, 0.48) 0%, rgba(32, 32, 32, 0.64) 100%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '0 0 15px 15px', overflow:'hidden'}}>
      <Box sx={{p:4, background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '0 0 15px  15px' }}>
        <H3 sx={{mb:2, fontFamily:'Elemental End', color:'#fff', textTransform:'lowercase'}}>
          Add New Product
        </H3>
        <Stepper
          stepperList={STEPPER_LIST}
          selectedStep={selectedStep}
          onChange={handleStepChange}
        />

        <ProductForm initialValues={INITIAL_VALUES} handleFormSubmit={handleFormSubmit} />
      </Box>
    </Box>
    );
};

export default ProductCreatePageView;

function Stepper({
  selectedStep = 1,
  stepperList,
  onChange
}) {
  const [selected, setSelected] = useState(selectedStep);

  const handleStepClick = (step, ind) => () => {
    if (!step.disabled) {
      setSelected(ind);
      if (onChange) onChange(ind);
    }
  };

  useEffect(() => {
    setSelected(selectedStep - 1);
  }, [selectedStep]);

  return (
    <FlexBox alignItems="center" justifyContent="space-between" sx={{ width:'100%', py:4}}>
        {stepperList.map((step, index) => <Fragment key={step.title}>
            
            <Box
              onClick={handleStepClick(step, index)} 
              sx={{
                borderRadius:'50px',
                backgroundColor: index <= selected ? "primary.main" : "primary.light",
                p: 1.5,
                mt: 2.5,
                "&:hover": {
                  borderRadius:'50px',
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  cursor:'pointer'
                }
              }}
            />

            {index <= stepperList.length - 1 && (
              <FlexBox width="100%" flexDirection="column" alignItems="center">
                <Typography sx={{fontFamily:'Elemental End', textTransform:'lowercase', color:'#fff'}}>
                  {step.title}
                </Typography>
                <Box width="100%" height="4px" bgcolor={index < selected ? "primary.main" : "primary.light"} />
              </FlexBox>)
            }
          </Fragment>)}
          <Box
              sx={{
                borderRadius:'50%',
                backgroundColor: "primary.light",
                p: 1.5,
                mt: 2.5,
                "&:hover": {
                  borderRadius:'50%',
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  cursor:'pointer'
                }
              }}
            />
    </FlexBox>
    );
};

const STEPPER_LIST = [
  {
    title: "Product Info",
    disabled: false
  },
  {
    title: "Details",
    disabled: false
  },
  {
    title: "Safety & Compliance",
    disabled: false
  },
  {
    title: "Review & Submit",
    disabled: false
  }
];