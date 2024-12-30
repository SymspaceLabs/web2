import { format } from "date-fns";
import Card from "@mui/material/Card";
import useMediaQuery from "@mui/material/useMediaQuery"; // GLOBAL CUSTOM COMPONENTS

import FlexBox from "../../../components/flex-box/flex-box";
import { Small, Span } from "../../../components/Typography"; // CUSTOM DATA MODEL
import { Typography } from "@mui/material";

// ==============================================================
export default function UserInfo({ user }) {
  const downMd = useMediaQuery(theme => theme.breakpoints.down("sm"));
  const cardStyle = {
    borderRadius:'15px',
    width:'100%',
    color:'#fff',
    mt: 3,
    display: "flex",
    flexWrap: "wrap",
    p: "0.75rem 1.5rem",
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
      <Typography sx={{ fontFamily:'Elemental End', textTransform:'lowercase', width:'100%', fontSize:'24px'}}>
        Bio
      </Typography>
      <Typography sx={{ width:'100%', fontSize:'12px'}}>
        Tell us about yourself to personalize your experience.
      </Typography>
      <Card sx={[cardStyle, { p:0, background:'none', boxShadow:'none', borderRadius:0, mt: 2, }]}>
        <TableRowItem title="First Name" value={user.firstName} />
        <TableRowItem title="Last Name" value={user.lastName} />
        <TableRowItem title="Email" value={user.email} />
        <TableRowItem title="Phone" value={user.phone} />
        {/* <TableRowItem title="Birth date" value={format(new Date(user.dateOfBirth), "dd MMM, yyyy")} /> */}
      </Card>
    </Card>
    
  );
}

function TableRowItem({ title, value }) {
  return (
    <FlexBox flexDirection="column" p={0}>
      <Small color="white" mb={0.5}>{title}</Small>
      <Span>{value}</Span>
    </FlexBox>
  );
}