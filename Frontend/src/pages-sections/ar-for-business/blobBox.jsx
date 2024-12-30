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

const BlobBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '400px',
  height: '400px',
  borderRadius: '50%',
  filter: 'blur(150px)',
  opacity: 0.9,
  animation: `${blob} 7s infinite`,
}));

export default BlobBox;
