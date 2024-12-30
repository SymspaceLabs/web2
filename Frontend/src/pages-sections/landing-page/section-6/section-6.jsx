/**
 * Section6 Component
 * 
 * This component displays a section with two columns: a textual description and a visual representation 
 * of realistic 3D products. It highlights the ability to generate high-quality 3D models and integrate 
 * them into an AR marketplace.
 * 
 * The layout is responsive, utilizing Material-UI Grid and Box components for structure and LazyImage 
 * for optimized image loading.
 */

import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import LazyImage from "../../../components/LazyImage"; // Optimized image component
import { sectionStyles } from './styles'; // Import custom styles for the section

export default function Section6() {
  return (
    <Grid sx={sectionStyles.sectionBackground}>
      {/* Main container for the section */}
      <Container>
        <Box sx={sectionStyles.flexContainer}>
          {/* Responsive grid container with two columns */}
          <Grid container spacing={4} alignItems="stretch" sx={sectionStyles.gridContainer}>
            {/* Left column: text content */}
            <Grid item xs={12} md={6}>
              <Box sx={sectionStyles.leftColumn}>
                <Typography sx={sectionStyles.title}>
                  Realistic 3D Products
                </Typography>
                <Typography sx={sectionStyles.description}>
                  Generate high-quality 3D models of any dynamic or static product from <br />
                  text-prompts, images, weblinks, and object scans. These 3D products are <br />
                  then bridged to our immersive AR marketplace.
                </Typography>
                {/* Call-to-action button */}
                <Box sx={sectionStyles.buttonContainer}>
                  <Button variant="outlined" sx={sectionStyles.button}>
                    Partners
                  </Button>
                </Box>
              </Box>
            </Grid>
            {/* Right column: image content */}
            <Grid item xs={12} md={6}>
              <Box sx={sectionStyles.rightColumn}>
                <LazyImage
                  width={650}
                  height={650}
                  src="/assets/images/dashboard.png"
                  alt="iphone"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Grid>
  );
}
