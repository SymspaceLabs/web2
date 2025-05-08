export const styles = {
    rootGrid: {
        position: 'relative',
        background: '#fff',
        overflow: 'hidden',
      },
      container: {
        position: 'relative',
      },
      contentBox: {
        flexGrow: 1,
        py: 8,
        zIndex: 2,
      },
      title: {
        color: '#fff',
        fontSize: { xs: 50, sm: 50, md: 96 },
      },
      description: {
        color: '#797979',
        fontSize: 18,
      },
      buttonGroup: {
        display: 'flex',
        gap: {xs:'10px', sm:'15px'},
        pt: 2.5,
        flexDirection: {xs:'column', sm:'row'},  // Default for desktop view
      },
      filledButton: {
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
      outlinedButton: {
        fontSize:'16px',
        background: 'transparent',
        color: '#000',
        borderRadius: '50px',
        border:'2px solid black',
        py: 2,
        px: 7.5,
        transition: 'all 0.3s ease-in-out', // Smooth transition effect
        ':hover': {
          background: 'linear-gradient(93.04deg, #696969 0%, #000000 100%)',
          color: '#fff',
          border:'2px solid white'
        },
      },    
      buttonText: {
        fontSize: 16,
      },
      imageBox: {
        width: '35px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      imageContainer: {
        textAlign: 'center',
        zIndex: 2,
        position: 'relative',
        minHeight: '500px', // Added minHeight
      },
      learnMoreBtn : {
          boxSizing: "border-box",
          py:2,
          px:5,
          background: "linear-gradient(180deg, #3084FF 0%, #1D4F99 100%)",
          borderRadius: "20px",
          color: "white", // Ensures the text is visible on the dark gradient
          fontSize: "16px",
          "&:hover": {
            background: "linear-gradient(180deg, #1D4F99 0%, #3084FF 100%)",
          },
      }
};
