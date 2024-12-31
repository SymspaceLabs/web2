"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ProfilePageView } from "../../../../pages-sections/customer-dashboard/profile/page-view";

export default function Profile() {
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
      router.push("/signin");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === undefined || user === undefined) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return <ProfilePageView user={userData} />;
}
