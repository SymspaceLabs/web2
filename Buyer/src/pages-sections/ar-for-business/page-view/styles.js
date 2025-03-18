import { elementalEnd } from "@/app/layout"; // Calling custom font

const elementalEndFont = `${elementalEnd.style.fontFamily}, sans-serif`

export const styles = {
    sectionHeader: {
        fontFamily: elementalEndFont,
        textTransform:'lowercase',
        fontSize: { xs: 20, sm: 64 },
        color:'#FFF'
    },
    gradientBtn : {
        flex:{xs:1, sm:'none'},
        gap: 1,
        color: '#fff',
        borderRadius: '50px',
        border: '2px solid white',
        py: {xs:1, sm:2},
        px: {xs:1, sm:8},
        background: '#000',
        transition: 'all 0.3s ease-in-out',
        fontFamily: elementalEndFont,
        fontWeight: 500, 
        ':hover' : {
            boxShadow:' 0px 4px 4px rgba(0, 0, 0, 0.25)',
            border: '2px solid rgba(255, 255, 255, 0.5)',
            background: 'linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)',
        },
    },
    elementalEndFont : {
        fontFamily: elementalEndFont,
        textTransform:'lowercase',
        fontWeight: 500,
      },
    /////////////////////////////////////////////////////////////////
    heroHeader: {
        fontFamily: elementalEndFont,
        fontSize: { xs: 48, sm: 60, md: 100 },
        color: '#FFF'
    },


  gradientBtnText: {
    fontFamily: elementalEndFont,
    textTransform: 'lowercase',
    fontSize: { xs: 10, sm: 16 },
    fontWeight: 500
  },
  outlinedBtn : {
    height:'100%',
    flex:{xs:1, sm:0},
    minWidth: { sm:250 },
    fontFamily: `${elementalEnd.style.fontFamily}, sans-serif`,
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
    fontFamily: `${elementalEnd.style.fontFamily}, sans-serif`,
    textTransform: 'lowercase',
    color: '#000',
    borderRadius: '50px',
    py: {xs:1, sm:2},
    px: 3,
    fontSize: { xs:10, sm:16 },
    transition: 'all 0.3s ease-in-out', // Smooth transition effect
    ':hover': {
      background: 'linear-gradient(94.44deg, #666666 29%, #000000 100%)',
      color: '#FFF',
      border: '2px solid white',
    },
  },
  textBubbleContainer : { 
    display: "flex",
    flexWrap: "wrap",
    gap: { xs: 2, sm: 3 },
    py: 2,
    width: "100%",
    justifyContent: "space-between",
  },
  textBubble : {
    textAlign:'center',
    alignItems:'center',
    alignContent:'center',
    maxWidth:{xs:'150px', sm:'250px', md:'500px'},
    py: {xs:1, sm:2},
    px: {xs:1, sm:3},
    mb: {xs:0, sm:2},
    fontFamily: `${elementalEnd.style.fontFamily}, sans-serif`,
    textTransform: 'lowercase',
    background: 'rgba(255, 255, 255, 0.35)',
    fontSize: {xs:'8px', sm:'14px'},
    boxShadow: `
      inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4),
      inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5),
      inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24),
      inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24),
      inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)
    `,
    borderRadius: '80px',
    color: '#fff'
  }
};