"use client";

import { Box } from "@mui/material";
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

export const BlobBox = ({top=null, right=null, bottom=null, left=null, background="#0366FE", displayNoneMobile=false, widthHeight='500px' }) => {
    return(
      <Box
        sx={{
          display: displayNoneMobile? {xs:'none', sm:'block'} : 'block',
          position: 'absolute',
          top,
          right,
          bottom,
          left,
          width: {xs:'250px', sm:widthHeight},
          height: {xs:'250px', sm:widthHeight},
          background,
          borderRadius: '50%',
          zIndex: 0,
          filter: 'blur(75px)',
          opacity: 0.5,
          animation: `${blobKeyframe} 7s infinite`,
        }}
      />
    )
  }
  