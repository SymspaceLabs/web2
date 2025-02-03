"use client"

import Image from "next/image";
import { Box, Container, Typography, useMediaQuery, Breadcrumbs, Link } from '@mui/material';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Section1({ article }) {
  const isMobile = useMediaQuery('(max-width:600px)');
  const formattedContent = article.content.replace(/\\n/g, "\n");

  function formatDate(dateString) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }
  
  return (
    <Box sx={{minHeight:'75vh', pt:5, pb:10}}>
      <Container maxWidth="md" sx={{ display:'flex', gap:5, flexDirection:'column', py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ color: "#fff", fontSize: 14 }} separator="›">
          <Link href="/articles" underline="hover" color="primary" fontFamily='Helvetica' fontWeight={600} >
            Press Releases
          </Link>
          <Typography  fontWeight={600}>
            {article.title}
          </Typography>
        </Breadcrumbs>
        
        <Image 
          src={article.image}
          alt="Article Banner" 
          layout="responsive"
          width={700}
          height={400}
          style={{ borderRadius: '8px' }}
        />
        <Box py={2} px={isMobile? 3 : 5} sx={cardStyle}>
          <Typography fontSize={40} color="#fff" fontFamily='Helvetica' fontWeight={700} sx={{pb:1}}>
            {article.title}
          </Typography>
          <Typography sx={{pb:2}} variant="body1" component="div" color="#fff">
            Written By  <a href={article.handle_url} target="blank" style={{ textDecoration: 'none', color: '#0366FE' }} 
                onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'} 
                onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}>
                {article.author}
              </a>
          </Typography>
          <Typography sx={{ pb:2 }} variant="body1" component="div" color="#fff">
            {formatDate(article.createdAt)}
          </Typography>
        </Box>
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
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {formattedContent}
          </ReactMarkdown>
        </Box>
      </Container>
    </Box>
  );
}


const cardStyle = {
  background: 'rgba(255, 255, 255, 0.35)',
  boxShadow: `inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4),
              inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5),
              inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24),
              inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24),
              inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)`,
  backdropFilter: 'blur(10.0285px)',
  borderRadius: "30px",
};