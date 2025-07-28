"use client";

// ===================================================================
// Hero Section - Optimized for Faster Loading
// ===================================================================

import Link from "next/link";
import { motion } from "framer-motion";
import { styles } from "../page-view/styles"; // Ensure 'styles' is lightweight and optimized
import { LazyImage } from '@/components/lazy-image'; // CRITICAL: Ensure this component is highly optimized
import { H1, Paragraph } from "@/components/Typography"; // Ensure these components are lightweight
import { Box, Container, Button, Grid } from "@mui/material";
import { FlexBox, FlexColCenter } from "@/components/flex-box"; // Ensure these components are lightweight

// ===================================================================

export default function Section1() {
  return (
    <Grid sx={{ background: 'transparent' }}>
      <Container>
        <Box sx={{ flexGrow: 1, py: 8, pt: {xs:'100px', sm:'100px', md:'200px'} }}>
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
                <Paragraph sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: 18, sm: 25 }, mb: { xs: -1, sm: -3 }, fontWeight: 'bold' }}>
                  AI Powered AR Commerce
                </Paragraph>

                <H1 fontSize={{ xs: 48, sm: 60, md: 90 }} color='#FFF'>
                  SYMSPACE
                </H1>

                <Paragraph fontSize={{ xs: 11, sm: 18 }} color='#FFF'>
                  Revolutionize your shopping experience through Augmented Reality.
                </Paragraph>

                <FlexBox sx={{ gap: '15px', py: { xs: 2, sm: 5 } }}>
                  <Link href="/register" passHref>
                    <Button sx={styles.gradientBtn}>
                      <H1 fontSize={{ xs: 10, sm: 16 }}>
                        Get Started
                      </H1>
                      <FlexColCenter sx={{ width: { xs: 15, sm: 35 } }}>
                        {/* Image Optimization:
                            - Use WebP format for better compression.
                            - Ensure LazyImage component correctly implements native lazy loading (`loading="lazy"`).
                            - Provide explicit width and height to prevent Cumulative Layout Shift (CLS).
                        */}
                        <LazyImage
                          alt="sparkler icon" // Improved alt text for accessibility
                          width={100}
                          height={100}
                          src="/assets/images/sparkler-white.webp" // Suggest WebP for better compression
                          loading="lazy" // Explicitly add native lazy loading if LazyImage doesn't handle it
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
            <Grid item xs={12} md={6}
              sx={{
                zIndex: 2,
                justifyContent: 'flex-end',
                paddingRight: { sm: '100px' },
                display: { xs: "none", sm: "none", md: "flex" } // Video is hidden on mobile/small screens
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                style={{ height: "100%" }} // Ensures motion.div spans full height
              >
                <Box
                  sx={{
                    zIndex: 2,
                    width: '100%',
                    maxWidth: '250px',
                    overflow: 'hidden',
                    position: 'relative',
                    borderRadius: '40px',
                  }}
                >
                  {/* Video Optimization:
                      - `preload="none"`: Crucial for preventing the browser from downloading the entire video file immediately.
                      - Multiple `<source>` tags: Provide different video formats (e.g., WebM, MP4) for broader browser compatibility and potentially smaller file sizes (WebM often compresses better).
                      - `poster`: Essential for displaying an image while the video loads or if it fails to play. Optimize this poster image (e.g., WebP).
                      - Explicit `width` and `height` attributes on the <video> tag (or through CSS that sets intrinsic size) help prevent CLS.
                  */}
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="none" // Prevents full video download on initial page load
                    poster='/assets/videos/landing-page/hero-poster.webp' // Use an optimized WebP poster image
                    width="250" // Explicit width for CLS prevention (adjust based on actual video aspect ratio)
                    height="444" // Explicit height for CLS prevention (adjust based on actual video aspect ratio, 250 * 16/9 for example)
                    style={{
                      width: '100%', // Ensures responsiveness
                      height: 'auto', // Ensures responsiveness
                      display: 'block'
                    }}
                  >
                    {/* Provide WebM first as it often has better compression */}
                    <source src='/assets/videos/landing-page/hero.webm' type='video/webm' />
                    {/* Fallback to MP4 */}
                    <source src='/assets/videos/landing-page/hero.mp4' type='video/mp4' />
                    Your browser does not support the video tag.
                  </video>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Grid>
  );
}
