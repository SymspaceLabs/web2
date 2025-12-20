import React, { useState, useRef } from 'react'
import { Upload, X, FileImage, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void
  currentImageUrl?: string
  onRemove?: () => void
  accept?: string
  maxSizeMB?: number
  className?: string
  uploadFunction: (file: File) => Promise<string>
  label?: string
  description?: string
  showPreview?: boolean
  aspectRatio?: 'square' | 'landscape' | 'portrait' | 'auto'
}

export function ImageUploader({
  onUploadComplete,
  currentImageUrl,
  onRemove,
  accept = 'image/*',
  maxSizeMB = 5,
  className = '',
  uploadFunction,
  label = 'Upload Image',
  description = 'Click to upload or drag and drop',
  showPreview = true,
  aspectRatio = 'auto'
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const aspectRatioClasses = {
    square: 'aspect-square',
    landscape: 'aspect-video',
    portrait: 'aspect-[3/4]',
    auto: 'aspect-auto'
  }

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      return 'Please upload an image file'
    }

    // Check file size
    const sizeMB = file.size / (1024 * 1024)
    if (sizeMB > maxSizeMB) {
      return `File size must be less than ${maxSizeMB}MB (current: ${sizeMB.toFixed(1)}MB)`
    }

    return null
  }

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
    }, 100)
    return interval
  }

  const handleFileSelect = async (file: File) => {
    setError(null)
    setUploadSuccess(false)

    // Validate file
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsUploading(true)
    const progressInterval = simulateProgress()

    try {
      const url = await uploadFunction(file)
      
      clearInterval(progressInterval)
      setUploadProgress(100)
      setUploadSuccess(true)
      
      // Show success state briefly before calling callback
      setTimeout(() => {
        onUploadComplete(url)
        setIsUploading(false)
        setUploadProgress(0)
        
        // Keep success indicator visible for a moment
        setTimeout(() => setUploadSuccess(false), 2000)
      }, 500)
    } catch (err) {
      clearInterval(progressInterval)
      setError(err instanceof Error ? err.message : 'Upload failed. Please try again.')
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleRemove = () => {
    if (onRemove) {
      onRemove()
    }
    setError(null)
    setUploadSuccess(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // If there's a current image and preview is enabled
  if (currentImageUrl && showPreview && !isUploading) {
    return (
      <div className={`space-y-3 ${className}`}>
        {label && (
          <label className="text-sm font-medium leading-none">{label}</label>
        )}
        <div className="relative group">
          <div className={`relative w-full ${aspectRatioClasses[aspectRatio]} max-h-64 border-2 rounded-lg overflow-hidden bg-muted`}>
            <img
              src={currentImageUrl}
              alt="Uploaded preview"
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={triggerFileInput}
                  className="shadow-lg"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Change
                </Button>
                {onRemove && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={handleRemove}
                    className="shadow-lg"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </div>
          {uploadSuccess && (
            <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Uploaded
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
        />
      </div>
    )
  }

  // Upload area
  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <label className="text-sm font-medium leading-none">{label}</label>
      )}
      
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={!isUploading ? triggerFileInput : undefined}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-all duration-200 ease-in-out
          ${isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30'}
          ${isUploading ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}
          ${error ? 'border-destructive bg-destructive/5' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          disabled={isUploading}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center gap-3">
          {/* Icon */}
          {isUploading ? (
            <div className="relative">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">{uploadProgress}%</span>
              </div>
            </div>
          ) : error ? (
            <AlertCircle className="h-12 w-12 text-destructive" />
          ) : uploadSuccess ? (
            <CheckCircle2 className="h-12 w-12 text-green-500 animate-in zoom-in" />
          ) : isDragging ? (
            <Upload className="h-12 w-12 text-primary animate-bounce" />
          ) : (
            <FileImage className="h-12 w-12 text-muted-foreground" />
          )}

          {/* Text */}
          <div className="space-y-1">
            {isUploading ? (
              <>
                <p className="text-sm font-medium text-foreground">
                  Uploading...
                </p>
                <p className="text-xs text-muted-foreground">
                  Please wait while we upload your image
                </p>
              </>
            ) : error ? (
              <>
                <p className="text-sm font-medium text-destructive">
                  Upload Failed
                </p>
                <p className="text-xs text-destructive/80">
                  {error}
                </p>
              </>
            ) : uploadSuccess ? (
              <>
                <p className="text-sm font-medium text-green-600">
                  Upload Successful!
                </p>
                <p className="text-xs text-muted-foreground">
                  Your image has been uploaded
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-foreground">
                  {description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {accept.split(',').map(a => a.trim().replace('image/', '').toUpperCase()).join(', ')} up to {maxSizeMB}MB
                </p>
              </>
            )}
          </div>

          {/* Progress bar */}
          {isUploading && (
            <div className="w-full max-w-xs">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Upload button (when not uploading) */}
          {!isUploading && !error && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="mt-2 pointer-events-none"
            >
              <Upload className="h-4 w-4 mr-2" />
              Choose File
            </Button>
          )}

          {/* Retry button (when error) */}
          {error && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={(e) => {
                e.stopPropagation()
                setError(null)
                triggerFileInput()
              }}
            >
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}