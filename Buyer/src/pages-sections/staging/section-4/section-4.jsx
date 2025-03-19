"use client";

import { motion } from "framer-motion";
import { styles } from "../page-view/styles";
import { Button, Typography, Container } from '@mui/material';
import { FlexColCenter, FlexBox, FlexRowCenter } from "@/components/flex-box";
import { LazyImage } from '@/components/lazy-image';
import Link from 'next/link';

export default function Section4() {
  return (
    <Container py={{xs:2, sm:5}} zIndex={1}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{ height: "100%" }}
      >
        {/* Card & Image Side-by-Side */}
        <FlexBox
          sx={{
            flexDirection: { xs: "column-reverse", sm: "row" },
            alignItems: "center",
            width: "100%",
            gap: 3,
            py:{xs:2, sm:5}, px:{xs:2}, gap:4
          }}
        >
          {/* Left Side Card */}
          <FlexColCenter>
            <LazyImage
              src='/assets/images/staging/customize-5.png'
              alt="AR Experience"
              width={500}
              height={500}
            />
          </FlexColCenter>


          {/* Right Side Image */}
          <FlexColCenter sx={styles.glassCard} gap='25px'>
            <Typography sx={{ ...styles.elementalEndFont, color: "#fff", fontSize: { xs: 12, sm: 32 } }}>
              Make every Space Your Own with SYMSPACE
            </Typography>
            <Typography sx={{ fontFamily: "Helvetica", fontWeight: '300', color: "#fff", fontSize: { xs: 12, sm: 24 } }}>
              Customize finishes, layouts, and styles with real-time visualization tools. Adjust style, materials, textures, lighting, and switch between 2D and immersive 3D views to share virtual experiences with others.
            </Typography>
            <FlexRowCenter>
              <Link href='/'>
                <Button sx={styles.buttonTransparent} >
                  Join the Waitlist
                </Button>
              </Link>
            </FlexRowCenter>
          </FlexColCenter>
        </FlexBox>
      </motion.div>
    </Container>
  );
}
