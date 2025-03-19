// =======================================================================
// Section 5 
// =======================================================================

import { Box, Typography } from "@mui/material";
import MarqueeeSlider from "./MarqueeeSlider";
import { styles } from "../page-view/styles";

export default function Section5() {
  return (
    <Box sx={{ width: "100%", display:'flex', flexDirection:'column', alignItems:'center', py: 4 }}>
      <Box sx={{ width: "100%", maxWidth:'1600px', p:2}}>
        <Typography fontSize="16px" fontFamily="Helvetica" sx={{ color: "#fff" }}>
          What everyone is saying
        </Typography>
        <Typography sx={{ pb: "25px", color: "#fff", ...styles.elementalEndFont }} fontSize={{ xs: 28, sm: 40 }} >
          communities and collaborations
        </Typography>
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
