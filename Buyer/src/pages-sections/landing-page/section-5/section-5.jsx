"use client";

// ===================================================================
// Section 5 Component
// ===================================================================

import Link from "next/link";
import { motion } from "framer-motion";
import { styles } from "../page-view/styles";
import { FlexColCenter } from "@/components/flex-box";
import { Container, Button, Box } from "@mui/material";
import { H1, Paragraph } from "@/components/Typography";

// ===================================================================

export default function Section5() {
  return (
    <Box sx={{ py: 10, position:'relative', zIndex:2 }}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{ height: "100%" }} // Ensures motion.div spans full height
        >
          <FlexColCenter gap={5} sx={{ py: { xs: 0, sm: 10 }, textAlign: "center" }}>
            <H1 sx={styles.sectionHeader}>
              Convenient & Comfortable
            </H1>

            <Paragraph
              sx={{ color: "#FFF", fontSize: { xs: 12, sm: 18 }, textAlign: {xs:'justify', sm:"center"}, lineHeight: 2, px: { xs: 2, sm: 0 } }}>
              Explore products from the comfort of your home to conveniently and confidently shop through Augmented Reality.
              <Box component="br" sx={{ display: { xs: "none", sm: "block" } }} />
              Receive sizing recommendations and use our advanced AR application to augment products in real-time.
            </Paragraph>

            <Box>
              <Link href="/marketplace" passHref>
                <Button sx={styles.outlinedBtn}>
                  Shop
                </Button>
              </Link>
            </Box>
          </FlexColCenter>
        </motion.div>
      </Container>
    </Box>
  );
}
