'use client';

import Image from 'next/image';
import { Backdrop, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { H1 } from './Typography';

export default function SimulationOverlay({ open }) {
  const message = 'STANDBY AS WE CONTINUE TO DEVELOP THE SIMULATION';
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    if (open) {
      setVisibleChars(0); // reset when opened
      const interval = setInterval(() => {
        setVisibleChars((prev) => {
          if (prev < message.length) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 40); // typing speed

      return () => clearInterval(interval);
    }
  }, [open]);

  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        p={2}
      >
        <Image
          src="/assets/images/dashboard/wip-dev-gif.gif"
          alt="Simulation Dev"
          width={300}
          height={300}
        />
        <H1 fontSize={32}>
          {message.slice(0, visibleChars)}
        </H1>
      </Box>
    </Backdrop>
  );
}
