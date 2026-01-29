"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { styles } from "../page-view/styles";
import { FlexColCenter } from "@/components/flex-box";
import { Button, Box } from '@mui/material';
import { H1, Paragraph } from "@/components/Typography";

export default function Section2() {
  return (
    <Box sx={{ position:'relative', zIndex:2, py: {xs:2, sm:5} }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{ height: "100%" }} // Ensures motion.div spans full height
      >
        <FlexColCenter sx={{ py:{xs:2, sm:5}, px:{xs:5}, gap:{xs:2, sm:4} }}>
          <H1 sx={styles.header}>
            bring empty spaces to life
          </H1>
          <Paragraph sx={styles.subheader}>
            Imagine, Customize, and Furnish with Augmented Reality.
          </Paragraph>
          <Link href={`${process.env.NEXT_PUBLIC_SELLER_URL}/register`} passHref>
            <Button sx={styles.outlinedBtn}>
              start staging now
            </Button>
          </Link>
        </FlexColCenter>
      </motion.div>
    </Box>
  );
}
