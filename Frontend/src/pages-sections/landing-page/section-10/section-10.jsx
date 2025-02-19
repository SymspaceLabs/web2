"use client";

import React, { useRef, useState, useEffect } from "react";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import { motion, useInView } from "framer-motion";
import { styles } from "./styles";

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: "easeOut" } 
  },
};

export default function Section10() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { threshold: 0.2 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return (
    <Grid sx={{ background: '#1F1F1F' }}>
      <Container>
        <motion.div 
          ref={sectionRef} 
          initial="hidden" 
          animate={hasAnimated ? "visible" : "hidden"} 
          variants={fadeInVariants}
        >
          <Box sx={styles.container}>
            <Typography fontFamily='Elemental End' textTransform='lowercase' color='#FFF' sx={{fontSize: { xs:30, sm:64 } }} textAlign='left' width="100%" maxWidth="1200px">
              Our Focus
            </Typography>
            <Typography sx={styles.description}>
              We empower individuals with Augmented Reality, while equipping brands with resources to showcase their products in unimaginable ways. Our goal is to revolutionize the end-to-end e-commerce process by creating 3D assets of retail products and enabling consumers to augment these products with enhanced AR functionalities. We offer a sustainable solution that delivers immersive, hyper-realistic, and seamless 3D models coupled with unparalleled AR experiences. Through cutting-edge technologies such as artificial intelligence and augmented reality, we are positioned to transform mere imagination into tangible simulations of reality.
            </Typography>
            <Box sx={styles.buttonContainer}>
              <Button variant="outlined" sx={styles.button}>
                About Us
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Grid>
  );
}
