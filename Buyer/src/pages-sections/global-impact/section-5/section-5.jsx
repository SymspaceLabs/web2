// =======================================================================
// Section 5 
// =======================================================================

import { Box } from "@mui/material";
import MarqueeeSlider from "./MarqueeeSlider";
import { H1, Paragraph } from "@/components/Typography";

export default function Section5() {
  return (
    <Box sx={{ width: "100%", display:'flex', flexDirection:'column', alignItems:'center', py: 4 }}>
      <Box sx={{ width: "100%", maxWidth:'1250px', p:2}}>
        <Paragraph fontSize="16px" fontFamily="Helvetica" sx={{ color: "#fff" }}>
          What everyone is saying
        </Paragraph>
        <H1 sx={{ pb: "25px", color: "#fff" }} fontSize={{ xs: 28, sm: 40 }} >
          communities and collaborations
        </H1>
      </Box>
      <MarqueeeSlider companies={companies} /> {/* SLIDER */}
    </Box>
  );
}

/**
 * Hardcoded List of Testimonials - Each testimonial contains a rating, comment, and user details.
 * This list is used to populate the testimonial cards.
 */
const companies = [
  "/assets/images/global-impact/company-1.png",
  "/assets/images/global-impact/company-2.png",
  "/assets/images/global-impact/company-3.png",
  "/assets/images/global-impact/company-4.png",
  "/assets/images/global-impact/company-5.png",
  "/assets/images/global-impact/company-6.png",
];
