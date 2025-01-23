"use client"

/**
 * ArForBusinessPageView Component
 *
 * This component renders the "AR for Business" page view, comprising multiple sections:
 * - Section1: Hero section showcasing the main headline and introduction.
 * - Section2: Company details or offerings.
 * - Section3: Statistics or metrics highlighting key achievements.
 * - Section4: Benefits of using AR for business.
 * - Section5: Pricing information for AR services.
 * - Section6: Banner for call-to-action or promotional content.
 *
 * The component uses the "use client" directive to enable client-side rendering.
 *
 * @returns {JSX.Element} Rendered "AR for Business" page view
 */
import { Box } from "@mui/material";
import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
import Section5 from "../section-5";
import Section6 from "../section-6";

export default async function ArForBusinessPageView() {
  return (
    <Box sx={{ position:'relative', overflow:'hidden', backgroundColor: '#fff' }}>
      {/* GRADIENT CIRCLES */}
      <BlobBox top='5%' right={0} color="#000" width="20vw" />
      <BlobBox top='1%' right={-150} />
      <BlobBox top='0.5%' left={-250} color="#933FFE"/>
      <BlobBox top='15%' right={-50} color="#933FFE" width="15vw"/>
      <BlobBox top='15%' left={-200} width="15vw" />
      <BlobBox top='28%' left={650} width="20vw" />
      <BlobBox top='30%' left={300} width="20vw" color="#933FFE"/>
      <BlobBox top='40%' right={100} width="60vw" />
      <BlobBox top='60%' left={850} color="#933FFE"/>
      <BlobBox top='80%' left={30} width="80vw" />
      <BlobBox top='80%' right={-50} width="80vw" color="#933FFE" />


      {/* CONTENT */}
      <Box>
        <Section1 /> {/* HERO  */}
        <Section2 /> {/* COMPANY */}
        <Section3 /> {/* STATS */}
        <Section4 /> {/* BENEFITS */}
        <Section5 /> {/* PRICING */}
        <Section6 /> {/* BANNER */}
      </Box>
    </Box>
  );
}

const BlobBox = ({top=null, right=null, bottom=null, left=null, color="#0366FE", width='40vw'}) => {
  return(
    <Box
      sx={{
        position: 'absolute',
        top: top,
        right: right,
        bottom: bottom,
        left: left,
        width: width,
        height: width,
        maxWidth: '500px',
        maxHeight: '500px',
        borderRadius: '50%',
        filter: 'blur(150px)',
        opacity: 0.5,
        backgroundColor: color,
      }}
    />
  )
}