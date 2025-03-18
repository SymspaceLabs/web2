"use client";

// =======================================================
// Section 4 Component
// ======================================================

import { Box, Container, Typography } from '@mui/material';
import { styles } from '../page-view/styles';
import CustomSection from './custom-section';
import { motion } from "framer-motion";

// Animation variants
const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Section4() {
  return (
    <Box id="benefits" sx={{ zIndex:2 }}>
      <Container>
        {/* Section header */}
        <motion.div variants={fadeInVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                ...styles.elementalEndFont,
                fontSize:{ sm: 34, xs: 28 },
                textAlign:"center"
              }}
            >
              revolutionize Shopping
            </Typography>
            <Typography
              fontSize={{ sm: 34, xs: 28 }}
              fontFamily="'Elemental End', sans-serif"
              textTransform="lowercase"
              textAlign="center"
            >
              3d products & ar trial room
            </Typography>
          </Box>
        </motion.div>

        {/* Section 1 */}
        <motion.div variants={fadeInVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <CustomSection
            title="Generate 3d products with visible details"
            subTitle="Migrate your Entire Catalogue into a Centralized 3D Repository to market and gauge product demand prior to manufacturing"
            btnText="Get Started"
            btnUrl="/"
            invert={false}
          >
            <video
              width="50%"
              height="auto"
              autoPlay
              loop
              muted
              src="/assets/videos/ar-for-business/black-t-shirt.mp4"
              poster="/assets/videos/ar-for-business/black-t-shirt.mp4"
              style={{ position: "relative", zIndex: 2, borderRadius: "50px" }}
            />
          </CustomSection>
        </motion.div>

        {/* Section 2 */}
        <motion.div variants={fadeInVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <CustomSection
            title="3d product ad Videos"
            subTitle="Showcase unique product features through a wide array of video templates to choose from"
            btnText="Contact us"
            btnUrl="/"
            invert={true}
          >
            <video
              width="50%"
              height="auto"
              autoPlay
              loop
              muted
              src="/assets/videos/ar-for-business/black-t-shirt.mp4"
              poster="/assets/videos/ar-for-business/black-t-shirt.mp4"
              style={{ position: "relative", zIndex: 2, borderRadius: "50px" }}
            />
          </CustomSection>
        </motion.div>

        {/* Section 3 */}
        <motion.div variants={fadeInVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <CustomSection
            title="augmented reality Integration"
            subTitle="Empower customers through an AR Trial Room experience for customers to confidently trial products, receive sizing recommendations, and checkout seamlessly"
            btnText="Learn More"
            btnUrl="/"
            invert={false}
          >
            <video
              width="50%"
              height="auto"
              autoPlay
              loop
              muted
              src="/assets/videos/ar-for-business/black-t-shirt.mp4"
              poster="/assets/videos/ar-for-business/black-t-shirt.mp4"
              style={{ position: "relative", zIndex: 2, borderRadius: "50px" }}
            />
          </CustomSection>
        </motion.div>

        {/* Section 4 */}
        <motion.div variants={fadeInVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <CustomSection
            title="Increase conversion & reduce returns"
            subTitle="By improving the customer experience through an immersive and interactive experience, shoppers view  products conveniently and confidently resulting to an  increase in sales and decrease in returns"
            btnText="Learn More"
            btnUrl="/"
            invert={true}
          >
            <video
              width="50%"
              height="auto"
              autoPlay
              loop
              muted
              src="/assets/videos/ar-for-business/black-t-shirt.mp4"
              poster="/assets/videos/ar-for-business/black-t-shirt.mp4"
              style={{ position: "relative", zIndex: 2, borderRadius: "50px" }}
            />
          </CustomSection>
        </motion.div>

      </Container>
    </Box>
  );
}
