"use client";

import Container from "@mui/material/Container"; // LOCAL CUSTOM COMPONENTS

import BodyWrapper from "./dashboard-body-wrapper";
import DashboardNavbar from "./dashboard-navbar/dashboard-navbar";
import DashboardSidebar from "./dashboard-sidebar/dashboard-sidebar"; // LOCAL LAYOUT CONTEXT PROVIDER

import { LayoutProvider } from "./dashboard-layout-context";
import { Box } from "@mui/material";
import { styled, keyframes } from '@mui/material/styles';

export default function VendorDashboardLayout({
  children
}) {
  return (
    <LayoutProvider>
      <Box>
      <style>
          {`.css-28k8rt, .css-1fbkvt5  { background: transparent; margin-left:0; }`}
      </style>
      <BlobBox sx={{ top: '40rem', right: '30rem', backgroundColor: '#0366FE', }} />
      <BlobBox sx={{ top: '40rem', right: '40rem', backgroundColor: '#0366FE', animationDelay: '2s', }} />
      <BlobBox sx={{ top: '50rem', right: '35rem', backgroundColor: '#0366FE', animationDelay: '4s', }} />
        <DashboardSidebar />
        
        <BodyWrapper>
          <DashboardNavbar />
          {children}
        </BodyWrapper>
      </Box>

    </LayoutProvider>
  );
}

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
  width: '40rem',
  height: '40rem',
  borderRadius: '50%',
  filter: 'blur(100px)',
  opacity: 0.7,
  animation: `${blob} 7s infinite`,
}));