/**
 * Section1 Component
 *
 * This component renders the hero section for the SYMSPACE platform. It includes:
 * - A call-to-action headline encouraging users to sell more with SYMSPACE.
 * - A promotional offer for the initial 100 partners.
 * - A button to sign up for the service.
 * - A decorative BlobBox for visual enhancement.
 * - A responsive layout with content and an optional image container.
 *
 * The component leverages Material-UI for layout and styling, with custom styles applied.
 *
 * @returns {JSX.Element} Rendered hero section
 */

"use client";

import React from 'react';
import { Box, Container, Typography, Button, Grid, useTheme } from '@mui/material';
import { section1Styles } from './styles'; // Import custom styles
import BlobBox from '../blobBox'; // Decorative component for visual enhancement

export default function Section1() {
  const theme = useTheme(); // Access the current theme for dynamic styling
  const styles = section1Styles(theme); // Generate styles based on the theme

  return (
    <Grid sx={styles.rootGrid}>
      {/* Main container for the section */}
      <Container sx={styles.container}>
        {/* Decorative blob element positioned at the top-right */}
        <BlobBox
          sx={{
            top: '10rem',
            right: '15rem',
            backgroundColor: '#0366FE',
          }}
        />

        {/* Content box containing text and buttons */}
        <Box sx={styles.contentBox}>
          <Grid container spacing={4} alignItems="center">
            {/* Left column: Text content */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              {/* Headline */}
              <Typography sx={styles.title}>
                sell more <br /> with SYMSPACE
              </Typography>

              {/* Promotional offer */}
              <Typography sx={styles.description}>
                *Initial 100 Partners gain 50% more on marketplace sales
              </Typography>

              {/* Button group */}
              <Box sx={styles.buttonGroup}>
                <Button variant="outlined" sx={styles.outlinedButton}>
                  sign up
                </Button>
              </Box>
            </Grid>

            {/* Right column: Image container (currently empty) */}
            <Grid item xs={12} md={6} sx={{ zIndex: 2 }}>
              <Box sx={styles.imageContainer}></Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Grid>
  );
}
