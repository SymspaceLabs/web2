"use client";

/**
 * Section8 Component
 *
 * This component showcases the "SYM-AI" 3D modeling SaaS platform with:
 * - A floating image for enhanced visual appeal.
 * - A centralized description of the platform's features.
 * - A call-to-action button encouraging users to learn more.
 *
 * The layout adjusts responsively, and the floating image is hidden on smaller screens.
 */
import { Box, Container, Typography, Button, Grid } from '@mui/material'; // Importing Material-UI components for layout and styling
import LazyImage from "../../../components/LazyImage"; // Importing a lazy-loading image component
import { FlexBox } from '@/components/flex-box';
import { motion } from "framer-motion"; // Importing framer-motion


export default function Section8() {
  return (
    <Grid sx={{ background: '#EDEDED', py: 8, position: 'relative' }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Container>
          <FlexBox flexDirection='column' gap={5} sx={{ textAlign: 'center', alignItems: 'center' }}>
            {/* Section Title */}
            <Typography fontFamily='Elemental End' color='#191F28' sx={{fontSize: {xs:30, sm:64} }}>
              3d simulation
            </Typography>

            {/* Description of the platform */}
            <Typography
              sx={{ fontFamily: 'Helvetica', color: '#909090', fontSize: { xs: 14, sm: 18 },
                textAlign: 'justify',
                maxWidth: 1400,
                lineHeight: {xs:1.5, sm:2}
              }}
            >
              Symspace's Generative AI 3D modeling software serves as a tool for brands to gauge traction before all the spending. Create realistic 3D models of your products, then share animated product videos with your community. Within Real Estate, partners are using our platform and iOS application to virtually showcase furniture. We have streamlined our platform to simplify the process for any sized brand looking to launch a new product, improve sales on an existing product, or stage products in unfurnished homes. Our partner portal provides analytics on sales, AR usage, and product interactions. Brands can engage their communities through AR without incurring any manufacturing or inventory costs. Augmented Reality has proven to effectively reduce returns by giving consumers more confidence in their purchases. Customize any 3D product through text, images, object scans, and videos. Save time and resources, while focusing on what matters most- product demand through unique consumer interactions.
            </Typography>

            {/* Call-to-action button */}
            <Box sx={{ width: "100%" }}>
              <Button
                sx={{
                  gap: 2,
                  fontFamily: "Helvetica",
                  color: "#353535",
                  borderRadius: "50px",
                  py: 2,
                  px: 3,
                  background: "transparent",
                  border: "2px solid #353535",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    color: "#fff",
                    background: "linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)",
                    border: "2px solid #FFF",
                    "& img": {
                      content: 'url("/assets/images/sparkler-white.png")',
                    },
                  },
                }}
              >
                {/* Button Text */}
                <Typography fontFamily="Elemental End" textTransform="lowercase" fontSize={16} >
                  Get Started
                </Typography>

                {/* Icon inside the button */}
                <Box
                  sx={{
                    width: "35px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LazyImage
                    alt="furniture shop"
                    width={25}
                    height={25}
                    src="/assets/images/sparkler-grey.png"
                    sx={{
                      transition: "all 0.3s ease-in-out",
                    }}
                  />
                </Box>
              </Button>
            </Box>

          </FlexBox>
        </Container>
      </motion.div>
    </Grid>
  );
}
