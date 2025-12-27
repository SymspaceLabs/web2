// ===================================
// FILE: components/media/all-images-grid.tsx
// ===================================

"use client"

import { useState } from "react"
import { X, Loader2, AlertCircle, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ImageWithLoading } from "@/types/media.type"

type AllImagesGridProps = {
  images: ImageWithLoading[]
  onDelete: (imageId: string) => void
  onRetry: (imageId: string) => void
}

export function AllImagesGrid({ images, onDelete, onRetry }: AllImagesGridProps) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  
  const sortedImages = [...images].sort((a, b) => {
    // Sort by colorId first, then by sortOrder
    if (a.colorId === b.colorId) {
      return a.sortOrder - b.sortOrder
    }
    if (a.colorId === null) return 1 // Shared images at the end
    if (b.colorId === null) return -1
    return (a.colorId || '').localeCompare(b.colorId || '')
  })

  if (sortedImages.length === 0) {
    return (
      <div className="border-2 border-dashed rounded-lg p-12 text-center">
        <p className="text-muted-foreground">No images uploaded yet</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {sortedImages.map((image, globalIndex) => (
        <div
          key={image.id}
          className={`relative aspect-square rounded-lg border bg-muted overflow-hidden group ${
            image.error ? 'border-destructive' : ''
          }`}
        >
          {/* Global Index Badge */}
          {!image.isUploading && !image.error && (
            <div className="absolute top-2 left-2 bg-black/70 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold z-10 backdrop-blur-sm">
              {globalIndex + 1}
            </div>
          )}

          {/* Color Badge (if belongs to a color) */}
          {!image.isUploading && !image.error && image.colorId && (
            <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium z-10 backdrop-blur-sm">
              Color
            </div>
          )}

          {/* Shared Badge */}
          {!image.isUploading && !image.error && image.colorId === null && (
            <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium z-10 backdrop-blur-sm">
              Shared
            </div>
          )}

          <img
            src={imageErrors[image.id] ? "/api/placeholder/400/400" : image.url}
            alt={`Product ${globalIndex + 1}`}
            className={`w-full h-full object-cover ${image.isUploading || image.error ? 'opacity-50' : ''}`}
            onError={() => setImageErrors(prev => ({ ...prev, [image.id]: true }))}
          />

          {/* Upload Progress Overlay */}
          {image.isUploading && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4">
              <Loader2 className="h-8 w-8 text-white animate-spin mb-3" />
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${image.uploadProgress || 0}%` }}
                />
              </div>
              <span className="text-white text-xs font-medium">{image.uploadProgress || 0}%</span>
            </div>
          )}

          {/* Error State */}
          {image.error && (
            <div className="absolute inset-0 bg-destructive/90 flex flex-col items-center justify-center p-4">
              <AlertCircle className="h-8 w-8 text-white mb-2" />
              <p className="text-white text-xs text-center mb-3">{image.error}</p>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => onRetry(image.id)}
                className="w-full"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Retry
              </Button>
            </div>
          )}

          {/* Action Buttons on Hover */}
          {!image.isUploading && !image.error && (
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                type="button"
                size="sm"
                variant="destructive"
                onClick={() => onDelete(image.id)}
              >
                <X className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}