"use client";

// =============================================================================
// Section 3 - Partners Section -  About Us 
// =============================================================================

import { styles } from '../page-view/styles';
import { FlexBox } from '@/components/flex-box';
import { COMPANIES_DATA } from "@/data/companies";
import { LazyImage } from '@/components/lazy-image';
import { Button, Box, Container, Typography } from "@mui/material";

// =============================================================================

export default function Section3() {
  return (
    <Container sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
      <Box sx={{ width: '100%', maxWidth: '1400px' }}>
        <Typography sx={{ py: 5, ...styles.elementalEndFont, fontSize: { xs: 25, sm: 35 }, color: '#fff', wordSpacing: '10px' }}>
          backed by industry leaders
        </Typography>
        <Box py={{xs:2, sm:10}} px={{xs:3, sm:10}} sx={cardStyle}>
          <FlexBox flexDirection={{xs:'column', sm:'row'}} justifyContent='space-between' gap={2} alignItems="center">
            {/* Mapping through company logos */}
            {COMPANIES_DATA.map((company, index) => (
              <Box key={index} sx={{ width: {xs:'75%', sm:'25%'} }}>
                <a href={company.url} target="_blank" rel="noopener noreferrer">
                  <LazyImage src={company.src} width={150} height={150} alt={company.alt} />
                </a>
              </Box>
            ))}
            
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Button sx={{
                ...styles.elementalEndFont,
                background: 'linear-gradient(97.04deg, #666666 0%, #1D1D1D 100%)',
                borderRadius: '50px',
                px: 8,
                py: 2,
                color: '#fff',
                fontSize: '20px',
                textTransform: 'lowercase',
                fontWeight: 400,
                border: '1px solid #FFF'
              }}>
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
