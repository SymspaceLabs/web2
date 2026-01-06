// product-form/review-step.tsx

"use client"

import { useState } from "react"
import { Edit2, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { FormData } from "@/components/products/product-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThumbnailUploader } from "./components/thumbnail-uploader"

type ReviewStepProps = {
  formData: FormData
  onBack: () => void
  onSubmit: (isDraft: boolean) => void
  jumpToStep: (step: number) => void
  updateFormData: (data: Partial<FormData>) => void  // ✅ Add this prop

}

export function ReviewStep({ 
  formData, 
  onBack, 
  onSubmit, 
  jumpToStep,
  updateFormData  // ✅ Add this
}: ReviewStepProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

  const getCategoryDisplay = (category: FormData['category']): string => {
    if (!category) return "Not set"
    if (typeof category === 'string') return category
    if (typeof category === 'object') {
      return (category as any).fullPath || (category as any).name || (category as any).code || "Not set"
    }
    return "Not set"
  }

  // Function to truncate HTML content
  const getTruncatedDescription = (html: string, maxLength: number = 200) => {
    if (!html) return { truncated: '', needsTruncation: false }
    
    // Create a temporary div to get text content
    const temp = document.createElement('div')
    temp.innerHTML = html
    const text = temp.textContent || temp.innerText || ''
    
    // If text is short enough, no need to truncate
    if (text.length <= maxLength) {
      return { truncated: html, needsTruncation: false }
    }

    // Find truncation point
    let charCount = 0
    let truncatedHtml = ''
    
    const traverse = (node: Node): boolean => {
      if (charCount >= maxLength) return false
      
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || ''
        if (charCount + text.length > maxLength) {
          truncatedHtml += text.substring(0, maxLength - charCount) + '...'
          charCount = maxLength
          return false
        }
        truncatedHtml += text
        charCount += text.length
        return true
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element
        const tagName = element.tagName.toLowerCase()
        
        // Copy attributes
        const attrs = Array.from(element.attributes)
          .map(attr => `${attr.name}="${attr.value}"`)
          .join(' ')
        
        truncatedHtml += attrs ? `<${tagName} ${attrs}>` : `<${tagName}>`
        
        for (let child of Array.from(node.childNodes)) {
          if (!traverse(child)) {
            truncatedHtml += `</${tagName}>`
            return false
          }
        }
        
        truncatedHtml += `</${tagName}>`
        return true
      }
      return true
    }

    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    traverse(doc.body)
    
    return { truncated: truncatedHtml, needsTruncation: true }
  }

  const description = formData.description || ''
  const { truncated, needsTruncation } = getTruncatedDescription(description)

  const handleThumbnailChange = (thumbnailId: string | null, thumbnailUrl?: string) => {
    updateFormData({ 
      thumbnailId,
      thumbnailUrl 
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Review & Publish</h2>
        <p className="text-sm text-muted-foreground mb-6">Review all details before publishing your product</p>
      </div>

       {/* ✅ ADD THUMBNAIL SELECTOR AS FIRST SECTION */}
      <ThumbnailUploader
        images={formData.images}
        selectedThumbnailId={formData.thumbnailId || null}
        thumbnailUrl={formData.thumbnailUrl}
        onThumbnailChange={handleThumbnailChange}
        colors={formData.selectedColors}
      />

      {/* Basic Information Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Basic Information</CardTitle>
          <Button type="button" variant="ghost" size="sm" onClick={() => jumpToStep(1)}>
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Product Name</p>
            <p className="font-medium">{formData.name || "Not set"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Category</p>
            <p className="font-medium">{getCategoryDisplay(formData.category)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Description</p>
            {description ? (
              <div className="space-y-2">
                <div 
                  className="font-medium prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: isDescriptionExpanded ? description : truncated 
                  }}
                />
                {needsTruncation && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="flex items-center gap-1 px-2 h-8 text-primary hover:text-primary -mt-1"
                  >
                    {isDescriptionExpanded ? (
                      <>
                        See less <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        See more <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            ) : (
              <p className="font-medium">Not set</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Variants & Inventory</CardTitle>
          <Button type="button" variant="ghost" size="sm" onClick={() => jumpToStep(2)}>
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          {formData.variants.length > 0 ? (
            <div className="space-y-4">
              <div className="flex gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Colors</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.selectedColors.map((color) => (
                      <span key={color.id} className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-sm font-medium">
                        <span 
                          className="w-3 h-3 rounded-full border" 
                          style={{ backgroundColor: color.code }}
                        />
                        {color.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Sizes</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.selectedSizes.map((size) => (
                      <span key={size.id} className="px-3 py-1 rounded-full bg-muted text-sm font-medium">
                        {size.size}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Total Variants: {formData.variants.length}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Total Stock:</span>{" "}
                    <span className="font-medium">{formData.variants.reduce((sum, v) => sum + v.stock, 0)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Price Range:</span>{" "}
                    <span className="font-medium">
                      ${Math.min(...formData.variants.map((v) => v.price)).toFixed(2)} - $
                      {Math.max(...formData.variants.map((v) => v.price)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">No variants added</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Media</CardTitle>
          <Button type="button" variant="ghost" size="sm" onClick={() => jumpToStep(3)}>
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          {formData.images.length > 0 ? (
            <div className="space-y-3">
              <p className="text-sm">
                <span className="text-muted-foreground">Total Images:</span>{" "}
                <span className="font-medium">{formData.images.length}</span>
              </p>
              <div className="grid grid-cols-4 gap-2">
                {formData.images.slice(0, 4).map((image, index) => (
                  <div key={index} className="aspect-square rounded border bg-muted overflow-hidden">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              {formData.images.length > 4 && (
                <p className="text-xs text-muted-foreground">+{formData.images.length - 4} more images</p>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground">No images added</p>
          )}
          {formData.model3d && (
            <p className="text-sm mt-3">
              <span className="text-muted-foreground">3D Model:</span> <span className="font-medium">Uploaded</span>
            </p>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={() => onSubmit(true)}>
            Save as Draft
          </Button>
          <Button type="button" onClick={() => onSubmit(false)}>
            Publish Product
          </Button>
        </div>
      </div>
    </div>
  )
}