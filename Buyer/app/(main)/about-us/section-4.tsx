"use client";

// =============================================================================
// Section 4 - Core Values - About Us 
// =============================================================================

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CoreValue {
  title: string;
  description: string;
}

export default function Section4() {

  const rows: CoreValue[] = [
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
    <div className="w-full flex flex-col items-center py-0 sm:py-10 px-4">
      <div className="w-full max-w-[1400px]">
        <h1 className="font-elemental py-5 text-[25px] sm:text-[40px] text-white">
          Our Core Values
        </h1>
        <div className="w-full">
          <div className="border-t border-white/20">
            <Table>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow 
                    key={index}
                    className="border-b border-white/20 hover:bg-white/5 transition-colors py-4"
                  >
                    <TableCell className="p-1 sm:p-4 align-top py-4">
                      <h2 className="font-elemental text-[10px] sm:text-[30px] text-white py-4">
                        {row.title}
                      </h2>
                    </TableCell>
                    <TableCell className="font-helvetica p-1 sm:p-4 text-white text-[12px] sm:text-[20px] text-justify">
                      {row.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}