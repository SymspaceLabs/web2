// =======================================================================
// Section 5 | Marketplace | Best Sellers - NOW USING NEW CAROUSEL METHOD
// ========================================================================

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Carousel } from "@/components/carousel";
import { Company } from "@/types/company";

// Currency formatting utility
const currency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

interface DisplayPrice {
  salePrice: number;
  price: number;
  hasSale: boolean;
}

interface ProductImage {
  url: string;
}

interface Product {
  slug: string;
  name: string;
  thumbnail?: string;
  images?: ProductImage[];
  displayPrice?: DisplayPrice;
  company?: Company;
}

interface ProductsResponse {
  products: Product[];
}

export default function Section5() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`);
      const data: ProductsResponse = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-6 sm:py-10 px-2.5">
        <div className="flex items-center justify-center mt-10 mb-6 sm:mb-10">
          <p className="text-base">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 sm:py-10 px-2.5">
      {/* Header */}
      <div className="flex items-center justify-center mt-10 mb-6 sm:mb-10">
        <div className="text-center">
          <h1 className="text-2xl sm:text-4xl font-elemental lowercase text-black mb-2">
            Best Seller products
          </h1>
          <p className="font-helvetica text-sm sm:text-base text-gray-600">
            Augmented Reality features available in the Symspace app
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
        viewport={{ once: true }}
      >
        <div className="relative rounded-[30px] sm:rounded-[50px] bg-gradient-to-br from-blue-500 to-purple-600 p-4 sm:p-8">
          {/* Decorative overlay for glass effect */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-[30px] sm:rounded-[50px]" />

          {isMobile ? (
            /* Mobile: Horizontal Scrollable Box */
            <div className="flex overflow-x-auto gap-4 py-4 snap-x snap-mandatory scroll-px-4 scrollbar-hide relative z-10">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="w-[calc(50%-8px)] flex-shrink-0 snap-start"
                >
                  <ProductCard1 product={product} />
                </div>
              ))}
            </div>
          ) : (
            /* Desktop/Tablet: Carousel */
            <div className="relative z-10">
              <Carousel
                arrows
                dots={false}
                spaceBetween={16}
                slidesToShow={4}
                responsive={[
                  {
                    breakpoint: 1200,
                    settings: {
                      slidesToShow: 4,
                    },
                  },
                  {
                    breakpoint: 900,
                    settings: {
                      slidesToShow: 3,
                    },
                  },
                  {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 2,
                    },
                  },
                ]}
              >
                {products.map((product, index) => (
                  <div key={index}>
                    <ProductCard1 product={product} />
                  </div>
                ))}
              </Carousel>
            </div>
          )}
        </div>
      </motion.div>

      {/* Add scrollbar-hide utility */}
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

// =============================================================
// Product Card 1
// =============================================================

interface ProductCard1Props {
  product: Product;
}

function ProductCard1({ product }: ProductCard1Props) {
  const { salePrice, price, hasSale } = product.displayPrice || {
    salePrice: 0,
    price: 0,
    hasSale: false,
  };

  const companyName = product.company?.entityName || "";

  return (
    <Link href={`/products/${product.slug}`} className="block w-full h-full">
      <div className="flex flex-col bg-white/10 rounded-xl mb-4 w-full h-full transition-colors duration-300 hover:bg-white/15">
        <div className="w-full">
          <Image
            alt={product.name}
            width={355}
            height={355}
            src={product?.thumbnail || product.images?.[0]?.url || "/placeholder.png"}
            className="object-cover object-center w-full h-auto aspect-square rounded-t-xl"
          />
        </div>

        <div className="font-helvetica px-3 sm:px-8 py-8 flex-grow">
          <p className="text-white text-[10px] sm:text-lg font-medium whitespace-nowrap overflow-hidden text-ellipsis">
            {product.name}
          </p>

          <p className="uppercase text-white/50 text-[10px] sm:text-[17px] whitespace-nowrap overflow-hidden text-ellipsis">
            {companyName}
          </p>

          <div className="flex gap-2 mt-1">
            <p className="text-white text-[10px] sm:text-[17px] font-medium">
              {hasSale ? currency(salePrice) : currency(price)}
            </p>

            {hasSale && (
              <p className="text-white/50 text-[10px] sm:text-[17px] font-medium line-through">
                {currency(price)}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}