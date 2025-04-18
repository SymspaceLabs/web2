"use client";

// =============================================================================
// Section 3 - Partners Section -  About Us 
// =============================================================================

import Link from 'next/link';
import { styles } from '../page-view/styles';
import { H1 } from '@/components/Typography';
import { COMPANIES_DATA } from "@/data/companies";
import { LazyImage } from '@/components/lazy-image';
import { Button, Box, Container } from "@mui/material";
import { FlexBox, FlexColCenter } from '@/components/flex-box';

// =============================================================================

export default function Section3() {
  return (
    <Container sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
      <Box sx={{ width: '100%', maxWidth: '1400px' }}>
        <H1 sx={{ py: 5, fontSize: { xs: 25, sm: 35 }, color: '#fff', wordSpacing: '10px' }}>
          backed by industry leaders
        </H1>

        <Box sx={styles.glassCard}>
          <FlexBox flexDirection={{xs:'column', sm:'row'}} justifyContent='space-between' gap={3} alignItems="center">
            {/* Mapping through company logos */}
            {COMPANIES_DATA.map((company, index) => (
              <Box key={index} sx={{ width: {xs:'60%', sm:'25%'} }}>
                <a href={company.url} target="_blank" rel="noopener noreferrer">
                  <LazyImage src={company.src} width={150} height={150} alt={company.alt} />
                </a>
              </Box>
            ))}
            
            <FlexColCenter>
              <Link href='/contact-us' passHref>
                <Button sx={styles.glassCardBtn}>
                  get in touch
                </Button>
              </Link>
            </FlexColCenter>
          </FlexBox>
        </Box>
      </Box>
    </Container>
  );
}
