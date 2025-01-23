export const styles = {
    sectionBackground: {
      background: '#1F1F1F',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      alignItems: 'center',
      py: 10,
    },
    title: {
      width: '100%',
      maxWidth: 1200,
      fontFamily: 'Helvetica',
      color: '#fff',
      fontSize: 72,
      fontWeight: 'bold',
      textAlign: 'left',
    },
    description: {
      maxWidth: 1200,
      fontFamily: 'Helvetica',
      color: '#909090',
      fontSize: 18,
      lineHeight: '30px'
    },
    buttonContainer: {
      width: '100%',
      maxWidth: 1200,
    },
    button: {
      fontFamily: 'Elemental End',
      textTransform: 'lowercase',
      color: '#fff',
      borderRadius: '50px',
      py: 2,
      px: 7.5,
      ':hover': {
        background: '#fff',
        color: '#000',
      },
    },
  };
  