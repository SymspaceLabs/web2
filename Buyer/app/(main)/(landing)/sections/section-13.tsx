"use client";

import { motion } from "framer-motion";
import { useState, useEffect, JSX } from "react";
import { fetchProducts } from "@/api/product";
import { CarouselWrapper } from "@/components/carousel-wrapper";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import ProductCard1 from "@/components/product-card-1";
import { Product } from "@/types/products";

// =============================================================
// Types
// =============================================================

interface Category {
  id: number;
  title: string;
  slug: string;
}

interface CarouselResponsive {
  breakpoint: number;
  settings: {
    slidesToShow: number;
    infinite?: boolean;
    variableWidth?: boolean;
  };
}

interface ProductWrapperProps {
  product: Product;
  isMobile: boolean;
}

// =============================================================
// Main Component
// =============================================================

export default function Section13(): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>("newArrival");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const categories: Category[] = [
    { id: 1, title: "New Arrivals", slug: "newArrival" },
    { id: 2, title: "Best Seller", slug: "bestSeller" },
    { id: 3, title: "Trending", slug: "trending" },
  ];

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const loadProducts = async (): Promise<void> => {
      const { products, error } = await fetchProducts();
      if (error) console.error("Error fetching products:", error);
      // NOTE: In a real app, you would filter 'products' based on 'activeTab' here.
      setProducts(products || []); 
      setLoading(false);
    };

    loadProducts();
  }, []); // Dependency array intentionally empty to load all products once

  const handleChange = (newValue: string): void => {
    setActiveTab(newValue);
    // NOTE: In a real app, you might want to refetch or filter products here based on 'newValue'
  };

  // Responsive settings for product cards
  const productCarouselResponsive: CarouselResponsive[] = [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        infinite: false,  // Don't loop when few items
        variableWidth: true,  // Allow variable widths
        
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 3,
        infinite: false,  // Don't loop when few items
        variableWidth: true,  // Allow variable widths
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        infinite: false,  // Don't loop when few items
        variableWidth: true,  // Allow variable widths
      },
    },
  ];

  // Helper component to wrap ProductCard1 with correct spacing/sizing
  const ProductWrapper = ({ product, isMobile }: ProductWrapperProps): JSX.Element => (
    <div
      className={`p-1 sm:p-3 flex-[0_0_auto] snap-start ${
        isMobile ? 'w-[calc(50%-8px)]' : 'w-full max-w-[355px]'
      }`}
    >
      <ProductCard1 product={product} />
    </div>
  );

  return (
     <section className="w-full py-10 sm:py-20 relative z-[2]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }}
          viewport={{ once: true }}
          className="h-full"
        >

          <div className="z-[2] py-4 sm:py-10 relative text-center">
            <div className="mb-8 flex justify-center">
              <Tabs value={activeTab} onValueChange={handleChange}>
                <TabsList className="bg-white/5 backdrop-blur-md border border-white/10 rounded-4xl p-3 py-6 gap-2 inline-flex">
                  {categories.map((item) => (
                    <TabsTrigger
                      key={item.slug}
                      value={item.slug}
                      className="hover:cursor-pointer text-xs sm:text-sm font-medium text-white/60 data-[state=active]:text-white data-[state=active]:bg-gradient-to-b data-[state=active]:from-white/25 data-[state=active]:to-white/10 rounded-xl px-5 sm:px-8 py-4 sm:py-4 transition-all duration-300 data-[state=active]:shadow-inner hover:text-white/80 hover:bg-white/5 font-elemental lowercase"
                    >
                      {item.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Product List Container */}
          <div className="pt-6 pb-4">
            {loading ? (
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-white mx-auto" />
              </div>
            ) : isMobile ? (
              /* Mobile: Horizontal Scrollable Box */
              <div className="flex overflow-x-auto gap-4 py-4 snap-x snap-mandatory scroll-px-4 relative z-[1] scrollbar-hide">
                {products.map((product, index) => (
                  <ProductWrapper key={index} product={product} isMobile={isMobile} />
                ))}
              </div>
            ) : (
              /* Desktop/Tablet: Carousel with fixed card width */
              <div className="relative z-[1] overflow-hidden">
                {products.length <= 4 ? (
                  /* If 4 or fewer products, show them in a flex row without carousel */
                  <div className="flex gap-4 justify-start">
                    {products.map((product, index) => (
                      <div key={index} className="w-[355px] flex-shrink-0">
                        <ProductCard1 product={product} />
                      </div>
                    ))}
                  </div>
                ) : (
                  /* More than 4 products, use carousel */
                  <CarouselWrapper
                    arrows
                    dots={false}
                    slidesToShow={4}
                    spaceBetween={16}
                    responsive={productCarouselResponsive}
                  >
                    {products.map((product, index) => (
                      <div key={index} className="px-2">
                        <div className="w-[355px]">
                          <ProductCard1 product={product} />
                        </div>
                      </div>
                    ))}
                  </CarouselWrapper>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}