"use client"

/**
 * Section10 Component
 *
 * This component highlights the company's focus and vision, displaying a mix of text and visuals.
 * - A blurred floating blob serves as a decorative background.
 * - Text content communicates the company's mission and values.
 * - A call-to-action button encourages user engagement.
 *
 * The layout is responsive and visually engaging, with a clean and modern design.
 */

import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { styles } from './styles'; // Import external styles for consistency
import { keyframes } from '@mui/material/styles';

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

export default function Section10() {
  // Blob styling for the floating background element
  const blob1 = {
    position: 'absolute', // Ensures the blob stays in a fixed position
    top: 300, // Adjust vertical positioning
    left: 50, // Adjust horizontal positioning
    width: '450px',
    height: '450px',
    background: '#FFFFFF', // White color for the blob
    borderRadius: '50%', // Ensures a circular shape
    zIndex: 0, // Places the blob behind the main content
    opacity: 0.3, // Makes the blob semi-transparent
    filter: 'blur(80px)', // Adds a blurred effect for aesthetic appeal
    animation: `${blob} 7s infinite`,
  };

  const blob2 = {
    position: 'absolute', // Ensures the blob stays in a fixed position
    top: 50, // Adjust vertical positioning
    right: 50, // Adjust horizontal positioning
    width: '250px',
    height: '250px',
    background: '#FFFFFF', // White color for the blob
    borderRadius: '50%', // Ensures a circular shape
    zIndex: 0, // Places the blob behind the main content
    opacity: 0.3, // Makes the blob semi-transparent
    filter: 'blur(80px)', // Adds a blurred effect for aesthetic appeal
    animation: `${blob} 7s infinite`,
  };

  return (
    // Main grid container with a relative position for background blobs
    <Grid sx={{ ...styles.sectionBackground, position: 'relative', overflow: 'hidden' }}>
      {/* Background blob element for a decorative effect */}
      <Container sx={{ position: 'relative' }}>
        <Box sx={blob1} /> {/* Floating blurred blob */}
        <Box sx={blob2} /> {/* Floating blurred blob */}

        {/* Main content container */}
        <Box sx={styles.container}>
          {/* Title of the section */}
          <Typography sx={styles.title}>
            Our Focus
          </Typography>

          {/* Description text explaining the company's mission */}
          <Typography sx={styles.description}>
            We empower individuals with Augmented Reality, while equipping brands with resources to showcase their products in unimaginable ways. Our goal is to revolutionize the end-to-end e-commerce process by creating 3D assets of retail products and enabling consumers to augment these products with enhanced AR functionalities. We offer a sustainable solution that delivers immersive, hyper-realistic, and seamless 3D models coupled with unparalleled AR experiences. Through cutting-edge technologies such as artificial intelligence and augmented reality, we are positioned to transform mere imagination into tangible simulations of reality.
          </Typography>

          {/* Call-to-action button container */}
          <Box sx={styles.buttonContainer}>
            <Button variant="outlined" sx={styles.button}>
              Partner {/* Button text encouraging partnership */}
            </Button>
          </Box>
        </Box>
      </Container>
    </Grid>
  );
}
