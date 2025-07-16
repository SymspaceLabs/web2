"use client";

// =======================================================
// Section 4 Component
// ======================================================

import { motion } from "framer-motion";
import { H1 } from '@/components/Typography';
import { Box, Container } from '@mui/material';
import { SymSection } from '@/components/custom-components';
import { SymGLTFViewer } from '@/components/custom-components';

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
            <H1 fontSize={{ xs: 20, sm: 34 }} textAlign="center">
              revolutionize Shopping
            </H1>
            <H1 fontSize={{ xs: 20, sm: 34 }} textAlign="center">
              3d products & ar trial room
            </H1>
          </Box>
        </motion.div>

        {/* Section 1 */}
        <motion.div variants={fadeInVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <SymSection
            title="Generate 3d products with visible details"
            subTitle="Migrate your Entire Catalogue into a Centralized 3D Repository to market and gauge product demand prior to manufacturing"
            btnText="Get Started"
            btnUrl="/"
            invert={false}
          >
            <SymGLTFViewer modelUrl="/models/xander-vera-cherub-blue-angel-mini-bag/scene.gltf" />
          </SymSection>
        </motion.div>

        {/* Section 2 */}
        <motion.div variants={fadeInVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <SymSection
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
              playsInline
              src="/assets/videos/ar-for-business/black-t-shirt.mp4"
              poster="/assets/videos/ar-for-business/black-t-shirt.mp4"
              style={{ position: "relative", zIndex: 2, borderRadius: "50px" }}
            />
          </SymSection>
        </motion.div>

        {/* Section 3 */}
        <motion.div variants={fadeInVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <SymSection
            title="augmented reality Integration"
            subTitle="Empower customers through an AR Trial Room experience for customers to confidently trial products, receive sizing recommendations, and checkout seamlessly"
            btnText="Learn More"
            btnUrl="/"
            invert={false}
          >
            <video
              width="40%"
              height="auto"
              autoPlay
              loop
              muted
              playsInline
              src="/assets/videos/ar-for-business/model.mp4"
              poster="/assets/videos/ar-for-business/model.mp4"
              style={{ position: "relative", zIndex: 2, borderRadius: "50px" }}
            />
          </SymSection>
        </motion.div>

        {/* Section 4 */}
        <motion.div variants={fadeInVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <SymSection
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
              playsInline
              src="/assets/videos/ar-for-business/black-t-shirt.mp4"
              poster="/assets/videos/ar-for-business/black-t-shirt.mp4"
              style={{ position: "relative", zIndex: 2, borderRadius: "50px" }}
            />
          </SymSection>
        </motion.div>

      </Container>
    </Box>
  );
}
