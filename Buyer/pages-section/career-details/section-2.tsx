"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Job {
  summary: string;
  scope: string;
  qualifications: string;
  benefits: string;
}

export default function Section2({ job }: { job: Job }) {
  return (
    <div className="w-full flex flex-col items-center px-4 sm:px-6 lg:px-8 py-9">
      <div className="w-full max-w-7xl flex flex-col gap-10">
        <ContentBox title="Job Summary" content={job.summary} />
        <ContentBox title="What You Will Do" content={job.scope} />
        <ContentBox title="Preferred Qualifications" content={job.qualifications} />
        <ContentBox title="Perks" content={job.benefits} />
      </div>
    </div>
  );
}

const ContentBox = ({ title, content }: { title: string; content: string }) => {
  const formattedContent = content.replace(/\\n/g, "\n");

  return (
    <div className="w-full">
      <h2 className="font-elemental lowercase text-[25px] sm:text-[35px] text-white">{title}</h2>
      <hr className="border-white/20 my-3" />
      <div
        className={[
          "mt-3 text-white font-helvetica text-[14px] sm:text-[22px]",
          "[&_ul]:ml-6 [&_li]:list-disc",
          "[&_ol]:ml-6 [&_ol_li]:list-decimal",
          "[&_p]:mb-3 [&_strong]:font-semibold",
        ].join(" ")}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{formattedContent}</ReactMarkdown>
      </div>
    </div>
  );
};