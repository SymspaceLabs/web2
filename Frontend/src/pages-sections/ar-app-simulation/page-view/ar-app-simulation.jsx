import { Box } from "@mui/material";
import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
import Section5 from "../section-5";

export default async function ArAppSimulationPageView() {
  return (
    <Box sx={{ position:'relative', overflow:'hidden', backgroundColor: '#fff' }}>
      {/* GRADIENT CIRCLES */}
      <BlobBox top='1%' right={-150} />
      <BlobBox top='35%' left={250} />
      <BlobBox top='45%' right={100} />
      <BlobBox top='55%' left={100} color="#933FFE"/>
      <BlobBox top='65%' right={-150} />

      {/* CONTENT */}
      <Box>
        <Section1 /> {/* HERO  */}
        <Section2 /> {/* 3 MOBILE SCREENS */}
        <Section3 /> {/* BENEFITS */}
        <Section4 /> {/* BANNER */}
        <Section5 /> {/* TESTIMONIAL MARQUEE */}
      </Box>
    </Box>
  );
}


const BlobBox = ({top=null, right=null, bottom=null, left=null, color="#0366FE"}) => {
  return(
    <Box
      sx={{
        position: 'absolute',
        top: top,
        right: right,
        bottom: bottom,
        left: left,
        width: '50vw',
        height: '50vw',
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