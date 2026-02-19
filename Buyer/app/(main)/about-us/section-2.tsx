"use client";

// ===========================================================================
// Section 2 - About Us
// ===========================================================================

export default function Section2() {

  const rows = [
    { 
      title: "innovation",
      description: "The future of shopping is immersive. We push the boundaries of AI-driven 3D modeling and AR to create smarter, more intuitive experiences for consumers and brands."
    },
    { 
      title: "inclusion", 
      description: "Technology works best when it works for everyone. We prioritize accessibility-first design, ensuring individuals of all abilities, backgrounds, and circumstances can fully engage with AR commerce."
    },
    { 
      title: "sustainability",
      description: "Reducing waste starts with better technology. Our virtual try-ons, digital staging, and AI-powered modeling help brands cut down on returns, overproduction, and environmental impact."
    },
    { 
      title: "empowerment",
      description: "Convenience should never be a barrier. Whether it's homebound shoppers, expectant mothers, or veterans, we develop tools that enhance independence and confidence in every purchase."
    },
    { 
      title: "impact", 
      description: "We don't just build AR experiences—we create solutions that bridge gaps, remove limitations, and set new standards for inclusive digital commerce." 
    },
  ];

  return (
    <div className="w-full flex flex-col items-center py-9 px-4">
      <div className="w-full max-w-[1400px]">
        <h1 className="font-elemental lowercase border-b border-white py-1 text-[25px] sm:text-[35px] text-white">
          our mission
        </h1>
        <div className="max-w-[1200px] pt-4 font-helvetica">
          <p className="pb-3 text-[15px] sm:text-[20px] text-white text-justify">
            We envision a future where anyone, anywhere can experience products in the real-world—conveniently, confidently, and comfortably.
          </p>
          <p className="pb-3 text-[15px] sm:text-[20px] text-white text-justify">
            At Symspace, we bridge the gap between physical and virtual shopping, redefining digital commerce and real estate staging with AI-driven 3D modeling and AR solutions. Our mission is to make shopping and staging more accessible, immersive, and efficient for brands, retailers, and consumers.
          </p>
          <p className="pb-3 text-[15px] sm:text-[20px] text-white text-justify">
            By prioritizing inclusivity, innovation, and sustainability, we empower persons with disabilities, expectant mothers, veterans, and homebound individuals to interact with true-to-size AR products, transforming how they shop and experience spaces. At the same time, we help businesses reduce returns, lower costs, and optimize inventory through 3D visuals and AR trial rooms.
          </p>
        </div>        
      </div>
    </div>
  );
}