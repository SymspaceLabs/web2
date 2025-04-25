'use client';

// ========================================
// Simulation Overlay
// ========================================

import Link from 'next/link';
import Image from 'next/image';
import { H1 } from './Typography';
import { FlexColCenter } from './flex-box';
import { useEffect, useState } from 'react';
import { Backdrop, Button } from '@mui/material';

export default function SimulationOverlay({ 
  open,
  setStoreDialogOpen 
}) {
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
        <H1 fontSize={32} textAlign="center" >
          {message.slice(0, visibleChars)}
        </H1>
        <Button sx={styles.btn} onClick={()=>setStoreDialogOpen(true)}>
          Store Settings
        </Button>
      </FlexColCenter>
    </Backdrop>
  );
}

const styles = {
  btn: {
      background: 'linear-gradient(94.44deg, #666666 29%, #000000 100%)',
      boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)',
      backdropFilter: 'blur(50px)',
      borderRadius: '30px',
      color: '#FFF',
      px: 2,
      fontSize: { xs: 12, sm: 16 },
      fontWeight: 500,
      '&:hover': {
          background: 'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)'
      }
  }
}
