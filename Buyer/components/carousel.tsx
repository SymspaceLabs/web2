"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  children: ReactNode[];
  slidesToShow?: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
  dots?: boolean;
  arrows?: boolean;
  spaceBetween?: number;
  responsive?: Array<{
    breakpoint: number;
    settings: {
      slidesToShow: number;
    };
  }>;
}

export function Carousel({
  children,
  slidesToShow = 2,
  autoplay = false,
  autoplaySpeed = 3000,
  dots = false,
  arrows = true,
  spaceBetween = 16,
  responsive = [],
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(slidesToShow);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = children.length;
  const maxIndex = Math.max(0, totalSlides - visibleSlides);

  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newSlidesToShow = slidesToShow;

      // Apply responsive settings from largest to smallest breakpoint
      const sortedResponsive = [...responsive].sort((a, b) => b.breakpoint - a.breakpoint);
      
      for (const breakpoint of sortedResponsive) {
        if (width <= breakpoint.breakpoint) {
          newSlidesToShow = breakpoint.settings.slidesToShow;
        }
      }

      setVisibleSlides(newSlidesToShow);
      // Reset to first slide if current index is out of bounds
      setCurrentIndex(prev => Math.min(prev, Math.max(0, totalSlides - newSlidesToShow)));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [slidesToShow, responsive, totalSlides]);

  // Autoplay functionality
  useEffect(() => {
    if (autoplay && totalSlides > visibleSlides) {
      autoplayRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const nextIndex = prev + 1;
          return nextIndex > maxIndex ? 0 : nextIndex;
        });
      }, autoplaySpeed);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, autoplaySpeed, maxIndex, totalSlides, visibleSlides]);

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    
    const clampedIndex = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(clampedIndex);
    setIsTransitioning(true);

    // Reset autoplay timer
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      if (autoplay) {
        autoplayRef.current = setInterval(() => {
          setCurrentIndex((prev) => {
            const nextIndex = prev + 1;
            return nextIndex > maxIndex ? 0 : nextIndex;
          });
        }, autoplaySpeed);
      }
    }

    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToPrevious = () => {
    goToSlide(currentIndex - 1);
  };

  const goToNext = () => {
    goToSlide(currentIndex + 1);
  };

  const totalDots = maxIndex + 1;

  return (
    <div className="relative w-full px-12">
      {/* Carousel Container */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
          }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-2"
              style={{
                width: `${100 / visibleSlides}%`,
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {arrows && totalSlides > visibleSlides && (
        <>
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed rounded-full p-2 shadow-lg transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          <button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed rounded-full p-2 shadow-lg transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {dots && totalSlides > visibleSlides && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === index
                  ? "bg-gray-800 w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Example usage component
export default function CarouselDemo() {
  const sampleBlogs = [
    { id: 1, title: "Blog Post 1", color: "bg-blue-500" },
    { id: 2, title: "Blog Post 2", color: "bg-green-500" },
    { id: 3, title: "Blog Post 3", color: "bg-red-500" },
    { id: 4, title: "Blog Post 4", color: "bg-purple-500" },
    { id: 5, title: "Blog Post 5", color: "bg-yellow-500" },
    { id: 6, title: "Blog Post 6", color: "bg-pink-500" },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Custom Carousel Component
      </h1>

      <Carousel
        slidesToShow={2}
        autoplay={true}
        autoplaySpeed={3000}
        dots={true}
        arrows={true}
        spaceBetween={24}
        responsive={[
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
      >
        {sampleBlogs.map((blog) => (
          <div key={blog.id}>
            <div
              className={`${blog.color} rounded-2xl h-64 flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
            >
              {blog.title}
            </div>
          </div>
        ))}
      </Carousel>

      <div className="mt-12 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Features:</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Shows 2 slides at a time (configurable)</li>
          <li>Auto-scroll with customizable speed</li>
          <li>Navigation arrows with disable states</li>
          <li>Dot indicators for navigation</li>
          <li>Responsive breakpoints support</li>
          <li>Smooth transitions</li>
          <li>Cards perfectly centered and aligned</li>
          <li>No external dependencies (except Lucide icons)</li>
        </ul>
      </div>
    </div>
  );
}