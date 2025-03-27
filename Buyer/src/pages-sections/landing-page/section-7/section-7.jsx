"use client"

import { motion } from "framer-motion";
import { styles } from "../page-view/styles";
import { LazyImage } from '@/components/lazy-image';
import { FlexBox, FlexCol, FlexRowCenter } from '@/components/flex-box';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import Link from "next/link";

export default function Section6() {
  return (
    <Grid sx={{ position:'relative', zIndex:2 }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{ height: "100%" }} // Ensures motion.div spans full height
      >
        <Container>
          <Box sx={{ flexGrow: 1, py: {xs:5, sm:8} }}>
            <Grid container spacing={4} alignItems="stretch" sx={{ height: '100%' }}>
              <Grid item xs={12} md={6}>
                <FlexCol sx={{ gap: 4, height: '100%' }}>
                  <Typography sx={{ ...styles.sectionHeader, textAlign:{xs:'center', sm:'left'} }}>
                    3D Repository
                  </Typography>
                  <Typography sx={{ maxWidth:'550px', color: '#FFF', fontSize: { xs: 12, sm: 18 }, px: { xs: 1, sm: 0 }, textAlign: 'justify', lineHeight: {xs:1.5, sm:2} }}>
                    Generate and store high-quality 3D models of any dynamic or static product from text-prompts, images, weblinks, and object scans. Choose from hundreds of templates to create marketing ad videos. Then allow your consumers to trial these products realistically in our immersive AR marketplace.
                  </Typography>
                  {/* Call-to-action button */}
                  <FlexBox sx={{ pt:{sm:5}, justifyContent:{xs:'center', sm:'left'} }}>
                    <Link href="/sell-on-symspace#benefits" passHref>
                      <Button sx={styles.outlinedBtn}>
                        Explore
                      </Button>
                    </Link>
                  </FlexBox>
                </FlexCol>
              </Grid>
              {/* Right column: image content */}
              <Grid item xs={12} md={6}>
                <FlexRowCenter sx={{ height: '100%' }}>
                  <LazyImage
                    width={650}
                    height={650}
                    src="/assets/images/dashboard.png"
                    alt="iphone"
                  />
                </FlexRowCenter>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </motion.div>
    </Grid>
  );
}
