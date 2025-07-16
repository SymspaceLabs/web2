"use client";

// =================================================================
// Section 3
// =================================================================

import { useState } from 'react';
import { styles } from '../page-view/styles';
import { Box, Container, Card } from '@mui/material';
import { FlexBox, FlexCol } from '@/components/flex-box';
import { H1, Paragraph } from '@/components/Typography';

export default function Section3() {
  const [activeBenefit, setActiveBenefit] = useState(benefits[0]);

  const handleBenefitChange = (benefit) => {
    setActiveBenefit(benefit); 
  };

  return (
    <Box sx={{ py: { xs: 5, sm: 20 } }}>
      <Container sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <H1 fontSize={{ xs: 20, sm: 40 }} textAlign="center" mb={4} color="#FFF">
          breaking barriers
        </H1>
        <Paragraph sx={{ mb: '2rem', color: '#FFF', fontSize: { xs: 10, sm: 14, md: 16 }, maxWidth:{ xs: '360px', sm: '1000px' }, textAlign:'center', lineHeight:'20px' }}>
          We are a more inclusive platform revolutionizing the way many people shop. Our technology assists everyone regardless of their age, gender, or disability. We believe technology should work for everyone, not just some, that’s why we’re perfecting a whole new approach. Where innovation meets accessibility—so no one is left behind.
        </Paragraph>

        <FlexCol width="100%">
          <FlexBox
            justifyContent="center"
            gap={3}
            width="100%"
            sx={{
              flexDirection: { xs: "column", sm: "row" }, // Column for mobile (xs), row for larger screens
              gap: { xs: 2, sm: 3 }, // Smaller gap for mobile
            }}
          >
            {benefits.slice(0, 3).map((benefit,index) => (
              <Box key={index} sx={styles.textBubble} onMouseEnter={() => handleBenefitChange(benefit)}>
                <H1 color="#FFF" fontSize={12}>
                  {benefit.title}
                </H1>
              </Box>
            ))}
          </FlexBox>
          <FlexBox
            justifyContent="center"
            gap={3}
            width="100%"
            sx={{
              flexDirection: { xs: "column", sm: "row" }, // Same responsive behavior
              gap: { xs: 2, sm: 3 },
              pt: { xs:3 }
            }}
          >
            {benefits.slice(3, 6).map((benefit, index) => (
              <Box key={index} sx={styles.textBubble} onMouseEnter={() => handleBenefitChange(benefit)}>
                <H1 color="#FFF" fontSize={12}>
                  {benefit.title}
                </H1>
              </Box>
            ))}
          </FlexBox>
        </FlexCol>

        <Card sx={styles.cardStyle}>
          <H1 color="#FFF" fontSize={{ xs:20, sm:28 }}>
            {activeBenefit.header}
          </H1>
          <Paragraph color="#FFF" fontSize={{ xs:12, sm:18 }}>
            {activeBenefit.content}
          </Paragraph>
          <Paragraph color="#FFF" fontSize={{ xs:12, sm:18 }}>
            •&nbsp;&nbsp;{activeBenefit.bullet}
          </Paragraph>
        </Card>

      </Container>
    </Box>
  );
}

const benefits = [
  { 
    title: 'personalized ar shopping experience',
    header: 'try before You buy',
    content: 'Shopping online should feel as real and personal as shopping in-store. Symspace transforms e-commerce with AI-powered AR, allowing users to try before they buy—whether it’s clothing, furniture, or home decor—by placing products directly into their environment. Our platform also provides sizing recommendations by cross referencing personal measurements, product details, and customer reviews',
    bullet: '81% of consumers prefer brands that offer personalized shopping experiences'
  },
  { 
    title: 'real-time ar product Sizing',
    header: 'No More guessing, No More returns',
    content: 'Size matters—especially in online shopping. Our real-time AR product sizing eliminates uncertainty by allowing customers to see exact product dimensions in their homes before making a purchase, leading to fewer returns and greater confidence',
    bullet: 'Online returns cost retailers $305 billion annually, with sizing issues as the leading cause'
  },
  { 
    title: 'advanced ar functionality',
    header: 'Next-Level ar: Smarter, faster, More accessible',
    content: "Symspace is setting the standard for AR shopping with true-to-size 3D products, environment scanning, and AI-powered recommendations. Our accessibility-first approach makes online shopping more inclusive, intuitive, and futuristic",
    bullet: '85% of people with disabilities use the internet, yet most accessibility tools lack Augmented Reality'
  },
  { 
    title: 'rewards program incentives',
    header: 'earn rewards for Shopping in ar',
    content: "Symspace turns shopping into a rewarding experience with an engaging rewards system. Users earn points for trying AR products, making purchases, and sharing experiences, which can be leveraged for discounts towards their total orders. Creating a loyalty-driven ecosystem that benefits both brands and consumers",
    bullet: '68% of online shoppers say rewards programs influence their purchasing decisions'
  },
  { 
    title: 'accessibility awareness',
    header: 'ar-Commerce accessible for everyone',
    content: "Underserved communities deserve better shopping experiences. Symspace prioritizes accessibility by ensuring that seniors, persons with disabilities, veterans, and expectant mothers can shop with confidence—no barriers, no limitations",
    bullet: 'The global disability community controls $490 billion in disposable income, yet only a minority of websites and marketplaces prioritize accessibility'
  },
  { 
    title: 'community support + engagement',
    header: 'Community-driven ar Marketplace',
    content: "Symspace isn’t just a platform—it’s a movement for inclusive digital shopping. We partner with organizations advocating for disabilities, aging populations, and maternal health, ensuring our technology serves those who need it most",
    bullet: 'Information Technology & Innovation Foundation highlighted that AR/VR technologies can serve as assistive tools, making physical environments more accessible for individuals with disabilities'
  },
];
