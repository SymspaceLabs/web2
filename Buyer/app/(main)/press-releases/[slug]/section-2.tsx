
// app/article/[slug]/section-2.tsx
// ====================================================================
// Main Section2 Component
// ====================================================================
"use client"

import { useRouter } from "next/navigation"
import GlassBanner from "@/components/glass-banner"

export default function Section2() {
  const router = useRouter()
  
  return (
    <div className="flex flex-col items-center py-10 px-4 sm:px-0">
      <div className="max-w-[1200px] w-full">
        <GlassBanner
          title="get in touch"
          subtitle="Learn more about our vision to help those who need it most."
          btnText="Contact Us"
          onClick={() => router.push('/contact-us')}
        />
      </div>
    </div>
  )
}