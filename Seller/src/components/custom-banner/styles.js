export const styles = {
    banner : {
        background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)',
        boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
        backdropFilter: 'blur(12px)',
        borderRadius:'30px',
        py:{ xs:3, sm:3 },
        px:{ xs:3, sm:3 },
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
};
