"use client";

import { Card, Box, Typography } from "@mui/material"; // MUI ICON COMPONENTS

import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown"; // GLOBAL CUSTOM COMPONENTS

import { H3, H6, Paragraph } from "../../../components/Typography";
import { FlexBetween, FlexBox } from "../../../components/flex-box"; // ========================================================

// ========================================================
const Card1 = props => {
  const {
    title,
    amount1,
    amount2,
    percentage,
    status = "up",
    color = "info.main"
  } = props;
  return (
    <Box sx={{ background: 'linear-gradient(180deg, rgba(62, 61, 69, 0.48) 0%, rgba(32, 32, 32, 0.64) 100%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '15px', overflow:'hidden' }}>
      <Card sx={{ p: 2, background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '15px'  }}>
        <Typography mb={1} color="white" sx={{ fontFamily:'Elemental End', textTransform:'lowercase'}}>
          {title}
        </Typography>

        <H3 mb={0.3} color="#fff">
          {amount1}
        </H3>

        <FlexBetween>
          <Paragraph fontWeight={500} color="grey.500">
            {amount2}
          </Paragraph>

          <FlexBox alignItems="center" color={color}>
            {status === "up" && <ArrowDropUp />}
            {status === "down" && <ArrowDropDown />}
            <Paragraph fontSize={14}>{percentage}</Paragraph>
          </FlexBox>
        </FlexBetween>
      </Card>
    </Box>
  );
};

export default Card1;