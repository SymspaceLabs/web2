// components/footer.tsx

// ==============================================================
// Footer - Main Component
// ==============================================================
"use client";

import Image from "next/image";
import { 
    CUSTOMER_CARE_LINKS,
    SOCIAL_ICON_LINKS,
    ABOUT_LINKS
} from "@/data/footer.data";

// ==============================================================
// Types for data.ts (for reference)
// ==============================================================
interface CustomerCareLinksProps {
  isDark: boolean;
}

interface AboutLinksProps {
  isDark: boolean;
}

interface SocialLinksProps {
  variant?: "light" | "dark";
}

export default function Footer() {
  return (
    <footer className="bg-black pt-24 pb-10 font-helvetica">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 pb-10 pt-4">
          {/* LOGO */}
          <div className="lg:col-span-6 md:col-span-6 sm:col-span-6">
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col">
                <div className="max-w-[200px]">
                  <Image
                    src="/images/logos/Logo.svg"
                    alt="logo"
                    width={200}
                    height={60}
                    className="w-full h-auto"
                  />
                </div>
                <h1 className="text-white text-sm mb-2.5 max-w-md font-elemental lowercase">
                  SIMULATE REALITY
                </h1>
              </div>
              <SocialLinks variant="dark" />
            </div>
          </div>

          {/* Get To Know Us Links */}
          <div className="lg:col-span-3 md:col-span-3 sm:col-span-6">
            <AboutLinks isDark={false} />
          </div>

          {/* Partner With Us Links */}
          <div className="lg:col-span-3 md:col-span-3 sm:col-span-6">
            <CustomerCareLinks isDark={false} />
          </div>
        </div>

        <div className="border-t border-white pb-3 pt-4" />

        <div className="flex items-center justify-between pb-10 md:pb-2">
          <p className="text-white text-sm">
            © {new Date().getFullYear()} Symspacelabs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ==============================================================
// Social Links Component
// ==============================================================
function SocialLinks({ variant = "light" }: SocialLinksProps) {
  return (
    <div className="flex -mx-1">
      {SOCIAL_ICON_LINKS.map(({ Icon, url }, ind) => (
        <a
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          key={ind}
          className={`
            m-1 p-2.5 rounded transition-colors
            ${variant === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"}
          `}
        >
          <Icon className="text-white text-base" />
        </a>
      ))}
    </div>
  );
}

// ==============================================================
// About Links Component
// ==============================================================

function AboutLinks({ isDark }: AboutLinksProps) {
  return (
    <div>
      <h2 className="text-white text-lg leading-none mb-4 font-elemental lowercase">Get To Know Us</h2>

      <div className="flex flex-col gap-2">
        {ABOUT_LINKS.map((item, ind) => (
          <a
            href={item.url}
            key={ind}
            className={`
              text-sm transition-colors
              ${isDark ? "text-gray-300 hover:text-white" : "text-gray-400 hover:text-white"}
            `}
          >
            {item.title}
          </a>
        ))}
      </div>
    </div>
  );
}

// ==============================================================
// Customer Care Links Component
// ==============================================================
function CustomerCareLinks({ isDark }: CustomerCareLinksProps) {
  return (
    <div>
      <p className="text-white text-lg leading-none mb-4 font-elemental lowercase">Partner With Us</p>

      <div className="flex flex-col gap-2">
        {CUSTOMER_CARE_LINKS.map((item, ind) => (
          <a
            href={item.url}
            key={ind}
            className={`
              text-sm transition-colors
              ${isDark ? "text-gray-300 hover:text-white" : "text-gray-400 hover:text-white"}
            `}
          >
            {item.title}
          </a>
        ))}
      </div>
    </div>
  );
}