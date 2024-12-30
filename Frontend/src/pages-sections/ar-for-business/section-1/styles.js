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
    color: '#4E4E4E',
    fontSize: { xs: 24, sm: 30, md: 40, lg: 50, xl: 60 },
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
  outlinedButton: {
    background: '#000',
    fontFamily: 'Elemental End',
    textTransform: 'lowercase',
    color: '#fff',
    borderRadius: '50px',
    py: 2,
    px: 7.5,
    transition: 'all 0.3s ease-in-out', // Smooth transition effect
    ':hover': {
      background: '#fff',
      color: '#000',
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
