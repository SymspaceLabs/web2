"use client";

import PersonOutlined from "@mui/icons-material/PersonOutlined"; // Local CUSTOM COMPONENT
import UserInfo from "../user-info";
import UserAnalytics from "../user-analytics";
import DashboardHeader from "../../dashboard-header"; // CUSTOM DATA MODEL
import { Box } from "@mui/material";
import Preferences from "../../preferences/preferences";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Measurements from "../../measurements/measurements";

// ============================================================
export default function ProfilePageView() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState(null);

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
            setUserData(data)
          } else {
            console.error("Failed to fetch user data:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    if (user?.id) {
      fetchUserData();
    }
  }, [user?.id]);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/sign-in");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === undefined || user === undefined) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }
  return (
    <Box sx={boxStyle}>
      <DashboardHeader 
        Icon={PersonOutlined} 
        title="My Profile" 
        buttonText="Edit Profile" 
        href={`/profile/edit`}
      />
      <UserAnalytics user={userData} />
      <UserInfo user={userData} />
      <Measurements isEdit={false} />
      <Preferences isEdit={false}  />
    </Box>

  )
}

const boxStyle = { 
  padding:'15px',
  borderRadius:'15px',
  background: 'linear-gradient(176.84deg, #B7B7B9 -3.62%, #777777 109.48%)',
  boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
  backdropFilter: 'blur(12px)',
}