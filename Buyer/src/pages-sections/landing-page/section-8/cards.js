import Link from 'next/link';
import { styles } from '../page-view/styles';
import { LazyImage } from '@/components/lazy-image';
import { Box, Button } from '@mui/material';
import { FlexBox, FlexCol } from '@/components/flex-box';
import { H1, Paragraph } from '@/components/Typography';

export const Card1 = () => {
  return (
    <Box
      sx={{
        py: { xs: 1 },
        px: 4,
        width: '100%',
        height: '100%',
        bgcolor: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: { xs: '25px' },
        gap: 2,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        // Disable hover effects on mobile
        '@media (min-width:600px)': {
          py: 5.5,
          borderRadius: { sm: '50px' },
          '&:hover .fadeInBtn': {
            display: 'flex',
            opacity: 1,
            transform: 'translateY(0)',
          },
          '&:hover .headerBox': {
            transform: 'translateY(-10%)',
          },
        },
      }}
    >
      <Box sx={{ p: 0 }}>
        <LazyImage
          alt="Image"
          width={175}
          height={175}
          sx={{
            width: { xs: 80, sm: 175 },
            height: { xs: 80, sm: 175 }
          }}
          src="/assets/images/card/tree.png"
        />
      </Box>
      <Box
        className="headerBox"
        sx={{
          width: 200,
          height: 143,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
          gap: { xs: 1, sm: 2 },
          transition: 'transform 0.3s ease',
          transform: 'translateY(0)',
        }}
      >
        <H1 sx={{ alignSelf: 'stretch', color: '#000', fontSize: { xs: 15, sm: 25 } }}>
          Environmental Impact
        </H1>
        <Paragraph
          sx={{
            alignSelf: 'stretch',
            color: '#909090',
            fontSize: { xs: 12, sm: 16 },
            fontWeight: 700,
            lineHeight: { xs: 1, sm: 1.5 },
            wordWrap: 'break-word',
            maxWidth: 500
          }}
        >
          Our technology addresses the implications shopping has on our environment
        </Paragraph>
        <FlexBox 
          sx={{ 
            width: '100%',
            height: 50,
            position: 'relative', 
            justifyContent: {xs:'flex-end', sm:'flex-start'}
          }}
        >
          <Link href="/global-impact" passHref>
            <Button
              className="fadeInBtn"
              sx={btnStyle('#000')}
            >
              Learn More
            </Button>
          </Link>

        </FlexBox>
      </Box>
    </Box>
  )
}
  
export const Card2 = ({ imageUrl, headerText, subHeaderText, bg, textColor="#000" }) => {
  return (
    <Box sx={{ 
      flex: 1,
      width: "100%", 
      minHeight: { sm: 250 }, 
      py: { xs: 2, sm: 5.5 }, 
      pr: 3,
      bgcolor: bg,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: { xs: '25px', sm: "50px" },
      position: "relative",
      overflow: "hidden",
      '@media (max-width:600px)': { 
        '&:hover .fadeInBtn': {
          display: 'none',
          opacity: 0,
          transform: 'none',
        },
        '&:hover .headerBox': {
          transform: 'none',
        }
      },
      '&:hover .fadeInBtn': {
        display: { xs: "flex", sm: "flex" }, // Always visible on mobile
        opacity: { xs: 1, sm: 1 },
        transform: { xs: "none", sm: "translateY(0)" },
      },
      '&:hover .headerBox': {
        transform: { xs: "none", sm: "translateY(-10%)" },
      },
      transition: { xs: "none", sm: "all 1s ease" }, // Disable animation on mobile
    }}
    >
      <Box sx={{ p: 0, display:{ xs: 'none', lg: 'block' } }}>
        <LazyImage
          alt="Image"
          width={100}
          height={100}
          sx={{
            width: { xs: 80, sm: 100 },
            height: { xs: 80, sm: 100 }
          }}
          src={imageUrl}
        />
      </Box>

      <FlexCol
        className="headerBox"
        sx={{
          height: { sm: 143 },
          alignItems: 'center',
          gap: 2,
          transition: { xs: "none", sm: "transform 0.3s ease" }, 
          transform: { xs: "none", sm: "translateY(0)" },
        }}
      >
        <FlexCol>
          <H1
            sx={{
              lineHeight: 1.5,
              minHeight:'26px',
              alignSelf: 'stretch',
              color: textColor,
              fontSize: { xs: 8.5, sm: 18 },
              wordWrap: 'break-word',
            }}
          >
            {headerText}
          </H1>
          <Paragraph
            sx={{
              alignSelf: 'stretch',
              color: '#909090',
              fontSize: { xs: 12, sm: 15 },
              fontWeight: 700,
              lineHeight: { xs: 1, sm: 1.5 },
              wordWrap: 'break-word',
              maxWidth: 200,
              minHeight:'26px',
            }}
          >
            {subHeaderText}
          </Paragraph>
        </FlexCol>
        
        <Box sx={{ width: '100%' }}>
          <Link href="/ar-app-simulation" passHref>
            <Button
              className="fadeInBtn"
              sx={btnStyle(textColor)}
            >
              Learn More
            </Button>
          </Link>

        </Box>
      </FlexCol>
    </Box>
  )
}

