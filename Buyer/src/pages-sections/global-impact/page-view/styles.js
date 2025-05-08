export const styles = {
  glassCard: {
    p: 5,
    display: 'flex',
    flexDirection: {xs:'row', sm:'column'},
    alignItems: 'center',
    justifyContent: 'center',
    height: {sm:'400px'},
    background: "linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)",
    boxShadow: "0px 1px 24px -1px rgba(0, 0, 0, 0.18)",
    backdropFilter: "blur(10px)",
    borderRadius: "30px",
    gap:3
  },
  buttonGroup: {
      display: 'flex',
      gap: '15px',
      pt: 2.5,
      flexDirection: {xs:'column', sm:'row'},  // Default for desktop view
      gap: {xs:0, sm:'10px'},
  },
  filledButton: {
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
  cardStyle : {
    filter: 'drop-shadow(0px 5px 50px rgba(0, 0, 0, 0.25))',
    borderRadius: '50px',
    position: 'relative',
    width: '100%',
    boxShadow: `
      inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4),
      inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5),
      inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24),
      inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24),
      inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)
    `,
    backdropFilter: 'blur(10.0285px)',
    background: 'rgba(255, 255, 255, 0.35)',
    p:{ xs:5, sm:10 },
    display:'flex',
    flexDirection:'column',
    gap:'10px',
    mt:5,
    width:{ xs:'100%', sm:'75%' }
  },
  textBubble : {
    width:'100%',
    py: 2,
    px:3,
    cursor: 'pointer',
    '&:hover': {
      background: 'rgba(3, 102, 254, 0.6)',
    },
    background: 'rgba(255, 255, 255, 0.35)',
    boxShadow: `
      inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4),
      inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5),
      inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24),
      inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24),
      inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)
    `,
    borderRadius: '80px',
  }
}