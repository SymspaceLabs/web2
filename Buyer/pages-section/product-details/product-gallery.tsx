// components/product-details/product-gallery.tsx
"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { Heart, ChevronLeft, ChevronRight, Box } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Product, ProductImage, ThreeDModel } from "@/types/products"
import SymGLTFViewer from "@/components/sym-gltf-viewer"

interface ProductGalleryProps {
  product: Product
  selectedColor: string | null
  isCurrentlyFavorited: boolean
  onToggleFavorite: () => void
}

export default function ProductGallery({
  product,
  selectedColor,
  isCurrentlyFavorited,
  onToggleFavorite,
}: ProductGalleryProps) {

  const filteredImages = useMemo<ProductImage[]>(() => {
    if (!product?.images?.length) return []
    if (!selectedColor) return product.images
    return product.images.filter((img) => img.colorCode === selectedColor)
  }, [product?.images, selectedColor])

  const filteredThreeDModels = useMemo<ThreeDModel[]>(() => {
    if (!product?.threeDModels?.length) return []
    if (!selectedColor) return product.threeDModels
    return product.threeDModels.filter((m) => m.colorCode === selectedColor)
  }, [product?.threeDModels, selectedColor])

  const has3DModel = filteredThreeDModels.length > 0
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    setSelectedImage(0)
  }, [selectedColor])

  const totalSlots = 1 + filteredImages.length

  const prevImage = useCallback(() => {
    setSelectedImage((prev) => (prev - 1 + totalSlots) % totalSlots)
  }, [totalSlots])

  const nextImage = useCallback(() => {
    setSelectedImage((prev) => (prev + 1) % totalSlots)
  }, [totalSlots])

  const isModelSlot = selectedImage === 0
  const currentImageUrl = !isModelSlot ? filteredImages[selectedImage - 1]?.url ?? null : null

  return (
    <div className="flex flex-col gap-4">

      {/* Main Viewer */}
      <div className="relative aspect-square bg-muted rounded-xl overflow-hidden shadow-sm">
        {isModelSlot ? (
          has3DModel ? (
            <div className="w-full h-full">
              <SymGLTFViewer modelUrl={filteredThreeDModels[0].url} />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground">
              <Box className="size-10 opacity-40" />
              <p className="text-sm">No 3D model for this colour</p>
            </div>
          )
        ) : (
          <img
            key={currentImageUrl}
            src={currentImageUrl ?? product.thumbnail}
            alt={product.name}
            className="w-full h-full object-contain animate-in fade-in duration-200"
          />
        )}

        {/* Favourite */}
        <div className="absolute top-3 right-3 z-10">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "bg-background/80 backdrop-blur-sm hover:bg-background shadow",
              isCurrentlyFavorited && "text-red-500 border-red-200"
            )}
            onClick={onToggleFavorite}
          >
            <Heart className={cn("size-4", isCurrentlyFavorited && "fill-current")} />
          </Button>
        </div>

        {/* Arrows */}
        {totalSlots > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background shadow hidden sm:flex"
              onClick={prevImage}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background shadow hidden sm:flex"
              onClick={nextImage}
            >
              <ChevronRight className="size-4" />
            </Button>
          </>
        )}

        {/* Mobile dots */}
        {totalSlots > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 sm:hidden">
            {Array.from({ length: totalSlots }).map((_, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  selectedImage === i ? "bg-foreground w-3" : "bg-foreground/30 w-1.5"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-2 overflow-x-auto pb-1">

        {/* 3D slot — always first */}
        <button
          onClick={() => setSelectedImage(0)}
          className={cn(
            "relative size-16 sm:size-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all bg-muted",
            selectedImage === 0
              ? "border-foreground ring-1 ring-foreground"
              : "border-transparent hover:border-muted-foreground/40"
          )}
          aria-label="View 3D model"
        >
          <img
            src="/images/products/3d/3d-thumbnail.png"
            alt="3D preview"
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-0 left-0 right-0 bg-black/55 text-white text-[9px] font-semibold text-center py-0.5 tracking-widest uppercase">
            3D
          </span>
        </button>

        {/* Color-filtered image thumbnails */}
        {filteredImages.map((image, index) => {
          const slotIndex = index + 1
          return (
            <button
              key={`${selectedColor}-${index}`}
              onClick={() => setSelectedImage(slotIndex)}
              className={cn(
                "relative size-16 sm:size-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all bg-muted",
                selectedImage === slotIndex
                  ? "border-foreground ring-1 ring-foreground"
                  : "border-transparent hover:border-muted-foreground/40"
              )}
            >
              <img
                src={image.url}
                alt={`${product.name} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          )
        })}

        {filteredImages.length === 0 && (
          <div className="size-16 sm:size-20 rounded-lg flex-shrink-0 border-2 border-dashed border-muted-foreground/20 flex items-center justify-center text-muted-foreground/40 text-[10px] text-center px-1">
            No images
          </div>
        )}
      </div>
    </div>
  )
}