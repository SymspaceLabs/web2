"use client";

import { currency } from "@/lib";
import { useRouter } from "next/navigation";
import ProfilePicUpload from "./profile-pic-upload";
import { useFavorites } from "@/contexts/FavoritesContext";

// ==============================================================
// Type Definitions
// ==============================================================
interface UserData {
  firstName: string;
  lastName: string;
  totalOrders?: number;
  avatar?: string;
}

interface InfoItem {
  title: string;
  subtitle: string;
}

interface UserAnalyticsProps {
  user: UserData;
  avatarUrl: string;
  setAvatarUrl: (url: string) => void;
  isEdit?: boolean;
  onFileSelect: (file: File) => void;
}

// ==============================================================
// UserAnalytics Component
// ==============================================================
export default function UserAnalytics({
  user,
  avatarUrl,
  setAvatarUrl,
  isEdit = false,
  onFileSelect
}: UserAnalyticsProps) {
  const router = useRouter();
  const { state: favState } = useFavorites();
  
  const INFO_LIST: InfoItem[] = [{
    title: user?.totalOrders !== undefined ? user.totalOrders.toString() : "0",
    subtitle: "All Orders"
  }, {
    title: favState?.favoriteIds?.length.toString() || "0",
    subtitle: "Favorites"
  }, {
    title: "0",
    subtitle: "Referrals"
  }];

  return (
    <div className="flex flex-col p-4 sm:p-6 rounded-b-2xl bg-gradient-to-br from-white/50 via-[#ebebeb5e] to-[#c4c4c41a] gap-5">
      <div className="p-0 sm:p-6 rounded-2xl bg-gradient-to-br from-white/50 via-[#ebebeb5e] to-[#c4c4c41a]">
        <div className="flex flex-wrap gap-1">
          {/* Profile Card */}
          <div className="w-full md:w-[calc(50%-12px)]">
            <div className="h-full flex p-4 sm:p-4 items-center gap-1 bg-transparent shadow-none text-white">
              <ProfilePicUpload
                user={user}
                avatarUrl={avatarUrl}
                setAvatarUrl={setAvatarUrl}
                isEdit={isEdit}
                onFileSelect={onFileSelect}
              />
              
              <div className="flex justify-between flex-wrap flex-1">
                <div>
                  <h1 className="font-elemental text-sm sm:text-2xl whitespace-nowrap overflow-hidden text-ellipsis">
                    {`${user.firstName} ${user.lastName}`}
                  </h1>
                  <h1 className="font-elemental text-xs sm:text-xs">
                    SYMSPACE
                  </h1>

                  <div className="flex items-center gap-1 font-elemental ">
                    <p className="text-white text-xs sm:text-base">
                      SYMS
                    </p>
                    <p className="text-primary text-xs sm:text-base">
                      {currency(500)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Edit Profile Button - visible only on mobile */}
              <div className="block md:hidden ml-auto self-center">
                <button 
                  className="text-[10px] bg-gradient-to-r from-[#3084FF] to-[#1D4F99] text-white px-1 border-[3px] border-white rounded-xl hover:bg-gradient-to-r hover:from-[#666666] hover:to-[#000000] transition-all py-1"
                  onClick={() => router.push('/profile/edit')}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards - Hidden on mobile */}
          <div className="hidden md:flex flex-wrap gap-1 w-full md:w-[calc(50%-12px)]">
            {INFO_LIST.map(item => (
              <div 
                className="flex-grow basis-[calc(33.33%-5.33px)] max-w-[calc(33.33%-5.33px)]" 
                key={item.subtitle}
              >
                <div className="h-full flex p-4 sm:p-5 items-center justify-center flex-col bg-gradient-to-br from-white/50 via-[#ebebeb5e] to-[#c4c4c41a]">
                  <h3 className="text-white my-0 font-semibold text-lg sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="text-white text-center text-xs sm:text-sm">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Cards - Visible only on mobile */}
      <div className="flex md:hidden flex-wrap gap-1 w-full">
        {INFO_LIST.map(item => (
          <div 
            className="flex-grow basis-[calc(33.33%-5.33px)] max-w-[calc(33.33%-5.33px)]" 
            key={item.subtitle}
          >
            <div className="h-full flex p-4 sm:p-5 items-center justify-center flex-col bg-gradient-to-br from-white/50 via-[#ebebeb5e] to-[#c4c4c41a] rounded-2xl">
              <h3 className="text-white my-0 font-semibold text-lg sm:text-xl">
                {item.title}
              </h3>
              <p className="text-white text-center text-xs sm:text-sm">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}