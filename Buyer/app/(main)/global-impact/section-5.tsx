import Image from 'next/image';
import { Marquee } from '@/components/ui/marquee';
import { COLLABORATORS } from '@/data/collaborators.data';

interface Section5Props {
  className?: string;
}

export default function Section5({ className }: Section5Props) {
  return (
    <div className={`w-full flex flex-col items-center py-4 ${className || ''}`}>
      {/* Header Section */}
      <div className="w-full max-w-[1250px] p-2">
        <p className="text-white text-base font-helvetica">
          What everyone is saying
        </p>
        <h1 className="font-elemental text-white text-[28px] sm:text-[40px] pb-[25px]">
          communities and collaborations
        </h1>
      </div>

      {/* Marquee Slider */}
      <div className="w-full overflow-hidden">
        <Marquee pauseOnHover className="py-4">
          {COLLABORATORS.map((company, index) => (
            <div
              key={index}
              className="relative mx-4 h-24 w-48 flex items-center justify-center"
            >
              <Image
                src={company}
                alt={`Company ${index + 1}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}