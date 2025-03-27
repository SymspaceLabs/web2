// ===================================================================
// Section 8 | Bento Box | Marketplace
// ===================================================================

import Link from "next/link";
import { motion } from "framer-motion";
import { styles } from "../page-view/styles";
import { LazyImage } from "@/components/lazy-image";
import { H2, Paragraph } from "@/components/Typography"; // STYLED COMPONENTS FOR TEXT
import { Container, Button, Grid } from "@mui/material"; // MUI COMPONENTS
import { FlexBox, FlexCol } from "@/components/flex-box"; // STYLED COMPONENT

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export default function Section8() {
  return (
    <Container sx={{ py: {xs:0, sm:10} }}>
      {/* Grid container for the entire section */}
      <Grid container spacing={3}> 
        
        {/* Left-side grid for AR and application integration panels */}
        <Grid item lg={6} xs={12}>
          {/* Container for two stacked panels */}
          <Grid container spacing={3}>
            
            {/* First panel - Advanced AR Advertisements */}
            <Grid item xs={12} sx={{ p: 0, height: "100%" }}>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <FlexCol sx={{...styles.bentoBoxCard, maxHeight:{xs:'100%', sm:'290px'}, background:"#353535"}}>
                  {/* Title */}
                  <H2 lineHeight={1.2} fontSize={{ xs: 25, sm: 40 }} color="#FFF">
                    Advanced AR Advertisements
                  </H2>

                  {/* Description */}
                  <Paragraph color="#FFF" fontSize={{ xs: 14, sm: 22 }} mb={1}>
                    Equip viewers with immersive AR visuals on top of products or physical posters.
                  </Paragraph>

                  <FlexBox justifyContent="end">
                    <Link href="/contact-us">
                      <Button sx={styles.buttonLight2}>
                        Contact Us
                      </Button>
                    </Link>
                  </FlexBox>
                </FlexCol>
              </motion.div>
            </Grid>
            
            {/* Second panel - Application Integration */}
            <Grid item xs={12}>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <FlexCol sx={{...styles.bentoBoxCard, maxHeight:{xs:'100%', sm:'290px'}, background:"#BDBDBD"}}>
                  
                  {/* Title */}
                  <H2 lineHeight={1.2} fontSize={{ xs: 25, sm: 40 }} color="#FFF">
                    Application Integration
                  </H2>
                                   
                  {/* Description */}
                  <Paragraph color="#FFF" fontSize={{ xs: 14, sm: 22 }} mb={1}>
                    An immersive way to shop conveniently and confidently with AR functionality enhancing every step of the user experience.
                  </Paragraph>

                  {/* Button */}
                  <FlexBox justifyContent="end">
                    <Link href="/contact-us">
                      <Button sx={styles.buttonLight}>
                        Contact Us
                      </Button>
                    </Link>
                  </FlexBox>
                </FlexCol>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>

        {/* Right-side grid for AI-powered 3D products panel */}
        <Grid item lg={6} xs={12} sx={{ my: { xs: 2, sm: 0 } }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <FlexCol sx={{...styles.bentoBoxCard, background:"#E0F0FD" }}>
              {/* Title */}
              <H2 lineHeight={1.2} fontSize={{ xs: 25, sm: 40 }} color="#000">
                Generate 3D Products through Artificial Intelligence
              </H2>

              {/* Description */}
              <Paragraph color="#909090" fontSize={{ xs: 14, sm: 22 }} mb={1}>
                Allow consumers to augment 3D products from the comfort of their home to revolutionize the way they engage with products.
              </Paragraph>

              {/* Button */}
              <FlexBox justifyContent="end" sx={{ width: '100%', display: 'flex' }}>
                <Link 
                  href={`${process.env.NEXT_PUBLIC_SELLER_URL}/register`} 
                  target="_blank"
                  style={{ textDecoration: 'none', display: 'flex', width: '100%', justifyContent: 'end' }}
                >
                  <Button sx={styles.buttonGradient}>
                    Partner With Us
                  </Button>
                </Link>
              </FlexBox>

              {/* Image */}
              <FlexBox width={250}>
                <LazyImage
                  width={500}
                  height={500}
                  src="/assets/images/card/robot.png"
                  alt="Robot"
                />
              </FlexBox>
            </FlexCol>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
}
