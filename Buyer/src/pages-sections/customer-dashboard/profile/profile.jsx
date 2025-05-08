"use client";

// =======================================================
// Profile Page
// =======================================================

import { useEffect, useState } from "react";
import { FlexBox } from "@/components/flex-box";
import { useAuth } from "@/contexts/AuthContext";
import { ProfileForm } from "@/components/forms";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { Card, Button, useMediaQuery, CircularProgress } from "@mui/material";

import axios from "axios";
import ProfilePicUpload from "./profile-pic-upload";

const Profile = ({ isEdit = true }) => {
  const { user } = useAuth();
  const { showSnackbar } = useSnackbar();
  
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [dob, setDob] = useState();

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
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setDob(data.dob);
          } else {
            console.error("Failed to fetch user data:", response.statusText);
          }
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

  const handleSaveChanges = async () => {
    const requestBody = {
      firstName: firstName,
      lastName: lastName,
      dob: dob,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user.id}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      showSnackbar(data.message, "success");
    } catch (error) {
      console.error("Error updating profile:", error.message);

      showSnackbar(
        error.response?.data?.message || "Failed to update user information",
        "error"
      );
    }
  };

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

      {/* {isEdit && (
        <FlexBox justifyContent="flex-end" gap={3} sx={{ width: "100%" }}>
          <Button
            onClick={() => router.push("/measurements")}
            variant="contained"
            color="primary"
            sx={{ marginTop: "20px", p: "10px" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveChanges}
            variant="contained"
            color="primary"
            sx={{ marginTop: "20px", p: "10px" }}
          >
            Save changes
          </Button>
        </FlexBox>
      )} */}
    </Card>
  );
};

export default Profile;
