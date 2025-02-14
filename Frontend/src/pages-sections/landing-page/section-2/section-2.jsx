"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Box } from '@mui/material';
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
            <TitleText>Future of Retail</TitleText>
            <DescriptionText>
              In the rapidly advancing era of XR hardware, Symspace is at the
              forefront of empowering brands for the future. By creating highly
              accurate, detailed, realistic 3D models, we enable seamless
              integration into the upcoming AR ecosystem. We imagine a world where
              individuals can effortlessly explore and purchase products remotely
              by immersing themselves in digital and virtual experiences. With
              Symspace, brands are prepared to spearhead the AR revolution and
              redefine the shopping experience. Embrace the future and shape the
              landscape of retail with us.
            </DescriptionText>
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
