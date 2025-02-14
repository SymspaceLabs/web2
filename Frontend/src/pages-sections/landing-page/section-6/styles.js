export const sectionStyles = {
    sectionBackground: {
      background: '#1F1F1F',
    },
    flexContainer: {
      flexGrow: 1,
      py: 8,
    },
    gridContainer: {
      height: '100%',
    },
    leftColumn: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      gap: 4,
    },
    title: {
      fontFamily: 'Elemental End',
      textTransform:'lowercase',
      color: '#fff',
      fontSize: { xs: 48, sm: 48, md: 72 },
    },
    description: {
      fontFamily: 'Helvetica',
      color: '#fff',
      fontSize: 18,
      lineHeight: 2
    },
    buttonContainer: {
      display: 'flex',
      pt: 5,
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
    rightColumn: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };
  