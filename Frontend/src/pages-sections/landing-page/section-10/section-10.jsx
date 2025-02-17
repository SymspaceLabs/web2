"use client";

import React, { useRef, useState, useEffect } from "react";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import { motion, useInView } from "framer-motion";
import { styles } from "./styles";
import { keyframes } from "@mui/material/styles";

const blob = keyframes`
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
`;

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

  const blob1 = {
    position: "absolute",
    top: 300,
    left: 50,
    width: "450px",
    height: "450px",
    background: "#FFFFFF",
    borderRadius: "50%",
    zIndex: 0,
    opacity: 0.3,
    filter: "blur(80px)",
    animation: `${blob} 7s infinite`,
  };

  const blob2 = {
    position: "absolute",
    top: 50,
    right: 50,
    width: "250px",
    height: "250px",
    background: "#FFFFFF",
    borderRadius: "50%",
    zIndex: 0,
    opacity: 0.3,
    filter: "blur(80px)",
    animation: `${blob} 7s infinite`,
  };

  return (
    <Grid sx={{ ...styles.sectionBackground, position: "relative", overflow: "hidden" }}>
      <Container sx={{ position: "relative" }}>
        <Box sx={blob1} />
        <Box sx={blob2} />

        {/* This div will fade in only once when scrolled into view */}
        <motion.div 
          ref={sectionRef} 
          initial="hidden" 
          animate={hasAnimated ? "visible" : "hidden"} 
          variants={fadeInVariants}
        >
          <Box sx={styles.container}>
            <Typography sx={styles.title}>Our Focus</Typography>
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
