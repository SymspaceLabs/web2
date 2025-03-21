"use client";

import { motion } from "framer-motion";
import { FlexBox, FlexCol } from "@/components/flex-box";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import { styles } from "../page-view/styles";
import Link from "next/link";


export default function Section10() {
  return (
    <Grid sx={{ position:'relative', zIndex:2 }}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{ height: "100%" }} // Ensures motion.div spans full height
        >
          <FlexCol sx={{ gap: 3, py: 10, textAlign: 'center', alignItems: 'center' }}>
            <Typography sx={{ ...styles.sectionHeader, textAlign:{xs:'center', sm:'left'} }}  width="100%" maxWidth="1200px">
              Our Focus
            </Typography>
            <Typography 
              sx={{ 
                maxWidth: 1200,
                color: '#FFF',
                fontSize: { xs: 12, sm: 18 },
                lineHeight: { xs: 1.5, sm: 2 },
                textAlign: 'justify'
              }}
            >
              We empower individuals with Augmented Reality, while equipping brands with resources to showcase their products in unimaginable ways. Our goal is to revolutionize the end-to-end e-commerce process by creating 3D assets of retail products and enabling consumers to augment these products with enhanced AR functionalities. We offer a sustainable solution that delivers immersive, hyper-realistic, and seamless 3D models coupled with unparalleled AR experiences. Through cutting-edge technologies such as artificial intelligence and augmented reality, we are positioned to transform mere imagination into tangible simulations of reality.
            </Typography>
            <FlexBox sx={{ width: '100%', maxWidth: 1200, justifyContent:{xs:'center', sm:'flex-start'}  }}>
              <Link href="/about-us" passHref>
                <Button variant="outlined" sx={styles.outlinedBtn}>
                  About Us
                </Button>
              </Link>
            </FlexBox>
          </FlexCol>
        </motion.div>
      </Container>
    </Grid>
  );
}