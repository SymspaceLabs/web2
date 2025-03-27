import { elementalEnd } from "@/app/layout"; // Calling custom font

export const elementalEndFont = {
  fontFamily: `${elementalEnd.style.fontFamily}, sans-serif`,
  textTransform:'lowercase',
  fontWeight: 500
}

export const styles = {
  elementalEndFont,
  cardStyle : {
    zIndex: 2,
    px: { xs:3, sm:10 },
    py: { xs:3, sm:8 },
    background: 'rgba(140, 140, 140, 0.3)',
    borderRadius: '50px',
    alignItems: 'center',
    maxWidth:'650px',
    width:'100%' 
  },
  mainContainer : {
    position: 'relative',
    backgroundColor: '#3F3F3F',
    flexDirection:'column',
    justifyContent: "flex-start",
    alignItems: 'center',
    minHeight: '100vh',
    py: { xs: 0, sm: 5 },
    height: '100%',
  },
  registerButton : {
    color: '#fff',
    borderRadius: '12px',
    fontSize: { xs: '14px', sm: '18px' }, // Mobile-specific font size
    backdropFilter: 'blur(50px)',
    py: 1.5,
    background: 'linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)',
    boxShadow:
      '0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.5), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)',
  },
  blurredOverlay1 : {
    zIndex: 0,
    position: 'absolute',
    top: '40%', // Move it higher
    transform: 'translate(-50%, -40%)', // Adjust translation
    left: '50%',
    width: { xs: '100%', sm: '80%', md: '890px' }, // Adjust width based on screen size
    height: { xs: '50vh', sm: '60vh', md: '700px' }, // Reduce height
    background: 'rgba(3, 102, 254, 0.8)',
    borderRadius: { xs: '30px', sm: '40px', md: '50px' }, // Adjust border radius for smaller screens
    opacity: 0.4,
    filter: 'blur(100px)',
    backdropFilter: 'blur(100px)',
    boxShadow:
      '0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.5), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)',
  },
  blurredOverlay2 : {
    zIndex: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: { xs: '100%', sm: '80%', md: '890px' }, // Adjust width based on screen size
    height: { xs: '70vh', sm: '80vh', md: '1000px' }, // Adjust height for smaller screens
    background: 'linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)',
    borderRadius: { xs: '30px', sm: '40px', md: '50px' }, // Adjust border radius for smaller screens
    transform: 'translate(-50%, -50%)',
    opacity: 0.4,
    filter: 'blur(100px)',
    backdropFilter: 'blur(100px)',
    boxShadow:
      '0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.5), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)',
  }
}
  
