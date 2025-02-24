"use client"

import { useRef } from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { LazyImage } from '@/components/lazy-image';
import { sectionStyles } from './styles'; // Import custom styles for the section
import { motion, useInView } from "framer-motion";

export default function Section6() {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, threshold: 0.2 }); // 20% visibility triggers animation

  return (
    <Grid sx={sectionStyles.sectionBackground}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
                {/* Main container for the section */}
                <Container>
          <Box sx={sectionStyles.flexContainer}>
            {/* Responsive grid container with two columns */}
            <Grid container spacing={4} alignItems="stretch" sx={sectionStyles.gridContainer}>
              {/* Left column: text content */}
              <Grid item xs={12} md={6}>
                <Box sx={sectionStyles.leftColumn}>
                  <Typography sx={{fontFamily: 'Elemental End', textTransform:'lowercase', color: '#fff', fontSize: {xs:30, sm:64} }}>
                    3D Repository
                  </Typography>
                  <Typography sx={{ maxWidth:'650px', fontFamily: 'Helvetica', color: '#FFF', fontSize: { xs: 14, sm: 18 }, px: { xs: 1, sm: 0 }, textAlign: 'justify', lineHeight: 2 }}>
                    Generate and store high-quality 3D models of any dynamic or static
                    product from text-prompts, images, weblinks, and object scans. Choose 
                    from hundreds of templates to create marketing ad videos. Then allow
                    your consumers to trial these products realistically in our immersive AR
                    marketplace.
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
      </motion.div>
    </Grid>
  );
}
