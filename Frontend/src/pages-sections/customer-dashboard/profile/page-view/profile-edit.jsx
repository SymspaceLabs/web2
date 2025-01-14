
import Person from "@mui/icons-material/Person";
import DashboardHeader from "../../dashboard-header";
import { Box } from "@mui/material";
import Profile from "../profile";

// ===========================================================
export default function ProfileEditPageView() {
  return (
    <Box sx={boxStyle}>
      <DashboardHeader
        Icon={Person}
        href="/profile"
        title="Edit Profile"
        buttonText="Back to Profile"
      />
      <Profile isEdit={true}  />
    </Box>
  );
}

const boxStyle = { 
  paddingBottom:'15px',
  borderRadius:'15px',
  background: 'linear-gradient(176.84deg, #B7B7B9 -3.62%, #777777 109.48%)',
  boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
  backdropFilter: 'blur(12px)',
}
