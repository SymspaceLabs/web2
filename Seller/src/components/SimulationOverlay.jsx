'use client';

import Link from 'next/link';
import Image from 'next/image';
import { H1 } from './Typography';
import { FlexColCenter } from './flex-box';
import { useEffect, useState } from 'react';
import { Backdrop, Button } from '@mui/material';

export default function SimulationOverlay({ open, setStoreDialogOpen }) {
  const line1 = 'STANDBY AS WE CONTINUE';
  const line2 = 'TO DEVELOP THE SIMULATION';

  const [visibleChars1, setVisibleChars1] = useState(0);
  const [visibleChars2, setVisibleChars2] = useState(0);

  useEffect(() => {
    if (open) {
      setVisibleChars1(0);
      setVisibleChars2(0);

      const interval1 = setInterval(() => {
        setVisibleChars1((prev) => {
          if (prev < line1.length) return prev + 1;
          clearInterval(interval1);
          return prev;
        });
      }, 40);

      let interval2;
      // Start line2 after line1 is fully typed
      setTimeout(() => {
        interval2 = setInterval(() => {
          setVisibleChars2((prev) => {
            if (prev < line2.length) return prev + 1;
            clearInterval(interval2);
            return prev;
          });
        }, 40);
      }, line1.length * 40 + 300); // slight delay after line1 finishes

      return () => {
        clearInterval(interval1);
        clearInterval(interval2);
      };
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
      <FlexColCenter p={2} gap={3}>
        <Link href={process.env.NEXT_PUBLIC_BUYER_URL} p={2}>
          <Image
            alt="Logo"
            width={500}
            height={50}
            src="/assets/images/logos/Logo.svg"
          />
        </Link>
        <Image
          src="/assets/images/dashboard/wip-dev-gif.gif"
          alt="Simulation Dev"
          width={300}
          height={300}
        />
        <H1 fontSize={32} textAlign="center">
          {line1.slice(0, visibleChars1)}
          <br />
          {line2.slice(0, visibleChars2)}
        </H1>
        <Button sx={styles.btn} onClick={() => setStoreDialogOpen(true)}>
          Store Settings
        </Button>
      </FlexColCenter>
    </Backdrop>
  );
}

const styles = {
  btn: {
    background: 'linear-gradient(94.44deg, #666666 29%, #000000 100%)',
    boxShadow:
      '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(50px)',
    borderRadius: '30px',
    color: '#FFF',
    px: 2,
    fontSize: { xs: 12, sm: 16 },
    fontWeight: 500,
    '&:hover': {
      background: 'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)',
    },
  },
};
