"use client";

import { useState, useEffect } from "react";
import Section1 from "./section-1";
import Section2 from "./section-2";
import Section3 from "./section-3";
import JobApplicationDialog from "@/components/custom-dialog/job-application";

interface Job {
  id: string;
  title: string;
  location: string;
  jobType: string;
  experience: string;
  remoteWorkPolicy: string;
  visaSponsorship: string;
  preferredTimezone: string;
  summary: string;
  scope: string;
  qualifications: string;
  benefits: string;
}

export default function CareerDetailsPageView({ jobId }: { jobId: string }) {
  const [job, setJob] = useState<Job | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const toggleDialog = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setDialogOpen((state) => !state);
  };

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1F1F1F]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-[#1F1F1F] flex justify-center">
      <div className="z-[1] w-full">
        <Section1 job={job} toggleDialog={toggleDialog} />
        <Section2 job={job} />
        <Section3 toggleDialog={toggleDialog} />
      </div>

      {dialogOpen && (
        <JobApplicationDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          job={job}
        />
      )}
    </div>
  );
}