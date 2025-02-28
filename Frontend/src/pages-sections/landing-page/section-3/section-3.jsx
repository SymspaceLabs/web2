"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FlexColCenter } from "@/components/flex-box";
import { Button, Box, Typography } from '@mui/material';

export default function Section2() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/register-partner');
  };

  return (
    <Box sx={{ background: '#1F1F1F', py: {xs:2, sm:5} }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{ height: "100%" }} // Ensures motion.div spans full height
      >
        <FlexColCenter sx={{ py:{xs:2, sm:5}, px:{xs:2}, gap:3 }}>
          <Typography sx={{fontFamily: 'Elemental End', textTransform:'lowercase', color: '#FFF', fontSize:  { xs: 20, sm: 64 }, }}>
            Future of Retail
          </Typography>
          <Typography sx={{fontFamily: 'Helvetica', color: '#fff', fontSize: { xs:12, sm:18 }, textAlign: 'justify', maxWidth: 1200, lineHeight: { xs:1.5, sm:2 } }}>
            In the rapidly growing XR industry, Symspace is at the forefront of empowering brands for the future. By creating highly accurate, detailed, realistic 3D models, we help brands prepare for the AR revolution when XR hardware becomes more accessible and affordable. We imagine a world where individuals can effortlessly explore and purchase products remotely by immersing themselves in virtual experiences. We aim to become the standard for XR accessibility by prioritizing and empowering those unable to travel our convenient AR solution. With Symspace, consumers can shop from home, receive sizing recommendations, and feel confident in their purchases. Embrace the future and simulate the retail space with us.
          </Typography>
          <Button sx={outlinedButton} onClick={handleClick}>
            partner sign up
          </Button>
        </FlexColCenter>
      </motion.div>
    </Box>
  );
}


const outlinedButton = {
  fontWeight: 400,
  fontFamily: 'Elemental End',
  textTransform: 'lowercase',
  color: '#fff',
  borderRadius: '50px',
  border: '2px solid white',
  py: {sm:2},
  px: 3,
  fontSize: 12,
  transition: 'all 0.3s ease-in-out', // Smooth transition effect
  ':hover': {
    background: 'linear-gradient(94.91deg, #FFFFFF 0%, #AEAEAE 100%);',
    color: '#000',
  },
}
