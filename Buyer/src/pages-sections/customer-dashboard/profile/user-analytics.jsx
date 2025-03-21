
import { FlexBetween, FlexBox } from "../../../components/flex-box";
import { H1, H3, H5, Paragraph, Small } from "../../../components/Typography"; // CUSTOM UTILS LIBRARY FUNCTION

import { currency } from "../../../lib"; // CUSTOM DATA MODEL
import { Box, Card, Grid, Avatar, Typography } from "@mui/material";

// ==============================================================
export default function UserAnalytics({
  user
}) {
  const INFO_LIST = [{
    title: "16",
    subtitle: "All Orders"
  }, {
    title: "16",
    subtitle: "Wishlist"
  }, {
    title: "1",
    subtitle: "Referrals"
  },
  //  {
  //   title: "01",
  //   subtitle: "Awaiting Delivery"
  // }
  ];
  return (
    <Box sx={{ p: "1rem 1.5rem", borderRadius: '0 0 15px 15px', background:'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)' }}>
      <Box  sx={{ p: "1rem 1.5rem", borderRadius: '15px', background:'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)' }}>
        <Grid container spacing={3} >
          <Grid item md={6} xs={12}>
            <Card sx={{ gap: 2, height: "100%", display: "flex", p: "1rem 1.5rem", alignItems: "center", background:'transparent', color:'#fff', boxShadow:'none' }}>
              <Avatar alt={user.firstName} src={user.avatar} sx={{ height: 100, width: 100 }} />
              <FlexBetween flexWrap="wrap" flex={1}>
                <div>
                  <H1 fontSize='24px'>
                    {`${user.firstName} ${user.lastName}`}
                  </H1>
                  <H1 fontSize='12px'>
                    SYMSPACE points earned
                  </H1>

                  <FlexBox alignItems="center" gap={1}>
                    <Paragraph color="#fff">SYMPS</Paragraph>
                    <Paragraph color="primary.main">{currency(500)}</Paragraph>
                  </FlexBox>
                </div>
              </FlexBetween>
            </Card>
          </Grid>
          <Grid item container spacing={4} md={6} xs={12}>
            {INFO_LIST.map(item => <Grid item lg={4} sm={6} xs={6} key={item.subtitle}>
              <Card 
                sx={{ 
                  height: "100%", 
                  display: "flex", 
                  p: "1rem 1.25rem", 
                  alignItems: "center", 
                  justifyContent: "center", // Centers content vertically
                  flexDirection: "column", 
                  background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)' 
                }}
              >
                <H3 color="white" my={0} fontWeight={600}>
                  {item.title}
                </H3>
                <Small color="white" textAlign="center">
                  {item.subtitle}
                </Small>
              </Card>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>

    </Box>
  );
}