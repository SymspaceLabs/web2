// components/product-details/product-gallery.tsx
"use client"

import { useState, useMemo, useCallback } from "react"
import { Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Product } from "@/types/products"
import { ProductColor } from "@/types/favorites"

interface ProductGalleryProps {
  product: Product;
  selectedColor: ProductColor | null;
  isCurrentlyFavorited: boolean;
  onToggleFavorite: () => void;
}

export default function ProductGallery({
  product,
  selectedColor,
  isCurrentlyFavorited,
  onToggleFavorite
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  const filteredImages = useMemo(() => {
    if (!product?.images) return []
    return selectedColor 
      ? product.images.filter(img => !img.colorId || img.colorId === selectedColor.id)
      : product.images
  }, [product?.images, selectedColor])

  const nextImage = useCallback(() => {
    if (filteredImages.length > 0) {
      setSelectedImage((prev) => (prev + 1) % filteredImages.length)
    }
  }, [filteredImages.length])

  const prevImage = useCallback(() => {
    if (filteredImages.length > 0) {
      setSelectedImage((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
    }
  }, [filteredImages.length])

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-secondary rounded-lg overflow-hidden shadow-sm">
        <img
          src={filteredImages[selectedImage]?.url || product.thumbnail}
          alt={product.name}
          className="w-full h-full object-contain transition-opacity duration-300"
        />
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-background/80 backdrop-blur-sm hover:bg-background"
          >
            <Share2 className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "bg-background/80 backdrop-blur-sm hover:bg-background",
              isCurrentlyFavorited && "text-red-500",
            )}
            onClick={onToggleFavorite}
          >
            <Heart className={cn("size-4", isCurrentlyFavorited && "fill-current")} />
          </Button>
        </div>

        {/* Navigation Arrows */}
        {filteredImages.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background hidden sm:flex"
              onClick={nextImage}
            >
              <ChevronRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-[calc(50%+3rem)] -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background hidden sm:flex"
              onClick={prevImage}
            >
              <ChevronLeft className="size-4" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {filteredImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {filteredImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative size-16 sm:size-20 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all",
                selectedImage === index
                  ? "border-foreground"
                  : "border-transparent hover:border-muted-foreground/50",
              )}
            >
              <img
                src={image.url}
                alt={`${product.name} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}