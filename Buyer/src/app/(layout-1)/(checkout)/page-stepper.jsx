"use client";

import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

import Stepper from "./stepper";

const STEPPER_LIST = [{
  title: "Cart",
  disabled: false
}, {
  title: "Details",
  disabled: false
}, {
  title: "Payment",
  disabled: false
}, {
  title: "Review",
  disabled: true
}];

export default function PageStepper({
  children
}) {
  const [selectedStep, setSelectedStep] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  const handleStepChange = step => {
    switch (step) {
      case 0:
        router.push("/cart");
        break;

      case 1:
        router.push("/checkout");
        break;

      case 2:
        router.push("/payment");
        break;

      case 3:
        router.push("/orders");
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    switch (pathname) {
      case "/cart":
        setSelectedStep(1);
        break;

      case "/checkout":
        setSelectedStep(2);
        break;

      case "/payment":
        setSelectedStep(3);
        break;

      default:
        break;
    }
  }, [pathname]);

  return (
    <Box sx={{ background:'#8C8C8C', width:'100%', py:5 }}>
      <Container>
        <Box mb={3} display={{sm: "block",xs: "none"}}>
          <Stepper
            stepperList={STEPPER_LIST}
            selectedStep={selectedStep}
            onChange={handleStepChange}
          />
        </Box>

        {children}
      </Container>
    </Box>

  );
}