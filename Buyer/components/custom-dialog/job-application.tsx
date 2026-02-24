"use client";

// =========================================================
// Job Application Dialog - Tailwind + shadcn version
// =========================================================

import { toast } from "sonner";
import { X } from "lucide-react";
import JobForm from "../forms/job";
import { uploadFile } from "@/api/upload";
import { useState, useEffect } from "react";
import LogoWithTitle from "../logo-with-title";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

// =========================================================

interface Job {
  id: string;
  title: string;
}

interface JobApplicationDialogProps {
  open: boolean;
  onClose: () => void;
  job: Job;
}

const JobApplicationDialog = ({ open, onClose, job }: JobApplicationDialogProps) => {
  const { isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [role, setRole] = useState(job.title);
  const [comments, setComments] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File[]>([]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(
      Boolean(firstName && lastName && email && linkedInUrl && role)
    );
  }, [firstName, lastName, email, linkedInUrl, role]);

  const handleSubmit = async () => {
    if (!uploadedFile || uploadedFile.length === 0) {
      toast.error("Error", {
        description: "Please upload at least one resume before submitting.",
    })
      return;
    }

    setLoading(true);

    try {
      const uploadPromises = uploadedFile.map((file) => uploadFile(file));
      const uploadResults = await Promise.all(uploadPromises);
      const resumeUrls = uploadResults.map((result) => result.imageUrl);

      const requestBody = {
        email,
        firstName,
        lastName,
        linkedInUrl,
        role,
        jobId: job.id,
        resumeUrls,
      };

      const applicationResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/job-applications`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      if (!applicationResponse.ok) {
        throw new Error("Failed to submit job application.");
      }

      toast.success("Success", {
        description: "Application submitted successfully!",
      })

      onClose();
    } catch (error: any) {
        toast.error("Error", {
            description: "An error occurred during submission.",
        })
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <DialogContent
        className="max-w-[650px] w-full p-0 border-0 rounded-[40px] overflow-hidden"
        style={{
          background: "rgba(63, 103, 166, 0.8)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow:
            "0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)",
        }}
        // Hide the default shadcn close button so we can render our own
        showCloseButton={false}
      >
        {/* Header */}
        <DialogHeader className="relative px-6 pt-6 pb-0">
          <LogoWithTitle
            title="Get started"
            subTitle="Fill out the form and attach your resume so we can contact you. At Symspace, you can be sure about making positive change."
          />
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-6 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        {/* Body */}
        <div className="px-3 sm:px-9 py-4 bg-transparent overflow-y-auto max-h-[65vh]">
          <JobForm
            email={email}
            setEmail={setEmail}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            password={password}
            setPassword={setPassword}
            repeatPassword={repeatPassword}
            setRepeatPassword={setRepeatPassword}
            linkedInUrl={linkedInUrl}
            setLinkedInUrl={setLinkedInUrl}
            role={role}
            setRole={setRole}
            comments={comments}
            setComments={setComments}
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
            isAuthenticated={isAuthenticated}
          />
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-[35px] py-4 sm:py-[35px]">
          <Button
            onClick={handleSubmit}
            disabled={loading || !isValid}
            className={[
              "w-full h-12 rounded-[12px] text-white text-base font-elemental lowercase",
              "transition-all duration-200",
              isValid && !loading
                ? "cursor-pointer hover:opacity-90"
                : "cursor-not-allowed opacity-60",
            ].join(" ")}
            style={{
              background: isValid
                ? "linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)"
                : "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(3,102,254,0.1) 100%)",
              boxShadow:
                "0px 8px 6px rgba(0,0,0,0.05), inset 2px 3px 3px -3px rgba(255,255,255,0.6), inset 0px -1px 1px rgba(255,255,255,0.25), inset 0px 1px 1px rgba(255,255,255,0.25)",
              backdropFilter: "blur(50px)",
            }}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationDialog;