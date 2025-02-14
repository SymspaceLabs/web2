"use client"

import React, { useRef, useState } from "react";
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { styles } from './styles'; // Importing predefined styles
import { motion, useInView } from "framer-motion";

export default function Section3() {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.3 }); // Adjust threshold as needed

  return (
    <Grid sx={{ background: '#FAFAFA' }} ref={ref}>
      <Container sx={styles.container}>
        <Box sx={styles.contentBox}>
          <Grid container spacing={4} alignItems="center">
            {/* Left content */}
            <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "column", zIndex: 2 }}>
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }} 
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                {/* Add content here if needed */}
              </motion.div>
            </Grid>

            {/* Right content: Promotional video */}
            <Grid item xs={12} md={8} sx={{ zIndex: 2 }}>
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }} 
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <Typography sx={{ fontFamily: 'Elemental End', textTransform:'lowercase', color: '#000', fontSize: { xs: 48, sm: 48, md: 72 }, px: { xs: 2, sm: 0 }, }}>
                  Application
                </Typography>

                <Typography sx={{ fontFamily: 'Helvetica', color: '#353535', fontSize: { xs: 14, sm: 18 }, px: { xs: 2, sm: 0 }, textAlign: 'justify', lineHeight: 2 }}>
                  Optimized for user experience, our AR application allows consumers to leverage various advanced AR features to trial products like never before. Consumers are able to augment 3D products realistically in their own space, providing a virtual trial room experience for clothes, furniture, and more. The Symspace app goes beyond visualization by offering near-precise sizing recommendations, reducing returns, and increasing consumer confidence levels.
                </Typography>

                <Box sx={styles.buttonContainer}>
                  <Button variant="outlined" sx={styles.learnMoreButton}>
                    Learn More
                  </Button>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Grid>
  );
}
