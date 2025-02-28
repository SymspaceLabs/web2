"use client";

import { keyframes } from '@mui/material/styles';

const blobKeyframe = keyframes`
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
  blob1: {
    position: 'absolute',
    top: '50%',
    right: '20%',
    width: '400px',
    height: '400px',
    background: '#FFFFFF',
    borderRadius: '50%',
    zIndex: 1,
    opacity: 0.5,
    filter: 'blur(75px)',
    animation: `${blobKeyframe} 7s infinite`,
  },
  blob2: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '400px',
    height: '400px',
    background: '#0366FE',
    borderRadius: '50%',
    zIndex: 1,
    opacity: 0.5,
    filter: 'blur(75px)',
    animation: `${blobKeyframe} 7s infinite`,
  },
  blob3: {
    position: 'absolute',
    top: 0,
    left: -150,
    width: '500px',
    height: '500px',
    background: '#0366FE',
    borderRadius: '50%',
    zIndex: 1,
    opacity: 0.5,
    filter: 'blur(75px)',
    animation: `${blobKeyframe} 7s infinite`,
  },
  blob4: {
    position: 'absolute',
    top: -150,
    left: 150,
    width: '500px',
    height: '500px',
    background: '#fff',
    borderRadius: '50%',
    zIndex: 1,
    opacity: 0.4,
    filter: 'blur(100px)',
    animation: `${blobKeyframe} 7s infinite`,
  },
};
