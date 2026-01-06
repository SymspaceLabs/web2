"use client"

import { useState } from "react"
import { Upload, Image, Check, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { uploadImage } from "@/api/upload"

type ThumbnailUploaderProps = {
  images: Array<{
    id: string
    url: string
    colorId: string | null
  }>
  selectedThumbnailId: string | null
  thumbnailUrl?: string
  onThumbnailChange: (thumbnailId: string | null, thumbnailUrl?: string) => void
  colors: Array<{
    id: string
    name: string
    code: string
  }>
}

export function ThumbnailUploader({ 
  images, 
  selectedThumbnailId, 
  thumbnailUrl,
  onThumbnailChange,
  colors 
}: ThumbnailUploaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>("existing")
  const [hoveredImage, setHoveredImage] = useState(false)

  const getColorName = (colorId: string | null) => {
    if (!colorId) return "No color"
    const color = colors.find(c => c.id === colorId)
    return color?.name || "Unknown"
  }

  const currentThumbnail = selectedThumbnailId 
    ? images.find(img => img.id === selectedThumbnailId)
    : null

  const displayUrl = thumbnailUrl || currentThumbnail?.url

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image must be less than 5MB')
      return
    }

    setIsUploading(true)
    setUploadError(null)

    try {
      const uploadedUrl = await uploadImage(file)
      onThumbnailChange(null, uploadedUrl)
      setIsOpen(false)
    } catch (error) {
      console.error('Upload failed:', error)
      setUploadError('Failed to upload image. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSelectExisting = (imageId: string) => {
    onThumbnailChange(imageId, undefined)
    setIsOpen(false)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onThumbnailChange(null, undefined)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Product Thumbnail</CardTitle>
        <p className="text-sm text-muted-foreground">
          Select or upload an image to represent your product
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-4">
          {/* Clickable Thumbnail Box */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              onMouseEnter={() => setHoveredImage(true)}
              onMouseLeave={() => setHoveredImage(false)}
              className={cn(
                "w-40 h-40 rounded-lg border-2 overflow-hidden bg-muted flex items-center justify-center transition-all relative group cursor-pointer",
                displayUrl 
                  ? "border-muted hover:border-primary" 
                  : "border-dashed border-muted-foreground/25 hover:border-primary"
              )}
            >
              {displayUrl ? (
                <>
                  <img
                    src={displayUrl}
                    alt="Product thumbnail"
                    className="w-full h-full object-cover"
                  />
                  {/* Hover Overlay with Change Button */}
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
                  <p className="text-xs font-medium">Click to select</p>
                  <p className="text-xs mt-1 opacity-75">thumbnail</p>
                </div>
              )}
            </button>

            {/* Clear button - outside the clickable area */}
            {displayUrl && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-7 w-7 rounded-full shadow-lg z-10"
                onClick={handleClear}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Info Section */}
          {/* <div className="flex-1 space-y-2">
            {displayUrl ? (
              <div className="text-sm">
                {currentThumbnail ? (
                  <p className="font-medium">{getColorName(currentThumbnail.colorId)}</p>
                ) : (
                  <p className="font-medium">Custom uploaded image</p>
                )}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">No thumbnail selected</p>
                <p className="text-xs">
                  Click the box to select from existing images or upload a new one
                </p>
              </div>
            )}
          </div> */}
        </div>

        {/* Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Select Product Thumbnail</DialogTitle>
              <DialogDescription>
                Choose from existing product images or upload a new one
              </DialogDescription>
            </DialogHeader>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="existing">
                  Existing Images ({images.length})
                </TabsTrigger>
                <TabsTrigger value="upload">Upload New</TabsTrigger>
              </TabsList>

              <TabsContent value="existing" className="mt-4">
                {images.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-[450px] overflow-y-auto p-1">
                    {images.map((image) => {
                      const isSelected = image.id === selectedThumbnailId
                      
                      return (
                        <button
                          key={image.id}
                          type="button"
                          onClick={() => handleSelectExisting(image.id)}
                          className={cn(
                            "relative aspect-square rounded-lg border-2 overflow-hidden transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer",
                            isSelected 
                              ? "border-primary ring-2 ring-primary ring-offset-2" 
                              : "border-muted hover:border-primary/50"
                          )}
                        >
                          <img
                            src={image.url}
                            alt="Product image"
                            className="w-full h-full object-cover"
                          />
                          
                          {isSelected && (
                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                              <div className="bg-primary rounded-full p-1.5">
                                <Check className="h-4 w-4 text-primary-foreground" />
                              </div>
                            </div>
                          )}
                          
                          {image.colorId && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[10px] py-1 px-1.5 truncate">
                              {getColorName(image.colorId)}
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
                      Upload images in the Media step first, then come back to select a thumbnail
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="upload" className="mt-4">
                <div className="space-y-4">
                  <label
                    htmlFor="thumbnail-upload-dialog"
                    className={cn(
                      "block relative aspect-video rounded-lg border-2 border-dashed overflow-hidden transition-all cursor-pointer hover:border-primary",
                      isUploading && "cursor-not-allowed opacity-50"
                    )}
                  >
                    <div className="flex flex-col items-center justify-center h-full p-8 text-muted-foreground">
                      {isUploading ? (
                        <>
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-3" />
                          <p className="text-sm font-medium">Uploading...</p>
                        </>
                      ) : (
                        <>
                          <Upload className="h-12 w-12 mb-3 opacity-50" />
                          <p className="text-sm font-medium mb-1">Click to upload image</p>
                          <p className="text-xs text-center">
                            PNG, JPG or WebP (max. 5MB)
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      id="thumbnail-upload-dialog"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                    />
                  </label>

                  {uploadError && (
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                      <p className="text-sm text-destructive">{uploadError}</p>
                    </div>
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