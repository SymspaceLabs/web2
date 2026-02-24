// =================================================================
// Custom File Uploader - Tailwind + TypeScript version
// =================================================================

"use client";

import { useRef, useState } from "react";
import { CloudUpload, Trash2 } from "lucide-react";

interface SymFileUploaderProps {
  title: string;
  uploadedFile: File[];
  setUploadedFile: (files: File[] | ((prev: File[]) => File[])) => void;
  multiple?: boolean;
}

const SymFileUploader = ({
  title,
  uploadedFile,
  setUploadedFile,
  multiple = false,
}: SymFileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files ?? []);
    setUploadedFile((prev) =>
      Array.isArray(prev) ? [...prev, ...newFiles] : [...newFiles]
    );
    // Reset input so the same file can be re-uploaded if removed
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFile((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(event.dataTransfer.files);
    setUploadedFile((prev) =>
      Array.isArray(prev) ? [...prev, ...droppedFiles] : [...droppedFiles]
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-elemental text-white text-sm mb-0.5">{title}</label>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx"
        multiple={multiple}
      />

      {/* Drop zone */}
      <div
        onClick={handleUploadClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={[
          "flex items-center justify-center gap-2 w-full p-4 rounded-[5px] cursor-pointer",
          "transition-all duration-300 ease-in-out",
          isDragging
            ? "bg-[#222] border-2 border-dashed border-white"
            : "bg-black border-2 border-transparent hover:bg-[#111]",
        ].join(" ")}
      >
        <CloudUpload className="text-white w-[22px] h-[22px]" />
        <span className="font-elemental text-white text-sm">
          {isDragging ? "Drop files here" : "Upload files"}
        </span>
      </div>

      {/* File list */}
      {uploadedFile.length > 0 && (
        <div className="flex flex-col gap-2 mt-1">
          {uploadedFile.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-full px-3 py-2 rounded-[8px] border border-white"
              style={{
                background:
                  "linear-gradient(180deg, rgba(62, 61, 69, 0.48) 0%, rgba(32, 32, 32, 0.64) 100%)",
                boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <span className="text-white font-helvetica text-[14px] truncate pr-2">
                {file.name}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(index);
                }}
                className="text-white hover:text-red-400 transition-colors cursor-pointer flex-shrink-0"
                aria-label={`Remove ${file.name}`}
              >
                <Trash2 className="w-[18px] h-[18px]" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SymFileUploader;