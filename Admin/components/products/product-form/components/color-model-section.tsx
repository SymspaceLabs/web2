// color-model-section.tsx

"use client"

import { useRef } from "react"
import { Upload, X, Loader2, Box } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { formatFileSize } from "@/utils/media.utils"
import type { Color, ModelWithLoading } from "@/types/media.type"

type ColorModelSectionProps = {
  color: Color
  model: ModelWithLoading | null
  onUpload: (file: File) => void
  onDelete: () => void
}

export function ColorModelSection({
  color,
  model,
  onUpload,
  onDelete
}: ColorModelSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  
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
            accept=".glb,.fbx"
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
            Upload 3D Model (.glb, .fbx)
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