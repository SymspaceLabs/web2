'use client';

import Link from 'next/link';
import { 
  Mail, 
  Phone, 
  Globe, 
  Twitter, 
  Youtube, 
  Facebook, 
  Instagram 
} from 'lucide-react';
import { ReactNode } from 'react';
import Image from 'next/image';
import { Company } from '@/types/company';

interface Section1Props {
  company: Company;
}

interface SocialLinkProps {
  href?: string;
  icon: ReactNode;
}

export default function Section1({ company }: Section1Props) {
  
  const getWebsiteUrl = (url?: string) => {
    if (!url) return "#";
    return url.startsWith("http://") || url.startsWith("https://") 
      ? url 
      : `https://${url}`;
  };

  return (
    <div className="text-white min-h-[400px] pb-24 pt-[100px]">
      
      {/* BANNER BG */}
      <div 
        className={`h-[300px] overflow-hidden flex justify-center items-center ${
          company.banner ? 'bg-transparent' : 'bg-[#e0e0e0]'
        }`}
      >
        {company.banner ? (
          <Image
            src={company.banner}
            width={1200}
            height={300}
            alt="Background Banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <p className="text-[#555]">No Banner Available</p>
        )}
      </div>

      {/* Foreground content card */}
      <div 
        className="flex justify-center shadow-[0px_1px_24px_-1px_rgba(0,0,0,0.18)] backdrop-blur-[12px]"
        style={{
          background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367) 4.2%, rgba(224, 224, 224, 0.287) 13.88%, rgba(212, 212, 212, 0.211) 27.98%, rgba(207, 207, 207, 0.175) 37.8%, rgba(202, 202, 202, 0.143) 44.38%, rgba(200, 200, 200, 0.126) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)'
        }}
      > 
        <div className="flex flex-col md:flex-row gap-12 max-w-[1500px] w-full -mt-[90px] p-10">

          {/* LOGO */}
          {company.logo && (
            <div className="w-[200px] h-[200px] rounded-full overflow-hidden mx-auto md:mx-0 border-[5px] border-white shadow-[0px_4px_23.3px_18px_rgba(0,0,0,0.25)] bg-white flex-shrink-0">
              <Image
                src={company.logo}
                alt="Company Logo"
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* NAME & DESCRIPTION */}
          <div className="flex flex-col gap-5 flex-grow">
            <div 
              className="max-w-[200px] py-2 px-6 text-center text-white text-sm font-semibold rounded-[80px] cursor-default backdrop-blur-[12px] shadow-[0px_8px_6px_rgba(0,0,0,0.05),_inset_2px_3px_3px_-3px_rgba(255,255,255,0.6)]"
              style={{ background: 'linear-gradient(94.44deg, #666666 29%, #000000 100%)' }}
            >
              {company.entityName}
            </div>
            
            <p className="text-black text-base">
              {company.description}
            </p>
            
            <p className="text-black font-semibold text-[20px] sm:text-[24px]">
              {company.tagLine}
            </p>
          </div>

          {/* SOCIALS & CONTACT */}
          <div className="flex flex-col items-start md:items-end gap-10">
            {/* Glass Social Card */}
            <div 
              className="flex justify-between items-center px-10 py-2 rounded-[80px] gap-4 backdrop-blur-[12px] shadow-[0px_1px_24px_-1px_rgba(0,0,0,0.18)]"
              style={{
                background: `linear-gradient(0deg, rgba(20, 20, 20, 0.1), rgba(20, 20, 20, 0.1)), linear-gradient(117.54deg, rgba(255, 255, 255, 0.4) -19.85%, rgba(200, 200, 200, 0.35) 4.2%, rgba(100, 100, 100, 0.1) 60.21%)`
              }}
            >
              <SocialLink href={company.website} icon={<Globe size={20} />} />
              <SocialLink href={company.instagram} icon={<Instagram size={20} />} />
              <SocialLink href={company.twitter} icon={<Twitter size={20} />} />
              <SocialLink href={company.youtube} icon={<Youtube size={20} />} />
              <SocialLink href={company.facebook} icon={<Facebook size={20} />} />
            </div>

            {/* Support Info */}
            <div className="flex flex-col items-start md:items-end gap-3 text-black">
              <div className="flex items-center gap-3 w-[260px]">
                <Mail className="text-blue-500" size={20} />
                <p>{company.emailSupport}</p>
              </div>
              <div className="flex items-center gap-3 w-[260px]">
                <Phone className="text-green-500" size={20} />
                <p>{company.phoneSupport}</p>
              </div>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  );
}

// Helper component for Social Links
function SocialLink({ href, icon }: SocialLinkProps) {
  if (!href) return null;
  
  const getWebsiteUrl = (url?: string) => {
    if (!url) return "#";
    return url.startsWith("http://") || url.startsWith("https://") 
      ? url 
      : `https://${url}`;
  };

  return (
    <Link 
      href={getWebsiteUrl(href)} 
      rel="noopener noreferrer" 
      target="_blank"
      className="p-2 hover:bg-black/10 rounded-full transition-colors"
    >
      {icon}
    </Link>
  );
}