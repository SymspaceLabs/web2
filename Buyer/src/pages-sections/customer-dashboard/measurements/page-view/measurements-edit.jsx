"use client";

// ============================================================
// Measurements Edit
// used in profile page 
// ============================================================

import { Box } from "@mui/material";
import Measurements from "../measurements";
import DashboardHeader from "../../dashboard-header"; // CUSTOM DATA MODEL
import PersonOutlined from "@mui/icons-material/PersonOutlined"; // Local CUSTOM COMPONENT

// ============================================================

export default function MeasurementEditPageView() {
  return (
    <Box sx={styles.box}>
      <DashboardHeader 
        Icon={PersonOutlined} 
        title="Measurement" 
        buttonText="Edit" 
        href={`/measurements/edit`}
      />
      <Box p="15px">
        <Measurements isEdit={true} />
      </Box>
    </Box>
  )
}

const styles = {
  box: { 
    paddingBottom:'15px',
    borderRadius:'15px',
    background: 'linear-gradient(176.84deg, #B7B7B9 -3.62%, #777777 109.48%)',
    boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
    backdropFilter: 'blur(12px)',
  }
}