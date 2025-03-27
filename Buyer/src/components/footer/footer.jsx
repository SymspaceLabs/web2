// ==============================================================
// Footer
// ==============================================================

import { Heading } from "./styles";
import { FlexBetween, FlexCol } from "@/components/flex-box";
import { LazyImage } from "@/components/lazy-image";
import { Paragraph, H1 } from "@/components/Typography";
import { Container, Divider, Grid, Box } from "@mui/material";

import SocialLinks from "./components/social-links";
import AboutLinks from "./components/about-links";
import CustomerCareLinks from "./components/customer-care-links";

export default function Footer() {
  return (
    <Box component="footer" bgcolor="#000" pt={12} fontFamily="Helvetica">
      <Container>
        <Grid container spacing={3}>

          {/* LOGO */}
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <FlexCol justifyContent="space-between" height="100%">
              <FlexCol>
                <Box maxWidth="200px">
                  <LazyImage src={require("../../../public/assets/images/logos/Logo.svg")} alt="logo" />
                </Box>
                <H1 color='#FFF' fontSize={14} mb={2.5} maxWidth={{ xl: 400 }} wordSpacing="25px">
                  SIMULATE REALITY
                </H1>
              </FlexCol>
              <SocialLinks variant="dark" />
            </FlexCol>
          </Grid>

          {/* ABOUT US LINKS */}
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <AboutLinks isDark={false} />
          </Grid>

          {/* CUSTOMER CARE LINKS */}
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <CustomerCareLinks isDark={false} />
          </Grid>

        </Grid>

        <Box component={Divider} mt={{ md: 8, xs: 3 }} />

        <FlexBetween pt={2} pb={{ sm: 10, md: 2 }}>
          <Paragraph sx={{ color:'white'}}>
            © {new Date().getFullYear()} Symspacelabs. All rights reserved.
          </Paragraph>
          
        </FlexBetween>
      </Container>
    </Box>
  );
}