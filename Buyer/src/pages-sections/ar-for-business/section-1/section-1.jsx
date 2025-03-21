"use client";

// =======================================================
// Section 1 Component
// ======================================================

import { motion } from "framer-motion";
import { styles } from '../page-view/styles';
import { FlexBox } from '@/components/flex-box';
import { Box, Container, Typography, Button, Grid, useTheme } from '@mui/material';

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
                <Typography sx={{ ...styles.sectionHeader, color: '#4E4E4E' }}>
                  sell more <br /> with SYMSPACE
                </Typography>

                {/* Promotional offer */}
                <Typography sx={{ color: '#797979', fontSize: {xs:12, sm:18} }}>
                  *Initial 100 Partners gain 50% more on marketplace sales
                </Typography>

                {/* Button group */}
                <FlexBox sx={{ pt: 2.5 }}>
                  <Button sx={styles.gradientBtn}>
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