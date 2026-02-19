// ====================================================================
// Section 7 Product Sections
// ====================================================================

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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

interface CardData {
  btnText: string;
  cardHeader: string;
  slug: string;
}

export default function Section7() {
  const cardData: CardData[] = [
    {
      btnText: "Shop More",
      cardHeader: "Selected for you",
      slug: "selected-for-you",
    },
    {
      btnText: "Shop New Arrivals",
      cardHeader: "New Arrivals",
      slug: "new-arrivals",
    },
    {
      btnText: "Shop Sale",
      cardHeader: "Today's deals",
      slug: "todays-deals",
    },
  ];

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`);
        const data: ProductsResponse = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="py-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-center">
          {/* Render three cards */}
          {cardData.map((data, index) => (
            <div key={index}>
              {/* Motion wrapper for fade-in animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="bg-[#BDBDBD] px-2 sm:px-4 rounded-[25px] sm:rounded-[50px] shadow-[inset_-5px_-5px_20px_1px_rgba(255,255,255,0.25),inset_5px_5px_20px_1px_rgba(255,255,255,0.25)]">
                  <div className="p-4">
                    {/* Section Title */}
                    <h1 className="text-center text-white text-xl sm:text-xl font-elemental lowercase py-6">
                      {data.cardHeader}
                    </h1>

                    {/* Products Grid */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-4">
                      {(products || []).slice(0, 4).map((product, idx) => (
                        <div key={idx}>
                          <ProductCard2 product={product} />
                        </div>
                      ))}
                    </div>

                    {/* Contact Button */}
                    <div className="flex justify-center py-6">
                      <Button
                        asChild
                        className="font-elemental lowercase bg-white/90 text-black hover:bg-white border border-white/50 shadow-lg backdrop-blur-sm rounded-full px-8 py-2"
                      >
                        <Link href={`/products?tag=${data.slug}`}>
                          {data.btnText}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ====================================================================
// Product Card 2
// ====================================================================

interface ProductCard2Props {
  product: Product;
}

function ProductCard2({ product }: ProductCard2Props) {
  const { salePrice, price, hasSale } = product.displayPrice || {
    salePrice: 0,
    price: 0,
    hasSale: false,
  };

  const companyName = product.company?.entityName || "";

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="bg-white/20 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/30 hover:-translate-y-1 shadow-lg">
        {/* Product Image */}
        <div className="relative w-full aspect-square">
          <Image
            alt={product.name}
            fill
            src={product?.thumbnail || product.images?.[0]?.url || "/placeholder.png"}
            className="object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="p-3 font-helvetica">
          <p className="text-white text-xs sm:text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
            {product.name}
          </p>

          <p className="uppercase text-white/60 text-[10px] sm:text-xs whitespace-nowrap overflow-hidden text-ellipsis mt-1">
            {companyName}
          </p>

          <div className="flex gap-2 mt-2">
            <p className="text-white text-xs sm:text-sm font-semibold">
              {hasSale ? currency(salePrice) : currency(price)}
            </p>

            {hasSale && (
              <p className="text-white/60 text-xs sm:text-sm font-medium line-through">
                {currency(price)}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}