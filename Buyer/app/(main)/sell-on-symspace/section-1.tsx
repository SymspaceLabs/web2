import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export const Section1: React.FC = () => {
  return (
    <div>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="flex-grow py-8 z-[2] pt-[100px] sm:pt-[100px] md:pt-[200px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* Left column */}
              <div className="flex flex-col">
                <h1 className="font-elemental text-[20px] sm:text-[55px] text-[#4E4E4E]">
                  sell more <br /> with SYMSPACE
                </h1>

                <p className="font-helvetica text-[#797979] text-[12px] sm:text-[18px] mt-2">
                  *Initial 100 Partners gain 50% more on marketplace sales
                </p>

                <div className="flex pt-[10px] mt-2">
                  <Link href="/register">
                    <Button className="font-elemental flex-1 sm:flex-none gap-1 text-white rounded-[50px] border-2 border-white py-1 sm:py-4 px-3 sm:px-12 bg-black transition-all duration-300 hover:shadow-md hover:border-white/50 hover:bg-gradient-to-br hover:from-[#18C8FF] hover:to-[#933FFE] text-[10px] sm:text-base">
                      sign up
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right column */}
              <div className="z-[2]">
                <div className="min-h-0 sm:min-h-[500px]"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};