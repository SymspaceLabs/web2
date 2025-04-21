"use client";

import { useState } from "react";
import { Box, Card, MenuItem, styled, useTheme, Select } from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown"; // LOCAL CUSTOM COMPONENT

import ApexChart from "./apex-chart"; // GLOBAL CUSTOM COMPONENTS

import { H1, H5 } from "../../../components/Typography";
import { FlexBetween } from "../../../components/flex-box"; // CHART OPTIONS

import { analyticsChartOptions } from "./chart-options";
const categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; // STYLED COMPONENT

const StyledSelect = styled(Select)(({
  theme
}) => ({
  fontSize: 14,
  fontWeight: 500,
  color: "#fff",
  "& fieldset": {
    border: "0 !important"
  },
  "& .MuiSelect-select": {
    padding: 0,
    paddingRight: "8px !important"
  }
}));

const Analytics = () => {
  const theme = useTheme();
  const [selectType, setSelectType] = useState("yearly");
  const series = [{
    name: "Sales",
    data: [15000, 45000, 12000, 50000, 75000, 13000, 30000, 99000, 75000, 90000, 55000, 15000]
  }, {
    name: "Expense",
    data: [1500, 48000, 19000, 59000, 25000, 9000, 36000, 9000, 79000, 70000, 57000, 5000]
  }];
  return (
    <Box sx={{ background: 'linear-gradient(180deg, rgba(62, 61, 69, 0.48) 0%, rgba(32, 32, 32, 0.64) 100%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '15px', overflow:'hidden' }}>
      <Card sx={{ p: 3, background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '15px' }}>
        <FlexBetween>
          <H1 color='#FFF'>
            Analytics
          </H1>

          <StyledSelect value={selectType} IconComponent={() => <KeyboardArrowDown />} onChange={e => setSelectType(e.target.value)}>
            <MenuItem value="yearly">Yearly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="Weekily">Weekily</MenuItem>
          </StyledSelect>
        </FlexBetween>

        <ApexChart type="bar" height={300} series={series} options={analyticsChartOptions(theme, categories)} />
      </Card>
    </Box>
  );
};

export default Analytics;