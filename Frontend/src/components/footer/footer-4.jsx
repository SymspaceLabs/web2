import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container"; // LOCAL CUSTOM COMPONENT

import AboutLinks from "./components/about-links";
import SocialLinks from "./components/social-links";
import CustomerCareLinks from "./components/customer-care-links"; // GLOBAL CUSTOM COMPONENTS

import LazyImage from "../LazyImage";
import { Paragraph } from "../Typography";
import FlexBetween from "../flex-box/flex-between"; // STYLED COMPONENT

import { Heading } from "./styles";
export default function Footer4() {
  return <Box component="footer" bgcolor="#000" pt={12}>
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <Box maxWidth={100}>
              <LazyImage src={require("../../../public/assets/images/logos/Logo.svg")} alt="logo" />
            </Box>

            <Paragraph sx={{color:'#fff'}} mb={2.5} maxWidth={{ xl: 400 }}>
              Keep it simple
            </Paragraph>
          </Grid>

          {
          /* ABOUT US LINKS */
        }
          <Grid sx={{color:'#fff'}} item lg={2} md={2} sm={6} xs={12}>
            <AboutLinks isDark={false} />
          </Grid>

          {
          /* CUSTOMER CARE LINKS */
        }
          <Grid sx={{color:'#fff'}} item lg={3} md={3} sm={6} xs={12}>
            <CustomerCareLinks isDark={false} />
          </Grid>

          {
          /* CONTACT INFORMATION */
        }
          <Grid sx={{color:'#fff'}} item lg={3} md={3} sm={6} xs={12}>
            <Heading>Contact Us</Heading>

            <Paragraph py={0.6}>
              70 Washington Square South, New York, NY 10012, United States
            </Paragraph>

            <Paragraph py={0.6}>Email: uilib.help@gmail.com</Paragraph>

            <Paragraph py={0.6} mb={2}>
              Phone: +1 1123 456 780
            </Paragraph>
          </Grid>
        </Grid>

        <Box component={Divider} mt={{
        md: 8,
        xs: 3
      }} />

        <FlexBetween pt={2} pb={{
        sm: 10,
        md: 2
      }}>
          <Paragraph>© 2023 By UI Lib. All rights reserved.</Paragraph>
          <SocialLinks variant="dark" />
        </FlexBetween>
      </Container>
    </Box>;
}