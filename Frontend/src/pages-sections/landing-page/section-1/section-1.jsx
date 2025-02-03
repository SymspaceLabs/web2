"use client";

/**
 * Section1 Component
 *
 * This component serves as the hero section of the landing page, showcasing
 * an AI-powered AR commerce solution, SYMSPACE. It uses Material UI for styling
 * and includes animated content, a promotional video, and call-to-action buttons.
 *
 * Key Features:
 * - Dynamic fade-in animation when the component mounts.
 * - Responsively structured content with Material UI's Grid system.
 * - Includes blobs for decorative visuals and a background video.
 *
 * Usage:
 * Import and use this component within a landing page layout to display 
 * the hero section.
 */

import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Button, Grid, useTheme } from '@mui/material';
import LazyImage from "../../../components/LazyImage"; // Optimized image component
import { section1Styles } from './styles'; // Styles specific to this section

export default function Section1() {
  const theme = useTheme(); // Access the current theme for dynamic styling
  const styles = section1Styles(theme); // Generate section-specific styles
  const [fadeIn, setFadeIn] = useState(false); // State to control fade-in animation

  // Trigger fade-in animation after component mounts
  useEffect(() => {
    setFadeIn(true);
  }, []);

  // Dynamic animation styles for the fade-in effect
  const fadeInUpAnimation = fadeIn
    ? {
        opacity: 0,
        transform: 'translateY(20px)',
        animation: 'fadeInUp 1s ease-in-out forwards',
        '@keyframes fadeInUp': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }
    : {};

  return (
    <Grid sx={styles.rootGrid}>
      <Container sx={styles.container}>
        {/* Decorative blob elements */}
        <Box sx={{ ...styles.blob1, zIndex: 1 }} />
        <Box sx={{ ...styles.blob2, zIndex: 1 }} />

        <Box sx={styles.contentBox}>
          <Grid container spacing={4} alignItems="center">
            {/* Left content: Hero text and buttons */}
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', ...fadeInUpAnimation }}>
              <Typography sx={styles.heading}>
                AI Powered AR Commerce
                </Typography>
              <Typography sx={styles.title}>
                SYMSPACE
              </Typography>
              <Typography sx={styles.description}>
                Revolutionize your shopping experience through Augmented Reality.
              </Typography>
              <Box sx={styles.buttonGroup}>
                <Button variant="contained" sx={styles.containedButton}>
                  <Typography sx={styles.buttonText}>Get Started</Typography>
                  <Box sx={styles.imageBox}>
                    <LazyImage
                      alt="furniture shop"
                      width={25}
                      height={25}
                      src="/assets/images/sparkler.png"
                    />
                  </Box>
                </Button>
                <Button variant="outlined" sx={styles.outlinedButton}>
                  Learn More
                </Button>
              </Box>
            </Grid>

            {/* Right content: Promotional video */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{ ...fadeInUpAnimation, zIndex: 2 }}
            >
              <Box sx={styles.videoContainer}>
                <video
                  width="50%"
                  height="auto"
                  autoPlay
                  loop
                  muted
                  src="https://uploads-ssl.webflow.com/64694132a19474ee2218a9e6/648a8e1d8d146c19eb799200_Prosthetic_CMP_black_trimeed-transcode.mp4"
                  poster="https://uploads-ssl.webflow.com/64694132a19474ee2218a9e6/648a8e1d8d146c19eb799200_Prosthetic_CMP_black_trimeed-poster-00001.jpg"
                  style={{ position: 'relative', zIndex: 2 }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Grid>
  );
}
