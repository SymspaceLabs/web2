/**
 * Section9 Component
 *
 * This component highlights the benefits of immersive AR experiences.
 * - It displays a list of key features and advantages on the left.
 * - It includes a 3D interactive canvas (HandBagCanvas) on the right for visualization.
 *
 * The layout is responsive, ensuring a seamless experience across different screen sizes.
 */

import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material'; // Material-UI components for layout and styling
import HandBagCanvas from '../../../components/HandBagCanvas'; // Custom 3D Canvas component
import { sectionStyles } from './styles'; // External styles for consistent design

export default function Section9() {
  return (
    // Main grid container with responsive layout styling
    <Grid sx={sectionStyles.gridContainer}>
      <Container>
        <Box sx={sectionStyles.boxContainer}>
          {/* Grid container for text and 3D canvas */}
          <Grid container spacing={4} alignItems="center">
            
            {/* Left section: List of features */}
            <Grid item xs={12} md={6} sx={sectionStyles.leftGridItem}>
              {/* Grey background text box */}
              <Box sx={sectionStyles.textBoxGrey}>
                <Typography sx={sectionStyles.typographyStyles}>
                  Innovative and immersive experiences
                </Typography>
              </Box>
              
              {/* White background text box */}
              <Box sx={sectionStyles.textBoxWhite}>
                <Typography sx={sectionStyles.typographyStyles}>
                  Improve consumer confidence and convenience
                </Typography>
              </Box>

              {/* Additional feature boxes alternating in background color */}
              <Box sx={sectionStyles.textBoxGrey}>
                <Typography sx={sectionStyles.typographyStyles}>
                  Reduce manufacturing and inventory costs
                </Typography>
              </Box>
              <Box sx={sectionStyles.textBoxWhite}>
                <Typography sx={sectionStyles.typographyStyles}>
                  Customizable AR content for marketing purposes
                </Typography>
              </Box>
              <Box sx={sectionStyles.textBoxGrey}>
                <Typography sx={sectionStyles.typographyStyles}>
                  Awareness and assistance for underserved communities
                </Typography>
              </Box>
              <Box sx={sectionStyles.textBoxWhite}>
                <Typography sx={sectionStyles.typographyStyles}>
                  Gauge consumer demand through AR Room
                </Typography>
              </Box>
            </Grid>

            {/* Right section: 3D interactive canvas */}
            <Grid item xs={12} md={6}>
              <Box sx={sectionStyles.rightGridItem}>
                {/* HandBagCanvas renders a 3D model for enhanced user interaction */}
                <HandBagCanvas />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Grid>
  );
}
