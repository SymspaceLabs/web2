import { fontSize } from "@/theme/typography";

export const section1Styles = (theme) => ({
  rootGrid: {
    position: 'relative',
    background: '#fff',
    overflow: 'hidden',
  },
  container: {
    position: 'relative',
  },
  contentBox: {
    flexGrow: 1,
    py: 8,
    zIndex: 2,
  },
  title: {
    fontFamily: 'Elemental End',
    color: '#fff',
    fontSize: { xs: 50, sm: 50, md: 96 },
  },
  description: {
    fontFamily: 'Helvetica',
    color: '#797979',
    fontSize: 18,
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
    pt: 2.5,
    flexDirection: 'row',  // Default for desktop view
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',  // Stack buttons in one column for mobile view
      gap: '10px',
    },
  },
  filledButton: {
    fontFamily: 'Elemental End',
    textTransform:'lowercase',
    fontSize:'16px',
    background: '#000',
    color: '#fff',
    borderRadius: '50px',
    border:'2px solid transparent',
    py: 2,
    px: 7.5,
    transition: 'all 0.3s ease-in-out', // Smooth transition effect
    ':hover': {
      background: 'linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)',
      color: '#fff',
      border:'2px solid white'
    },
  },  
  outlinedButton: {
    fontSize:'16px',
    background: 'transparent',
    fontFamily: 'Elemental End',
    textTransform:'lowercase',
    color: '#000',
    borderRadius: '50px',
    border:'2px solid black',
    py: 2,
    px: 7.5,
    transition: 'all 0.3s ease-in-out', // Smooth transition effect
    ':hover': {
      background: 'linear-gradient(93.04deg, #696969 0%, #000000 100%)',
      color: '#fff',
      border:'2px solid white'
    },
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
  imageContainer: {
    textAlign: 'center',
    zIndex: 2,
    position: 'relative',
    minHeight: '500px', // Added minHeight
  },
});
