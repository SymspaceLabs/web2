import { elementalEnd } from "@/app/layout"; // Calling custom font

export const elementalEndFont = {
    fontFamily: `${elementalEnd.style.fontFamily}, sans-serif`,
    textTransform:'lowercase',
    fontWeight: 500
}

export const styles = {
    elementalEndFont : {
        ...elementalEndFont,
        textTransform:'lowercase',
        fontWeight: 500
    },
    buttonGroup: {
        display: 'flex',
        gap: '15px',
        pt: 2.5,
        flexDirection: {xs:'column', sm:'row'},  // Default for desktop view
        gap: {xs:0, sm:'10px'},
    },
    filledButton: {
        ...elementalEndFont,
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
    textBubbleStyle : {
        py: 2,
        cursor: 'pointer',
        mb: 2,
        elementalEndFont,
        textTransform: 'lowercase',
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
        px:3,
        color: '#fff'
    }
}