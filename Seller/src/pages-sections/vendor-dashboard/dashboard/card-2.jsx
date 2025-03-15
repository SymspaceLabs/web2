import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp"; // GLOBAL CUSTOM COMPONENTS

import { FlexBox } from "../../../components/flex-box";
import { H3, H6, Paragraph } from "../../../components/Typography"; // =========================================================
import { Typography } from "@mui/material";

// =========================================================
const Card2 = ({
  children,
  title,
  amount,
  percentage
}) => {
  return (
    <Card sx={{ height: "100%", background: 'linear-gradient(180deg, rgba(62, 61, 69, 0.48) 0%, rgba(32, 32, 32, 0.64) 100%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '15px' }}>
      <Box sx={{  p: 3, pr: 1, gap: 2, height: "100%", display: "flex", alignItems: "flex-end", justifyContent: "space-between", background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)' }}>
        <Box flexShrink={0} height="inherit">
          <FlexBox flexDirection="column" justifyContent="space-between" height="inherit">
            <Typography color="#fff" sx={{fontFamily:'Elemental End', textTransform:'lowercase'}}>{title}</Typography>

            <div>
              <H3 color="#fff" >{amount}</H3>

              <FlexBox mt={0.3} alignItems="center" color="info.main">
                <ArrowDropUp />
                <Paragraph fontSize={14}>{percentage}</Paragraph>
              </FlexBox>
            </div>
          </FlexBox>
        </Box>
        <Box sx={{ "& > div": { minHeight: "0px !important"}}}>
          {children}
        </Box>
      </Box>
    </Card>
  );
};

export default Card2;