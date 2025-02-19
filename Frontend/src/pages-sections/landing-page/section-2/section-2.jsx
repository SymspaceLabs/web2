"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Box, Typography } from '@mui/material';
import { SectionBox, TitleText, DescriptionText } from './section2.styles';
import { motion, useScroll } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Section2() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (videoRef.current && !isPlaying) {
              videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
            }
          } else {
            if (videoRef.current && isPlaying) {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [isPlaying]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });


  const handleClick = () => {
    router.push('/register-partner');
  };

  return (
    <Box sx={{ background: '#1F1F1F', paddingTop: 3, paddingBottom: 3 }}>
      <Container ref={containerRef}>
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <SectionBox>
            <Typography sx={{fontFamily: 'Elemental End', textTransform:'lowercase', color: '#FFF', fontSize:  { xs: 30, sm: 64 }, }}>
              Future of Retail
            </Typography>
            <Typography sx={{fontFamily: 'Helvetica', color: '#fff', fontSize: { xs:15, sm:18 }, textAlign: 'justify', maxWidth: 1340, lineHeight: { xs:1.5, sm:2 } }}>
              In the rapidly growing XR industry, Symspace is at the forefront of empowering brands for the future. By creating highly accurate, detailed, realistic 3D models, we help brands prepare for the AR revolution when XR hardware becomes more accessible and affordable. We imagine a world where individuals can effortlessly explore and purchase products remotely by immersing themselves in virtual experiences. We aim to become the standard for XR accessibility by prioritizing and empowering those unable to travel our convenient AR solution. With Symspace, consumers can shop from home, receive sizing recommendations, and feel confident in their purchases. Embrace the future and simulate the retail space with us.
            </Typography>
            <Button sx={buttonStyle} onClick={handleClick}>
              partner sign up
            </Button>
          </SectionBox>
        </motion.div>
      </Container>
    </Box>
  );
}

const buttonStyle = {
  border: '2px solid white',
  color: '#fff',
  background: 'transparent',
  borderRadius: '50px',
  py: 2,
  px: 3,
  fontFamily: 'Elemental End',
  textTransform: 'lowercase',
  ':hover': {
    background: '#fff',
    color: '#000',
  },
};
