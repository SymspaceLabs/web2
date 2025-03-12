"use client"

import React from 'react';
import { Box, Container, Button, Typography, useMediaQuery } from '@mui/material';
import { FlexBox } from '@/components/flex-box';

export default function Section2() {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Container sx={{ py:10, maxWidth:'1000px' }}>
      <Box py={isMobile? 2 : 5} px={isMobile? 3 : 8} sx={cardStyle}>
        <FlexBox flexDirection={ isMobile? 'column' : 'row' } justifyContent='space-between' gap={2}>
          <Box sx={{ display:'flex', flexDirection:'column', gap:2}}>
            <Typography fontFamily='Elemental End' fontSize={isMobile? 30 : 40} color="#fff">
              how to apply
            </Typography>
            <Typography fontFamily='Helvetica' fontSize={isMobile? 18 : 24} color="#fff" sx={{ maxWidth:'850px' }}>
              Attach your resume and cover letter detailing your relevant experience and why you are interested in joining SYMSPACE
            </Typography>
          </Box>
          <Box sx={{ display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <Button sx={{ fontFamily: 'Elemental End', background:'linear-gradient(97.04deg, #666666 0%, #1D1D1D 100%)', borderRadius: '50px', px:12.5, py:2, color: '#fff', fontSize:'20px', textTransform:'lowercase', fontWeight:400, border:'1px solid #FFF' }}>
              Apply
            </Button>
          </Box>
        </FlexBox>
      </Box>
    </Container>
  );
}

const cardStyle = {
  background: 'rgba(255, 255, 255, 0.35)',
  boxShadow: `inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4),
              inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5),
              inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24),
              inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24),
              inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)`,
  backdropFilter: 'blur(10.0285px)',
  borderRadius: "40px",
};