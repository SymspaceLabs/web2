// ===================================
// FILE: components/media/ColorImageSection.tsx
// ===================================


"use client"

import { useEffect, useRef, useState } from "react"
import { Upload, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ImageCard } from "./image-card"
import type { Color, ImageWithLoading } from "@/types/media.type"

type ColorImageSectionProps = {
  color: Color
  images: ImageWithLoading[]
  onUpload: (files: FileList) => void
  onDelete: (imageId: string) => void
  onReorder: (draggedId: string, targetId: string) => void
  onRetry: (imageId: string) => void
}

export function ColorImageSection({
  color,
  images,
  onUpload,
  onDelete,
  onReorder,
  onRetry
}: ColorImageSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [draggedImageId, setDraggedImageId] = useState<string | null>(null)
  const [dropTargetId, setDropTargetId] = useState<string | null>(null)
  const [isDraggingFile, setIsDraggingFile] = useState(false)
  
  const sortedImages = [...images].sort((a, b) => a.sortOrder - b.sortOrder)

  // File drag and drop handlers
  const handleFileDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.types.includes('Files')) {
      setIsDraggingFile(true)
    }
  }

  const handleFileDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleFileDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Only set to false if leaving the section container
    if (e.currentTarget === e.target) {
      setIsDraggingFile(false)
    }
  }

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingFile(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files)
    }
  }

  // Image reorder drag and drop handlers
  const handleImageDragStart = (imageId: string) => (e: React.DragEvent) => {
    setDraggedImageId(imageId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleImageDragOver = (imageId: string) => (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedImageId && draggedImageId !== imageId) {
      setDropTargetId(imageId)
    }
  }

  const handleImageDrop = (targetId: string) => (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedImageId && draggedImageId !== targetId) {
      onReorder(draggedImageId, targetId)
    }
    setDraggedImageId(null)
    setDropTargetId(null)
  }

  const handleImageDragEnd = () => {
    setDraggedImageId(null)
    setDropTargetId(null)
  }
  
  return (
    <div 
      className={`border rounded-lg p-4 transition-all ${
        isDraggingFile ? 'border-primary border-2 bg-primary/5' : ''
      }`}
      onDragEnter={handleFileDragEnter}
      onDragOver={handleFileDragOver}
      onDragLeave={handleFileDragLeave}
      onDrop={handleFileDrop}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-6 h-6 rounded-full border-2 border-gray-300"
            style={{ backgroundColor: color.code }}
          />
          <Label className="text-base font-medium">{color.name}</Label>
          {images.length === 0 && (
            <span className="text-xs text-muted-foreground">No images</span>
          )}
          {images.length > 0 && (
            <span className="text-xs text-muted-foreground">({images.length} {images.length === 1 ? 'image' : 'images'})</span>
          )}
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => e.target.files && onUpload(e.target.files)}
          className="hidden"
        />
      </div>
      
      {/* Images Grid */}
      {sortedImages.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sortedImages.map((image, index) => {
            return (
              <ImageCard
                key={image.id}
                image={image}
                index={index}
                onDelete={() => onDelete(image.id)}
                onRetry={image.error ? () => onRetry(image.id) : undefined}
                onDragStart={handleImageDragStart(image.id)}
                onDragOver={handleImageDragOver(image.id)}
                onDrop={handleImageDrop(image.id)}
                onDragEnd={handleImageDragEnd}
                isDragging={draggedImageId === image.id}
                isDropTarget={dropTargetId === image.id}
              />
            )
          })
          }
          
          
        </div>
      ) : (
        <div className={`flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-lg transition-colors ${
          isDraggingFile ? 'border-primary bg-primary/10' : ''
        }`}>
          <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            {isDraggingFile ? 'Drop images here' : 'No images yet'}
          </p>
          {!isDraggingFile && (
            <p className="text-xs text-muted-foreground">Drag & drop or click Upload</p>
          )}
        </div>
      )}

      {/* File Drop Overlay */}
      {isDraggingFile && sortedImages.length > 0 && (
        <div className="mt-4 border-2 border-dashed border-primary rounded-lg p-8 bg-primary/10 text-center">
          <Upload className="h-8 w-8 text-primary mx-auto mb-2" />
          <p className="text-sm font-medium text-primary">Drop images to add them</p>
        </div>
      )}
    </div>
  )
}