"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";

// =============================================================
// Types
// =============================================================

interface ResponsiveSettings {
  breakpoint: number;
  settings: {
    slidesToShow: number;
  };
}

interface CarouselWrapperProps {
  children: React.ReactNode;
  arrows?: boolean;
  dots?: boolean;
  slidesToShow?: number;
  spaceBetween?: number;
  responsive?: ResponsiveSettings[];
  className?: string;
}

// =============================================================
// Carousel Wrapper Component
// =============================================================

export const CarouselWrapper = React.forwardRef<HTMLDivElement, CarouselWrapperProps>(
  (
    {
      children,
      arrows = true,
      dots = false,
      slidesToShow = 4,
      spaceBetween = 10,
      responsive = [],
      className = "",
    },
    ref
  ) => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);

      api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1);
      });
    }, [api]);

    // Convert children to array
    const childrenArray = React.Children.toArray(children);

    return (
      <div ref={ref} className={`relative ${className}`}>
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className={`-ml-${spaceBetween}`}>
            {childrenArray.map((child, index) => (
              <CarouselItem
                key={index}
                className={`pl-${spaceBetween} basis-full md:basis-1/${slidesToShow}`}
              >
                {child}
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {arrows && (
            <>
              <CarouselPrevious className="absolute left-0 -translate-x-1/2" />
              <CarouselNext className="absolute right-0 translate-x-1/2" />
            </>
          )}
        </Carousel>

        {dots && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-all ${
                  current === index + 1
                    ? "bg-white w-8"
                    : "bg-white/50"
                }`}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

CarouselWrapper.displayName = "CarouselWrapper";

export default CarouselWrapper;