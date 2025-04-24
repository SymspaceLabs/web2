"use client";

import { useState } from 'react';
import { motion } from "framer-motion";
import { styles } from "../page-view/styles";
import { LazyImage } from '@/components/lazy-image';
import { Box, Typography, Container } from '@mui/material';
import { FlexColCenter, FlexBox } from "@/components/flex-box";
import { H1 } from '@/components/Typography';

export default function Section5() {

  const [activeBenefit, setActiveBenefit] = useState(benefits[0]);
  
  const handleBenefitChange = (benefit) => {
    setActiveBenefit(benefit); 
  };

  return (
    <Container sx={{ py: {xs:2, sm:5}, zIndex: 1 }} >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{ height: "100%" }}
      >
        <FlexColCenter sx={{ py:{xs:2, sm:5}, px:{xs:2}, gap:4 }}>
          <H1 sx={styles.header}>
            furnish Homes with augmented reality
          </H1>
          <FlexBox sx={{...styles.textBubbleContainer }}>
            {benefits.slice(0, 3).map((benefit, index) => (
              <Box 
                key={index}
                sx={{ ...styles.textBubble, maxWidth: { xs:180, sm:'250px', md:'500px'} }}
                onMouseEnter={() => handleBenefitChange(benefit)}
              >
                <H1 fontSize={{xs:'8px', sm:'14px'}} color="#FFF">
                  {benefit.title}
                </H1>
              </Box>
            ))}
          </FlexBox>

          {/* Card & Image Side-by-Side */}
          <Box width={250}>
            <LazyImage
              src={activeBenefit.imgUrl}
              alt="AR Experience"
              width={500}
              height={500}
            />
          </Box>
        </FlexColCenter>
      </motion.div>
    </Container>
  );
}

const benefits = [
  { 
    title: 'place real furniture with ar',
    imgUrl: '/assets/images/staging/furnish-home-1.png',
  },
  { 
    title: 'view product dimensions in real-time',
    imgUrl: '/assets/images/staging/furnish-home-2.png',
  },
  { 
    title: 'seamless checkout & ordering',
    imgUrl: '/assets/images/staging/furnish-home-3.png',
  }
];
