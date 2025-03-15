export const styles = {
   gradientBtn : {
    flex:{xs:1, sm:0},
    gap: 1,
    minWidth: { sm:250 },
    color: '#fff',
    borderRadius: '50px',
    border: '2px solid white',
    py: {xs:1, sm:2},
    background: 'linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)',
    minWidth: { sm:'250px' },
    transition: 'all 0.3s ease-in-out',
    ':hover' : {
      boxShadow:' 0px 4px 4px rgba(0, 0, 0, 0.25)',
      border: '2px solid rgba(255, 255, 255, 0.5)',
    },
  },
  outlinedBtn : {
    height:'100%',
    flex:{xs:1, sm:0},
    minWidth: { sm:250 },
    fontFamily: 'Elemental End',
    textTransform: 'lowercase',
    fontWeight: 500,
    color: '#fff',
    borderRadius: '50px',
    border: '2px solid white',
    py: {xs:1, sm:2},
    px: 3,
    fontSize: { xs:10, sm:16 },
    transition: 'all 0.3s ease-in-out', // Smooth transition effect
    ':hover': {
      background: 'linear-gradient(94.91deg, #FFFFFF 0%, #AEAEAE 100%);',
      color: '#000',
    },
  },
  outlinedLightBtn : {
    border:'2px solid black',
    fontWeight: 400,
    minWidth: 175,
    fontFamily: 'Elemental End',
    textTransform: 'lowercase',
    color: '#000',
    borderRadius: '50px',
    py: {xs:1, sm:2},
    px: 3,
    fontSize: 12,
    transition: 'all 0.3s ease-in-out', // Smooth transition effect
    ':hover': {
      background: 'linear-gradient(94.44deg, #666666 29%, #000000 100%)',
      color: '#FFF',
      border: '2px solid white',
    },
  }
};
