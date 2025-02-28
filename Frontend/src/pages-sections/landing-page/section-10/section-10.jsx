'use client'

import { useRef, useState, useEffect } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { sectionStyles } from './styles';
import HandBagCanvas from '../../../components/HandBagCanvas';

// Define animation variants
const listItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.2, duration: 0.6, ease: "easeOut" }
  }),
};

const rightComponentVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  },
};

export default function Section9() {
  const features = [
    "Innovative and immersive experiences",
    "Improve consumer confidence and convenience",
    "Reduce manufacturing and inventory costs",
    "Customizable AR content for marketing purposes",
    "Awareness and assistance for underserved communities",
    "Gauge consumer demand through AR Room",
  ];

  // Refs for tracking visibility
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  // useInView hooks
  const leftInView = useInView(leftRef, { triggerOnce: true, threshold: 0.2 });
  const rightInView = useInView(rightRef, { triggerOnce: true, threshold: 0.2 });

  // Persistent state for animation
  const [leftHasAnimated, setLeftHasAnimated] = useState(false);
  const [rightHasAnimated, setRightHasAnimated] = useState(false);

  // Set state once animation is triggered
  useEffect(() => {
    if (leftInView) setLeftHasAnimated(true);
    if (rightInView) setRightHasAnimated(true);
  }, [leftInView, rightInView]);

  return (
    <Grid sx={sectionStyles.gridContainer}>
      <Container>
        <Box sx={sectionStyles.boxContainer}>
          <Grid container spacing={6} alignItems="center">
            
            {/* Left section: List of features */}
            <Grid item xs={12} md={6} sx={sectionStyles.leftGridItem}>
              <motion.div
                ref={leftRef}
                initial="hidden"
                animate={leftHasAnimated ? "visible" : "hidden"} // Persistent state
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={listItemVariants}
                    custom={index}
                    style={{ marginBottom: '16px' }} // Added gap between cards
                  >
                    <Box sx={index % 2 === 0 ? sectionStyles.textBoxGrey : sectionStyles.textBoxWhite}>
                      <Typography sx={sectionStyles.typographyStyles}>
                        {feature}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </motion.div>
            </Grid>

            {/* Right section: 3D interactive canvas */}
            <Grid item xs={12} md={6}>
              <motion.div
                ref={rightRef}
                initial="hidden"
                animate={rightHasAnimated ? "visible" : "hidden"} // Persistent state
                variants={rightComponentVariants}
              >
                <Box sx={sectionStyles.rightGridItem}>
                  <HandBagCanvas />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Grid>
  );
}
