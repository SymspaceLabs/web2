// ===================================
// FILE: components/media/image-card.tsx
// ===================================

"use client"

import { X, Loader2, AlertCircle, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

type ImageCardProps = {
  image: { id: string; url: string; isUploading?: boolean; uploadProgress?: number; error?: string }
  index: number
  onDelete: () => void
  onRetry?: () => void
  onDragStart: (e: React.DragEvent) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
  onDragEnd: () => void
  isDragging: boolean
  isDropTarget: boolean
}

export function ImageCard({
  image,
  index,
  onDelete,
  onRetry,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  isDragging,
  isDropTarget
}: ImageCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <div 
      className={`relative aspect-square rounded-lg border bg-muted overflow-hidden group transition-all ${
        isDragging ? 'opacity-40 scale-95' : ''
      } ${
        isDropTarget ? 'ring-2 ring-primary scale-105' : ''
      } ${
        image.error ? 'border-destructive' : ''
      }`}
      draggable={!image.isUploading && !image.error}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
    >
      {/* Index Badge */}
      {!image.isUploading && !image.error && (
        <div className="absolute top-2 left-2 bg-black/70 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold z-10 backdrop-blur-sm">
          {index + 1}
        </div>
      )}

      {/* Image */}
      <img
        src={imageError ? "/api/placeholder/400/400" : image.url}
        alt={`Product ${index + 1}`}
        className={`w-full h-full object-cover ${image.isUploading || image.error ? 'opacity-50' : ''}`}
        onError={() => setImageError(true)}
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
          {onRetry && (
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={onRetry}
              className="w-full"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Retry Upload
            </Button>
          )}
        </div>
      )}
      
      {/* Action Buttons on Hover */}
      {!image.isUploading && !image.error && (
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            type="button"
            size="sm"
            variant="destructive"
            onClick={onDelete}
          >
            <X className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      )}

      {/* Drag Handle Indicator */}
      {!image.isUploading && !image.error && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-black/70 text-white px-2 py-1 rounded text-xs backdrop-blur-sm cursor-move">
            ⋮⋮
          </div>
        </div>
      )}
    </div>
  )
}