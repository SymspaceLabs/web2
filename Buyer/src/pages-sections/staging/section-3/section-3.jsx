"use client";

import Link from 'next/link';
import { useState } from 'react';
import { motion } from "framer-motion";
import { styles } from "../page-view/styles";
import { LazyImage } from '@/components/lazy-image';
import { Button, Box, Typography, Container } from '@mui/material';
import { FlexColCenter, FlexBox, FlexRowCenter } from "@/components/flex-box";

export default function Section3() {

  const [activeBenefit, setActiveBenefit] = useState(benefits[0]);
  
  const handleBenefitChange = (benefit) => {
    setActiveBenefit(benefit); 
  };

  return (
    <Container sx={{ py: {xs:2, sm:5}, zIndex:999 }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{ height: "100%" }}
      >
        <FlexColCenter sx={{ py:{xs:2, sm:5}, px:{xs:3}, gap:{xs:2, sm:4} }}>
          <Typography sx={styles.header}>
            customize, configure & tour spaces in real-time
          </Typography>
          <Typography sx={styles.subheader}>
            Transform blueprints into interactive AR environments. Adjust materials, layout, and visual aesthetics in real-time.
          </Typography>
          <FlexBox sx={styles.textBubbleContainer}>
            {benefits.map((benefit, index) => (
              <Box
                key={index}
                sx={styles.textBubble}
                onMouseEnter={() => handleBenefitChange(benefit)}
              >
                {benefit.title}
              </Box>
            ))}
          </FlexBox>

          {/* Card & Image Side-by-Side */}
          <FlexBox
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              width: "100%",
              gap: 3,
            }}
          >
            {/* Left Side Card */}
            <FlexColCenter sx={styles.glassCard} gap='25px'>
              <Typography sx={{ fontFamily: "Helvetica", fontWeight: '300', color: "#fff", fontSize: { xs: 12, sm: 24 } }}>
                {activeBenefit.content}
              </Typography>
              <Typography sx={{ fontFamily: "Helvetica", fontWeight: '300', color: "#fff", fontSize: { xs: 12, sm: 24 } }}>
                {activeBenefit.bullet}
              </Typography>
              <FlexRowCenter>
                <Link href='/'>
                  <Button sx={styles.buttonTransparent} >
                    Explore Now
                  </Button>
                </Link>
              </FlexRowCenter>
            </FlexColCenter>

            {/* Right Side Image */}
            <FlexColCenter>
              <LazyImage
                src={activeBenefit.imgUrl}
                alt="AR Experience"
                width={500}
                height={500}
              />
            </FlexColCenter>
          </FlexBox>
        </FlexColCenter>
      </motion.div>
    </Container>
  );
}

const benefits = [
  { 
    title: 'personalize material and style',
    imgUrl: '/assets/images/staging/customize-1.png',
    content: 'Upload & edit 2D or 3D floor plans to generate immersive 3D layouts.',
    bullet: ' No floor plan? No problem. Start by selecting one of our templates or even  draw your floor plan with the specified measurements you want.'
  },
  { 
    title: 'floor plans',
    imgUrl: '/assets/images/staging/customize-2.png',
    content: 'Render or import 3D models of properties and begin customizing the style such as flooring, walls, material, paint, countertops, and furniture.',
    bullet: 'Drag and Drop 3D products  anywhere to customize homes with  true-to-size products representing the property in real-life.'
  },
  { 
    title: '3d renders & Virtual tours',
    imgUrl: '/assets/images/staging/customize-3.png',
    content: 'Render high-quality videos/images of your customized home and offer virtual walkthroughs for potential buyers/tenants.',
    bullet: 'National Association of Realtors (NAR) found virtual staging reduces staging costs by up to 80% and increases rental value by 20% with AR-powered staging'
  },
];
