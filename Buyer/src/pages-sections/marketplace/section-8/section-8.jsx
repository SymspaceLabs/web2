// ===================================================================
// Section 8 
// ===================================================================

import { motion } from "framer-motion";
import { BlackBox, YellowBox } from "./styles"; // CUSTOM STYLES
import { FlexBox } from "@/components/flex-box"; // STYLED COMPONENT
import { LazyImage } from "@/components/lazy-image";
import { H2, Paragraph } from "@/components/Typography"; // STYLED COMPONENTS FOR TEXT
import { Container, Typography, Button, Grid } from "@mui/material"; // MUI COMPONENTS
import { styles } from "../page-view/styles";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export default function Section8() {
  return (
    <Container sx={{ py: 10 }}>
      {/* Grid container for the entire section */}
      <Grid container spacing={3} mt={5}>
        
        {/* Left-side grid for AR and application integration panels */}
        <Grid item lg={6} xs={12}>
          {/* Container for two stacked panels */}
          <Grid container spacing={3} sx={{ height: "51%" }}>
            
            {/* First panel - Advanced AR Advertisements */}
            <Grid item xs={12} sx={{ p: 0, height: "100%" }}>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <YellowBox background="#353535" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ flex: 1 }}>
                    <H2
                      sx={{ fontFamily: "Helvetica", fontSize: 36, color: "#fff" }}
                      mb={2}
                      lineHeight={1.2}
                      fontSize={{ sm: 42, xs: 36 }}
                    >
                      Advanced AR Advertisements
                    </H2>
                    <Paragraph
                      sx={{ fontFamily: "Helvetica", fontSize: 22, color: "#fff" }}
                      fontSize={16}
                      mb={1}
                    >
                      Equip viewers with immersive AR visuals on top of products or physical posters.
                    </Paragraph>
                  </div>
                  <FlexBox justifyContent="end">
                    <Button sx={styles.buttonLight}>
                      Contact Us
                    </Button>
                  </FlexBox>
                </YellowBox>
              </motion.div>
            </Grid>
            
            {/* Second panel - Application Integration */}
            <Grid item xs={12} sx={{ p: 0, height: "100%" }}>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <YellowBox background="#BDBDBD" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ flex: 1 }}>
                    <H2
                      sx={{ fontFamily: "Helvetica", fontSize: 36, color: "#fff" }}
                      mb={2}
                      lineHeight={1.2}
                      fontSize={{ sm: 42, xs: 36 }}
                    >
                      Application Integration
                    </H2>
                    <Paragraph
                      sx={{ fontFamily: "Helvetica", fontSize: 22, color: "#fff" }}
                      fontSize={16}
                      mb={1}
                    >
                      An immersive way to shop conveniently and confidently with AR functionality enhancing every step of the user experience.
                    </Paragraph>
                  </div>
                  <FlexBox justifyContent="end">
                    <Button sx={styles.buttonLight2}>
                      Contact Us
                    </Button>
                  </FlexBox>
                </YellowBox>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>

        {/* Right-side grid for AI-powered 3D products panel */}
        <Grid item lg={6} xs={12}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <BlackBox background="#E0F0FD">
              <div className="content">
                <H2 mb={4} lineHeight={1.2} fontSize={{ sm: 42, xs: 36 }} color="#000">
                  Generate 3D Products through Artificial Intelligence
                </H2>
                <Paragraph
                  sx={{ fontFamily: "Helvetica", fontSize: 22, color: "#909090" }}
                  fontSize={16}
                  mb={1}
                >
                  Allow consumers to augment 3D products from the comfort of their home to revolutionize the way they engage with products.
                </Paragraph>
                <FlexBox justifyContent="end" flex={1}>
                  <Button sx={styles.buttonGradient}>
                    Partner With Us
                  </Button>
                </FlexBox>
              </div>
              <div className="img-wrapper">
                <LazyImage
                  width={500}
                  height={500}
                  src="/assets/images/card/robot.png"
                  alt="Robot"
                />
              </div>
            </BlackBox>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
}
