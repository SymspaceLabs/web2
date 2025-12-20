// ===================================
// components/media/image-grid.tsx
// ===================================

"use client"

import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ImageWithLoading } from "@/types/media.types"

type ImageGridProps = {
  images: ImageWithLoading[]
  onDelete: (imageId: string) => void
}

export function ImageGrid({ images, onDelete }: ImageGridProps) {
  const sortedImages = [...images].sort((a, b) => a.sortOrder - b.sortOrder)
  
  if (sortedImages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-lg">
        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">No shared images yet</p>
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {sortedImages.map((image, index) => (
        <div key={image.id} className="relative aspect-square rounded-lg border bg-muted overflow-hidden group">
          {/* Index Badge */}
          <div className="absolute top-2 left-2 bg-black/70 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold z-10 backdrop-blur-sm">
            {index + 1}
          </div>

          <img
            src={image.url}
            alt={`Product ${index + 1}`}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={() => onDelete(image.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}