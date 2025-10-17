// ==============================================================
//   User Analytics
// ==============================================================

import { currency } from "@/lib"; // CUSTOM DATA MODEL
import { FlexBetween, FlexBox, FlexCol } from "@/components/flex-box";
import { Box, Card, Avatar, Typography, Button } from "@mui/material";
import { H1, H3, Paragraph, Small } from "@/components/Typography";
import { useFavorites } from "@/contexts/FavoritesContext";
import ProfilePicUpload from "./profile-pic-upload";

// ==============================================================
export default function UserAnalytics({
  user,
  avatarUrl,
  setAvatarUrl,
  isEdit=false,
  onFileSelect
}) {

  const { state: favState } = useFavorites();
  
  const INFO_LIST = [{
    title: user?.totalOrders !== undefined ? user.totalOrders.toString() : "0", // Use dynamic totalOrders
    subtitle: "All Orders"
  }, {
    title: favState.favorites.length.toString() ,
    subtitle: "Favorites"
  }, {
    title: "0",
    subtitle: "Referrals"
  }
  ];
  return (
    <FlexCol sx={styles.outerCard}>
      <Box sx={styles.innerCard}>
        {/* Replaced Grid container with FlexBox for the main layout */}
        <FlexBox flexWrap="wrap" gap={1}>
          <Box sx={{ width: { xs: '100%', md: 'calc(50% - 12px)' } }}>
            <Card sx={styles.glassCard1}>
              
              <ProfilePicUpload
                user={user}
                avatarUrl={avatarUrl}
                setAvatarUrl={setAvatarUrl}
                isEdit={isEdit}
                onFileSelect={onFileSelect}
              />
              
              <FlexBetween flexWrap="wrap" flex={1}>
                <div>
                  <H1
                    fontSize={{ xs: '14px', sm: '24px' }} // Smaller on mobile
                    sx={{
                      whiteSpace: 'nowrap',   // Ensure text stays on one line
                      overflow: 'hidden',      // Hide overflowing content
                      textOverflow: 'ellipsis' // Add ellipsis for truncated text
                    }}
                  >
                    {`${user.firstName} ${user.lastName}`}
                  </H1>
                  <H1 fontSize={{ xs: '10px', sm: '12px' }}> {/* Smaller on mobile */}
                    SYMSPACE
                  </H1>

                  <FlexBox alignItems="center" gap={1}>
                    <Paragraph color="#fff" fontSize={{ xs: '10px', sm: 'inherit' }}> {/* Smaller on mobile */}
                      SYMS
                    </Paragraph>
                    <Paragraph color="primary.main" fontSize={{ xs: '10px', sm: 'inherit' }}> {/* Smaller on mobile */}
                      {currency(500)}
                    </Paragraph>
                  </FlexBox>
                </div>
              </FlexBetween>

              {/* Edit Profile Button - now in the same row, visible only on mobile */}
              <Box sx={{
                display: { xs: 'block', md: 'none' }, // Show on xs, hide on md and up
                ml: 'auto', // Push to the right
                alignSelf: 'center', // Vertically align with other items in the Card
              }}>
                <Button sx={styles.btn} onClick={()=>router.push('/profile/edit')}>
                  Edit Profile
                </Button>
              </Box>
            </Card>
          </Box>
          {/* Hide This On Mobile Only - Replaced Grid item container with FlexBox */}
          <FlexBox flexWrap="wrap" gap={1} sx={{ display: { xs: 'none', md: 'flex' }, width: { xs: '100%', md: 'calc(50% - 12px)' } }}>
            {INFO_LIST.map(item =>
              <Box sx={{ flexBasis: 'calc(33.33% - 5.33px)', maxWidth: 'calc(33.33% - 5.33px)', flexGrow: 1 }} key={item.subtitle}>
                <Card
                  sx={styles.card}
                >
                  <H3 color="white" my={0} fontWeight={600} fontSize={{ xs: '18px', sm: 'inherit' }}> {/* Smaller on mobile */}
                    {item.title}
                  </H3>
                  <Small color="white" textAlign="center" fontSize={{ xs: '10px', sm: 'inherit' }}> {/* Smaller on mobile */}
                    {item.subtitle}
                  </Small>
                </Card>
              </Box>
            )}
          </FlexBox>
        </FlexBox>
      </Box>

      {/* Show This On Mobile Only - Replaced Grid container with FlexBox */}
      <FlexBox flexWrap="wrap" gap={1} sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}>
        {INFO_LIST.map(item =>
          <Box sx={{ flexBasis: 'calc(33.33% - 5.33px)', maxWidth: 'calc(33.33% - 5.33px)', flexGrow: 1 }} key={item.subtitle}>
            <Card sx={styles.glassCard2}>
              <H3 color="white" my={0} fontWeight={600} fontSize={{ xs: '18px', sm: 'inherit' }}> {/* Smaller on mobile */}
                {item.title}
              </H3>
              <Small color="white" textAlign="center" fontSize={{ xs: '10px', sm: 'inherit' }}> {/* Smaller on mobile */}
                {item.subtitle}
              </Small>
            </Card>
          </Box>
        )}
      </FlexBox>
    </FlexCol>
  );
}

const styles = {
  outerCard: {
    p: {xs:"1rem", sm:"1rem 1.5rem"},
    borderRadius: '0 0 15px 15px',
    background:'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)',
    gap:'20px'
  },
  innerCard: {
    p: {xs:0, sm:"1rem 1.5rem"},
    borderRadius: '15px',
    background:'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)'
  },
  card: {
    height: "100%",
    display: "flex",
    p: "1rem 1.25rem",
    alignItems: "center",
    justifyContent: "center", // Centers content vertically
    flexDirection: "column",
    background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)'
  },
  glassCard1 : {
    gap: 1,
    height: "100%",
    display: "flex",
    p: {xs:"1rem", sm:"1rem 1rem"},
    alignItems: "center",
    background:'transparent',
    boxShadow:'none',
    color:'#FFF',
    display:'flex',
    alignItems: 'center'
  },
  glassCard2 : {
    height: "100%",
    display: "flex",
    p: "1rem 1.25rem",
    alignItems: "center",
    justifyContent: "center", // Centers content vertically
    flexDirection: "column",
    background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)'
  },
  btn : {
    fontSize: 10,
    background: "linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)",
    color: "#FFF",
    px: 1,
    border: "3px solid #FFF",
    borderRadius: "12px",
    "&:hover": {
      background: "linear-gradient(94.44deg, #666666 29%, #000000 100%)",
    },
  }
}
