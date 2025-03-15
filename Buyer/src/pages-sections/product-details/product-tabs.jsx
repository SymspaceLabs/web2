"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import styled from "@mui/material/styles/styled";

import ProductReview from "./product-review";
import ProductDescription from "./product-description";

// STYLED COMPONENT
const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 0,
  marginTop: 40,
  marginBottom: 24,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  "& .inner-tab": {
    minHeight: 40,
    fontWeight: 600,
    textTransform: "lowercase",
    fontFamily: 'Elemental End',
    fontSize: '24px'
  }
}));

export default function ProductTabs() {
  const [selectedOption, setSelectedOption] = useState(0);

  const handleOptionClick = (_, value) => setSelectedOption(value);

  return (
    <Box sx={{
      my: 8, px: 5, py: 1,
      boxSizing: "border-box",
      background: "linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)",
      boxShadow: "0px 1px 24px -1px rgba(0, 0, 0, 0.18)",
      backdropFilter: "blur(12px)",
      borderRadius: "30px",
    }}>
      <StyledTabs
        textColor="#f9f9f9"
        indicatorColor="#000" 
        value={selectedOption}
        onChange={handleOptionClick}
        TabIndicatorProps={{
          style: { backgroundColor: '#353535' }
        }}
      >
        <Tab
          className="inner-tab"
          label="Description"
          sx={{
            color: selectedOption === 0 ? '#353535' : 'grey'
          }}
        />
        <Tab
          className="inner-tab"
          label="Review (3)"
          sx={{
            color: selectedOption === 1 ? '#353535' : 'grey'
          }}
        />
      </StyledTabs>

      <Box mb={6}>
        {selectedOption === 0 && <ProductDescription />}
        {selectedOption === 1 && <ProductReview />}
      </Box>
    </Box>
  );
}
