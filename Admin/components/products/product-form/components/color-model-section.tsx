"use client"

import { useRef } from "react"
import { Upload, X, Loader2, Box, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { formatFileSize } from "@/utils/media.utils"
import type { Color, ModelWithLoading } from "@/types/media.type"

type ColorModelSectionProps = {
  color: Color
  model: ModelWithLoading | null
  onUpload: (file: File, textureFile?: File) => void
  onDelete: () => void
  onTextureUpload?: (file: File) => void
  onTextureDelete?: () => void
}

export function ColorModelSection({
  color,
  model,
  onUpload,
  onDelete,
  onTextureUpload,
  onTextureDelete
}: ColorModelSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textureInputRef = useRef<HTMLInputElement>(null)
  
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
        <div className="space-y-3">
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".glb,.fbx"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  onUpload(e.target.files[0])
                }
              }}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload 3D Model (.glb, .fbx)
            </Button>
          </div>
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
        <div className="space-y-3">
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
                  <span className="text-sm font-medium text-green-800">Model Uploaded</span>
                </div>
                <p className="text-xs text-gray-600 truncate">{model.fileName}</p>
                <p className="text-xs text-gray-500">{formatFileSize(model.fileSize)}</p>
              </div>
            </div>
          </div>

          {/* ✅ UPDATED: Texture Upload Section with Progress */}
          <div className="border-t pt-3">
            <Label className="text-sm font-medium mb-2 block">
              Texture (Optional)
            </Label>
            
            {model.textureUploading ? (
              // ✅ NEW: Show upload progress
              <div className="bg-blue-50 border border-blue-200 rounded p-3">
                <div className="flex items-center gap-3 mb-2">
                  <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
                  <span className="text-sm font-medium text-blue-900">
                    Uploading texture...
                  </span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${model.textureProgress || 0}%` }}
                  />
                </div>
                <p className="text-xs text-blue-700 mt-1 text-right">
                  {model.textureProgress || 0}%
                </p>
              </div>
            ) : !model.texture ? (
              <div>
                <input
                  ref={textureInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0] && onTextureUpload) {
                      onTextureUpload(e.target.files[0])
                      // Reset input so the same file can be selected again if needed
                      e.target.value = ''
                    }
                  }}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => textureInputRef.current?.click()}
                  className="w-full"
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Upload Texture Image
                </Button>
                <p className="text-xs text-muted-foreground mt-1">
                  Supports: JPG, PNG, WebP (Max 10MB)
                </p>
              </div>
            ) : (
              <div className="bg-gray-50 border rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Texture attached</span>
                  </div>
                  {onTextureDelete && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={onTextureDelete}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {/* Texture preview */}
                <div className="relative w-full h-32 bg-gray-100 rounded overflow-hidden">
                  <img 
                    src={model.texture} 
                    alt="Texture preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23999"%3EImage%3C/text%3E%3C/svg%3E'
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate">
                  {model.texture.split('/').pop()}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}