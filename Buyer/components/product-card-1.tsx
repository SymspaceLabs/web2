// =============================================================
// Product Card 1
// --------------------------------------------------------------
// Used In:
// 1. Landing Page
// 2. Marketplace
// =============================================================

import Link from "next/link";
import Image from "next/image";
import { currency } from "@/lib";
import { JSX } from "react";
import { Product } from "@/types/products";

// =============================================================
// Types
// =============================================================

interface ProductCard1Props {
  product: Product;
}

// =============================================================
// Component
// =============================================================

const ProductCard1 = ({ product }: ProductCard1Props): JSX.Element => {
  const hasSale = product.displayPrice.salePrice 
    && product.displayPrice.salePrice > 0 
    && product.displayPrice.salePrice < product.displayPrice.price;

  // Use thumbnail directly, fall back to first image url
  const imageUrl = product.thumbnail || product.images?.[0]?.url || "/placeholder.png";
  const imageAlt = product.images?.[0]?.altText || product.name;

  return (
    <Link href={`/products/${product.slug}`} className="w-full block font-helvetica">
      <div className="flex flex-col bg-white/10 rounded-xl mb-4 w-full h-full transition-colors duration-300 hover:bg-white/15">
        <div className="w-full">
          <Image
            alt={imageAlt}
            width={355}
            height={355}
            src={imageUrl}
            className="object-cover object-center w-full h-auto aspect-square rounded-t-xl"
          />
        </div>
        <div className="px-3 sm:px-8 pb-8 flex-grow">
          <p className="text-white text-[10px] sm:text-lg font-medium whitespace-nowrap overflow-hidden text-ellipsis">
            {product.name}
          </p>

          <p className="uppercase text-white/50 text-[10px] sm:text-[17px] whitespace-nowrap overflow-hidden text-ellipsis">
            {product?.company?.entityName}
          </p>

          <div className="flex gap-2">
            <p className="text-white text-[10px] sm:text-[17px] font-medium">
              {hasSale ? currency(product.displayPrice.salePrice!) : currency(product.displayPrice.price)}
            </p>
            {hasSale && (
              <p className="text-white/50 text-[10px] sm:text-[17px] font-medium line-through">
                {currency(product.displayPrice.price)}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard1;