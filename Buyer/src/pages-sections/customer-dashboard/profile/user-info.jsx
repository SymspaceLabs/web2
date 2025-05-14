import Card from "@mui/material/Card";
import useMediaQuery from "@mui/material/useMediaQuery"; // GLOBAL CUSTOM COMPONENTS
import { Typography } from "@mui/material";
import { ProfileForm } from "@/components/custom-forms";
import { H1 } from "@/components/Typography";

// ==============================================================
export default function UserInfo({ user, isEdit = true }) {
  
  const downMd = useMediaQuery(theme => theme.breakpoints.down("sm"));
  const cardStyle = {
    borderRadius:'15px',
    width:'100%',
    color:'#fff',
    display: "flex",
    flexWrap: "wrap",
    p: "1.5rem",
    alignItems: "center",
    background:'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)',
    justifyContent: "space-between",
    ...(downMd && { 
      alignItems: "start", 
      flexDirection: "column", 
      justifyContent: "flex-start"
    })
  }
  return (
    <Card sx={[cardStyle, {flexDirection:'column'}]}>
      <H1 width='100%' fontSize='24px'>
        Bio
      </H1>
      <Typography sx={{ width:'100%', fontSize:'12px'}}>
        Tell us about yourself to personalize your experience.
      </Typography>

      {/* FORM */}
      <ProfileForm
        user={user}
        firstName={user.firstName}
        lastName={user.lastName}
        email={user.email}
        dob={user.dob}
        isEdit={false}
      />
    </Card>
    
  );
}