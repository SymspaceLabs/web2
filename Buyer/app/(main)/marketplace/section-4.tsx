// =======================================================
// Section 4 Shop Men
// =======================================================

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface CategoryCard {
  id: string;
  title: string;
  image: string;
  slug: string;
  url: string;
}

export default function Section4() {
  return (
    <div className="px-4 sm:px-0">
      <div className="container mx-auto rounded-[30px] sm:rounded-[50px] py-2 bg-[#353535]">
        {/* Section heading */}
        <h1 className="font-elemental lowercase text-xl sm:text-3xl py-3 text-white text-center">
          Shop Men
        </h1>

        {/* Grid layout for category cards */}
        <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-3">
          {categoryCards.map((item, index) => (
            <div key={index}>
              {/* Motion wrapper for fade-in animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <ProductCard4 item={item} textColor="#FFF" />
              </motion.div>
            </div>
          ))}
        </div>

        {/* Call-to-action button */}
        <div className="flex justify-end mt-5">
          <Button
            asChild
            className="font-elemental lowercase bg-white/90 text-black hover:bg-white border border-white/50 shadow-lg backdrop-blur-sm rounded-full px-8 py-2"
          >
            <Link href="/products">Shop By Category</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Product Card Component
 */
interface ProductCard4Props {
  item: CategoryCard;
  textColor?: string;
}

function ProductCard4({ item, textColor = "#000" }: ProductCard4Props) {
  return (
    <Link href={item.url}>
      <div className="group rounded-[25px] sm:rounded-[25px] md:rounded-[80px] pt-2 sm:pt-2 md:pt-5 px-1 sm:px-1 md:px-5 bg-white/40 shadow-[inset_0px_3px_6px_rgba(255,255,255,0.4),inset_0px_-3px_9px_rgba(255,255,255,0.5),inset_0px_-1.5px_20px_rgba(255,255,255,0.24),inset_0px_20px_20px_rgba(255,255,255,0.24),inset_0px_1px_20.5px_rgba(255,255,255,0.8)] backdrop-blur-[10px] relative overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
        <div className="relative z-10 text-center">
          <h2
            className="font-elemental lowercase text-[8px] sm:text-[8px] md:text-[21px]"
            style={{ color: textColor }}
          >
            {item.title}
          </h2>
          <div className="max-h-[400px] p-0 sm:p-0 md:p-5 w-full overflow-hidden">
            <Image
              width={1000}
              height={1000}
              alt={item.title}
              src={item.image}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

// Sample category data for demonstration purposes
const categoryCards: CategoryCard[] = [
  {
    id: "f54ee5db-ff89-4d86-ade8-86d949db7bg1",
    title: "T-shirts",
    image: "/images/marketplace/men-shirt.png",
    slug: "t-shirts",
    url: "/products?subcategoryItem=t-shirts",
  },
  {
    id: "f54ee5db-ff89-4d86-ade8-86d949db7bg2",
    title: "Bottoms",
    image: "/images/marketplace/men-pants.png",
    slug: "bottoms",
    url: "/products?subcategory=bottoms",
  },
  {
    id: "f54ee5db-ff89-4d86-ade8-86d949db7bg3",
    title: "Accessories",
    image: "/images/marketplace/men-watch.png",
    slug: "accessories",
    url: "/products?subcategory=accessories",
  },
];