// ==============================================================
//  AR Real Estate Pages Section
// ==============================================================

import { Box } from "@mui/material";
import { BlobBox } from "@/components/BlobBox";
import { FlexColCenter } from "@/components/flex-box";
import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
import Section5 from "../section-5";
import Section6 from "../section-6";
import Section7 from "../section-7";

// ==============================================================

export default async function StagingPageView() {
  return (
    <Box sx={{ position:'relative', overflow:'hidden', background: '#1F1F1F' }}>
      {/* GRADIENT CIRCLES */}
      {/* Blob 1: Hero Section Left */}
      <BlobBox top={0} left={0} background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top={0} left="-10%"  background="#0366FE" /> {/* BLUE */}

      {/* Blob 2: Hero Section Right */}
      <BlobBox top="15%" right={0} background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="15%" right="-10%"  background="#0366FE" /> {/* BLUE */}

      {/* Blob 3: Hero Section left */}
      <BlobBox top="25%" left={0} background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="25%" left="-10%"  background="#0366FE"  /> {/* BLUE */}

      {/* Blob 4: Hero Section left */}
      <BlobBox top="35%" left={0} background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="35%" left="-10%"  background="#0366FE" /> {/* BLUE */}

      {/* Blob 5: Hero Section Right */}
      <BlobBox top="50%" right={0} background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="50%" right="-10%"  background="#0366FE" /> {/* BLUE */}

      {/* Blob 6: Hero Section left */}
      <BlobBox top="65%" left={0} background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="65%" left="-10%"  background="#0366FE" /> {/* BLUE */}

      {/* Blob 7: Hero Section left */}
      <BlobBox top="75%" right={0} background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="75%" right="-10%"  background="#0366FE" /> {/* BLUE */}

      {/* Blob 8: Hero Section left */}
      <BlobBox top="90%" left={0} background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="90%" left="-10%"  background="#0366FE" /> {/* BLUE */}

      {/* CONTENT */}
      <FlexColCenter sx={{ width:'100%' }}>
        <Section1 /> {/* HERO  */}
        <Section2 /> {/* BRING EMPTY SPACES TO LIFE */}
        <Section3 /> {/* CUSTOMIZE  */}
        <Section4 /> {/* MAKE EVERY SPACE  */}
        <Section5 /> {/* FURNISH HOMES */}
        <Section6 /> {/* PRICING */}
        <Section7 /> {/* BANNER */}
      </FlexColCenter>
    </Box>
  );
}