// ==============================================================
//  Terms & Conditions Page Sections
// ==============================================================

import { Box } from "@mui/material";
import { BlobBox } from "@/components/BlobBox";
import { FlexRowCenter } from "@/components/flex-box";
import Section1 from "../section-1";
import Section2 from "../section-2";

// ==============================================================
export default function TermsPageView() {
  return (
    <FlexRowCenter sx={{ position: 'relative', overflow: 'hidden', background: '#1F1F1F' }}>
      {/* GRADIENT CIRCLES */}
      <BlobBox top='10%' right={0} /> {/* BLUE */}

      {/* CONTENT */}
      <Box sx={{ zIndex:1, width:'100%' }}>
        <Section1 />  {/* Terms  */}
        <Section2 />  {/* BANNER  */}
      </Box>
    </FlexRowCenter>
  );
}









