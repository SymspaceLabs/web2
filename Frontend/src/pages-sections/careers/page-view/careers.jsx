import { Box } from "@mui/material";
import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
import Section5 from "../section-5";
import { BlobBox2 } from "./blobBox2";
import { BlobBox } from "./blobBox";
import Section6 from "../section-6";

export default async function CareersPageView() {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', backgroundColor: '#1F1F1F', display: 'flex', justifyContent: 'center' }}>
      
      {/* GRADIENT CIRCLES */}
      <BlobBox2 />
      {/* <BlobBox top='35%' left={250} />
      <BlobBox top='45%' right={100} />
      <BlobBox top='55%' left={100} color="#933FFE"/>
      <BlobBox top='65%' right={-150} /> */}

      {/* CONTENT */}
      <Box sx={{ zIndex:1 }}>
        <Section1 />  {/* HERO  */}
        {/* <Section2 />  {/* 3 GLASS CARDS */}
        {/* <Section3 />  {/* BENEFITS */}
        {/* <Section4 />  {/* VIDEOS */}
        {/* <Section5 />  {/* COMPANIES */}
        {/* <Section6 />  {/* BANNER */}
      </Box>
    </Box>
  );
}










