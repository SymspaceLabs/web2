"use client";

/**
 * Section4 Component
 *
 * - Includes a title and description emphasizing convenience and confidence in shopping.
 * - Provides a "Shop" button as a call-to-action.
 *
 */

"use client";

import { Container, Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { FlexColCenter } from "@/components/flex-box";
import { motion } from "framer-motion";

export default function Section5() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/register-partner");
  };

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
            <Typography  sx={{ fontFamily: "Elemental End", fontSize: { xs: 20, sm: 64 }, color: "#FFF" }}>
              Convenient & Comfortable
            </Typography>

            <Typography
              sx={{ color: "#FFF", fontSize: { xs: 12, sm: 18 }, textAlign: {xs:'justify', sm:"center"}, lineHeight: 2, px: { xs: 2, sm: 0 } }}>
              Explore products from the comfort of your home to conveniently and confidently shop through Augmented Reality.
              <Box component="br" sx={{ display: { xs: "none", sm: "block" } }} />
              Receive sizing recommendations and use our advanced AR application to augment products in real-time.
            </Typography>

            <Box>
              <Button sx={outlinedButton} onClick={handleClick}>
                Shop
              </Button>
            </Box>
          </FlexColCenter>
        </motion.div>
      </Container>
    </Box>
  );
}

const outlinedButton = {
  fontWeight: 400,
  minWidth: 175,
  fontFamily: 'Elemental End',
  textTransform: 'lowercase',
  color: '#fff',
  borderRadius: '50px',
  border: '2px solid white',
  py: {xs:1, sm:2},
  px: 3,
  fontSize: 12,
  transition: 'all 0.3s ease-in-out', // Smooth transition effect
  ':hover': {
    background: 'linear-gradient(94.91deg, #FFFFFF 0%, #AEAEAE 100%);',
    color: '#000',
  },
}
