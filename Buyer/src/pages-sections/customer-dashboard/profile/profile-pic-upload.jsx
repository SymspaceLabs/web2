// ===============================================
// Profile Pic Uploader
// ===============================================

import { useState } from 'react';
import { FlexBox } from "@/components/flex-box";
import { Box, Avatar, IconButton } from "@mui/material";
import CameraEnhance from "@mui/icons-material/CameraEnhance";

// ===============================================

export default function ProfilePicUpload({
  user,
  // Note: avatarUrl and setAvatarUrl are managed by the parent, 
  // but are not strictly used directly within this component for display logic, 
  // as user?.avatar holds the initial URL and localAvatarUrl holds the preview.
  avatarUrl, 
  setAvatarUrl, 
  isEdit = false,
  onFileSelect // Function provided by parent to receive the selected File object
}) {
  // State to hold the temporary local URL for the image preview (Data URL)
  const [localAvatarUrl, setLocalAvatarUrl] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      // 1. Pass the actual File object up to the parent component
      // The parent will store this file object for submission on "Save Changes."
      if (onFileSelect) {
        onFileSelect(file);
      }

      // 2. Local Preview Logic
      const reader = new FileReader();
      
      reader.onloadend = () => {
        // Set state with the Data URL (base64) for immediate preview
        setLocalAvatarUrl(reader.result);
      };

      // Read the file as a Data URL
      reader.readAsDataURL(file);
    }
  };

  // The actual URL used for the Avatar: 
  // 1. Prioritize the local preview URL if a file was just selected.
  // 2. Fallback to the initial user avatar from the database.
  const avatarSrc = localAvatarUrl || user?.avatar;

  // Uploader elements (Camera Icon and Hidden Input)
  const UploaderElements = (
    <>
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
        // Update the onChange handler
        onChange={handleImageUpload}
      />
    </>
  );

  return (
    <FlexBox alignItems="flex-end">
      <Avatar
        alt={user.firstName}
        // Use the state-controlled avatarSrc for display
        src={avatarSrc} 
        sx={{
          height: { xs: 60, sm: 100 },
          width: { xs: 60, sm: 100 }
        }}
      />

      {/* Conditional Rendering: Only render the camera icon and uploader logic when isEdit is true */}
      {isEdit && UploaderElements}
      
    </FlexBox>
  );
}