import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion"; // Import Variants type
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Staff {
  id: number;
  title: string;
  role: string;
  imgUrl: string;
  slug: string;
}

const staffs: Staff[] = [
  { 
    id: 1, 
    title: "zayden puton",
    role: "Founder & CEO",
    imgUrl: "/images/about-us/staff-1.png",
    slug: "zayden/"
  },
  { 
    id: 2, 
    title: "mo mohamed",
    role: "CTO",
    imgUrl: "/images/about-us/staff-2.png",
    slug: "mo-cafe/"
  },
  { 
    id: 3, 
    title: "Hamza Gulistan",
    role: "CPO",
    imgUrl: "/images/about-us/staff-3.png",
    slug: "hamza-gulistan/"
  },
  { 
    id: 4,
    title: "allen mustacchi",
    role: "CSO",
    imgUrl: "/images/about-us/staff-4.png",
    slug: "allen-mustacchi-5ba28b6b/"
  },
  { 
    id: 5,
    title: "thilak sundaram",
    role: "Full Stack Developer",
    imgUrl: "/images/about-us/staff-5.png",
    slug: "thilak-sundaram"
  },
  { 
    id: 6,
    title: "steve lee chun",
    role: "Lead 3D /VFX Designer",
    imgUrl: "/images/about-us/staff-6.png",
    slug: "lee-thong-chun-025baa16a/"
  },
];

export default function Section5() {
  // Container animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Title animation - using 'as const' to make it a tuple
  const titleVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }
    }
  };

  // Card animation - using 'as const' to make it a tuple
  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const }
    }
  };

  return (
    <motion.div 
      id="team"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="w-full flex flex-col items-center px-4">
        <div className="w-full max-w-[1400px]">
          <motion.div 
            className="flex items-center justify-between mt-10 mb-3 py-5"
            variants={titleVariants}
          >
            {/* Section title */}
            <h1 className="font-elemental text-[24px] sm:text-[35px] text-white [word-spacing:10px]">
              our leadership team
            </h1>
          </motion.div>

          {/* Shadcn Carousel */}
          <motion.div variants={containerVariants}>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {staffs.map((staff) => (
                  <CarouselItem 
                    key={staff.id} 
                    className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <motion.div
                      variants={cardVariants}
                      whileHover={{ scale: 1.05 }}
                      className="h-full"
                    >
                      <Link 
                        href={`https://www.linkedin.com/in/${staff.slug}`} 
                        target="_blank"
                        className="block h-full"
                      >
                        {/* Staff card */}
                        <div className="flex flex-col items-center justify-center gap-3 py-4 px-6
                                      h-[280px] sm:h-[340px]
                                      bg-white/35 backdrop-blur-[10px] rounded-[40px]
                                      shadow-[inset_0px_3px_6px_rgba(255,255,255,0.4),inset_0px_-3px_9px_rgba(255,255,255,0.5),inset_0px_-1.5px_20px_rgba(255,255,255,0.24),inset_0px_20px_20px_rgba(255,255,255,0.24),inset_0px_1px_20.5px_rgba(255,255,255,0.8)]
                                      transition-shadow duration-200">
                          {/* Staff image */}
                          <Image
                            alt={staff.title}
                            width={150}
                            height={150}
                            src={staff.imgUrl}
                            className="w-[150px] h-[150px] rounded-full object-cover"
                          />
                          {/* Staff title and role */}
                          <div className="flex flex-col items-center gap-1">
                            <h2 className="font-elemental lowercase text-white text-lg font-normal capitalize text-center">
                              {staff.title}
                            </h2>
                            <p className="font-helvetica text-white text-sm font-light text-center">
                              {staff.role}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {/* Custom styled navigation buttons */}
              <div className="flex justify-end gap-2 mt-4">
                <CarouselPrevious className="static translate-y-0 bg-transparent border-none hover:bg-white/10">
                  <ChevronLeft className="h-8 w-8 text-white" />
                </CarouselPrevious>
                <CarouselNext className="static translate-y-0 bg-transparent border-none hover:bg-white/10">
                  <ChevronRight className="h-8 w-8 text-white" />
                </CarouselNext>
              </div>
            </Carousel>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}