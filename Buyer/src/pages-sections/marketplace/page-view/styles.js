const buttonDark = {
    borderRadius: 32,
    padding: ".5rem 1.5rem",
    background: 'rgba(255,255,255,0.1)',
    color: '#FFF',
    fontSize: { xs:12, sm:12 },
    ':hover': {
        background: '#373F50',
        color: '#000',
        background: 'linear-gradient(94.91deg, #FFFFFF 0%, #AEAEAE 100%)',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
    }
};

export const styles = {
    sectionHeader: {
        fontSize: { xs: 20, sm: 34 }
    },
    sectionSubHeader: {
        textAlign: {xs:"left", sm:"center"},
        color: "grey.600",
        fontSize: { xs: 14, sm: 16 }
    },
    cardTitle: {
        fontSize: { xs: 26, md: 26 },
        lineHeight: 1.2,
        mb: 2
    },
    cardSubtitle: {
        fontSize: { xs: 16, md: 16 },
        mb: 1
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
        width:'100%',
        border: '2px solid transparent',
        background: "linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)",
        ':hover': { 
          border: '2px solid white',
        },
        maxWidth: { xs: '100%', sm: 250 }
    },
    bentoBoxCard : {
        maxHeight:'600px',
        overflow:'hidden',
        padding: {xs:"2.2rem", sm:"3rem"},
        gap: {xs:2, sm:2.5},
        color: "white",
        borderRadius: {xs:10, sm:15},
        position: "relative",
        height: "100%"

    },
    // blogCard : {
    //     borderRadius: {xs:'25px', sm:'25px', md:'80px'},
    //     pt: {xs:2, sm:2, md:5},
    //     px: {xs:1, sm:1, md:5},
    //     background: 'rgba(255, 255, 255, 0.4)',
    //     boxShadow: 'inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4), inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5), inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)',
    //     backdropFilter: 'blur(10.0285px)',
    //     position: 'relative',
    //     overflow: 'hidden',
    // },
    bestSellerBg : {
        position: "relative",
        p: {xs:2, sm:5},
        borderRadius: {xs:5, sm:"50px"},
        background: "linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)",
        overflow: "hidden",
        boxShadow: "0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.5), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)",
        backdropFilter: "blur(50px)",
    },
    glassBg : {
        position: "absolute",
        width: "100%",
        height: "100%",
        background:
        "linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), rgba(255, 255, 255, 0.1)",
        borderRadius: "0px 0px 20px 20px",
        left: 0,
        top: 0,
        zIndex: 0,
    }
};
