// utils/thumbnail.utils.ts

import { updateProduct } from "@/api/product"
import { uploadFileToBackend } from "@/utils/file-upload.utils"
import type { FormData } from "@/types/product.type"

type ColorCodeMap = Map<string, string>

type ImageType = {
  id: string
  url: string
  colorId: string | null
  sortOrder: number
  isThumbnail?: boolean
}

/**
 * Build color code lookup map from selected colors
 */
export function buildColorCodeMap(selectedColors: FormData['selectedColors']): ColorCodeMap {
  const colorCodeMap = new Map<string, string>()
  selectedColors.forEach(color => {
    colorCodeMap.set(color.id, color.code)
  })
  return colorCodeMap
}

/**
 * Transform images to API format with color codes
 */
export function transformImagesToApiFormat(
  images: FormData['images'],
  colorCodeMap: ColorCodeMap
) {
  return images.map(img => ({
    url: img.url,
    colorId: img.colorId ?? null,
    colorCode: img.colorId ? colorCodeMap.get(img.colorId) ?? null : null,
    sortOrder: img.sortOrder,
    isThumbnail: img.isThumbnail ?? false
  }))
}

/**
 * Save thumbnail changes to the backend
 */
export async function saveThumbnailToBackend(
  productId: string,
  updatedImages: FormData['images'],
  selectedColors: FormData['selectedColors']
): Promise<void> {
  const colorCodeMap = buildColorCodeMap(selectedColors)
  const imagesForApi = transformImagesToApiFormat(updatedImages, colorCodeMap)
  
  await updateProduct(productId, { images: imagesForApi })
}

/**
 * Upload a new image and set it as thumbnail
 */
export async function uploadNewThumbnail(
  file: File,
  productId: string,
  currentImages: FormData['images'],
  selectedColors: FormData['selectedColors']
): Promise<string> {
  // Upload file to backend
  const url = await uploadFileToBackend(file)
  
  // Build color code map
  const colorCodeMap = buildColorCodeMap(selectedColors)
  
  // Create new image object as thumbnail
  const newImage = {
    url,
    colorId: null,
    colorCode: null,
    sortOrder: currentImages.length,
    isThumbnail: true
  }
  
  // Clear other thumbnails
  const updatedImages = currentImages.map(img => ({
    url: img.url,
    colorId: img.colorId,
    colorCode: img.colorId ? colorCodeMap.get(img.colorId) ?? null : null,
    sortOrder: img.sortOrder,
    isThumbnail: false
  }))
  
  // Build payload with new thumbnail
  const payload = {
    images: [...updatedImages, newImage]
  }
  
  await updateProduct(productId, payload)
  
  return url
}

/**
 * Transform API images to form format
 */
export function transformApiImagesToFormImages(apiImages: any[]): FormData['images'] {
  return apiImages.map((img, i) => ({
    id: img.id,
    url: img.url,
    colorId: img.colorId || null,
    sortOrder: img.sortOrder ?? i,
    isThumbnail: img.isThumbnail ?? false
  }))
}

/**
 * Get the current thumbnail image
 */
export function getThumbnail(images: ImageType[]): ImageType | null {
  return images.find(img => img.isThumbnail === true) || null
}

/**
 * Check if a specific image is the thumbnail
 */
export function isThumbnailImage(image: ImageType, images: ImageType[]): boolean {
  return image.isThumbnail === true
}

/**
 * Set a specific image as thumbnail and clear others
 */
export function setImageAsThumbnail(imageId: string, images: ImageType[]): ImageType[] {
  return images.map(img => ({
    ...img,
    isThumbnail: img.id === imageId
  }))
}

/**
 * Clear all thumbnails (no thumbnail selected)
 */
export function clearThumbnail(images: ImageType[]): ImageType[] {
  return images.map(img => ({
    ...img,
    isThumbnail: false
  }))
}