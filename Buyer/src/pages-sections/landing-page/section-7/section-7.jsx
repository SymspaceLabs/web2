"use client"

// ========================================================
// Section 7 | 3D Repository
// ========================================================

import Link from "next/link";
import { motion } from "framer-motion";
import { styles } from "../page-view/styles";
import { LazyImage } from '@/components/lazy-image';
import { H1, Paragraph } from "@/components/Typography";
import { Box, Container, Button, Grid } from '@mui/material';
import { FlexBox, FlexCol, FlexRowCenter } from '@/components/flex-box';

// ========================================================

export default function Section7() {
  return (
    <div id="3d-repository">
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
                    <H1 sx={{ ...styles.sectionHeader, textAlign:{xs:'center', sm:'left'} }}>
                      3D Repository
                    </H1>
                    <Paragraph sx={{ maxWidth:'550px', color: '#FFF', fontSize: { xs: 12, sm: 18 }, px: { xs: 1, sm: 0 }, textAlign: 'justify', lineHeight: {xs:1.5, sm:2} }}>
                      Generate and store high-quality 3D models of any dynamic or static product from text-prompts, images, weblinks, and object scans. Choose from hundreds of templates to create marketing ad videos. Then allow your consumers to trial these products realistically in our immersive AR marketplace.
                    </Paragraph>
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
    </div>
  );
}
