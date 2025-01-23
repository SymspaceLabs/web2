"use client";

import { styled, keyframes } from '@mui/material/styles';
import { Box } from "@mui/material";

const blob = keyframes`
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
`;

export const BlobBox2 = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '30%', // Position at 15% from the top
  left: '35%', // Center horizontally
  transform: 'translateX(-50%)', // Correct horizontal alignment
  width: '50vw',
  height: '50vw',
  maxWidth: '500px',
  maxHeight: '500px',
  borderRadius: '50%',
  filter: 'blur(125px)',
  backgroundColor: '#0366FE',
  zIndex: 0,
  animation: `${blob} 7s infinite`,
  [theme.breakpoints.down('sm')]: {
    width: '80vw',
    height: '80vw',
  },
}));
