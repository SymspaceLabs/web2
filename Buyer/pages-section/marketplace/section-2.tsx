"use client";

// =================================================
// Section 2 | Marketplace | Trending News
// =================================================

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/carousel";
import { getAllBlogs } from "@/api/blog";

interface Blog {
  slug: string;
  image: string;
  title: string;
  shopUrl?: string;
}

export default function Section2() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      console.log("1. Fetching started...");
      const data = await getAllBlogs();
      console.log("2. Data received:", data);

      if (data) {
        const blogsToSet = data.blogs || data; // Handles both {blogs:[]} and []
        console.log("3. Setting blogs to state:", blogsToSet);
        setBlogs(blogsToSet);
      } else {
        console.error("4. No data returned from API");
      }
    };

    fetchBlogs();
  }, []);

  // Helper function to truncate title
  const truncateTitle = (title: string) => {
    if (title.length <= 50) {
      return title;
    }
    return title.substring(0, 47) + "...";
  };

  return (
    <div className="py-6">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h1 className="font-elemental text-center text-black text-xl sm:text-3xl pb-10">
            Trending News
          </h1>

          {/* Wrap blog items differently based on screen size */}
          {isMobile ? (
            <div className="flex overflow-x-auto gap-4 py-4 snap-x snap-mandatory scrollbar-hide">
              {blogs.map((item, index) => (
                <div
                  key={index}
                  className="w-[400px] flex-shrink-0 snap-start"
                >
                  <Link href={`/press-releases/${item.slug}`}>
                    <div className="relative rounded-[40px] overflow-hidden">
                      <div className="relative h-60 rounded-[20px] overflow-hidden bg-gray-200">
                        <div className="relative w-full h-full min-h-[250px]">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Absolute positioned button over image */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-center px-6 -mt-[75px] mb-2">
                          <Button
                            variant="ghost"
                            className="w-full text-white bg-gradient-to-t from-black/80 to-transparent border border-white/30 backdrop-blur-sm rounded-[37px] p-0 hover:bg-gradient-to-t hover:from-black/90"
                          >
                            <h1 className="font-elemental text-[10px] line-clamp-2 max-w-[90%] py-3 px-4">
                              {truncateTitle(item.title)}
                            </h1>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <Carousel
              dots
              autoplay
              arrows
              spaceBetween={24}
              slidesToShow={2}
              responsive={[
                {
                  breakpoint: 900,
                  settings: {
                    slidesToShow: 1,
                  },
                },
              ]}
            >
              {blogs.map((item, index) => (
                <div key={index}>
                  <Link href={`/press-releases/${item.slug}`}>
                    <div className="relative rounded-[40px] overflow-hidden">
                      <div className="relative h-[200px] sm:h-[300px] rounded-[20px] overflow-hidden bg-gray-200">
                        <div className="relative w-full h-full">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center">
                          <div className="min-w-[350px] font-elemental lowercase text-[14px] text-white bg-white/[0.01] border border-white/30 backdrop-blur-sm rounded-[37px] px-6 py-2 hover:bg-white/10 transition-colors ">
                            {truncateTitle(item.title)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </Carousel>
          )}
        </motion.div>
      </div>
      
      {/* Add scrollbar-hide utility to globals.css */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}