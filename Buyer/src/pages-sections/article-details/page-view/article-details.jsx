import Section1 from "../section-1";
import Section2 from "../section-2";
import { Box } from "@mui/material";
import { BlobBox } from "@/components/BlobBox";

export default async function ArticlePageView({ slug }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/slug/${slug}`);
  const article = await response.json();

  if (!article) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', backgroundColor: '#1F1F1F', display: 'flex', justifyContent: 'center' }}>
      {/* GRADIENT CIRCLES */}
      {/* Blob 1: Hero Section Right */}
      <BlobBox top="-5%" right="-10%" background="#0366FE" widthHeight='750px' displayNoneMobile={true} /> {/* BLUE */}

      {/* Blob 2: Articles Left */}
      <BlobBox top="20%" left={0} background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="20%" left="5%" background="#0366FE" displayNoneMobile={true} /> {/* BLUE */}

      {/* Blob 3: Articles Right */}
      <BlobBox top="45%" right={0} background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="45%" right="5%" background="#0366FE" displayNoneMobile={true} /> {/* BLUE */}

      {/* Blob 4: Articles Left */}
      <BlobBox top="70%" left="30%" background="#FFF" displayNoneMobile={true} /> {/* WHITE */}
      <BlobBox top="70%" left="20%" background="#0366FE" displayNoneMobile={true} /> {/* BLUE */}

      {/* Blob 5: Articles Right */}
      <BlobBox top="80%" right="-5%" background="#0366FE" displayNoneMobile={true} /> {/* BLUE */}

      {/* CONTENT */}
      <Box sx={{ zIndex:1, width:'100%' }}>
        <Section1 article={article} />
        <Section2/>
      </Box>
    </Box>
  );
}
