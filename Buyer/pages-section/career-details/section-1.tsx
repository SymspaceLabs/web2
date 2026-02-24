"use client";

import Link from "next/link";

interface Job {
  id: string;
  title: string;
  location: string;
  jobType: string;
  experience: string;
  remoteWorkPolicy: string;
  visaSponsorship: string;
  preferredTimezone: string;
}

interface Section1Props {
  job: Job;
  toggleDialog: () => void;
}

export default function Section1({ job, toggleDialog }: Section1Props) {
  return (
    <div className="w-full flex flex-col items-center py-10 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
          <Link
            href="/careers"
            className="font-helvetica font-semibold text-[#3084FF] hover:text-[#5aa0ff] transition-colors"
          >
            Careers
          </Link>
          <span className="text-white/40">›</span>
          <span className="font-helvetica font-semibold text-white">{job.location}</span>
        </nav>

        {/* Title + Apply */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 py-5">
          <h1 className="font-elemental lowercase text-[25px] sm:text-[50px] text-white leading-tight">
            {job.title}
          </h1>
          <button
            onClick={toggleDialog}
            className="font-elemental lowercase self-start sm:self-auto text-white text-[16px] sm:text-[20px] px-10 py-2.5 rounded-[25px] cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)",
            }}
          >
            Apply
          </button>
        </div>

        <hr className="border-white/20" />

        {/* Job Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-6">
          <JobCard title="location" value={job.location} />
          <JobCard title="job type" value={job.jobType} />
          <JobCard title="experience" value={job.experience} />
          <JobCard title="remote work policy" value={job.remoteWorkPolicy} />
          <JobCard title="visa sponsorship" value={job.visaSponsorship} />
          <JobCard title="preferred timezone" value={job.preferredTimezone} />
        </div>
      </div>
    </div>
  );
}

const JobCard = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-white rounded-[20px] px-7 py-5 flex flex-col justify-between">
    <h2 className="font-elemental text-[20px] text-black py-1">{title}</h2>
    <hr className="border-black" />
    <p className="font-helvetica text-black text-[20px] font-normal py-3">{value}</p>
  </div>
);