"use client"

import type React from "react"
import { ArrowRight } from "lucide-react" 
import { useRef, useState } from "react"
import { Upload, X, Star, Loader2, Box } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { FormData } from "@/components/products/product-form"
import { toast } from "@/components/ui/use-toast"
import { uploadProductModel } from "@/services/modelUploadService"
import { useEffect } from "react"

// Add type for images with loading state
type ImageWithLoading = {
  id: string;
  url: string;
  colorId: string | null;
  isPrimary: boolean;
  sortOrder: number;
  isUploading?: boolean;
}

// Add type for 3D models
type ModelWithLoading = {
  id: string;
  url: string;
  colorId: string | null;
  fileName: string;
  fileSize: number;
  isUploading?: boolean;
  uploadProgress?: number;
}

/**
 * Uploads a raw File object to the Minio backend and returns the resulting URL.
 * @param {File} file - The raw file object from the user's input.
 * @returns {Promise<string>} The permanent public URL of the uploaded file.
 */
const uploadFileToBackend = async (file: File): Promise<string> => {
    const formData = new FormData();
    // 'file' must match the key used by NestJS's @UseInterceptors(FileInterceptor('file'))
    formData.append('file', file); 

    try {
        // NOTE: Adjust the endpoint URL as necessary
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/file`, { 
            method: 'POST',
            body: formData,
            // DO NOT manually set Content-Type for FormData; the browser handles it.
        });

        if (!response.ok) {
            throw new Error(`Upload failed with status: ${response.status}`);
        }

        const data = await response.json();
        return data.url; // Returns the fileUrl from the NestJS controller
        
    } catch (error) {
        console.error("Image upload failed:", error);
        throw error;
    }
};

type MediaStepProps = {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: (values: Partial<FormData>) => Promise<void>;
  onBack: () => void
}

function ColorImageSection({
  color,
  images,
  onUpload,
  onSetPrimary,
  onDelete,
  onReorder
}: {
  color: { id: string; name: string; code: string }
  images: Array<{ id: string; url: string; isPrimary: boolean; sortOrder: number; isUploading?: boolean }>
  onUpload: (files: FileList) => void
  onSetPrimary: (imageId: string) => void
  onDelete: (imageId: string) => void
  onReorder: (imageId: string, direction: 'up' | 'down') => void
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const sortedImages = [...images].sort((a, b) => a.sortOrder - b.sortOrder)
  
  return (
    <div className="border rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-6 h-6 rounded-full border-2 border-gray-300"
            style={{ backgroundColor: color.code }}
          />
          <Label className="text-base font-medium">{color.name}</Label>
          {images.length === 0 && (
            <span className="text-xs text-destructive">⚠️ No images</span>
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
          {sortedImages.map((image, index) => (
            <ImageCard
              key={image.id}
              image={image}
              isPrimary={image.isPrimary}
              onSetPrimary={() => onSetPrimary(image.id)}
              onDelete={() => onDelete(image.id)}
              onMoveUp={index > 0 ? () => onReorder(image.id, 'up') : undefined}
              onMoveDown={index < sortedImages.length - 1 ? () => onReorder(image.id, 'down') : undefined}
              isUploading={image.isUploading}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-lg">
          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">No images yet</p>
          <p className="text-xs text-muted-foreground">Upload photos of this color variant</p>
        </div>
      )}
    </div>
  )
}

function ImageCard({
  image,
  isPrimary,
  onSetPrimary,
  onDelete,
  onMoveUp,
  onMoveDown,
  isUploading
}: {
  image: { id: string; url: string }
  isPrimary: boolean
  onSetPrimary: () => void
  onDelete: () => void
  onMoveUp?: () => void
  onMoveDown?: () => void
  isUploading?: boolean
}) {
  return (
    <div className="relative aspect-square rounded-lg border bg-muted overflow-hidden group">
      <img
        src={image.url}
        alt="Product"
        className={`w-full h-full object-cover ${isUploading ? 'opacity-50' : ''}`}
      />
      
      {/* Upload Progress Overlay */}
      {isUploading && (
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
          <Loader2 className="h-8 w-8 text-white animate-spin mb-2" />
          <span className="text-white text-sm font-medium">Uploading...</span>
        </div>
      )}
      
      {/* Primary Badge */}
      {isPrimary && !isUploading && (
        <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
          <Star className="h-3 w-3 fill-current" />
          Hero
        </div>
      )}
      
      {/* Action Buttons on Hover - Only show when not uploading */}
      {!isUploading && (
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
          {!isPrimary && (
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={onSetPrimary}
              className="w-full"
            >
              <Star className="h-3 w-3 mr-1" />
              Set Hero
            </Button>
          )}
          
          <div className="flex gap-2 w-full">
            {onMoveUp && (
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={onMoveUp}
                className="flex-1"
                title="Move up"
              >
                ⬆️
              </Button>
            )}
            {onMoveDown && (
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={onMoveDown}
                className="flex-1"
                title="Move down"
              >
                ⬇️
              </Button>
            )}
          </div>
          
          <Button
            type="button"
            size="sm"
            variant="destructive"
            onClick={onDelete}
            className="w-full"
          >
            <X className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      )}
    </div>
  )
}

function ImageGrid({
  images,
  onSetPrimary,
  onDelete,
  showPrimaryBadge = true
}: {
  images: Array<{ id: string; url: string; isPrimary: boolean; sortOrder: number }>
  onSetPrimary: (imageId: string) => void
  onDelete: (imageId: string) => void
  showPrimaryBadge?: boolean
}) {
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
      {sortedImages.map((image) => (
        <div key={image.id} className="relative aspect-square rounded-lg border bg-muted overflow-hidden group">
          <img
            src={image.url}
            alt="Product"
            className="w-full h-full object-cover"
          />
          
          {showPrimaryBadge && image.isPrimary && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" />
              Primary
            </div>
          )}
          
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

function ColorModelSection({
  color,
  model,
  onUpload,
  onDelete
}: {
  color: { id: string; name: string; code: string }
  model: ModelWithLoading | null
  onUpload: (file: File) => void
  onDelete: () => void
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }
  
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-6 h-6 rounded-full border-2 border-gray-300"
            style={{ backgroundColor: color.code }}
          />
          <Label className="text-base font-medium">{color.name}</Label>
          {!model && (
            <span className="text-xs text-muted-foreground">No 3D model</span>
          )}
        </div>
        
        {model && !model.isUploading && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={onDelete}
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        )}
      </div>

      {!model ? (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".glb,.gltf"
            onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload 3D Model (.glb, .gltf)
          </Button>
        </div>
      ) : model.isUploading ? (
        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <div className="flex items-center gap-3 mb-3">
            <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900">Uploading {model.fileName}...</p>
              <p className="text-xs text-blue-700">{formatFileSize(model.fileSize)}</p>
            </div>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${model.uploadProgress || 0}%` }}
            />
          </div>
          <p className="text-xs text-blue-700 mt-2 text-right">{model.uploadProgress || 0}%</p>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded p-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Box className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium text-green-800">Uploaded Successfully</span>
              </div>
              <p className="text-xs text-gray-600 truncate">{model.fileName}</p>
              <p className="text-xs text-gray-500">{formatFileSize(model.fileSize)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function MediaStep({ formData, updateFormData, onNext, onBack }: MediaStepProps) {
  const [dragActive, setDragActive] = useState(false);
  const [viewMode, setViewMode] = useState<"byColor" | "allImages">("byColor");
  const [isUploading, setIsUploading] = useState(false);
  const sharedImageInputRef = useRef<HTMLInputElement>(null);
  
  // ✅ Initialize models from formData with proper loading state
  const [models, setModels] = useState<ModelWithLoading[]>(
    (formData.models || []).map(m => ({ 
      ...m, 
      isUploading: false,
      uploadProgress: 100 // Pre-populated models are already uploaded
    }))
  );

  // ✅ Sync models when formData.models changes (e.g., after API refresh)
  useEffect(() => {
    if (formData.models && formData.models.length > 0) {
      setModels(formData.models.map(m => ({ 
        ...m, 
        isUploading: false,
        uploadProgress: 100
      })));
    }
  }, [formData.models]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processAndUploadFiles(e.dataTransfer.files, null)
    }
  }

  // ⭐ FIXED: Process and Upload Files - now the ONLY upload function
  const processAndUploadFiles = async (files: FileList, colorId: string | null) => {
    setIsUploading(true);
    const filesArray = Array.from(files);
    
    // 1. Create placeholder images with loading state
    const existingImagesForColor = formData.images.filter(img => img.colorId === colorId);
    const placeholderImages = filesArray.map((file, index) => ({
      id: `uploading-${Date.now()}-${index}`,
      url: URL.createObjectURL(file), // Show preview while uploading
      colorId: colorId,
      isPrimary: false,
      sortOrder: existingImagesForColor.length + index,
      isUploading: true, // Mark as uploading
    }));
    
    // 2. Immediately add placeholders to UI and keep reference
    const imagesWithPlaceholders = [...formData.images, ...placeholderImages];
    updateFormData({ images: imagesWithPlaceholders });
    
    // 3. Upload files
    const uploadPromises = filesArray.map(async (file, index) => {
        try {
            const url = await uploadFileToBackend(file);
            
            const newImage = {
                id: `img-${Date.now()}-${Math.random()}`,
                url: url,
                colorId: colorId,
                isPrimary: false,
                sortOrder: existingImagesForColor.length + index,
                isUploading: false, // Upload complete
            };
            
            return { placeholderId: placeholderImages[index].id, newImage };

        } catch (error) {
            toast({
                title: "Upload Failed",
                description: `Could not upload file ${file.name}.`,
                variant: "destructive",
            });
            console.error("Single file upload error:", error);
            return { placeholderId: placeholderImages[index].id, newImage: null };
        }
    });

    const results = await Promise.all(uploadPromises);
    
    // 4. Replace placeholders with actual uploaded images
    // Use imagesWithPlaceholders (not formData.images) to ensure we have the placeholders
    const updatedImages = [...imagesWithPlaceholders];
    
    for (const result of results) {
      const placeholderIndex = updatedImages.findIndex(img => img.id === result.placeholderId);
      
      if (placeholderIndex !== -1) {
        if (result.newImage) {
          // Replace placeholder with actual image
          updatedImages[placeholderIndex] = result.newImage;
        } else {
          // Remove placeholder if upload failed
          updatedImages.splice(placeholderIndex, 1);
        }
      }
    }
    
    // 5. Auto-set first image as primary if needed
    const successfulUploads = results.filter(r => r.newImage !== null);
    if (successfulUploads.length > 0 && colorId) {
      // Check if this color already has a primary image (before we started uploading)
      const existingPrimary = formData.images.some(img => img.colorId === colorId && img.isPrimary);
      
      if (!existingPrimary) {
        const firstNewImage = updatedImages.find(img => img.colorId === colorId && !img.isUploading);
        if (firstNewImage) {
          firstNewImage.isPrimary = true;
        }
      }
    }
    
    updateFormData({ images: updatedImages });
    
    if (successfulUploads.length > 0) {
      toast({
        title: "Upload Successful",
        description: `${successfulUploads.length} image(s) uploaded successfully.`,
      });
    }

    setIsUploading(false);
  }

  const processAndUploadModel = async (file: File, colorId: string) => {
    const placeholderModel: ModelWithLoading = {
      id: `uploading-${Date.now()}`,
      url: '',
      colorId: colorId,
      fileName: file.name,
      fileSize: file.size,
      isUploading: true,
      uploadProgress: 0,
    };

    setModels(prev => [...prev.filter(m => m.colorId !== colorId), placeholderModel]);

    try {
      const url = await uploadProductModel(file, (progress) => {
        setModels(prev => prev.map(m =>
          m.id === placeholderModel.id
            ? { ...m, uploadProgress: progress }
            : m
        ));
      });

      const newModel: ModelWithLoading = {
        id: `model-${Date.now()}`,
        url: url,
        colorId: colorId,
        fileName: file.name,
        fileSize: file.size,
        isUploading: false,
      };

      setModels(prev => prev.map(m =>
        m.id === placeholderModel.id ? newModel : m
      ));

      toast({
        title: "Model Uploaded",
        description: `${file.name} uploaded successfully.`,
      });

    } catch (error) {
      console.error("Model upload failed:", error);
      setModels(prev => prev.filter(m => m.id !== placeholderModel.id));
      
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Could not upload 3D model.",
        variant: "destructive",
      });
    }
  };

  const removeModel = (colorId: string) => {
    setModels(prev => prev.filter(m => m.colorId !== colorId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // ✅ Filter out uploading models and prepare final payload
    const finalModels = models
      .filter(m => !m.isUploading && m.url) // Only include successfully uploaded models
      .map(m => ({
        colorId: m.colorId,
        url: m.url,
        fileName: m.fileName,
        fileSize: m.fileSize,
      }));

    const stepThreeData: Partial<FormData> = {
        images: formData.images,
        models: finalModels,
    };
    
    await onNext(stepThreeData)
  }

  const setPrimaryImageForColor = (imageId: string, colorId: string) => {
    const updated = formData.images.map(img => ({
      ...img,
      isPrimary: img.colorId === colorId ? img.id === imageId : img.isPrimary
    }))
    updateFormData({ images: updated })
  }

  const removeImageById = (imageId: string) => {
    const imageToRemove = formData.images.find(img => img.id === imageId)
    if (!imageToRemove) return
    
    const newImages = formData.images.filter(img => img.id !== imageId)
    
    if (imageToRemove.isPrimary) {
      const firstOfColor = newImages.find(img => img.colorId === imageToRemove.colorId)
      if (firstOfColor) {
        firstOfColor.isPrimary = true
      }
    }
    
    updateFormData({ images: newImages })
  }

  const reorderImage = (imageId: string, direction: 'up' | 'down') => {
    const image = formData.images.find(img => img.id === imageId)
    if (!image) return
    
    const colorImages = formData.images
      .filter(img => img.colorId === image.colorId)
      .sort((a, b) => a.sortOrder - b.sortOrder)
    
    const index = colorImages.findIndex(img => img.id === imageId)
    if (index === -1) return
    
    if (direction === 'up' && index > 0) {
      const temp = colorImages[index - 1].sortOrder
      colorImages[index - 1].sortOrder = colorImages[index].sortOrder
      colorImages[index].sortOrder = temp
    } else if (direction === 'down' && index < colorImages.length - 1) {
      const temp = colorImages[index + 1].sortOrder
      colorImages[index + 1].sortOrder = colorImages[index].sortOrder
      colorImages[index].sortOrder = temp
    }
    
    updateFormData({ images: [...formData.images] })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Media</h2>
        <p className="text-sm text-muted-foreground mb-6">Add images to showcase your product</p>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <Label className="text-sm font-medium">Organize by:</Label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={viewMode === "byColor" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("byColor")}
          >
            By Color
          </Button>
          <Button
            type="button"
            variant={viewMode === "allImages" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("allImages")}
          >
            All Images
          </Button>
        </div>
      </div>

      {viewMode === "allImages" && (
        <div className="space-y-4">
          <Label>Product Images</Label>

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-border"
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-full bg-muted p-4">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Drag and drop images here</p>
                <p className="text-sm text-muted-foreground mt-1">or click to browse</p>
              </div>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => e.target.files && processAndUploadFiles(e.target.files, null)}
                className="hidden"
                id="file-upload"
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => document.getElementById("file-upload")?.click()}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Browse Files"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Grid */}
      <div className="space-y-4">
        {viewMode === "byColor" ? (
          <div className="space-y-6">
            {formData.selectedColors.length === 0 ? (
              <div className="border rounded-lg p-8 text-center">
                <p className="text-muted-foreground">ℹ️ No colors configured</p>
                <p className="text-sm text-muted-foreground mt-1">Please add colors in Step 2 first</p>
              </div>
            ) : (
              <>
                {/* Section for each color */}
                {formData.selectedColors.map((color) => (
                  <ColorImageSection
                    key={color.id}
                    color={color}
                    images={formData.images.filter(img => img.colorId === color.id)}
                    onUpload={(files) => processAndUploadFiles(files, color.id)} // ✅ FIXED: Pass color.id correctly
                    onSetPrimary={(imageId) => setPrimaryImageForColor(imageId, color.id)}
                    onDelete={(imageId) => removeImageById(imageId)}
                    onReorder={(imageId, direction) => reorderImage(imageId, direction)}
                  />
                ))}
                
                {/* Shared Images Section */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📷</span>
                      <Label className="text-base font-medium">Shared Images (all colors)</Label>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => sharedImageInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {isUploading ? "Uploading..." : "Upload"}
                    </Button>
                    <input
                      ref={sharedImageInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => e.target.files && processAndUploadFiles(e.target.files, null)} // ✅ FIXED: null for shared images
                      className="hidden"
                    />
                  </div>
                  
                  <ImageGrid
                    images={formData.images.filter(img => img.colorId === null)}
                    onSetPrimary={(id) => {}}
                    onDelete={removeImageById}
                    showPrimaryBadge={false}
                  />
                </div>
              </>
            )}
          </div>
        ) : (
          formData.images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((image, index) => (
                <div key={image.id || index} className="relative aspect-square rounded-lg border bg-muted overflow-hidden group">
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {image.isPrimary && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      Primary
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    {!image.isPrimary && (
                      <Button type="button" size="sm" variant="secondary" onClick={() => setPrimaryImage(index)}>
                        Set Primary
                      </Button>
                    )}
                    <Button type="button" size="sm" variant="destructive" onClick={() => removeImage(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed rounded-lg p-12 text-center">
              <p className="text-muted-foreground">No images uploaded yet</p>
            </div>
          )
        )}
      </div>

      {/* 3D Models by Color Section */}
      {viewMode === "byColor" && formData.selectedColors.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 pt-6 border-t">
            <Box className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">3D Models by Color</h3>
            <span className="text-xs text-muted-foreground">(Optional)</span>
          </div>
          <p className="text-sm text-muted-foreground">Upload a 3D model for each color variant to enhance the product experience.</p>
          
          <div className="space-y-4">
            {formData.selectedColors.map((color) => (
              <ColorModelSection
                key={color.id}
                color={color}
                model={models.find(m => m.colorId === color.id) || null}
                onUpload={(file) => processAndUploadModel(file, color.id)}
                onDelete={() => removeModel(color.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Validation Messages */}
      {formData.selectedColors.length > 0 && (
        <div className="space-y-2">
          {formData.selectedColors
            .filter(color => !formData.images.some(img => img.colorId === color.id))
            .map(color => (
              <div key={color.id} className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded p-3">
                <span>⚠️</span>
                <span><strong>{color.name}</strong> has no images. Consider adding at least one image.</span>
              </div>
            ))
          }
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm font-medium text-blue-900 mb-2">💡 Tips:</p>
        <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
          <li>Each color should have at least 1 image</li>
          <li>The "Hero" image is shown when buyers select this color</li>
          <li>Use arrow buttons to reorder images</li>
          <li>Shared images appear for all color variants</li>
          <li>Recommended: 800x800px minimum, square aspect ratio</li>
          <li>3D models are optional but provide an immersive experience</li>
          <li>Supported 3D formats: .glb, .gltf (GLB recommended for better compression)</li>
        </ul>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" disabled={isUploading || models.some(m => m.isUploading)}>
          {isUploading || models.some(m => m.isUploading) ? "Uploading..." : "Next Step"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}