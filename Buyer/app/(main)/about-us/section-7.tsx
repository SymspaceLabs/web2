"use client";

// =============================================================================
// Section 7 - Press Releases - About Us Section
// =============================================================================

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Article } from "@/types/article";

export default function Section7() {
  const [blogs, setBlogs] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`);
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const }
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }
  
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="w-full flex flex-col items-center px-4 pb-0 sm:pb-4">
        <div className="w-full max-w-[1400px]">
          <motion.div 
            className="flex items-center justify-between mt-10 mb-3 py-0 sm:py-5"
            variants={titleVariants}
          >
            {/* Section title */}
            <div className="flex items-center gap-2">
              <h1 className="font-elemental text-[24px] sm:text-[35px] text-white [word-spacing:10px]">
                press releases
              </h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open('/press-releases', '_blank')}
                className="hover:bg-white/10"
              >
                <ArrowUpRight className="h-6 w-6 text-white" />
              </Button>
            </div>
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
                {blogs.map((blog) => (
                  <CarouselItem 
                    key={blog.id} 
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <motion.div
                      variants={cardVariants}
                      className="h-full"
                    >
                      <BlogCard blog={blog} />
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

interface BlogCardProps {
  blog: Article;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/press-releases/${blog.slug}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white/35 backdrop-blur-[10px] rounded-[40px] p-6
                 w-full h-auto sm:h-[350px]
                 flex flex-col gap-3
                 shadow-[inset_0px_3px_6px_rgba(255,255,255,0.4),inset_0px_-3px_9px_rgba(255,255,255,0.5),inset_0px_-1.5px_20px_rgba(255,255,255,0.24),inset_0px_20px_20px_rgba(255,255,255,0.24),inset_0px_1px_20.5px_rgba(255,255,255,0.8)]
                 cursor-pointer transition-all duration-200 ease-in-out
                 hover:shadow-[0px_4px_10px_rgba(0,0,0,0.25)] hover:scale-[1.02]"
    >
      <div className="max-h-[150px] h-[150px] overflow-hidden flex justify-center items-center rounded-[20px]">
        <Image 
          src={blog.image || ''} 
          width={500} 
          height={150} 
          alt={blog.title}
          className="h-[150px] w-full object-cover rounded-[20px]"
        />
      </div>

      <p className="font-helvetica text-white text-[16px] py-1 font-light">
        {blog.handle_url_title}
      </p>
      
      <div className="border-t border-white/30"></div>
      
      <p className="font-helvetica text-white text-[18px] py-2 font-normal">
        {blog.title}
      </p>
    </div>
  );
}