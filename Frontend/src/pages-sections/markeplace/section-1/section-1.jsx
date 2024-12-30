/**
 * Section1 Component
 * 
 * This component renders a responsive grid of promotional cards highlighting AR shopping features.
 * Each card contains a title, description, button, and an image showcasing AR shopping capabilities.
 * 
 * Dependencies:
 * - Next.js Image component for optimized image rendering.
 * - Material UI components (Grid, Box, Stack) for layout.
 * - Custom styled components and assets for styling.
 */

import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// Local Custom Components
import { FlexBetween } from "../../../components/flex-box";
import { H2, Paragraph } from "../../../components/Typography"; // Styled Typography components
import { StyledButton, ContentWrapper, StyledContainer } from "./styles"; // Styled components for layout

// Import Images
import card_1_bg from "../../../../public/assets/images/card/card-1-bg.png";
import card_2_bg from "../../../../public/assets/images/card/card-2-bg.png";
import card_3_bg from "../../../../public/assets/images/card/card-3-bg.png";

export default function Section1() {
  return (
    <StyledContainer>
      {/* Main Grid Container */}
      <Grid container spacing={3}>
        {/* Card 1 */}
        <Grid item lg={4} sm={6} xs={12}>
          <ContentWrapper>
            <Box padding={4} pb={0}>
              {/* Card Content */}
              <Paragraph
                sx={{ fontFamily: "Helvetica" }}
                mb={1}
                fontSize={{ xl: 20, md: 18, xs: 16 }}
              >
                Enhance your everyday life
              </Paragraph>
              <H2
                sx={{ fontFamily: "Helvetica" }}
                lineHeight={1.2}
                mb={2}
                fontSize={{ xl: 30, md: 30, xs: 28 }}
              >
                AR Shopping for
                <br />
                Homebound Convenience
              </H2>
              <StyledButton>Shop By Category</StyledButton>
            </Box>
            {/* Background Image */}
            <Image
              alt="AR Shopping"
              src={card_1_bg}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </ContentWrapper>
        </Grid>

        {/* Card 2 */}
        <Grid item lg={4} sm={6} xs={12}>
          <ContentWrapper hasGradient>
            {/* Background Image */}
            <Image
              alt="Augmented Reality"
              src={card_2_bg}
              style={{
                width: "100%",
                height: "auto",
                marginTop: -70,
              }}
            />
            <Box px={4} py={2}>
              {/* Card Content */}
              <Paragraph sx={{ color: "#353535" }} mb={1} fontSize={{ md: 20, xs: 18 }}>
                Shop like never before
              </Paragraph>
              <H2
                sx={{ color: "#353535" }}
                lineHeight={1.2}
                mb={2}
                fontSize={{ xl: 30, md: 30, sm: 30, xs: 28 }}
              >
                Augment Realistic 3D
                <br />
                Products
              </H2>
              <StyledButton isWhite>Download The App</StyledButton>
            </Box>
          </ContentWrapper>
        </Grid>

        {/* Card 3 */}
        <Grid item lg={4} sm={6} xs={12}>
          <ContentWrapper>
            <Box padding={4} pb={{ xl: 6, lg: 5, md: 3, xs: 0 }}>
              {/* Card Content */}
              <Paragraph mb={1} fontSize={{ xl: 20, md: 18, xs: 16 }}>
                Pioneering AR Commerce
              </Paragraph>
              <H2 lineHeight={1.2} mb={2} fontSize={{ xl: 30, md: 30, xs: 28 }}>
                Positive Impacts of Mixed
                <br /> Reality Commerce
              </H2>
              <StyledButton>Learn More</StyledButton>
            </Box>
            {/* Background Image */}
            <Image
              src={card_3_bg}
              alt="AR Commerce"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </ContentWrapper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}
