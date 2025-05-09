export const styles = {
  header: {
    color: '#FFF',
    fontSize: { xs: 20, sm: 40 },
    maxWidth:'1000px',
    textAlign:'center',
    wordSpacing:'10px'
  },
  subheader: {
    color: '#FFF',
    fontSize: { xs:12, sm:20 },
    textAlign: 'justify',
    maxWidth: 1200,
    lineHeight: { xs:1.5, sm:2 },
    maxWidth:'1000px',
    textAlign:'center',
  },
  outlinedBtn : {
    height:'100%',
    flex:{xs:1, sm:0},
    minWidth: { sm:250 },
    color: '#fff',
    borderRadius: '50px',
    border: '2px solid white',
    py: {xs:1, sm:2},
    px: 5,
    fontSize: { xs:10, sm:16 },
    transition: 'all 0.3s ease-in-out', // Smooth transition effect
    ':hover': {
      background: '#000',
      color: '#FFF',
    },
  },
  textBubbleContainer : { 
    py: 3,
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: {xs:"space-between", sm:'center'},
    gap: { xs: 2, sm: 3 },
  },
  textBubble : {
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
    maxWidth: { xs:180, sm:'250px', md:'500px'},
    minWidth: 100,
    minHeight: 40,
    py: {xs:1, sm:2},
    px: {xs:2, sm:3},
    mb: {xs:0, sm:2},
    background: 'rgba(255, 255, 255, 0.35)',
    boxShadow: `
      inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4),
      inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5),
      inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24),
      inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24),
      inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)
    `,
    borderRadius: '80px',
    '&:hover': {
      background: 'rgba(3, 102, 254, 0.6)',
    },
  },
  glassCard : {
    filter: 'drop-shadow(0px 5px 50px rgba(0, 0, 0, 0.25))',
    borderRadius: '50px',
    boxShadow: `
      inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4),
      inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5),
      inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24),
      inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24),
      inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)
    `,
    backdropFilter: 'blur(10.0285px)',
    background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)',
    p:{ xs:5, sm:10 },
    width: { xs: "100%", sm: "50%" },
  },
  buttonTransparent: {
    background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)',
    boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', 
    backdropFilter: 'blur(10px)',
    borderRadius:'30px',
    fontSize: 11,
    color:'#FFF',
    px: 2,
    border:'1px solid rgba(255,255,255,0.2)',
    ":hover" : {
      background:'linear-gradient(94.44deg, #666666 29%, #000000 100%)',
      border:'1px solid white',
    }
  }
}
