"use client"

import { styled } from '@mui/material/styles';
import { Box, Typography, Button, Grid } from '@mui/material';

export const SectionBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  paddingTop: 0,
  paddingBottom: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(5),
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));


export const DescriptionText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Helvetica',
  color: '#fff',
  fontSize: 18,
  textAlign: 'justify',
  maxWidth: 1340,
  lineHeight: 2,

}));

// Styled components for Floating Images
export const FloatingImage1 = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: 0,
  transform: 'translateY(-50%)',
  zIndex: 10,
  width: '25%',
  height: 'auto',
  [theme.breakpoints.down('md')]: {
    display: 'none', // Hidden on mobile
  },
}));

export const FloatingImage2 = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  right: 50,
  transform: 'translateY(-50%) rotate(10deg)',
  zIndex: 10,
  width: '20%',
  height: 'auto',
  [theme.breakpoints.down('md')]: {
    display: 'none', // Hidden on mobile
  },
}));
