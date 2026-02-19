// ===================================================================
// Glassmorphic Banner
// ===================================================================

import { Button } from "./ui/button";

interface GlassBannerProps {
  title: string;
  subtitle: string;
  btnText: string;
  onClick?: () => void;
  className?: string;
}

export default function GlassBanner({
    title,
    subtitle,
    btnText,
    onClick,
    className = ''
}: GlassBannerProps) {
  return (
    <div className={`w-full ${className}`}>
        <div className="relative rounded-[30px] p-6 sm:p-14 overflow-hidden bg-white/35 backdrop-blur-[10px]"
          style={{
            boxShadow: `inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4),
                        inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5),
                        inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24),
                        inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24),
                        inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)`
          }}
        >
            <div className="flex flex-col sm:flex-row justify-between gap-2">
                <div className="flex flex-col">
                    <h1 className="font-elemental text-[20px] sm:text-[40px] text-white pb-1">
                        {title}
                    </h1>
                    <p className="text-[14px] sm:text-[18px] text-white max-w-[850px]">
                        {subtitle}
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center sm:max-w-[350px]">
                    <Button 
                        onClick={onClick}
                        className="font-elemental bg-gradient-to-r from-[#666666] to-[#1D1D1D] rounded-[50px] px-5 py-4 text-white text-xs sm:text-sm border border-white sm:min-w-[200px]"
                    >
                        {btnText}
                    </Button>
                </div>
            </div>
        </div>
    </div>
  );
}