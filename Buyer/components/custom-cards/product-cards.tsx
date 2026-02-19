// src/components/custom-cards/product-cards/product-card-3.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { Company } from '@/types/company';

interface DisplayPrice {
  price: number;
  salePrice?: number;
  hasSale?: boolean;
}

interface ProductImage {
  url: string;
  alt?: string;
}

interface Product {
  id: string | number;
  slug: string;
  name: string;
  displayPrice?: DisplayPrice;
  company?: Company;
  images?: ProductImage[];
  availability?: string;
}

interface ProductCard3Props {
  product: Product;
  company?: Company;
}

export default function ProductCard3({ product, company }: ProductCard3Props) {
  const [isWishListed, setIsWishListed] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Destructure price fields
  const { salePrice, price, hasSale } = product.displayPrice || {};

  // Get company name
  const companyName = company?.entityName || product.company?.entityName || '';

  // Get image URL with fallback
  const imageUrl = product.images?.[0]?.url || '/placeholder-product.jpg';

  // Calculate discount percentage
  const discountPercentage =
    hasSale && price && salePrice ? Math.round(((price - salePrice) / price) * 100) : 0;

  // Handle wishlist toggle
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishListed(!isWishListed);
    // TODO: Add your wishlist logic here
  };

  return (
    <Link href={`/products/${product.slug}`} className="block h-full group">
      <Card className="py-0 h-full gap-0 overflow-hidden border border-gray-200 rounded-xl bg-gray-50 transition-all duration-300 hover:shadow-lg">
        {/* Image Container */}
        <div className="relative h-[300px] w-full overflow-hidden bg-white">
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistClick}
            className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all duration-200 hover:scale-110"
            aria-label={isWishListed ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                isWishListed ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </button>

          {/* Sale Badge */}
          {hasSale && discountPercentage > 0 && (
            <Badge className="absolute top-3 left-3 z-10 bg-red-500 text-white hover:bg-red-600">
              -{discountPercentage}%
            </Badge>
          )}

          {/* Availability Badge */}
          {product.availability && product.availability !== 'In Stock' && (
            <Badge
              variant="secondary"
              className="absolute bottom-3 left-3 z-10 bg-gray-900/80 text-white"
            >
              {product.availability}
            </Badge>
          )}

          {/* Product Image */}
          <div className="relative w-full h-full transition-transform duration-300">
            {!imageError ? (
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover"
                onError={() => setImageError(true)}
                priority={false}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <div className="text-center text-gray-400">
                  <svg
                    className="w-16 h-16 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm">Image unavailable</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card Content */}
        <CardContent className="p-4 bg-white">
          {/* Product Name */}
          <h3 className="text-sm sm:text-base font-semibold line-clamp-1 mb-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Company Name */}
          {companyName && (
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">{companyName}</p>
          )}

          {/* Price Section */}
          <div className="flex items-center gap-2">
            {hasSale ? (
              <>
                <span className="text-base sm:text-lg font-bold text-primary">
                  ${salePrice?.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through">${price?.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-base sm:text-lg font-bold text-primary">
                ${price?.toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// Export as named export as well for flexibility
export { ProductCard3 };