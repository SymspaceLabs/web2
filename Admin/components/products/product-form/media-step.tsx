
"use client"

import type React from "react"
import { ArrowRight, Upload, Box, CheckCircle2, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import type { FormData } from "@/components/products/product-form"
import { uploadFileToBackend, validateImageFile } from "@/utils/media.utils"

// Internal Imports
import type { ImageWithLoading, ModelWithLoading } from "@/types/media.type"
import { ColorModelSection } from "./components/color-model-section"
import { ColorImageSection } from "./components/color-image-section"
import { SharedImageSection } from "./components/shared-image-section"
import { AllImagesGrid } from "./components/all-images-grid"

// Services
import { uploadProductModel } from "@/services/model-upload-service"

type MediaStepProps = {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: (values: Partial<FormData>) => Promise<void>
  onBack: () => void
}

export function MediaStep({ formData, updateFormData, onNext, onBack }: MediaStepProps) {
  const [dragActive, setDragActive] = useState(false)
  const [viewMode, setViewMode] = useState<"byColor" | "allImages">("byColor")
  const [uploadStats, setUploadStats] = useState({ success: 0, failed: 0, total: 0 })
  
  const [models, setModels] = useState<ModelWithLoading[]>(
    (formData.models || []).map(m => ({ 
      ...m, 
      isUploading: false,
      uploadProgress: 100
    }))
  )

  useEffect(() => {
    if (formData.models && formData.models.length > 0) {
      setModels(formData.models.map(m => ({ 
        ...m, 
        isUploading: false,
        uploadProgress: 100
      })))
    }
  }, [formData.models])

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

  const processAndUploadFiles = async (files: FileList, colorId: string | null) => {
    console.log('🔵 [UPLOAD START]', { 
      fileCount: files.length, 
      colorId,
      timestamp: new Date().toISOString()
    })
    
    const filesArray = Array.from(files)
    
    // Validate files first
    const validatedFiles = filesArray.map(file => ({
      file,
      validation: validateImageFile(file)
    }))

    const invalidFiles = validatedFiles.filter(f => !f.validation.valid)
    if (invalidFiles.length > 0) {
      console.log('⚠️ [VALIDATION]', { invalidCount: invalidFiles.length })
      invalidFiles.forEach(({ file, validation }) => {
        toast({
          title: "Invalid File",
          description: `${file.name}: ${validation.error}`,
          variant: "destructive",
        })
      })
    }

    const validFiles = validatedFiles.filter(f => f.validation.valid).map(f => f.file)
    if (validFiles.length === 0) {
      console.log('❌ [NO VALID FILES]')
      return
    }

    console.log('✅ [VALIDATION PASSED]', { validFileCount: validFiles.length })
    setUploadStats({ success: 0, failed: 0, total: validFiles.length })
    
    // ✅ Create placeholder IDs ONCE before using them
    const timestamp = Date.now()
    const placeholderIds = validFiles.map((_, i) => `uploading-${timestamp}-${i}-${Math.random()}`)
    console.log('🆔 [PLACEHOLDER IDS CREATED]', { ids: placeholderIds })
    
    // ✅ Create placeholders - FIXED: Use direct object update
    const existingImagesForColor = formData.images.filter(img => img.colorId === colorId)
    console.log('🎨 [EXISTING IMAGES FOR COLOR]', {
      colorId,
      count: existingImagesForColor.length,
      images: existingImagesForColor.map(img => ({ id: img.id, sortOrder: img.sortOrder }))
    })
    
    const placeholderImages: ImageWithLoading[] = validFiles.map((file, index) => ({
      id: placeholderIds[index],
      url: URL.createObjectURL(file),
      colorId: colorId,
      sortOrder: existingImagesForColor.length + index,
      isUploading: true,
      uploadProgress: 0,
      file: file,
    }))
    
    console.log('📸 [PLACEHOLDERS CREATED]', {
      count: placeholderImages.length,
      placeholders: placeholderImages.map(img => ({ 
        id: img.id, 
        colorId: img.colorId, 
        sortOrder: img.sortOrder,
        url: img.url.substring(0, 50) + '...'
      }))
    })
    
    const imagesWithPlaceholders = [...formData.images, ...placeholderImages]
    console.log('📦 [ADDING PLACEHOLDERS TO STATE]', {
      previousCount: formData.images.length,
      newCount: imagesWithPlaceholders.length,
      allImages: imagesWithPlaceholders.map(img => ({ 
        id: img.id, 
        colorId: img.colorId, 
        sortOrder: img.sortOrder, 
        isUploading: img.isUploading 
      }))
    })
    
    updateFormData({ images: imagesWithPlaceholders })

    let successCount = 0
    let failedCount = 0
    let currentImages = imagesWithPlaceholders

    // ✅ Upload files and track current state
    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i]
      const placeholderId = placeholderIds[i]
      
      console.log(`🚀 [UPLOAD ${i + 1}/${validFiles.length}]`, {
        fileName: file.name,
        placeholderId,
        colorId
      })

      try {
        const url = await uploadFileToBackend(file, (progress) => {
          // Update progress
          const updatedImages = currentImages.map(img =>
            img.id === placeholderId
              ? { ...img, uploadProgress: progress }
              : img
          )
          currentImages = updatedImages
          updateFormData({ images: updatedImages })
          
          console.log(`📊 [PROGRESS UPDATE ${progress}%]`, {
            placeholderId,
            currentProgress: progress
          })
        })

        console.log(`✅ [UPLOAD COMPLETE]`, {
          fileName: file.name,
          url,
          placeholderId
        })

        // ✅ Replace placeholder with actual image
        const placeholder = currentImages.find(img => img.id === placeholderId)
        
        console.log('🔍 [PLACEHOLDER FOUND]', {
          found: !!placeholder,
          placeholder: placeholder ? {
            id: placeholder.id,
            colorId: placeholder.colorId,
            sortOrder: placeholder.sortOrder,
            isUploading: placeholder.isUploading
          } : null
        })
        
        if (!placeholder) {
          console.error('❌ [PLACEHOLDER NOT FOUND]', { placeholderId })
          throw new Error('Placeholder not found')
        }
        
        const newImage: ImageWithLoading = {
          id: `img-${Date.now()}-${Math.random()}`,
          url: url,
          colorId: colorId,
          sortOrder: placeholder.sortOrder,
          isUploading: false,
        }
        
        console.log('🆕 [NEW IMAGE CREATED]', {
          newImageId: newImage.id,
          url: newImage.url,
          colorId: newImage.colorId,
          sortOrder: newImage.sortOrder,
          replacingId: placeholderId
        })

        const updatedImages = currentImages.map(img =>
          img.id === placeholderId ? newImage : img
        )
        
        console.log('🔄 [REPLACING PLACEHOLDER]', {
          previousCount: currentImages.length,
          newCount: updatedImages.length,
          replacedCount: updatedImages.filter(img => img.id === newImage.id).length,
          allImages: updatedImages.map(img => ({ 
            id: img.id, 
            colorId: img.colorId, 
            sortOrder: img.sortOrder,
            isUploading: img.isUploading,
            hasUrl: !!img.url
          }))
        })

        currentImages = updatedImages
        updateFormData({ images: updatedImages })
        
        successCount++
        setUploadStats({ success: successCount, failed: failedCount, total: validFiles.length })
        
        console.log(`✅ [SUCCESS ${successCount}/${validFiles.length}]`)

      } catch (error) {
        failedCount++
        setUploadStats({ success: successCount, failed: failedCount, total: validFiles.length })
        
        console.error(`❌ [UPLOAD FAILED ${i + 1}/${validFiles.length}]`, {
          fileName: file.name,
          error,
          placeholderId
        })
        
        // Mark with error
        const updatedImages = currentImages.map(img =>
          img.id === placeholderId
            ? { ...img, isUploading: false, error: 'Upload failed. Click retry.' }
            : img
        )
        currentImages = updatedImages
        updateFormData({ images: updatedImages })
      }
    }

    console.log('🏁 [UPLOAD BATCH COMPLETE]', {
      total: validFiles.length,
      successful: successCount,
      failed: failedCount,
      finalImageCount: currentImages.length
    })

    // Show summary toast
    if (successCount > 0 && failedCount === 0) {
      toast({
        title: "✓ Upload Complete",
        description: `Successfully uploaded ${successCount} ${successCount === 1 ? 'image' : 'images'}.`,
      })
    } else if (successCount > 0 && failedCount > 0) {
      toast({
        title: "Partial Upload",
        description: `${successCount} succeeded, ${failedCount} failed. You can retry failed uploads.`,
        variant: "default",
      })
    } else if (failedCount > 0) {
      toast({
        title: "Upload Failed",
        description: `Failed to upload ${failedCount} ${failedCount === 1 ? 'image' : 'images'}. Please try again.`,
        variant: "destructive",
      })
    }
  }

  const retryUpload = async (imageId: string) => {
    const image = formData.images.find(img => img.id === imageId)
    if (!image || !image.file) return

    // Reset image to uploading state
    const updatedImages = formData.images.map(img =>
      img.id === imageId
        ? { ...img, isUploading: true, uploadProgress: 0, error: undefined }
        : img
    )
    updateFormData({ images: updatedImages })

    try {
      const url = await uploadFileToBackend(image.file, (progress) => {
        updateFormData({
          images: formData.images.map(img =>
            img.id === imageId
              ? { ...img, uploadProgress: progress }
              : img
          )
        })
      })

      const newImage: ImageWithLoading = {
        ...image,
        id: `img-${Date.now()}-${Math.random()}`,
        url: url,
        isUploading: false,
        error: undefined,
        file: undefined,
      }

      updateFormData({
        images: formData.images.map(img =>
          img.id === imageId ? newImage : img
        )
      })

      toast({
        title: "✓ Upload Successful",
        description: "Image uploaded successfully.",
      })

    } catch (error) {
      updateFormData({
        images: formData.images.map(img =>
          img.id === imageId
            ? { ...img, isUploading: false, error: 'Upload failed. Click retry.' }
            : img
        )
      })

      toast({
        title: "Upload Failed",
        description: "Please try again.",
        variant: "destructive",
      })
    }
  }

  const reorderImages = (draggedId: string, targetId: string, colorId: string | null) => {
    // Get all images for this specific color, sorted by current order
    const colorImages = formData.images
      .filter(img => img.colorId === colorId)
      .sort((a, b) => a.sortOrder - b.sortOrder)
    
    // Find the indices
    const draggedIndex = colorImages.findIndex(img => img.id === draggedId)
    const targetIndex = colorImages.findIndex(img => img.id === targetId)
    
    if (draggedIndex === -1 || targetIndex === -1) return
    
    // Create a new array and perform the reorder
    const reorderedImages = [...colorImages]
    const [draggedItem] = reorderedImages.splice(draggedIndex, 1)
    reorderedImages.splice(targetIndex, 0, draggedItem)
    
    // Recalculate sortOrder sequentially for all images in this color
    const updatedColorImages = reorderedImages.map((img, index) => ({
      ...img,
      sortOrder: index
    }))
    
    // Get images from other colors (unchanged)
    const otherColorImages = formData.images.filter(img => img.colorId !== colorId)
    
    // Merge everything back together
    const finalImages = [...otherColorImages, ...updatedColorImages]
    
    updateFormData({ images: finalImages })
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
    }

    setModels(prev => [...prev.filter(m => m.colorId !== colorId), placeholderModel])

    try {
      const url = await uploadProductModel(file, (progress) => {
        setModels(prev => prev.map(m =>
          m.id === placeholderModel.id
            ? { ...m, uploadProgress: progress }
            : m
        ))
      })

      const newModel: ModelWithLoading = {
        id: `model-${Date.now()}`,
        url: url,
        colorId: colorId,
        fileName: file.name,
        fileSize: file.size,
        isUploading: false,
      }

      setModels(prev => prev.map(m =>
        m.id === placeholderModel.id ? newModel : m
      ))

      toast({
        title: "✓ Model Uploaded",
        description: `${file.name} uploaded successfully.`,
      })
    } catch (error) {
      console.error("Model upload failed:", error)
      setModels(prev => prev.filter(m => m.id !== placeholderModel.id))
      
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Could not upload 3D model.",
        variant: "destructive",
      })
    }
  }

  const removeModel = (colorId: string) => {
    setModels(prev => prev.filter(m => m.colorId !== colorId))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check for images still uploading or with errors
    const uploadingImages = formData.images.filter(img => img.isUploading)
    const errorImages = formData.images.filter(img => img.error)

    if (uploadingImages.length > 0) {
      toast({
        title: "Upload in Progress",
        description: "Please wait for all images to finish uploading.",
        variant: "default",
      })
      return
    }

    if (errorImages.length > 0) {
      toast({
        title: "Upload Errors",
        description: `${errorImages.length} ${errorImages.length === 1 ? 'image has' : 'images have'} failed to upload. Please retry or remove them.`,
        variant: "destructive",
      })
      return
    }

    const finalModels = models
      .filter(m => !m.isUploading && m.url)
      .map(m => ({
        colorId: m.colorId,
        url: m.url,
        fileName: m.fileName,
        fileSize: m.fileSize,
      }))

    const stepThreeData: Partial<FormData> = {
      images: formData.images.filter(img => !img.error),
      models: finalModels,
    }
    
    await onNext(stepThreeData)
  }

  const removeImageById = (imageId: string) => {
    const newImages = formData.images.filter(img => img.id !== imageId)
    updateFormData({ images: newImages })
  }

  const isUploading = formData.images.some(img => img.isUploading) || models.some(m => m.isUploading)
  const hasErrors = formData.images.some(img => img.error)

  useEffect(() => {
    console.log('📋 [FORM DATA IMAGES CHANGED]', {
      totalImages: formData.images.length,
      byColor: formData.images.reduce((acc, img) => {
        const key = img.colorId || 'shared'
        acc[key] = (acc[key] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      allImages: formData.images.map(img => ({
        id: img.id,
        colorId: img.colorId,
        sortOrder: img.sortOrder,
        isUploading: img.isUploading,
        error: img.error,
        hasUrl: !!img.url,
        urlPreview: img.url ? img.url.substring(0, 50) + '...' : 'no url'
      }))
    })
  }, [formData.images])

  useEffect(() => {
    console.log('🎨 [SELECTED COLORS]', {
      count: formData.selectedColors.length,
      colors: formData.selectedColors.map(c => ({
        id: c.id,
        name: c.name,
        code: c.code
      }))
    })
  }, [formData.selectedColors])

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Media</h2>
        <p className="text-sm text-muted-foreground mb-6">Add images to showcase your product</p>
      </div>

      {/* Upload Progress Banner */}
      {uploadStats.total > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {uploadStats.success === uploadStats.total ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : uploadStats.failed > 0 && uploadStats.success + uploadStats.failed === uploadStats.total ? (
                <AlertCircle className="h-5 w-5 text-amber-600" />
              ) : (
                <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              )}
              <span className="text-sm font-medium text-blue-900">
                Uploading {uploadStats.success + uploadStats.failed} of {uploadStats.total} images
              </span>
            </div>
            <span className="text-sm text-blue-700">
              {uploadStats.success} successful, {uploadStats.failed} failed
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((uploadStats.success + uploadStats.failed) / uploadStats.total) * 100}%` }}
            />
          </div>
        </div>
      )}

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
                <p className="text-xs text-muted-foreground mt-2">Supports: JPG, PNG, WebP, GIF (Max 10MB)</p>
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
                {formData.selectedColors.map((color) => {
                  console.log('🔍 [RENDERING COLOR SECTIONS]', {
                    viewMode,
                    colorsCount: formData.selectedColors.length,
                    colorsToRender: formData.selectedColors.map(color => ({
                      colorId: color.id,
                      colorName: color.name,
                      imagesForThisColor: formData.images.filter(img => img.colorId === color.id).length,
                      imageIds: formData.images.filter(img => img.colorId === color.id).map(img => img.id)
                    }))
                  })


                  return (
                    <ColorImageSection
                      key={color.id}
                      color={color}
                      images={formData.images.filter(img => img.colorId === color.id)}
                      onUpload={(files) => processAndUploadFiles(files, color.id)}
                      onDelete={(imageId) => removeImageById(imageId)}
                      onReorder={(draggedId, targetId) => reorderImages(draggedId, targetId, color.id)}
                      onRetry={(imageId) => retryUpload(imageId)}
                    />
                  )
                })}
                
                <SharedImageSection
                  images={formData.images.filter(img => img.colorId === null)}
                  onUpload={(files) => processAndUploadFiles(files, null)}
                  onDelete={(imageId) => removeImageById(imageId)}
                  onReorder={(draggedId, targetId) => reorderImages(draggedId, targetId, null)}
                  onRetry={(imageId) => retryUpload(imageId)}
                  isUploading={isUploading}
                />
              </>
            )}
          </div>
        ) : (
          <AllImagesGrid
            images={formData.images}
            onDelete={removeImageById}
            onRetry={(imageId) => retryUpload(imageId)}
          />
        )}
      </div>

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

      {formData.selectedColors.length > 0 && (
        <div className="space-y-2">
          {formData.selectedColors
            .filter(color => !formData.images.some(img => img.colorId === color.id && !img.error))
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
        <p className="text-sm font-medium text-blue-900 mb-2">💡 Pro Tips:</p>
        <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
          <li>Drag and drop images directly into any section to upload</li>
          <li>In "By Color" view: Drag images to reorder within each color</li>
          <li>Numbers indicate display order for customers</li>
          <li>Shared images appear for all color variants</li>
          <li>Supports JPG, PNG, WebP, GIF (Max 10MB per file)</li>
          <li>Recommended: 800x800px minimum, square aspect ratio</li>
          <li>Failed uploads can be retried by clicking the retry button</li>
          <li>3D models (.glb, .gltf) are optional but create immersive experiences</li>
        </ul>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          type="submit" 
          disabled={isUploading || hasErrors}
        >
          {isUploading ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Uploading...
            </>
          ) : hasErrors ? (
            "Fix Errors to Continue"
          ) : (
            <>
              Next Step
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}