import { keyframes } from '@mui/material/styles';

const blob = keyframes`
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
`;

export const section1Styles = (theme) => ({
  rootGrid: {
    position: 'relative',
    background: '#1F1F1F',
    overflow: 'hidden',
  },
  container: {
    position: 'relative',
  },
  blob1: {
    position: 'absolute',
    top: '50%',
    right: '20%',
    width: '400px',
    height: '400px',
    background: '#FFFFFF',
    borderRadius: '50%',
    zIndex: 1,
    opacity: 0.5,
    filter: 'blur(75px)',
    animation: `${blob} 7s infinite`,
  },
  blob2: {
    position: 'absolute',
    top: '10%',
    right: '5%',
    width: '400px',
    height: '400px',
    background: '#0366FE',
    borderRadius: '50%',
    zIndex: 1,
    opacity: 0.5,
    filter: 'blur(75px)',
    animation: `${blob} 7s infinite`,
    [theme.breakpoints.down('sm')]: {
      display: 'none',  // Hide on small screens (mobile)
    },
  },
  blob3: {
    position: 'absolute',
    top: -150,
    left: -150,
    width: '500px',
    height: '500px',
    background: '#0366FE',
    borderRadius: '50%',
    zIndex: 1,
    opacity: 0.5,
    filter: 'blur(75px)',
    animation: `${blob} 7s infinite`,
    [theme.breakpoints.down('sm')]: {
      display: 'none',  // Hide on small screens (mobile)
    },
  },
  blob4: {
    position: 'absolute',
    top: -150,
    left: 150,
    width: '500px',
    height: '500px',
    background: '#fff',
    borderRadius: '50%',
    zIndex: 1,
    opacity: 0.4,
    filter: 'blur(100px)',
    animation: `${blob} 7s infinite`,
    [theme.breakpoints.down('sm')]: {
      display: 'none',  // Hide on small screens (mobile)
    },
  },
  contentBox: {
    flexGrow: 1,
    py: 8,
    zIndex: 2,
  },
  heading: {
    fontFamily: 'Helvetica',
    color: 'rgba(255,255,255,0.5)',
    fontSize: 28,
    fontWeight: 'bold',
  },
  title: {
    fontFamily: 'Elemental End',
    color: '#fff',
    fontSize: { xs: 48, sm: 60, md: 80, lg: 100, xl: 120 },
    fontWeight: 'bold',
  },
  description: {
    fontFamily: 'Helvetica',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
    pt: 5,
    flexDirection: 'row',  // Default for desktop view
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',  // Stack buttons in one column for mobile view
      gap: '10px',
    },
  },
  outlinedButton: {
    fontFamily: 'Elemental End',
    textTransform: 'lowercase',
    color: '#fff',
    borderRadius: '50px',
    border:'2px solid white',
    py: 2,
    px: 7.5,
    transition: 'all 0.3s ease-in-out', // Smooth transition effect
    ':hover': {
      background: '#fff',
      color: '#000',
    },
  }, 
  containedButton: {
    gap: 2,
    fontFamily: 'Helvetica',
    color: '#fff',
    borderRadius: '50px',
    border: '2px solid white',
    py: 2,
    background: 'linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)',
    minWidth: '300px',
  },
  buttonText: {
    fontFamily: 'Elemental End',
    textTransform: 'lowercase',
    fontSize: 16,
  },
  imageBox: {
    width: '35px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoContainer: {
    textAlign: 'center',
    zIndex: 2,
    position: 'relative',
  },
});
