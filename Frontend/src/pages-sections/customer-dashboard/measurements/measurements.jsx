"use client";

import React, { useState, useEffect } from "react";
import { Card, Button, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";

import FlexBox from "../../../components/flex-box/flex-box";
import { MeasurementForm } from "@/components/forms";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";

// ==============================================================
export default function Measurements({ isEdit = true }) {
  const { isAuthenticated, user } = useAuth();
  const isMobile = useMediaQuery('(max-width:600px)');
  const router = useRouter(); // Initialize router

  const downMd = useMediaQuery(theme => theme.breakpoints.down("sm"));
  const cardStyle = {
    borderRadius:'15px',
    width:'100%',
    color:'#fff',
    mt: 3,
    display: "flex",
    flexWrap: "wrap",
    p: "0.75rem 1.5rem",
    alignItems: "center",
    background:'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)',
    justifyContent: "space-between",
    ...(downMd && { 
      alignItems: "start", 
      flexDirection: "column", 
      justifyContent: "flex-start"
    })
  }
  
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


  const handleSaveChanges = async () => {
    const requestBody = {
      height: height.cm,
      weight: weight.kg,
      chest: chest,
      waist: waist,
      isMetric: isMetric,
    };
  
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/measurements/user/${user.id}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Assuming the token is stored in the user object
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Save successful:", response.data);
      // Optionally show a success message using a Snackbar or any other UI feedback
    } catch (error) {
      console.error("Error saving changes:", error.response?.data || error.message);
      // Optionally show an error message
    }
  };
  
  useEffect(() => {
    // Fetch height and weight data
    const fetchMeasurements = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/measurements/user/${user.id}`);
        const { data } = response;

        setHeight({
          cm: data.height,
          feet: Math.floor(data.height / 30.48),
          inches: Math.round((data.height % 30.48) / 2.54),
        });
        setWeight({
          kg: data.weight,
          lbs: Math.round(data.weight * 2.20462),
        });
        setIsMetric(data.isMetric);
        setChest(data.chest);
        setWaist(data.waist);
      } catch (error) {
        console.error("Error fetching measurements:", error);
      }
    };

    if (isAuthenticated) fetchMeasurements();
  }, [isAuthenticated]);

  return (
    <Card sx={[cardStyle, {flexDirection:'column'}]}>
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
        isEdit={isEdit}
      />
      {isEdit && (
        <FlexBox justifyContent="flex-end" gap={3} sx={{width:'100%'}}>
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
      )}
    </Card>
  );
}