export const Card3 = () => {
  return (
    <FlexBox 
      sx={{
        height: "100%", 
        pt: { xs: 4, sm: 14 },
        pb: { xs: 2, sm: 10 },
        px: { xs: 2, sm: 5 },
        display: "flex", 
        flexDirection: "column", 
        bgcolor: "#D5D5D5", 
        borderRadius: {xs:'25px', sm:"50px"}, 
        justifyContent: "center",
        overflow: 'hidden',
        position:'relative',
        // Disable hover effects on mobile
        '@media (min-width:600px)': {
          py: 5.5,
          borderRadius: { sm: '50px' },
          height: "100%", 
          pt: { xs: 4, sm: 14 },
          pb: { xs: 2, sm: 10 },
          px: { xs: 2, sm: 5 },
          display: "flex", 
          flexDirection: "column", 
          bgcolor: "#D5D5D5", 
          borderRadius: {xs:'25px', sm:"50px"}, 
          justifyContent: "center",
          overflow: 'hidden',
          position:'relative',
          '&:hover .fadeInBtn': {
            display: 'flex',
            opacity: 1,
            transform: 'translateY(0)',
          },
          '&:hover .headerBox': {
            transform: 'translateY(-10%)',
          },
        },
      '&:hover .fadeInBtn': {
        display: { xs: "flex", sm: "flex" }, // Always visible on mobile
        opacity: { xs: 1, sm: 1 },
        transform: { xs: "none", sm: "translateY(0)" },
      },
      '&:hover .headerBox': {
        transform: { xs: "none", sm: "translateY(-10%)" },
      },
      transition: { xs: "none", sm: "all 1s ease" }, // Disable animation on mobile
      }}
    >
      <FlexBox gap={5}
        sx={{
          height: "100%",
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          height: '100%',
          '&:hover .headerBox': {
            transform: 'translateY(-10%)',
          },
          '&:hover .fadeInBtn': {
            opacity: 1, // Show button when the entire FlexBox is hovered
          },
          transition: 'all 0.3s ease',
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 2,
            height: '100%',
          }}
        >
          <Box
            className="headerBox"
            sx={{
              alignSelf: 'stretch',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: 2,
              transition: 'transform 0.3s ease',
              transform: 'translateY(0)',
            }}
          >
            <H1
              sx={{
                lineHeight: 1,
                alignSelf: 'stretch',
                color: 'black',
                fontSize: { xs: 15, sm: 25 },
                wordWrap: 'break-word',
              }}
            >
              Underserved Customers
            </H1>
            <Paragraph
              sx={{
                alignSelf: 'stretch',
                color: '#909090',
                fontSize: { xs: 12, sm: 16 },
                fontWeight: 700,
                lineHeight: { xs: 1, sm: 2 },
                wordWrap: 'break-word',
                maxWidth: { md:'330px' },
                textAlign: 'justify',
                lineHeight: 1.5,
              }}
            >
              We are committed to empowering underserved communities through Augmented Reality. Our AR platform prioritizes accessibility, ensuring individuals with disabilities, senior citizens, veterans, and expectant mothers have access to convenient shopping experiences. We’re redefining inclusivity with the mission to create a world where technology adapts to the needs of every user.
            </Paragraph>
          </Box>

          <FlexBox sx={{ width: '100%', height: {ms:50}, position: 'relative', justifyContent:{xs:'flex-end', sm:'flex-start'} }}>
            <Link href="/global-impact" passHref>
              <Button
                className="fadeInBtn"
                sx={btnStyle('#000')}              
              >
                Learn More
              </Button>
            </Link>
          </FlexBox>
        </Box>
      </FlexBox>
      <LazyImage
        alt="Image"
        width={300} // Increased size
        height={300} // Increased size
        sx={{
          width: { xs: 120, sm: 300 }, // Make it bigger
          height: { xs: 120, sm: 300 },
          display: { xs: "none", lg: "block" },
          position: "absolute", // Position the image absolutely
          right: "-50px", // Move it partially outside the card
          top: "50%",
          transform: "translateY(-50%)", // Center vertically
        }}
        src="/assets/images/card/wheelchair.png"
      />
    </FlexBox>
  );
};


const btnStyle = (color = "#000") => ({
    display: { xs: 'flex', sm: 'none' },
    opacity: 1,
    transform: "none",
    transition: { xs: "none", sm: "all 0.3s ease" }, 
    py: {xs:1, sm:2},
    px: {xs:1, sm:2},
    maxHeight:{xs:'30px'},
    borderRadius: 50,
    border: `1px solid ${color}`,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color,
    fontSize: { xs: 10, sm: 16 },
    fontWeight: 500,
    "&:hover": {
      bgcolor: color,
      color: color==="#FFF"?'#000':'#FFF',
    },
});


