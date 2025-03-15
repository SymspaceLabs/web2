"use client"

import React, { useRef, useState } from "react";
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { motion, useInView } from "framer-motion";
import { FlexBox } from "@/components/flex-box";
import Link from "next/link";
import { styles } from "../page-view/styles";

export default function Section6() {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.3 }); // Adjust threshold as needed

  return (
    <Grid sx={{ background: '#FAFAFA' }} ref={ref}>
      <Container>
        <Box sx={{ position: 'relative', zIndex: 2, minHeight: { xs: '400px', md: '600px' }, display: 'flex', flexDirection: 'column', gap: 3, py: { xs: 4, md: 8 }, alignItems: 'flex-start', justifyContent: 'center' }}>
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
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                style={{ height: "100%" }} // Ensures motion.div spans full height
              >
                <Typography sx={{ fontFamily: 'Elemental End', textTransform:'lowercase', color: '#000', fontSize: { xs: 20, sm: 64 }, px: { xs: 2, sm: 0 }, textAlign:{xs:'center', sm:'left'} }}>
                  Application
                </Typography>

                <Typography sx={{ py:{xs:2, sm:5}, maxWidth:'1000px', fontFamily: 'Helvetica', color: '#353535', fontSize: { xs: 12, sm: 18 }, px: { xs: 2, sm: 0 }, textAlign: 'justify', lineHeight: {xs:1.5, sm:2} }}>
                  Optimized for user experience, our AR application allows consumers to leverage various advanced AR features to trial products like never before. Consumers are able to augment 3D products realistically in their own space, providing a virtual trial room experience for clothes, furniture, and more. The Symspace app goes beyond visualization by offering near-precise sizing recommendations, reducing returns, and increasing consumer confidence levels.
                </Typography>

                <FlexBox sx={{ pt:2, display: 'flex', justifyContent: {xs:'center', sm:'flex-start'},}}>
                  <Link href="/ar-app-simulation" passHref>
                    <Button sx={styles.outlinedLightBtn}>
                      Learn More
                    </Button>
                  </Link>
                </FlexBox>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Grid>
  );
}


