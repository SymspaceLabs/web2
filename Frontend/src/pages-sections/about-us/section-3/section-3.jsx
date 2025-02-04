"use client";

import { Button, Box, Container, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery } from "@mui/material";
import { FlexBox } from '@/components/flex-box';
import LazyImage from "@/components/LazyImage";

export default function Section3() {
  const isMobile = useMediaQuery('(max-width:600px)');
  
  const rows = [
    { 
      title: "innovation",
      description: "The future of shopping is immersive. We push the boundaries of AI-driven 3D modeling and AR to create smarter, more intuitive experiences for consumers and brands."
    },
    { 
      title: "inclusion", 
      description: "Technology works best when it works for everyone. We prioritize accessibility-first design, ensuring individuals of all abilities, backgrounds, and circumstances can fully engage with AR commerce."
    },
    { 
      title: "sustainability",
      description: "Reducing waste starts with better technology. Our virtual try-ons, digital staging, and AI-powered modeling help brands cut down on returns, overproduction, and environmental impact."
    },
    { 
      title: "empowerment",
      description: "Convenience should never be a barrier. Whether it’s homebound shoppers, expectant mothers, or veterans, we develop tools that enhance independence and confidence in every purchase."
    },
    { 
      title: "impact", 
      description: "We don’t just build AR experiences—we create solutions that bridge gaps, remove limitations, and set new standards for inclusive digital commerce." 
    },
  ];

  return (
    <Container sx={{ width:'100%', display:'flex', flexDirection:'column', alignItems:'center', py:2 }}>
      <Box sx={{ width:'100%', maxWidth:'1400px' }}>
        <Typography sx={{ py:5, fontFamily: 'Elemental End', fontSize: { xs: 25, sm: 35 }, color: '#fff' }}>
          backed  by  industry  leaders
        </Typography>
        <Box py={isMobile? 2 : 10} px={isMobile? 3 : 10} sx={cardStyle}>
          <FlexBox flexDirection={ isMobile? 'column' : 'row' } justifyContent='space-between' gap={2} alignItems="center">
            <Box sx={{ width:isMobile? '75%' : '25%' }}>
              <LazyImage
                src="/assets/images/global-impact/company-2.png"
                width={150}
                height={150}
                alt="company-1"
              />
            </Box>
            <Box sx={{ width:isMobile? '50%' : '25%' }}>
              <LazyImage
                src="/assets/images/contact-us/company-1.png"
                width={150}
                height={150}
                alt="company-2"
              />
            </Box>
            <Box sx={{ display:'flex', flexDirection:'column', justifyContent:'center'}}>
              <Button sx={{ fontFamily: 'Elemental End', background:'linear-gradient(97.04deg, #666666 0%, #1D1D1D 100%)', borderRadius: '50px', px:8, py:2, color: '#fff', fontSize:'20px', textTransform:'lowercase', fontWeight:400, border:'1px solid #FFF' }}>
                get in touch
              </Button>
            </Box>
          </FlexBox>
        </Box>
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