"use client";

// ===================================================================
// Hero Section 
// ===================================================================

import Link from "next/link";
import { motion } from "framer-motion";
import { styles } from "../page-view/styles";
import { LazyImage } from '@/components/lazy-image';
import { H1, Paragraph } from "@/components/Typography";
import { Box, Container, Button, Grid } from "@mui/material";
import { FlexBox, FlexColCenter } from "@/components/flex-box";

// ===================================================================

export default function Section1() {
  return (
    <Grid sx={{ background:'transparent' }}>
      <Container>
        <Box sx={{ flexGrow: 1, py: 8 }}>
          <Grid container spacing={3} alignItems="center">
            {/* Left content */}
            <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", zIndex: 2 }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                style={{ height: "100%" }} // Ensures motion.div spans full height
              >
                <Paragraph sx={{ color: 'rgba(255,255,255,0.7)', fontSize: {xs:18, sm:28}, mb:{xs:-1, sm:-3}, fontWeight: 'bold' }}>
                   AI Powered AR Commerce
                </Paragraph>
                
                <H1 fontSize={{xs:48, sm:60, md:100}} color='#FFF'>
                  SYMSPACE
                </H1>
                
                <Paragraph fontSize={{xs:11, sm:20}} color='#FFF'>
                  Revolutionize your shopping experience through Augmented Reality.
                </Paragraph>

                <FlexBox sx={{ gap: '15px', py: {xs:2, sm:5} }}>
                  <Link href="/register" passHref>
                    <Button sx={styles.gradientBtn}>
                      <H1 fontSize={{xs:10, sm:16}}>
                        Get Started
                      </H1>
                      <FlexColCenter sx={{ width: { xs: 15, sm: 35 } }}>
                        <LazyImage
                          alt="furniture shop"
                          width={100}
                          height={100}
                          src="/assets/images/sparkler-white.png"
                        />
                      </FlexColCenter>
                    </Button>
                  </Link>
                  {/* Shop Now Button with Link */}
                  <Link href="/marketplace" passHref>
                    <Button sx={styles.outlinedBtn}>
                      Shop Now
                    </Button>
                  </Link>
                </FlexBox>
              </motion.div>
            </Grid>

            {/* Right content: Promotional video */}
            <Grid item xs={12} md={6} sx={{ zIndex: 2, display: { xs: "none", md: "block" } }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                style={{ height: "100%" }} // Ensures motion.div spans full height
              >
                <Box sx={{ textAlign: 'center', zIndex: 2, position: 'relative' }}>
                  <video
                    width="50%"
                    height="auto"
                    autoPlay
                    loop
                    muted
                    src="https://uploads-ssl.webflow.com/64694132a19474ee2218a9e6/648a8e1d8d146c19eb799200_Prosthetic_CMP_black_trimeed-transcode.mp4"
                    poster="https://uploads-ssl.webflow.com/64694132a19474ee2218a9e6/648a8e1d8d146c19eb799200_Prosthetic_CMP_black_trimeed-poster-00001.jpg"
                    style={{ position: "relative", zIndex: 2 }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Grid>
  );
}


