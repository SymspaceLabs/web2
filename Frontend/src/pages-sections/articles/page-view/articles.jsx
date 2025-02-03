import { Box } from "@mui/material";
import Section1 from "../section-1";
import { BlobBox2 } from "./blobBox2";
import Section2 from "../section-2";


export default async function ArticlesPageView() {

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', backgroundColor: '#1F1F1F', display: 'flex', justifyContent: 'center' }}>
      {/* GRADIENT CIRCLES */}
      <BlobBox2 />

      {/* CONTENT */}
      <Box sx={{ zIndex:1, width:'100%' }}>
        <Section1 />
        <Section2 />
      </Box>
    </Box>
  );
}
