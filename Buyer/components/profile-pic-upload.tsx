"use client";

import { useState, ChangeEvent } from 'react';
import { Camera } from 'lucide-react';
import Image from 'next/image';

// ==============================================================
// Type Definitions
// ==============================================================
interface User {
  firstName: string;
  avatar?: string;
}

interface ProfilePicUploadProps {
  user: User;
  avatarUrl: string;
  setAvatarUrl: (url: string) => void;
  isEdit?: boolean;
  onFileSelect?: (file: File) => void;
}

// ==============================================================
// ProfilePicUpload Component
// ==============================================================
export default function ProfilePicUpload({
  user,
  avatarUrl,
  setAvatarUrl,
  isEdit = false,
  onFileSelect
}: ProfilePicUploadProps) {
  // State to hold the temporary local URL for the image preview (Data URL)
  const [localAvatarUrl, setLocalAvatarUrl] = useState<string | null>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // 1. Pass the actual File object up to the parent component
      // The parent will store this file object for submission on "Save Changes."
      if (onFileSelect) {
        onFileSelect(file);
      }

      // 2. Local Preview Logic
      const reader = new FileReader();
      
      reader.onloadend = () => {
        // Set state with the Data URL (base64) for immediate preview
        setLocalAvatarUrl(reader.result as string);
      };

      // Read the file as a Data URL
      reader.readAsDataURL(file);
    }
  };

  // The actual URL used for the Avatar: 
  // 1. Prioritize the local preview URL if a file was just selected.
  // 2. Fallback to the initial user avatar from the database.
  const avatarSrc = localAvatarUrl || user?.avatar || '/placeholder-avatar.png';

  // Uploader elements (Camera Icon and Hidden Input)
  const UploaderElements = (
    <>
      <label 
        htmlFor="profile-image"
        className="flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full cursor-pointer -ml-10 hover:bg-gray-400 transition-colors"
      >
        <Camera size={16} />
      </label>

      <input
        type="file"
        id="profile-image"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
    </>
  );

  return (
    <div className="flex items-end">
      <div className="relative h-[60px] w-[60px] sm:h-[100px] sm:w-[100px] rounded-full overflow-hidden bg-gray-200">
        <Image
          alt={user.firstName}
          src={avatarSrc}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-avatar.png';
          }}
        />
      </div>

      {/* Conditional Rendering: Only render the camera icon and uploader logic when isEdit is true */}
      {isEdit && UploaderElements}
    </div>
  );
}