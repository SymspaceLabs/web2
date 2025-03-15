import Section1 from "../section-1";
import Section2 from "../section-2";
import { Box } from "@mui/material";
import { BlobBox } from "@/components/BlobBox";


export default async function ArticlesPageView() {

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', backgroundColor: '#1F1F1F', display: 'flex', justifyContent: 'center' }}>
      {/* GRADIENT CIRCLES */}
      {/* Blob 1: Hero Section Left */}
      <BlobBox top="-5%" left="-10%" background="#0366FE" widthHeight='750px' displayNoneMobile={true} /> {/* BLUE */}

      {/* Blob 2: Articles Right */}
      <BlobBox top="20%" right={0} background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="20%" right="5%" background="#0366FE" displayNoneMobile={true} /> {/* BLUE */}

      {/* Blob 3: Articles Left */}
      <BlobBox top="45%" left={0} background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="45%" left="5%" background="#0366FE" displayNoneMobile={true} /> {/* BLUE */}

      {/* Blob 4: Articles Right */}
      <BlobBox top="70%" right="30%" background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="70%" right="20%" background="#0366FE" displayNoneMobile={true} /> {/* BLUE */}

      {/* Blob 5: Articles Right */}
      <BlobBox top="80%" left="-5%" background="#0366FE" displayNoneMobile={true} /> {/* BLUE */}

      {/* CONTENT */}
      <Box sx={{ zIndex:1, width:'100%' }}>
        <Section1 />
        <Section2 />
      </Box>
    </Box>
  );
}
