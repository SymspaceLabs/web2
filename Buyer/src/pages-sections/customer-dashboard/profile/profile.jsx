"use client";

// =======================================================
// Profile Page
// =======================================================

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ProfileForm } from "@/components/custom-forms";
import { Card, useMediaQuery, CircularProgress } from "@mui/material";
import { fetchUserById } from "@/services/userService";

import ProfilePicUpload from "./profile-pic-upload";

// =======================================================


const Profile = () => {
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [dob, setDob] = useState(null);

  const downMd = useMediaQuery(theme => theme.breakpoints.down("sm"));
  const cardStyle = {
    borderRadius:'15px',
    width:'100%',
    color:'#fff',
    mt: 3,
    display: "flex",
    flexWrap: "wrap",
    p: "1.5rem",
    alignItems: "flex-start",
    background:'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)',
    justifyContent: "space-between",
    ...(downMd && { 
      alignItems: "start", 
      flexDirection: "column", 
      justifyContent: "flex-start"
    })
  }

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id) {
        try {
          const data = await fetchUserById(user.id);
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setDob(data.dob);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user?.id]);

  if (loading) return <CircularProgress />

  return (
    <Card sx={[cardStyle, {flexDirection:'column'}]}>
      {user && (
        <ProfilePicUpload user={user} />
      )}
      
      {user && (
        <ProfileForm
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={user.email}
          dob={dob}
          setDob={setDob}
        />
      )}
    </Card>
  );
};

export default Profile;
