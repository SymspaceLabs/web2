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
      fontFamily: 'Elemental End',
      textTransform:'lowercase',
      color: '#fff',
      fontSize: 72,
      textAlign: 'left',
    },
    description: {
      maxWidth: 1200,
      fontFamily: 'Helvetica',
      color: '#FFF',
      fontSize: 18,
      lineHeight: 2,
      textAlign: 'justify'
    },
    buttonContainer: {
      width: '100%',
      maxWidth: 1200,
    },
    button: {
      fontWeight:400,
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
  