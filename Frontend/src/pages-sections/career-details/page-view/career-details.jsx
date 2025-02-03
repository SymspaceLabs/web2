"use client";

import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import { BlobBox2 } from "./blobBox2";
import { BlobBox } from "./blobBox";
import DialogDrawer from "@/components/header/components/dialog-drawer";
import JobApplicationDialog from "@/components/dialog/JobApplicationDialog";

export default function CareerDetailsPageView({ jobId }) {
  const [job, setJob] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/${jobId}`);
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchJob();
  }, [jobId]);

  const toggleDialog = () => setShowPopup((state) => !state);

  if (!job) return <p>Loading...</p>;

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#1F1F1F",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* CONTENT */}
      <Box sx={{ zIndex: 1, width: "100%" }}>
        <Section1 job={job} toggleDialog={toggleDialog} />
        <Section2 job={job} />
        <Section3 />
      </Box>

      {/* Dialog */}
      {showPopup && (
        <JobApplicationDialog
          open={showPopup}
          onClose={() => setShowPopup(false)}
          job={job}
        />
      )}
    </Box>
  );
}
