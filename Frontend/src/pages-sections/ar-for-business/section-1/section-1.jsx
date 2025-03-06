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
import { motion } from "framer-motion"; // Import Framer Motion
import { FlexBox } from '@/components/flex-box';

export default function Section1() {
  return (
    <Box>
      <Container>
        {/* Animated Content Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} // Start faded and slightly moved down
          animate={{ opacity: 1, y: 0 }} // Fade in and move up
          transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
        >
          {/* Content box containing text and buttons */}
          <Box sx={{ flexGrow: 1, py: 8, zIndex: 2 }}>
            <Grid container spacing={4} alignItems="center">
              {/* Left column: Text content */}
              <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                {/* Headline */}
                <Typography sx={{ fontFamily: 'Elemental End', fontSize: { xs: 24, sm: 30, md: 40, lg: 50, xl: 60 }, color: '#4E4E4E' }}>
                  sell more <br /> with SYMSPACE
                </Typography>

                {/* Promotional offer */}
                <Typography sx={{ color: '#797979', fontSize: {xs:12, sm:18} }}>
                  *Initial 100 Partners gain 50% more on marketplace sales
                </Typography>

                {/* Button group */}
                <FlexBox sx={{ pt: 2.5 }}>
                  <Button variant="outlined" sx={outlinedButton}>
                    sign up
                  </Button>
                </FlexBox>
              </Grid>

              {/* Right column: Image container (currently empty) */}
              <Grid item xs={12} md={6} sx={{ zIndex: 2 }}>
                <Box sx={{ minHeight: {sm:'500px'} }}></Box>
              </Grid>
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}


const outlinedButton = {
  background: '#000',
  fontFamily: 'Elemental End',
  textTransform: 'lowercase',
  color: '#fff',
  borderRadius: '50px',
  py: 2,
  px: 7.5,
  transition: 'all 0.3s ease-in-out', // Smooth transition effect
  ':hover': {
    background: '#fff',
    color: '#000',
  },
}
