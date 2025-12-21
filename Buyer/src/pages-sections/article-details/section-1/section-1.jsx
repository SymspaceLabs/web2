"use client"

import Image from "next/image";
import { Box, Typography, Breadcrumbs, Link, Button } from '@mui/material';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FlexBox, FlexCol, FlexColCenter } from "@/components/flex-box";
import { styles } from "../page-view/styles";
import { BoxLink } from "@/pages-sections/sessions/components";
import { DateToString } from "@/services/formatDate";
import rehypeRaw from "rehype-raw";

export default function Section1({ article }) {

  // If the article prop isn't loaded yet, don't try to render the rest
  if (!article || !article.content) {
    return <Typography>Loading...</Typography>; 
  }

  // If article or content is missing, it defaults to an empty string
  const formattedContent = article?.content?.replace(/\\n/g, "\n") || "";

  return (
    <FlexColCenter sx={{ minHeight:'75vh', py: 4, px:{xs:2,sm:0}, pt: {xs:'100px', sm:'100px', md:'200px'}  }}>
      <FlexCol sx={{ maxWidth:"1200px", gap:5, }} >
        
        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ color: "#fff", fontSize: 14 }} separator="›">
          <Link href="/press-releases" underline="hover" color="primary" fontFamily='Helvetica' fontWeight={600} >
            Press Releases
          </Link>
          <Typography  fontWeight={600}>
            {article.title}
          </Typography>
        </Breadcrumbs>
        
        {/* Banner Image */}
        <Image 
          src={article.image}
          alt="Article Banner" 
          layout="responsive"
          width={700}
          height={400}
          style={{ borderRadius: '8px' }}
        />

        {/* Glasss Card */}
        <Box py={4} px={{ xs:3, sm:5 }} sx={styles.glassCard}>
          
          {/* Title */}
          <Typography sx={styles.cardTitle}>
            {article.title}
          </Typography>


          <FlexBox flexDirection={{xs:'column', sm:'row'}} justifyContent="space-between" alignItems="center" width="100%" pt={3}>
            <FlexCol width="100%" gap={1} pt={{xs:2, sm:0}}>
              <Typography color="#fff" fontSize={{xs:14, sm:18}}>
                Written By  &nbsp;
                <BoxLink 
                  textColor='#0044ff'
                  fw={500}
                  title={article.author}
                  href={article.author_url}
                />
              </Typography>
              <Typography color="#fff" fontSize={{xs:14, sm:18}}>
                {DateToString(article.createdAt)}
              </Typography>
            </FlexCol>

            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: {xs:'flex-start', sm:"flex-end"}, width:"100%", pt:{xs:5, sm:0} }}>
              <a href={article.article_source_url}>
                <Button sx={styles.buttonDark}>
                  Original Post
                </Button>
              </a>
            </Box>
          </FlexBox>


        </Box>

        {/* Content */}
        <Box
          sx={{
            mt: 3,
            color: "#fff",
            fontSize: { xs: 14, sm: 22 },
            fontFamily: "Helvetica",
            "& ul": {
              marginLeft: "1.5rem", // Indent bullet points
            },
            "& li": {
              listStyleType: "disc", // Ensure bullet points are visible
            },
          }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {formattedContent}
          </ReactMarkdown>
        </Box>

      </FlexCol>
    </FlexColCenter>
  );
}