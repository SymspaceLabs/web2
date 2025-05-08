// ======================================================================
// Section 1 | Marketplace
// ======================================================================

import Image from "next/image";
import { motion } from "framer-motion";
import { styles } from "../page-view/styles";
import { H2, Paragraph } from "@/components/Typography";
import { Box, Grid, Container, Button } from "@mui/material";

// ======================================================================

export default function Section1() {
  return (
    <Container sx={{ py:{xs:5, sm:10} }}>
      <Grid container spacing={3}>
        
        {/* Card 1 */}
        <Grid item lg={4} sm={6} xs={12} sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{ height: "100%" }} // Ensures motion.div spans full height
          >
            <Box sx={{ ...contentWrapper, background: "#353535", height: "100%" }}>
              <Box padding={4} pb={0}>
                <Paragraph sx={styles.cardSubtitle}>
                  Enhance your everyday life
                </Paragraph>
                <H2 sx={styles.cardTitle}>
                  AR Shopping for
                  <br />
                  Homebound Convenience
                </H2>
                <Button sx={styles.buttonDark}>
                  Shop By Category
                </Button>
              </Box>
              <Image
                alt="AR Shopping"
                src="/assets/images/card/card-1-bg.png"
                width={500}
                height={500}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </Box>
          </motion.div>
        </Grid>

        {/* Card 2 */}
        <Grid item lg={4} sm={6} xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            style={{ height: "100%" }}
          >
            <Box sx={{...contentWrapper, background:'#E0F0FD' }}>
              {/* Background Image */}
              <Image
                alt="Augmented Reality"
                src="/assets/images/card/card-2-bg.png"
                width={500}
                height={500}
                style={{
                  width: "100%",
                  height: "auto",
                  marginTop: -70,
                }}
              />
              <Box px={4} py={2}>
                {/* Card Content */}
                <Paragraph sx={{...styles.cardSubtitle, color: "#353535" }}>
                  Shop like never before
                </Paragraph>
                <H2 sx={{...styles.cardTitle, color: "#353535" }}>
                  Augment Realistic 3D
                  <br />
                  Products
                </H2>
                <Button sx={styles.buttonLight}>
                  Download The App
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Grid>

        {/* Card 3 */}
        <Grid item lg={4} sm={6} xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
            style={{ height: "100%" }}
          >
            <Box  sx={{...contentWrapper, background: "#353535"}}>
              <Box padding={4} pb={{ xl: 6, lg: 5, md: 3, xs: 0 }}>
                {/* Card Content */}
                <Paragraph sx={styles.cardSubtitle}>
                  Pioneering AR Commerce
                </Paragraph>
                <H2 sx={styles.cardTitle}>
                  Positive Impacts of Mixed
                  <br /> Reality Commerce
                </H2>
                <Button sx={styles.buttonDark}>
                  Learn More
                </Button>
              </Box>
              {/* Background Image */}
              <Image
                src="/assets/images/card/card-3-bg.png"
                width={500}
                height={500}
                alt="AR Commerce"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </Box>
          </motion.div>
        </Grid>

      </Grid>
    </Container>
  );
}

const contentWrapper = {
  height: "100%",
  color: "white",
  borderRadius: 12,
}

