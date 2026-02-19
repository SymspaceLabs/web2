// ===============================================
// Testimonial Card - Next.js + Tailwind + TypeScript
// ===============================================

"use client";

import React from 'react';
import Image from 'next/image';
import { Testimonial } from '@/types/landing';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const { content, user } = testimonial || {};

  return (
    <div className="box-border rounded-[40px] bg-white/10 p-[35px] shadow-[0px_4px_4px_rgba(0,0,0,0.25),inset_0px_0px_25px_rgba(53,53,53,0.5)] w-full max-w-[450px] h-auto flex-shrink-0 flex flex-col justify-between overflow-hidden sm:h-[250px]">
      <p className="text-base break-words whitespace-normal font-helvetica">
        {content}
      </p>
      
      <div className="flex gap-4 items-center mt-4">
        <div className="w-[75px] h-[75px] flex-shrink-0 flex overflow-hidden rounded-full border-2 border-white">
          <Image
            src={user?.avatar || '/placeholder-avatar.png'}
            width={75}
            height={75}
            alt={user?.name || 'User'}
            className="object-cover"
          />
        </div>
        <p className="text-lg font-helvetica">
          {user?.name}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;