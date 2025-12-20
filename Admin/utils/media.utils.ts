// ===================================
// FILE: utils/media.utils.ts
// ===================================

import { uploadImage } from "@/api/upload"

/**
 * Uploads a raw File object to the Minio backend and returns the resulting URL.
 */
export const uploadFileToBackend = async (file: File, onProgress?: (progress: number) => void): Promise<string> => {
  try {
    // Simulate progress if the upload function doesn't provide it
    if (onProgress) {
      onProgress(10)
      setTimeout(() => onProgress(30), 100)
      setTimeout(() => onProgress(60), 300)
    }
    
    const url = await uploadImage(file)
    
    if (onProgress) {
      onProgress(100)
    }
    
    return url
  } catch (error) {
    console.error("Image upload failed:", error)
    throw error
  }
}

/**
 * Formats bytes to human-readable file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Validates image file
 */
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Please use JPG, PNG, WebP, or GIF.' };
  }
  
  if (file.size > maxSize) {
    return { valid: false, error: `File too large. Maximum size is ${formatFileSize(maxSize)}.` };
  }
  
  return { valid: true };
}