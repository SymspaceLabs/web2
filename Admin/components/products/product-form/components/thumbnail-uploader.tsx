// components/products/product-form/components/thumbnail-uploader.tsx

"use client"

import { useState, useRef } from "react"
import { Image, Check, Upload, X, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { getThumbnail, setImageAsThumbnail, isThumbnailImage, clearThumbnail } from "@/utils/thumbnail.utils"

type ThumbnailUploaderProps = {
  images: Array<{
    id: string
    url: string
    colorId: string | null
    sortOrder: number
    isThumbnail?: boolean
  }>
  onThumbnailChange: (updatedImages: typeof images) => void
  onNewImageUpload?: (file: File) => Promise<void>
  colors: Array<{
    id: string
    name: string
    code: string
  }>
}

export function ThumbnailUploader({ 
  images, 
  onThumbnailChange,
  onNewImageUpload,
  colors 
}: ThumbnailUploaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const currentThumbnail = getThumbnail(images)

  // Simulate progress for visual feedback
  const simulateProgress = () => {
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + 10
      })
    }, 150)
    return interval
  }

  // ✅ Handle thumbnail selection
  const handleSelectImage = (imageId: string) => {
    const updatedImages = setImageAsThumbnail(imageId, images)
    onThumbnailChange(updatedImages)
    setIsOpen(false)
  }

  // ✅ Handle thumbnail clear
  const handleClearThumbnail = () => {
    const updatedImages = clearThumbnail(images)
    onThumbnailChange(updatedImages)
  }

  // ✅ Handle file upload
  const handleFileUpload = async (file: File) => {
    if (!onNewImageUpload) return

    setIsUploading(true)
    const progressInterval = simulateProgress()

    try {
      await onNewImageUpload(file)
      clearInterval(progressInterval)
      setUploadProgress(100)
      
      // Brief delay to show 100% before closing
      setTimeout(() => {
        setIsOpen(false)
        setIsUploading(false)
        setUploadProgress(0)
      }, 500)
    } catch (error) {
      clearInterval(progressInterval)
      console.error('Failed to upload image:', error)
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  // ✅ Handle new image upload from file input
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    await handleFileUpload(file)

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // ✅ Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      await handleFileUpload(file)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Product Thumbnail</CardTitle>
        <p className="text-sm text-muted-foreground">
          Select the main image that represents your product
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-4">
          {/* Thumbnail Preview */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setIsOpen(true)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsOpen(true) }}
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
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-white text-center">
                    <Image className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">Change</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClearThumbnail()
                  }}
                  className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg transition-colors z-10 cursor-pointer"
                  title="Clear thumbnail"
                >
                  <X className="h-3 w-3" />
                </button>
              </>
            ) : (
              <div className="text-center text-muted-foreground p-4">
                <Image className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <p className="text-xs font-medium">No thumbnail selected</p>
                <p className="text-xs mt-1 opacity-75">Click to select</p>
              </div>
            )}
          </div>

          {/* Thumbnail Info & Actions */}
          <div className="flex-1 space-y-2">
            {currentThumbnail ? (
              <>
                <p className="text-sm font-medium">Main Product Image</p>
                <p className="text-xs text-muted-foreground">
                  Shows in listings and search results
                </p>
                <div className="flex gap-2 mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsOpen(true)}
                  >
                    Change Thumbnail
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-sm">
                <p className="mb-2 font-medium text-orange-600">⚠️ No thumbnail selected</p>
                <p className="text-xs text-muted-foreground">
                  {images.length > 0 
                    ? "Select an existing image or upload a new one"
                    : "Upload images in Step 3 first"}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOpen(true)}
                  className="mt-2"
                >
                  Select Thumbnail
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Selection Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Select Product Thumbnail</DialogTitle>
              <DialogDescription>
                Choose from existing images or upload a new one
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="existing" className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="existing" className="cursor-pointer">
                  Choose from Images ({images.length})
                </TabsTrigger>
                <TabsTrigger value="upload" className="cursor-pointer">
                  Upload New Image
                </TabsTrigger>
              </TabsList>

              {/* Tab 1: Existing Images */}
              <TabsContent value="existing" className="mt-4">
                {images.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-[450px] overflow-y-auto px-2 py-4">
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
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            <img
                              src={image.url}
                              alt="Product image"
                              className="w-full h-full object-cover"
                            />
                            
                            {isCurrentThumbnail && (
                              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                <div className="bg-primary rounded-full p-1.5">
                                  <Check className="h-4 w-4 text-primary-foreground" />
                                </div>
                              </div>
                            )}
                          </button>
                        )
                      })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                    <Image className="h-16 w-16 mb-3 opacity-50" />
                    <p className="text-sm font-medium">No images uploaded yet</p>
                    <p className="text-xs mt-1 text-center max-w-sm">
                      Upload images in the Media step first, or switch to the Upload tab
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* Tab 2: Upload New Image with Drag & Drop */}
              <TabsContent value="upload" className="mt-4">
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={cn(
                    "border-2 border-dashed rounded-lg p-12 text-center transition-all",
                    isDragging 
                      ? "border-primary bg-primary/5 scale-[1.02]" 
                      : "border-muted-foreground/25 hover:border-primary",
                    isUploading && "cursor-not-allowed opacity-75"
                  )}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={isUploading || !onNewImageUpload}
                  />
                  
                  {isUploading ? (
                    <div className="space-y-4">
                      <div className="relative">
                        <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">{uploadProgress}%</span>
                        </div>
                      </div>
                      <p className="text-sm font-medium">Uploading...</p>
                      <div className="w-full max-w-xs mx-auto">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-300 ease-out"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className={cn(
                        "h-12 w-12 mx-auto mb-4 text-muted-foreground transition-all",
                        isDragging && "text-primary animate-bounce"
                      )} />
                      <p className="text-sm font-medium mb-2">
                        {isDragging ? 'Drop image here' : 'Drag & drop or click to upload'}
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        PNG, JPG or WEBP (max. 5MB)
                      </p>
                      <Button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading || !onNewImageUpload}
                      >
                        Choose File
                      </Button>
                      {!onNewImageUpload && (
                        <p className="text-xs text-orange-600 mt-4">
                          ⚠️ Image upload handler not configured
                        </p>
                      )}
                    </>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}