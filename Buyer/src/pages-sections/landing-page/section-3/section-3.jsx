"use client";

import { motion } from "framer-motion";
import { FlexColCenter } from "@/components/flex-box";
import { Button, Box, Typography } from '@mui/material';
import { styles } from "../page-view/styles";
import Link from "next/link";
import { H1, Paragraph } from "@/components/Typography";

export default function Section3() {
  return (
    <Box sx={{ position:'relative', zIndex:2, py: {xs:2, sm:5} }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{ height: "100%" }} // Ensures motion.div spans full height
      >
        <FlexColCenter sx={{ py:{xs:2, sm:5}, px:{xs:2}, gap:4 }}>
          <H1 sx={styles.sectionHeader}>
            Future of Retail
          </H1>
          <Paragraph sx={styles.sectionParagraph}>
            In the rapidly growing XR industry, Symspace is at the forefront of empowering brands for the future. By creating highly accurate, detailed, realistic 3D models, we help brands prepare for the AR revolution when XR hardware becomes more accessible and affordable. We imagine a world where individuals can effortlessly explore and purchase products remotely by immersing themselves in virtual experiences. We aim to become the standard for XR accessibility by prioritizing and empowering those unable to travel our convenient AR solution. With Symspace, consumers can shop from home, receive sizing recommendations, and feel confident in their purchases. Embrace the future and simulate the retail space with us.
          </Paragraph>
          <Link href={`${process.env.NEXT_PUBLIC_SELLER_URL}/register`} passHref>
            <Button sx={styles.outlinedBtn}>
              partner sign up
            </Button>
          </Link>
        </FlexColCenter>
      </motion.div>
    </Box>
  );
}
