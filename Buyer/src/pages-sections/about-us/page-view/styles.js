export const styles = {
    glassCard : {
        background: 'rgba(255, 255, 255, 0.35)',
        boxShadow: `inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4),
                    inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5),
                    inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24),
                    inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24),
                    inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)`,
        backdropFilter: 'blur(10.0285px)',
        borderRadius: "40px",
        py: { xs:5, sm:10},
        px: { xs:3, sm:10}
    },
    glassCardBtn: {
        background: 'linear-gradient(97.04deg, #666666 0%, #1D1D1D 100%)',
        borderRadius: '50px',
        px: 8,
        py: 2,
        color: '#fff',
        fontSize: {xs:'14px', sm:'20px'},
        textTransform: 'lowercase',
        fontWeight: 400,
        border: '1px solid #FFF',
        '&:hover' : {
            background: '#000'
        }
      }
    
};
