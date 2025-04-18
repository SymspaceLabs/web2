import { Box, Container, Button, Typography } from '@mui/material';
import { FlexBox, FlexCol, FlexColCenter } from '@/components/flex-box';
import { H1 } from '@/components/Typography';
import { styles } from '../page-view/styles';

export default function Section3({toggleDialog}) {
  return (
    <Container sx={{ py:5 }}>
      <Box sx={cardStyle}>
        <FlexBox sx={{ flexDirection:{xs:'column', sm:'row'}, justifyContent:'space-between', gap:2 }}>
          <FlexCol gap={2}>
            <H1 fontSize={{xs:30, sm:40}} color="#FFF">
              how to apply
            </H1>
            <Typography fontFamily='Helvetica' sx={{ fontSize: {xs:18,sm:24}, maxWidth:'850px' }} color="#fff" >
              Attach your resume and cover letter detailing your relevant experience and why you are interested in joining SYMSPACE
            </Typography>
          </FlexCol>
          <FlexColCenter>
              <Button sx={styles.btn2} onClick={toggleDialog}>
                Apply
              </Button>
          </FlexColCenter>
        </FlexBox>
      </Box>
    </Container>
  );
}

const cardStyle = {
  py:{xs:2, sm:5},
  px:{xs:3, sm:8},
  background: 'rgba(255, 255, 255, 0.35)',
  boxShadow: `inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4),
              inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5),
              inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24),
              inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24),
              inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)`,
  backdropFilter: 'blur(10.0285px)',
  borderRadius: "40px",
};