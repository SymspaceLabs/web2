"use client"
/**
 * Section3 Component
 *
 * This component represents the "Application" section on the landing page. 
 * It showcases the features and benefits of the Symspace AR application, 
 * focusing on enhancing user experience with realistic 3D product visualization 
 * and advanced AR features.
 *
 * Key Features:
 * - Displays a title and detailed description about the application.
 * - Includes a call-to-action button for learning more.
 * - Styled using Material-UI with a visually appealing blob circle decoration.
 *
 * Usage:
 * Use this component within a landing page layout to highlight the Symspace AR application's
 * capabilities and its impact on user experience and consumer confidence.
 */

import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { styles } from './styles'; // Importing predefined styles

export default function Section3() {
  return (
    <Grid sx={styles.gridContainer}>
      <Container sx={styles.container}>
        {/* Content box containing title, description, and button */}
        <Box sx={styles.contentBox}>
          {/* Title for the section */}
          <Typography sx={styles.titleText}>
            Application
          </Typography>

          {/* Description highlighting application features */}
          <Typography sx={styles.descriptionText}>
            Optimized for user experience, our AR application allows consumers to leverage various advanced AR features to trial products like never before. Consumers are able to augment 3D products realistically in their own space, providing a virtual trial room experience for clothes, furniture, and more. The Symspace app goes beyond visualization by offering near-precise sizing recommendations, reducing returns, and increasing consumer confidence levels.
          </Typography>

          {/* Call-to-action button */}
          <Box sx={styles.buttonContainer}>
            <Button variant="outlined" sx={styles.learnMoreButton}>
              Learn More
            </Button>
          </Box>
        </Box>

        {/* Decorative blob circle for visual enhancement */}
        <Box sx={styles.blobCircle} />
      </Container>
    </Grid>
  );
}
