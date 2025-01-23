import { Box, Typography, Button, Grid, Container, Hidden } from '@mui/material';
import LazyImage from "../../../components/LazyImage"; // LOCAL CUSTOM COMPONENTS


export const Card1 = () => {
    return (
      <Box
        sx={{
          pt: 5.5,
          pb: 5.5,
          px: 4,
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
            width={150}
            height={150}
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
            gap: 2,
            transition: 'transform 0.3s ease', // Smooth transition for header movement
            transform: 'translateY(0)', // Default position
          }}
        >
          <Typography
            sx={{
              lineHeight: 1,
              alignSelf: 'stretch',
              color: 'black',
              fontSize: { xs: 20, sm: 32, md: 40, lg: 40, xl: 40 },
              fontFamily: 'Helvetica',
              fontWeight: 700,
              wordWrap: 'break-word',
            }}
          >
            Environmental Impact
          </Typography>
          <Typography
            sx={{
              alignSelf: 'stretch',
              color: '#909090',
              fontSize: { xs: 12, sm: 12, md: 14 },
              fontFamily: 'Helvetica',
              fontWeight: 700,
              lineHeight: { xs: 1, sm: 1.5 },
              wordWrap: 'break-word',
            }}
          >
            Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.
          </Typography>
          <Box sx={{ width: '100%' }}>
            <Button
              className="fadeInBtn"
              sx={{
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
      </Box>
    )
}
  
export const Card2 = ({ imageUrl, headerText, subHeaderText, bg, textColor="#000" }) => {
    return (
      <Box sx={{ width: '100%', pt: 5.5, pb: 5.5, px: 4, pr: 6,
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
          opacity: 1, // Make button visible on hover
          transform: 'translateY(0)', // Button comes up smoothly
        },
        '&:hover .headerBox': {
          transform: 'translateY(-10%)', // Move header box to top on hover
        },
        transition: 'all 0.3s ease', // Smooth transition for hover effect
      }}
    >
      <Box sx={{ p: 0 }}>
        <LazyImage
          alt="Image"
          width={94}
          height={94}
          src={imageUrl}
        />
      </Box>
  
      {/* Header Box for title and subtitle */}
      <Box
        className="headerBox"
        sx={{
          height: 143,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          transition: 'transform 0.3s ease', // Smooth transition for header movement
          transform: 'translateY(0)', // Default position in center
        }}
      >
        <Typography
          sx={{
            lineHeight: 1,
            alignSelf: 'stretch',
            color: textColor,
            fontSize: { xs: 20, md: 25 },
            fontFamily: 'Helvetica',
            fontWeight: 700,
            wordWrap: 'break-word',
          }}
        >
          {headerText}
        </Typography>
        <Typography
          sx={{
            alignSelf: 'stretch',
            color: '#909090',
            fontSize: { xs: 12, sm: 12, md: 14 },
            fontFamily: 'Helvetica',
            fontWeight: 700,
            lineHeight: { xs: 1, sm: 1.5 },
            wordWrap: 'break-word',
          }}
        >
          {subHeaderText}
        </Typography>
        {/* Button with fade-in effect */}
      <Box sx={{ width: '100%' }}>
        <Button
          className="fadeInBtn"
          sx={{
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
    </Box>
    )
}
  
export const Card3 = () => {
    return (
      <Box
        sx={{
          pt: 5.5,
          pb: 5.5,
          px: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1,
          position: 'relative',
          overflow: 'hidden',
          '&:hover .fadeInBtn': {
            opacity: 1, // Make button visible on hover
            transform: 'translateY(0)', // Button comes up smoothly
          },
          '&:hover .headerBox': {
            transform: 'translateY(-10%)', // Move header box to the top on hover
          },
          transition: 'all 0.3s ease', // Smooth transition for hover effect
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 2,
          }}
        >
          {/* Header Box for title and subtitle */}
          <Box
            className="headerBox"
            sx={{
              alignSelf: 'stretch',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: 2,
              transition: 'transform 0.3s ease', // Smooth transition for header movement
              transform: 'translateY(0)', // Default position in center
            }}
          >
            <Typography
              sx={{
                lineHeight: 1,
                alignSelf: 'stretch',
                color: 'black',
                fontSize: { xs: 20, sm: 32, md: 40 },
                fontFamily: 'Helvetica',
                fontWeight: 700,
                wordWrap: 'break-word',
              }}
            >
              Underserved
              <br />
              Customers
            </Typography>
            <Typography
              sx={{
                alignSelf: 'stretch',
                color: '#909090',
                fontSize: { xs: 12, sm: 12, md: 18 },
                fontFamily: 'Helvetica',
                fontWeight: 700,
                lineHeight: { xs: 1, sm: 1.5 },
                wordWrap: 'break-word',
                maxWidth:'1200px'
              }}
            >
              We are committed to breaking down barriers in digital commerce by empowering underserved communities through Augmented Reality. We strive to be AR platform that priorities accessibility, ensuring individuals with disabilities, seniors, veterans, and expectant mothers have seamless access to immersive shopping experiences. Our platform is  redefining inclusivity in online retail. Our mission is to create a world where technology adapts to the needs of every user, making digital experiences more convenient, confident, and comfortable.
            </Typography>
          </Box>
  
          <Box sx={{ width: '100%' }}>
              <Button
                className="fadeInBtn"
                sx={{
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
  
        <Box sx={{ width: '100%' }}>
          <LazyImage
            alt="Image"
            width={200}
            height={200}
            src="/assets/images/card/wheelchair.png"
          />
        </Box>
      </Box>
    )
}
  