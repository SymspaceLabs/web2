import { Box, Typography, Button, Grid, Container, Hidden } from '@mui/material';
import LazyImage from "../../../components/LazyImage"; // LOCAL CUSTOM COMPONENTS
import { FlexBox } from '@/components/flex-box';

export const Card1 = () => {
    return (
      <Box
        sx={{
          pt: {xs:1, sm:5.5},
          pb: {xs:1, sm:5.5},
          pl: 4,
          pr: 6,
          width: '100%',
          height: '100%',
          bgcolor: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '50px',
          gap: 2,
          position: 'relative',
          overflow: 'hidden',
          '&:hover .fadeInBtn': {
            display: 'flex', // Make it appear
            opacity: 1,
            transform: 'translateY(0)',
          },
          '&:hover .headerBox': {
            transform: 'translateY(-10%)', // Shift header box to the top
          },
          transition: 'all 0.3s ease', // Smooth transition for hover effect
        }}
      >
        <Box sx={{ p: 0 }}>
          <LazyImage
            alt="Image"
            width={175}
            height={175}
            sx={{
              width: { xs: 80, sm: 175 }, // Adjust sizes for different screen sizes
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
            gap:{ xs: 1, sm: 2 },
            transition: 'transform 0.3s ease', // Smooth transition for header movement
            transform: 'translateY(0)', // Default position
          }}
        >
          <Typography
            sx={{
              alignSelf: 'stretch',
              color: '#000',
              fontSize: { xs: 15, sm: 25 },
              fontFamily: 'Elemental End',
              textTransform:'lowercase',
            }}
          >
            Environmental Impact
          </Typography>
          <Typography
            sx={{
              alignSelf: 'stretch',
              color: '#909090',
              fontSize: { xs: 12, sm: 16 },
              fontFamily: 'Helvetica',
              fontWeight: 700,
              lineHeight: { xs: 1, sm: 1.5 },
              wordWrap: 'break-word',
            }}
          >
            Our technology addresses the implications shopping has on our environment
          </Typography>
          <Box sx={{ width: '100%' }}>
            <Button
              className="fadeInBtn"
              sx={{
                display: 'none', // Hide it completely when not hovered
                opacity: 0, 
                transform: 'translateY(20px)',
                transition: 'all 0.3s ease',
                width: '75%',
                py: 1,
                borderRadius: 50,
                border: '1px black solid',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >

              <Typography
                sx={{
                  textAlign: 'center',
                  color: 'black',
                  fontSize: {xs:12, sm:16},
                  fontFamily: 'Elemental End',
                  textTransform: 'lowercase',
                  fontWeight: 500,
                }}
              >
                Learn More
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    )
}
  
export const Card2 = ({ imageUrl, headerText, subHeaderText, bg, textColor="#000" }) => {
  return (
    <Box sx={{ 
      flex:1,
      width: '100%', 
      py: { xs:1, sm:5.5 }, 
      pr: 2,
      height: '100%',
      bgcolor: bg,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 3,
      borderRadius: '50px',
      mb: { xs: 2, md: 0 },
      position: 'relative',
      overflow: 'hidden',
      '&:hover .fadeInBtn': {
        display: 'flex', // Show button on hover
        opacity: 1, 
        transform: 'translateY(0)',
      },
      '&:hover .headerBox': {
        transform: 'translateY(-10%)',
      },
      transition: 'all 1s ease',
    }}
  >
    <Box sx={{ p: 0 }}>
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

    <Box
      className="headerBox"
      sx={{
        height: 143,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        transition: 'transform 0.3s ease',
        transform: 'translateY(0)',
      }}
    >
      <Typography
        sx={{
          lineHeight: 1,
          alignSelf: 'stretch',
          color: textColor,
          fontSize: { xs: 20, md: 25 },
          fontFamily: 'Elemental End',
          textTransform: 'lowercase',
          wordWrap: 'break-word',
          fontWeight: 500
        }}
      >
        {headerText}
      </Typography>
      <Typography
        sx={{
          alignSelf: 'stretch',
          color: '#909090',
          fontSize: { xs: 12, sm: 16 },
          fontFamily: 'Helvetica',
          fontWeight: 700,
          lineHeight: { xs: 1, sm: 1.5 },
          wordWrap: 'break-word',
        }}
      >
        {subHeaderText}
      </Typography>
    
    <Box sx={{ width: '100%' }}>
      <Button
        className="fadeInBtn"
        sx={{
          display: 'none', // Hide initially
          opacity: 0,
          transform: 'translateY(20px)',
          transition: 'all 0.3s ease',
          width: '75%',
          py: 1,
          borderRadius: 50,
          border: `1px ${textColor} solid`,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            color: textColor,
            fontSize: {xs:12, sm:16},
            fontFamily: 'Elemental End',
            textTransform: 'lowercase',
            fontWeight: 500,
          }}
        >
          Learn More
        </Typography>
      </Button>
    </Box>
    </Box>
  </Box>
  )
}

export const Card3 = () => {
  return (
    <FlexBox
      gap={5}
      sx={{
        pt: { xs: 5, sm: 14 },
        pb: { xs: 2, sm: 10 },
        px: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
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
          <Typography
            sx={{
              lineHeight: 1,
              alignSelf: 'stretch',
              color: 'black',
              fontSize: { xs: 20, sm: 25 },
              fontFamily: 'Elemental End',
              textTransform: 'lowercase',
              wordWrap: 'break-word',
            }}
          >
            Underserved Customers
          </Typography>
          <Typography
            sx={{
              alignSelf: 'stretch',
              color: '#909090',
              fontSize: { xs: 12, sm: 16 },
              fontFamily: 'Helvetica',
              fontWeight: 700,
              lineHeight: { xs: 1, sm: 1.5 },
              wordWrap: 'break-word',
              maxWidth: '1200px',
              textAlign: 'justify',
            }}
          >
            We are committed to empowering underserved communities through Augmented Reality. Our AR platform prioritizes accessibility, ensuring individuals with disabilities, senior citizens, veterans, and expectant mothers have access to immersive shopping experiences. We’re redefining inclusivity with the mission to create a world where technology adapts to the needs of every user, making shopping more convenient, confident, and comfortable.
          </Typography>
        </Box>

        <Box sx={{ width: '100%', height: 50, position: 'relative' }}>
          <Button
            className="fadeInBtn"
            sx={{
              width: '75%',
              padding: '10px 0',
              borderRadius: 50,
              border: '1px black solid',
              background: 'transparent',
              cursor: 'pointer',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              opacity: 0, // Initially hidden
              transition: 'opacity 0.3s ease-in-out', // Smooth fade-in transition
            }}
          >
            <Typography
              sx={{
                textAlign: 'center',
                color: 'black',
                fontSize: 16,
                fontFamily: 'Elemental End',
                textTransform: 'lowercase',
                fontWeight: 700,
              }}
            >
              Learn More
            </Typography>
          </Button>
        </Box>
      </Box>

      <LazyImage
        alt="Image"
        width={175}
        height={175}
        sx={{
          width: { xs: 80, sm: 175 },
          height: { xs: 80, sm: 175 },
        }}
        src="/assets/images/card/wheelchair.png"
      />
    </FlexBox>
  );
};


