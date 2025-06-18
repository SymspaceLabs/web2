"use client";

// ============================================================
// Measurements Edit
// used in profile page 
// ============================================================

import { useEffect, useState } from "react";

import { Box, useMediaQuery } from "@mui/material";
// import Measurements from "../measurements";
// import DashboardHeader from "../../dashboard-header"; // CUSTOM DATA MODEL
import PersonOutlined from "@mui/icons-material/PersonOutlined"; // Local CUSTOM COMPONENT
import { SymDashboardHeader } from "@/components/custom-components";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { MeasurementForm } from "@/components/custom-forms";
import { useSnackbar } from "@/contexts/SnackbarContext";

// ============================================================

export default function MeasurementEditPageView({
  isEdit
}) {

    const isMobile = useMediaQuery('(max-width:600px)');
    const router = useRouter();

    const { user, isAuthenticated } = useAuth();
    const { showSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(false); // Spinner control
    const [isMetric, setIsMetric] = useState(true);
    const [height, setHeight] = useState(
      {
        feet: 0,
        inches: 0,
        cm: 0,
      }
    );
    const [weight, setWeight] = useState(
      {
        lbs: 0,
        kg: Math.round((0) / 2.20462),
      }
    );
    const [chest, setChest] = useState();
    const [waist, setWaist] = useState();
    
    const handleSave = async () => {
      const requestBody = {
        height: height.cm,
        weight: weight.kg,
        chest: chest,
        waist: waist,
        isMetric: isMetric,
      };

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/measurements/user/${user.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        const responseBody = await response.json();

        showSnackbar(responseBody.message, "success");
        router.push('/measurements'); // After successful login

      } catch (error) {
        console.error("Error saving changes:", error);
      }
    };
      
    useEffect(() => {
      // Fetch height and weight data
      const fetchMeasurements = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/measurements/user/${user.id}`);
          const data = await response.json();

          setHeight({
            cm: data.height,
            feet: Math.floor(data.height / 30.48),
            inches: Math.round((data.height % 30.48) / 2.54),
          });
          setWeight({
            kg: data.weight,
            lbs: Math.round(data.weight * 2.20462),
          });
          setIsMetric(data?.isMetric);
          setChest(data.chest);
          setWaist(data.waist);
        } catch (error) {
          console.error("Error fetching measurements:", error);
        }
      };

      if (isAuthenticated) fetchMeasurements();
    }, [isAuthenticated]);

  return (
    <Box sx={styles.box}>
      <SymDashboardHeader
        title={isEdit ? "Edit Measurement" : "Measurement"}
        Icon={PersonOutlined}
        buttonText={isEdit? "Save Changes" : "Edit"}
        onClick={isEdit? handleSave : ()=>router.push('/measurements/edit')}
        loading={loading}
      />
      <Box p="15px">
        <MeasurementForm
          setIsMetric={setIsMetric} 
          isMetric={isMetric}
          height={height}
          setHeight={setHeight}
          weight={weight}
          setWeight={setWeight}
          chest={chest}
          setChest={setChest}
          waist={waist}
          setWaist={setWaist}
          isMobile={isMobile}
          isEdit={true}
        />
      </Box>
    </Box>
  )
}

const styles = {
  box: { 
    paddingBottom:'15px',
    borderRadius:'15px',
    background: 'linear-gradient(176.84deg, #B7B7B9 -3.62%, #777777 109.48%)',
    boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
    backdropFilter: 'blur(12px)',
  }
}