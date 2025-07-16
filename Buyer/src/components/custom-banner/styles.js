export const styles = {
    banner : {
        background: 'rgba(255, 255, 255, 0.35)',
        boxShadow: `inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4),
                    inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5),
                    inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24),
                    inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24),
                    inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)`,
        backdropFilter: 'blur(10.0285px)',
        borderRadius:'30px',
        py:{ xs:3, sm:8 },
        px:{ xs:3, sm:8 },
    },
    buttonDark : {
        width: "100%", 
        maxWidth: {xs:'100%', sm:250},
        borderRadius: 32,
        px: 3,
        background: '#000',
        color: '#FFF',
        fontSize: 16,
        border: '2px solid white',
        ':hover': {
            background: '#373F50',
            color: '#FFF',
            background: ' linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
        }
    },
    bannerButton : { 
        background:'linear-gradient(97.04deg, #666666 0%, #1D1D1D 100%)',
        borderRadius: '50px',
        px:5,
        py:1.5,
        color: '#fff',
        fontSize:{ xs:12, sm:14 },
        border:'1px solid #FFF',
        minWidth:{sm:'200px'}
    }

};
