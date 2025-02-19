"use client";

/**
 * Section4 Component
 *
 * This component represents the "Convenient & Comfortable" section of the landing page.
 * It highlights the ease and comfort of shopping through the Symspace platform using 
 * Augmented Reality (AR) technology.
 *
 * Features:
 * - Displays floating product images for visual appeal.
 * - Includes a title and description emphasizing convenience and confidence in shopping.
 * - Provides a "Shop" button as a call-to-action.
 * - Utilizes custom components and styled elements for a modern and engaging design.
 *
 * Usage:
 * Integrate this component into the landing page to showcase how AR enhances the shopping
 * experience by offering convenience and confidence to users.
 */

"use client";

import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { FlexBox } from "@/components/flex-box";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Section4() {
  const router = useRouter();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const handleClick = () => {
    router.push("/register-partner");
  };

  return (
    <Box sx={{ background: "#1F1F1F", py: 10 }}>
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <FlexBox
            flexDirection="column"
            gap={5}
            sx={{ py: { xs: 0, sm: 10 }, textAlign: "center" }}
          >
            <Typography
              sx={{
                fontFamily: "Elemental End",
                color: "#FFF",
                fontSize: { xs: 30, sm: 64 },
              }}
            >
              Convenient & Comfortable
            </Typography>

            <Typography
              sx={{
                fontFamily: "Helvetica",
                color: "#FFF",
                fontSize: { xs: 15, sm: 18 },
                textAlign: { xs: "justify", sm: "center" },
                lineHeight: 2,
              }}
            >
              Explore products from the comfort of your home to conveniently and confidently shop through Augmented Reality.
              <br />
              Receive sizing recommendations and use our advanced AR application to augment products in real-time.
            </Typography>

            <Box>
              <Button sx={buttonStyle} onClick={handleClick}>
                Shop
              </Button>
            </Box>
          </FlexBox>
        </motion.div>
      </Container>
    </Box>
  );
}

const buttonStyle = {
  border: "2px solid white",
  color: "#fff",
  background: "transparent",
  borderRadius: "50px",
  py: 2,
  px: 8,
  fontFamily: "Elemental End",
  textTransform: "lowercase",
  ":hover": {
    background: "#fff",
    color: "#000",
  },
};
