// utils/thumbnail.utils.ts

export interface Image {
  id: string
  url: string
  colorId: string | null
  sortOrder: number
  isUploading?: boolean
  error?: string
}

/**
 * Get the thumbnail image (always first by sortOrder)
 */
export function getThumbnail(images: Image[]): Image | undefined {
  return images
    .filter(img => !img.error && !img.isUploading)
    .sort((a, b) => a.sortOrder - b.sortOrder)[0]
}

/**
 * Get thumbnail URL with fallback
 */
export function getThumbnailUrl(images: Image[], fallback = '/placeholder.png'): string {
  return getThumbnail(images)?.url || fallback
}

/**
 * Check if image is the thumbnail
 */
export function isThumbnailImage(image: Image, allImages: Image[]): boolean {
  const thumbnail = getThumbnail(allImages)
  return thumbnail?.id === image.id
}

/**
 * Set an image as thumbnail by moving it to sortOrder 0
 * This reorders all other images automatically
 */
export function setImageAsThumbnail(imageId: string, images: Image[]): Image[] {
  const targetImage = images.find(img => img.id === imageId)
  if (!targetImage) return images
  
  const oldSortOrder = targetImage.sortOrder
  
  // Reorder: Move target to 0, shift others
  return images.map(img => {
    if (img.id === imageId) {
      // This image becomes thumbnail
      return { ...img, sortOrder: 0 }
    } else if (img.sortOrder < oldSortOrder) {
      // Images before target shift down by 1
      return { ...img, sortOrder: img.sortOrder + 1 }
    } else {
      // Images after target stay same
      return img
    }
  })
}
