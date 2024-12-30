import Container from "@mui/material/Container"; // GLOBAL CUSTOM COMPONENTS
import FlexBox from "../../../components/flex-box/flex-box"; // STYLED COMPONENT
import { Box, Typography, Button, Grid } from "@mui/material"; // MUI COMPONENTS
import LazyImage from "../../../components/LazyImage"; // CUSTOM LAZY LOAD IMAGE COMPONENT
import { H2, Paragraph } from "../../../components/Typography"; // STYLED COMPONENTS FOR TEXT

import { BlackBox, StyledButton, YellowBox } from "./styles"; // CUSTOM STYLES

import robot from "../../../../public/assets/images/card/robot.png"; // IMAGE ASSET

/**
 * Section8 Component
 * This component displays a modern section with AR and AI themes, featuring three highlighted panels.
 * It uses Material-UI (MUI) components, styled components, and custom styles to create an engaging layout.
 * 
 * Features:
 * - Two text blocks with call-to-action buttons, styled in distinct color schemes.
 * - A central card highlighting AI-generated 3D product functionality with an image and button.
 * - Fully responsive grid layout.
 */
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
                  <Button
                    sx={{
                      background: "#fff",
                      fontFamily: "Elemental End",
                      textTransform: "lowercase",
                      mt: 2,
                      borderRadius: "50px",
                      px: 5,
                      py: 2,
                      fontSize: 16,
                    }}
                  >
                    Contact Us
                  </Button>
                </FlexBox>
              </YellowBox>
            </Grid>
            
            {/* Second panel - Application Integration */}
            <Grid item xs={12} sx={{ p: 0, height: "100%" }}>
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
                  <Button
                    sx={{
                      background: "#fff",
                      fontFamily: "Elemental End",
                      textTransform: "lowercase",
                      mt: 2,
                      borderRadius: "50px",
                      px: 5,
                      py: 2,
                      fontSize: 16,
                    }}
                  >
                    Contact Us
                  </Button>
                </FlexBox>
              </YellowBox>
            </Grid>
          </Grid>
        </Grid>

        {/* Right-side grid for AI-powered 3D products panel */}
        <Grid item lg={6} xs={12}>
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
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    gap: 2,
                    fontFamily: "Helvetica",
                    color: "#fff",
                    borderRadius: "50px",
                    py: 2,
                    px: 4,
                    background: "linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Elemental End",
                      textTransform: "lowercase",
                      fontSize: 16,
                    }}
                  >
                    Partner With Us
                  </Typography>
                </Button>
              </FlexBox>
            </div>
            <div className="img-wrapper">
              <LazyImage src={robot} alt="Robot" />
            </div>
          </BlackBox>
        </Grid>
      </Grid>
    </Container>
  );
}
