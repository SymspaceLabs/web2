"use client";

// ===========================================================
// Section 8 Component
// ===========================================================

import Link from 'next/link';
import { motion } from "framer-motion"; // Importing framer-motion
import { styles } from '../page-view/styles';
import { FlexBox } from '@/components/flex-box';
import { LazyImage } from '@/components/lazy-image';
import { H1, Paragraph } from '@/components/Typography';
import { Box, Container, Button, Grid } from '@mui/material'; // Importing Material-UI components for layout and styling

// ===========================================================

export default function Section9() {
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
            <H1 sx={{...styles.sectionHeader, color:'#191F28' }}>
              3d simulation
            </H1>

            {/* Description of the platform */}
            <Paragraph
              sx={{
                color: '#909090',
                fontSize: { xs: 12, sm: 18 },
                textAlign: 'justify',
                maxWidth: 1350,
                fontWeight:{xs:600, sm:500},
                lineHeight: { xs: 1.5, sm: 2 },
                display: { xs: '-webkit-box', sm: 'block' },
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: { xs: 7, sm: 'unset' }, // Truncate to 4 lines on mobile
                overflow: { xs: 'hidden', sm: 'unset' }
              }}
            >
              Symspace's Generative AI 3D modeling software serves as a tool for brands to gauge traction before all the spending. Create realistic 3D models of your products, then share animated product videos with your community. Within Real Estate, partners are using our platform and iOS application to virtually showcase furniture. We have streamlined our platform to simplify the process for any sized brand looking to launch a new product, improve sales on an existing product, or stage products in unfurnished homes. Our partner portal provides analytics on sales, AR usage, and product interactions. Brands can engage their communities through AR without incurring any manufacturing or inventory costs. Augmented Reality has proven to effectively reduce returns by giving consumers more confidence in their purchases. Customize any 3D product through text, images, object scans, and videos. Save time and resources, while focusing on what matters most- product demand through unique consumer interactions.
            </Paragraph>


            {/* Call-to-action button */}
            <Box sx={{ width: "100%" }}>
              <Link href="/sell-on-symspace#benefits" passHref>
                <Button
                  sx={{
                    gap: 1,
                    color: "#353535",
                    borderRadius: "50px",
                    py: {xs:1, sm:2},
                    px: {xs:2, sm:3},
                    fontSize: {xs:12, sm:16},
                    background: "transparent",
                    minWidth: { sm:'250px' },
                    border: "2px solid #353535",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      color: "#fff",
                      background: "linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)",
                      border: "2px solid #FFF",
                      "& img": {
                        content: 'url("/assets/images/sparkler-white.webp")',
                      },
                    },
                  }}
                >
                  Get Started

                  {/* Icon inside the button */}
                  <Box
                    sx={{
                      width: {xs:'25px', sm:"35px"},
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LazyImage
                      alt="furniture shop"
                      width={100}
                      height={100}
                      src="/assets/images/sparkler-grey.png"
                      sx={{
                        transition: "all 0.3s ease-in-out",
                      }}
                    />
                  </Box>
                </Button>
              </Link>
            </Box>
          </FlexBox>
        </Container>
      </motion.div>
    </Grid>
  );
}
