import { keyframes } from '@mui/material/styles';

const blob = keyframes`
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
`;

export const styles = {
    container: {
      position: 'relative',
    },
    blobCircle: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: { xs: '300px', sm: '400px', md: '500px' },
      height: { xs: '300px', sm: '400px', md: '500px' },
      background: '#FFF',
      borderRadius: '50%',
      zIndex: 1,
      opacity: 0.3,
      filter: 'blur(80px)',
      animation: `${blob} 7s infinite`,
    },
    contentBox: {
      position: 'relative',
      zIndex: 2,
      minHeight: { xs: '400px', md: '600px' },
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      py: { xs: 4, md: 8 },
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
  };