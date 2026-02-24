"use client";

// ==============================================================
// Section 2 || Careers Page
// ==============================================================

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
    <div className="w-full flex flex-col items-center py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="w-full">
        <h1 className="font-elemental py-5 text-[25px] sm:text-[40px] text-white">
          Our Core Values
        </h1>
        <div className="w-full">
          <div className="border-t border-gray-700"></div>
          <table className="w-full">
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="font-elemental p-1 sm:p-4 text-[15px] sm:text-[30px] text-white align-top">
                    {row.title}
                  </td>
                  <td className="p-1 sm:p-4 font-helvetica text-white font-light text-[8px] sm:text-[20px] text-justify">
                    {row.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}