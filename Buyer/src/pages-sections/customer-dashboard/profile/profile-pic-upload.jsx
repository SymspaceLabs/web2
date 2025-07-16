// ===============================================
// Profile Pic Uploader
// ===============================================

import { FlexBox } from "@/components/flex-box";
import { Box, Avatar, IconButton } from "@mui/material";
import CameraEnhance from "@mui/icons-material/CameraEnhance";

// ===============================================

export default function ProfilePicUpload({user}) {
  return (
    <FlexBox alignItems="flex-end" mb={3}>
      <Avatar
        alt="user"
        src={user?.avatar}
        sx={{
          height: { xs: 48, sm: 64 }, // Smaller on extra-small (mobile), default on small and up
          width: { xs: 48, sm: 64 }   // Smaller on extra-small (mobile), default on small and up
        }}
      />

      <IconButton
        size="small"
        component="label"
        color="secondary"
        htmlFor="profile-image"
        sx={{ bgcolor: "grey.300", ml: -2.5 }}
      >
        <CameraEnhance fontSize="small" />
      </IconButton>

      <Box
        type="file"
        display="none"
        accept="image/*"
        component="input"
        id="profile-image"
        onChange={e => console.log(e.target.files)}
      />
    </FlexBox>
  );
}
