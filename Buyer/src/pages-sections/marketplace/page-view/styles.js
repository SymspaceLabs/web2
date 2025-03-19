import { elementalEnd } from "@/app/layout"; // Calling custom font

export const elementalEndFont = {
    fontFamily: `${elementalEnd.style.fontFamily}, sans-serif`,
    textTransform:'lowercase',
    fontWeight: 500
}

const buttonDark = {
    ...elementalEndFont,
    borderRadius: 32,
    padding: ".5rem 1.5rem",
    background: 'rgba(255,255,255,0.1)',
    color: '#FFF',
    fontSize: 16,
    ':hover': {
        background: '#373F50',
        color: '#000',
        background: 'linear-gradient(94.91deg, #FFFFFF 0%, #AEAEAE 100%)',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
    }
};

export const styles = {
    elementalEndFont : {
        fontFamily: `${elementalEnd.style.fontFamily}, sans-serif`,
        textTransform:'lowercase',
        fontWeight: 500
    },
    buttonDark,
    buttonLight: {
        ...buttonDark,
        background: '#FFF',
        color: '#000',
        border: '2px solid #FFFFFF',
        ':hover': { 
          background: 'linear-gradient(94.44deg, #666666 29%, #000000 100%)',
          color: '#FFF',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' 
        },
    },
    buttonLight2: {
        ...buttonDark,
        color:'#000',
        background: '#FFF'
    },
    buttonGradient: {
        ...buttonDark,
        border: '2px solid transparent',
        background: "linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)",
        ':hover': { 
          border: '2px solid white',
        },
    }
};
