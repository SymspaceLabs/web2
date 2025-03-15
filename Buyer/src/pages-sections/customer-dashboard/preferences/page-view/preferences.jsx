"use client";

import CreditCard from "@mui/icons-material/CreditCard"; // Local CUSTOM COMPONENT
import { Box } from "@mui/material";

import DashboardHeader from "../../dashboard-header";
import Preferences from "../preferences";

export default function PreferencesPageView({ isEdit=false }) {
  return (
    <Box sx={boxStyle}>
      <DashboardHeader
        Icon={CreditCard} 
        buttonText={isEdit? "Back" : "Edit" }
        title="Preferences" 
        href={isEdit? "/preferences":"/preferences/edit"}
      />
      <Preferences isEdit={false} />
    </Box>
  );
}

const boxStyle = { 
  borderRadius:'15px',
  background: 'linear-gradient(176.84deg, #B7B7B9 -3.62%, #777777 109.48%)',
  boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
  backdropFilter: 'blur(12px)',
}