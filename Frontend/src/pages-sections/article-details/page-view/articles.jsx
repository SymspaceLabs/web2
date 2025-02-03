import { Box } from "@mui/material";
import Section1 from "../section-1";
import { BlobBox2 } from "./blobBox2";


export default async function ArticlePageView({ slug }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/slug/${slug}`);
  const article = await response.json();

  if (!article) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', backgroundColor: '#1F1F1F', display: 'flex', justifyContent: 'center' }}>
      {/* GRADIENT CIRCLES */}
      <BlobBox2 />

      {/* CONTENT */}
      <Box sx={{ zIndex:1, width:'100%' }}>
        <Section1 article={article} />
      </Box>
    </Box>
  );
}
