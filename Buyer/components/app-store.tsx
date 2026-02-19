"use client";

// =======================================================
// AppStore Component - Exact MUI to Tailwind Conversion with Images
// =======================================================

import Image from "next/image";
import { PLAY_APP_STORE_DATA } from "@/data/footer.data";

interface AppStoreProps {
  onClick?: () => void;
}

export default function AppStore({ onClick }: AppStoreProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {PLAY_APP_STORE_DATA.map(({ imageSrc, imageAlt, subtitle, title, url }) => (
        <div
          onClick={onClick}
          key={title}
          className="flex items-center gap-1.5 px-2.5 py-[14px] text-white bg-white/12 rounded-xl border border-white/25 cursor-pointer transition-all duration-200 min-w-[155px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:bg-white/18 hover:border-white/35 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] active:scale-[0.98]"
        >
          {/* Icon */}
          <div className="flex items-center justify-center w-8 h-8">
            <Image 
              src={imageSrc}
              alt={imageAlt}
              width={32}
              height={32}
              style={{ width: "100%", height: "100%" }}
              className="object-contain"
            />
          </div>

          {/* Text content */}
          <div className="flex flex-col gap-0.5">
            <div className="text-[9px] font-medium leading-none opacity-70">
              {subtitle}
            </div>

            <div className="text-[15px] font-semibold leading-[1.2]">
              {title}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}