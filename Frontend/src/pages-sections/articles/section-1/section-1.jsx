import Image from "next/image";
import { Box, Container, Typography } from '@mui/material';
import DOMPurify from 'dompurify';

export default function Section1({ article }) {

  const sanitizedContent = DOMPurify.sanitize(article.content);

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

  
  return <Box sx={{minHeight:'75vh', pt:5, pb:10}}>
      <Container maxWidth="md">
          <Box sx={{ py: 4 }}>
            <Image 
              src={article.image}
              alt="Article Banner" 
              layout="responsive"
              width={700}
              height={400}
              style={{ borderRadius: '8px' }}
            />
            <Typography sx={{ fontFamily: 'Helvetica', fontWeight: 700, mt:1 }} variant="h4" component="h1" gutterBottom>
              {article.title}
            </Typography>
            <Typography sx={{pb:2}} variant="body1" component="div">
              By  <a href={article.handle_url} target="blank" style={{ textDecoration: 'none', color: 'inherit' }} 
                  onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'} 
                  onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}>
                  {article.author}
                </a>
            </Typography>
            <Typography sx={{pb:2}} variant="body1" component="div">
              {formatDate(article.createdAt)}
            </Typography>
          </Box>
          {/* <Typography variant="body1" component="div">
            {article.content}
          </Typography> */}
          <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
      </Container>
    </Box>;
}