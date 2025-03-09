import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
import { Box } from "@mui/material";
import { BlobBox } from "@/components/BlobBox";

export default async function CareersPageView() {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', backgroundColor: '#1F1F1F', display: 'flex', justifyContent: 'center' }}>
      
      {/* GRADIENT CIRCLES */}
      {/* Blob 1: Hero Section Left */}
      <BlobBox top={0} right="5%" background="#0366FE" displayNoneMobile={true} /> {/* BLUE */}
      
      {/* Blob 2: Open Roles Left */}
      <BlobBox top="45%" left={0} background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="45%" left="5%" background="#0366FE" displayNoneMobile={true} /> {/* BLUE */}

      {/* Blob 3: Open Roles Right */}
      <BlobBox top="60%" right="5%" background="#0366FE" displayNoneMobile={true} /> {/* BLUE */}

      {/* Blob 4: Open Roles Middle */}
      <BlobBox top="75%" right="40%" background="#0366FE" displayNoneMobile={true} /> {/* BLUE */}

      {/* Blob 5: Open Roles Left */}
      <BlobBox top="80%" left="0%" background="#0366FE" displayNoneMobile={true} /> {/* BLUE */}


      {/* CONTENT */}
      <Box sx={{ zIndex:1, width:'100%' }}>
        <Section1 />  {/* HERO  */}
        <Section2 />  {/* CORE VALUES */}
        <Section3 />  {/* OPEN ROLES */}
        <Section4 />  {/* BANNER  */}
      </Box>
    </Box>
  );
}










