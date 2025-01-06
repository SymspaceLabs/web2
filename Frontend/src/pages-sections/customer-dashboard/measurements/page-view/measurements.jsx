"use client";

import PersonOutlined from "@mui/icons-material/PersonOutlined"; // Local CUSTOM COMPONENT
import DashboardHeader from "../../dashboard-header"; // CUSTOM DATA MODEL
import { Box } from "@mui/material";
import Measurements from "../measurements";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// ============================================================
export default function MeasurementPageView() {
  // const { isAuthenticated, user } = useAuth();
  // const router = useRouter();
  // const [userData, setUserData] = useState(null);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (user?.id) {
  //       try {
  //         const response = await fetch(
  //           `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user.id}`,
  //           {
  //             method: "GET",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //           }
  //         );

  //         if (response.ok) {
  //           const data = await response.json();
  //           setUserData(data)
  //         } else {
  //           console.error("Failed to fetch user data:", response.statusText);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //       }
  //     }
  //   };

  //   if (user?.id) {
  //     fetchUserData();
  //   }
  // }, [user?.id]);

  // useEffect(() => {
  //   if (isAuthenticated === false) {
  //     router.push("/signin");
  //   }
  // }, [isAuthenticated, router]);

  // if (isAuthenticated === undefined || user === undefined) {
  //   return <div>Loading...</div>;
  // }

  // if (!userData) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Box sx={boxStyle}>
      <DashboardHeader 
        Icon={PersonOutlined} 
        title="Measurement" 
        buttonText="Edit" 
        href={`/measurements/edit`}
      />
      <Measurements isEdit={false} />
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