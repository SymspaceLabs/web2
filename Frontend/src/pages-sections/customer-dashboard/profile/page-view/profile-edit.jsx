"use client";

import { Fragment, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Person from "@mui/icons-material/Person";
import ProfileEditForm from "../edit-form";
import ProfilePicUpload from "../profile-pic-upload";
import DashboardHeader from "../../dashboard-header";
import { useAuth } from "../../../../contexts/AuthContext";

// ===========================================================
export default function ProfileEditPageView() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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
            setUserData(data);
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

  if (loading) return <div>Loading...</div>;

  return (
    <Fragment>
      <DashboardHeader
        Icon={Person}
        href="/profile"
        title="Edit Profile"
        buttonText="Back to Profile"
      />
      <Card sx={{ p: 3 }}>
        {userData && <ProfilePicUpload user={userData} /> }
        {userData && <ProfileEditForm user={userData} /> }
      </Card>
    </Fragment>
  );
}
