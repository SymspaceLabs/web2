"use client"

/**
 * Section7 Component
 * 
 * A responsive layout that includes multiple cards. The section is divided into two main grids:
 * - The left side contains Card1 and two instances of Card2 with different content.
 * - The right side contains Card3 within a styled Box.
 * 
 * The layout adjusts according to screen size, making the section mobile-friendly.
 */

import { Box, Grid, Container, keyframes } from '@mui/material'; // Importing Material-UI components for layout and styling
import { Card1, Card2, Card3 } from './cards'; // Importing custom card components

export default function Section7() {
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

  return (
    // Main grid layout with a dark background and padding
    <Grid sx={{ background: '#1F1F1F', pt: 10, pb: 20, height: '100%', position: 'relative' }}>
      <Box 
        sx={{
          position: 'absolute',
          top: '80%',
          left: '10%',
          width: { xs: '300px', sm: '400px', md: '500px' },
          height: { xs: '300px', sm: '400px', md: '500px' },
          background: '#FFF',
          borderRadius: '50%',
          zIndex: 1,
          opacity: 0.3,
          filter: 'blur(80px)',
          animation: `${blob} 7s infinite`,
        }}
      />
      <Container sx={{ height: '100%' }}>
        {/* Nested grid layout for card arrangement */}
        <Grid container alignItems="stretch" spacing={2} sx={{ height: '100%' }}>
          
          {/* Left column (50% width on medium screens and larger) */}
          <Grid item xs={12} sm={12} md={6}>
            {/* Box to arrange cards vertically, aligned to the right */}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', gap: '10px' }}>
              {/* Card 1 */}
              <Card1 />

              {/* Horizontal layout for Card2 components */}
              <Box sx={{ width: '100%', display: { xs: 'block', md: 'flex' }, justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', mt: { xs: 2, md: 0 } }}>
                
                {/* Card 2 - Website Integration */}
                <Card2
                  imageUrl="/assets/images/card/cursor.png"
                  headerText="Website Integration"
                  subHeaderText="Computational audio. Listen, it's powerful"
                  bg="#EDEDED"
                />

                {/* Card 2 - Application Integration */}
                <Card2
                  imageUrl="/assets/images/card/mobile.png"
                  headerText="Application Integration"
                  subHeaderText="An immersive way to experience entertainment"
                  bg="#353535"
                  textColor="#fff"
                />
              </Box>
            </Box>
          </Grid>
          
          {/* Right column (50% width on medium screens and larger) */}
          <Grid item xs={12} sm={12} md={6}>
            {/* Box for Card3, styled with a white background and rounded corners */}
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: '#fff', borderRadius: '50px', justifyContent: 'center' }}>
              <Card3 />
            </Box>
          </Grid>
          
        </Grid>
      </Container>
    </Grid>
  );
}
