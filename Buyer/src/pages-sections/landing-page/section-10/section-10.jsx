'use client'

// ====================================================
// Section 10 | 3D Handbag
// ====================================================

import { motion, useInView } from 'framer-motion';
import { Paragraph } from '@/components/Typography';
import { useRef, useState, useEffect } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { SymGLTFViewer } from '@/components/custom-components';

// ====================================================

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
    <Grid sx={{ position:'relative', zIndex:2 }}>
      <Container>
        <Box sx={{ flexGrow: 1, py: 8 }}>
          <Grid container spacing={6} alignItems="center">
            
            {/* Left section: List of features */}
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                    <Box sx={{ p: {xs:2, sm:5}, background: index % 2 === 0 ? '#D5D5D5' : '#fff', borderRadius: {xs:'20px', sm:'25px'}, textAlign:{xs:'center', sm:'left'} }}>
                      <Paragraph sx={{ color: '#000', fontSize: {xs:12, sm:20}, fontWeight: 'bold' }}>
                        {feature}
                      </Paragraph>
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
                <SymGLTFViewer
                  modelUrl="/threeDModels/xander-vera-cherub-blue-angel-mini-bag/scene.gltf"
                />
                  {/* <SymGLTFViewer
                    modelUrl="https://simspace-aws-s3.s3.us-east-2.amazonaws.com/xander-vera-cherub-blue-angel-mini-bag.glb"
                  /> */}
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Grid>
  );
}
