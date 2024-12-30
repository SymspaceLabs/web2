import LazyImage from "../../../components/LazyImage"; // STYLED COMPONENTS
import { RootStyle, StyledButton } from "./styles"; // IMPORT IMAGE
import { Box, Container, Typography, Button } from '@mui/material';

import shirt from "../../../../public/assets/images/background/banner-img.png";
export default function Section6() {
  return <Container>
      <RootStyle>
        <div className="content">
        
          <h2>
            Augment Products whenever.<br />  From wherever.  
          </h2>
          <Typography sx={{ fontFamily:'Helvetica', fontSize: 16, marginBottom: "1rem", }}>
            Sign up today.
          </Typography>


          <Button variant="contained" color="primary" sx={{  gap:2, color:'#fff', borderRadius:'50px', py:2, px:2, background:'linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)' }}>
            <Typography sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', fontSize: 12 }}>
              Beta Access
            </Typography>
            <Box sx={{ width: '35px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
              <LazyImage alt="furniture shop" width={25} height={25} src="/assets/images/sparkler.png" />
            </Box>
          </Button>
        </div>

        <div className="img-wrapper">
          <LazyImage src={shirt} alt="Watch" />
        </div>
      </RootStyle>
    </Container>;
}