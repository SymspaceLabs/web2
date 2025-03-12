import { Box } from "@mui/material";
import { BlobBox } from "@/components/BlobBox";
import { FlexColCenter } from "@/components/flex-box";
import Section1 from "../section-1";

export default async function StagingPageView() {
  return (
    <Box sx={{ position:'relative', overflow:'hidden', backgroundColor: '#fff' }}>
      {/* GRADIENT CIRCLES */}
      {/* Blob 1: Hero Section Left */}
      <BlobBox top="-5%" right="35%" background="#0366FE" widthHeight='750px' displayNoneMobile={true} /> {/* BLUE */}

      {/* CONTENT */}
      <FlexColCenter sx={{ width:'100%' }}>
        <Section1 /> {/* HERO  */}
      </FlexColCenter>
    </Box>
  );
}