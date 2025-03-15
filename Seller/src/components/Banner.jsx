import Link from 'next/link';
import { FlexBox, FlexCol, FlexColCenter } from '@/components/flex-box';
import { Box, Container, Button, Typography } from '@mui/material';

export default function Banner({
    title,
    description,
    btnText,
    btnUrl
}) {
  return (
    <Container sx={{ py:5 }}>
      <Box sx={cardStyle}>
        <FlexBox sx={{ flexDirection:{xs:'column', sm:'row'}, justifyContent:'space-between' }}>
          <FlexCol gap={2}>
            <Typography 
                sx={{ 
                    fontFamily:'Elemental End',
                    fontSize: {xs:30, sm:40},
                    color:"#FFF"
                }}
            >
              {title}
            </Typography>
            <Typography 
                sx={{ 
                    fontSize: {xs:18, sm:24},
                    maxWidth:'850px',
                    color:"#FFF"
                }}
            >
              {description}
            </Typography>
          </FlexCol>
          <FlexColCenter sx={{ minWidth:'250px' }}>
            <Link href={btnUrl} passHref>
              <Button
                sx={{ 
                    fontFamily: 'Elemental End',
                    background:'linear-gradient(97.04deg, #666666 0%, #1D1D1D 100%)',
                    borderRadius: '50px',
                    px:5,
                    py:2,
                    color: '#fff',
                    fontSize:14,
                    textTransform:'lowercase',
                    fontWeight:400,
                    border:'1px solid #FFF'
                }}
              >
                {btnText}
              </Button>
            </Link>
          </FlexColCenter>
        </FlexBox>
      </Box>
    </Container>
  );
}

const cardStyle = {
  py:{xs:2, sm:10},
  px:{xs:3, sm:8},
  background: 'rgba(255, 255, 255, 0.35)',
  boxShadow: `inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4),
              inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5),
              inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24),
              inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24),
              inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)`,
  backdropFilter: 'blur(10.0285px)',
  borderRadius: "40px",
};