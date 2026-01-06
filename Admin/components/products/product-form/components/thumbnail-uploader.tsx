// components/products/product-form/components/thumbnail-uploader.tsx

"use client"

import { useState } from "react"
import { Image, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { getThumbnail, setImageAsThumbnail, isThumbnailImage } from "@/utils/thumbnail.utils"

type ThumbnailUploaderProps = {
  images: Array<{
    id: string
    url: string
    colorId: string | null
    sortOrder: number
  }>
  onThumbnailChange: (reorderedImages: typeof images) => void  // ✅ Changed signature
  colors: Array<{
    id: string
    name: string
    code: string
  }>
}

export function ThumbnailUploader({ 
  images, 
  onThumbnailChange,
  colors 
}: ThumbnailUploaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  // ✅ Get current thumbnail (first image by sortOrder)
  const currentThumbnail = getThumbnail(images)

  const getColorName = (colorId: string | null) => {
    if (!colorId) return "No color assigned"
    const color = colors.find(c => c.id === colorId)
    return color?.name || "Unknown"
  }

  // ✅ Handle image selection - reorder images
  const handleSelectImage = (imageId: string) => {
    const reordered = setImageAsThumbnail(imageId, images)
    onThumbnailChange(reordered)
    setIsOpen(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Product Thumbnail</CardTitle>
        <p className="text-sm text-muted-foreground">
          The first image is your product thumbnail
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-4">
          {/* Current Thumbnail Preview */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className={cn(
                "w-40 h-40 rounded-lg border-2 overflow-hidden bg-muted flex items-center justify-center transition-all relative group cursor-pointer",
                currentThumbnail 
                  ? "border-muted hover:border-primary" 
                  : "border-dashed border-muted-foreground/25 hover:border-primary"
              )}
            >
              {currentThumbnail ? (
                <>
                  <img
                    src={currentThumbnail.url}
                    alt="Product thumbnail"
                    className="w-full h-full object-cover"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-white text-center">
                      <Image className="h-6 w-6 mx-auto mb-2" />
                      <p className="text-sm font-medium">Change</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center text-muted-foreground p-4">
                  <Image className="h-10 w-10 mx-auto mb-2 opacity-50" />
                  <p className="text-xs font-medium">No images yet</p>
                  <p className="text-xs mt-1 opacity-75">Upload in Media step</p>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Selection Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Select Product Thumbnail</DialogTitle>
              <DialogDescription>
                Choose which image should be the main product thumbnail
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4">
              {images.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-[450px] overflow-y-auto p-1">
                  {images
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map((image) => {
                      const isCurrentThumbnail = isThumbnailImage(image, images)
                      
                      return (
                        <button
                          key={image.id}
                          type="button"
                          onClick={() => handleSelectImage(image.id)}
                          className={cn(
                            "relative aspect-square rounded-lg border-2 overflow-hidden transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer",
                            isCurrentThumbnail 
                              ? "border-primary ring-2 ring-primary ring-offset-2" 
                              : "border-muted hover:border-primary/50"
                          )}
                        >
                          <img
                            src={image.url}
                            alt="Product image"
                            className="w-full h-full object-cover"
                          />
                          
                          {/* Selection Indicator */}
                          {isCurrentThumbnail && (
                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                              <div className="bg-primary rounded-full p-1.5">
                                <Check className="h-4 w-4 text-primary-foreground" />
                              </div>
                            </div>
                          )}
                          
                          {/* Color Label */}
                          {image.colorId && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[10px] py-1 px-1.5 truncate">
                              {getColorName(image.colorId)}
                            </div>
                          )}

                          {/* Position Number */}
                          <div className="absolute top-1 left-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                            #{image.sortOrder + 1}
                          </div>
                        </button>
                      )
                    })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                  <Image className="h-16 w-16 mb-3 opacity-50" />
                  <p className="text-sm font-medium">No images uploaded yet</p>
                  <p className="text-xs mt-1 text-center max-w-sm">
                    Upload images in the Media step first, then come back to select a thumbnail
                  </p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
